#!/usr/bin/env node
/**
 * Pré-génération des og:images des ressources.
 *
 * Lit la liste des ressources depuis resources-library.tsx (parsing AST simple),
 * télécharge l'og:image (ou la miniature YouTube), et stocke chaque image
 * dans /public/ressources/{id}.{ext}.
 *
 * Génère également /public/ressources/manifest.json :
 *   { "<resource-id>": "/ressources/<id>.<ext>", ... }
 *
 * Usage : node scripts/fetch-og-images.mjs
 *
 * Aucune dépendance externe (utilise fetch natif Node 20+).
 */

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SOURCE = resolve(ROOT, 'src/components/resources-library.tsx');
const OUT_DIR = resolve(ROOT, 'public/ressources');
const MANIFEST = resolve(OUT_DIR, 'manifest.json');

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const TIMEOUT_MS = 15_000;

// ─── Extraction de la liste des ressources depuis le .tsx ───
async function loadResources() {
  const src = await readFile(SOURCE, 'utf8');
  // On capte chaque objet ressource via une regex tolérante.
  // Suppose l'ordre : id, ..., url
  const resources = [];
  const re = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?(?:url:\s*['"]([^'"]+)['"])?\s*,?\s*accent[\s\S]*?\}|\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?url:\s*['"]([^'"]+)['"][\s\S]*?\}/g;

  // Approche plus simple et robuste : on parse chaque bloc { ... } qui contient un `id:`
  const blockRe = /\{[^{}]*id:\s*['"]([^'"]+)['"][^{}]*\}/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    const block = m[0];
    const id = m[1];
    const urlMatch = block.match(/url:\s*['"]([^'"]+)['"]/);
    if (urlMatch) {
      resources.push({ id, url: urlMatch[1] });
    }
  }

  if (resources.length === 0) {
    throw new Error(
      "Aucune ressource trouvée. Vérifie que resources-library.tsx contient bien des objets { id: '...', url: '...' }."
    );
  }
  return resources;
}

// ─── Helpers HTTP ───
async function fetchWithTimeout(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: 'follow',
      ...opts,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: '*/*',
        ...(opts.headers || {}),
      },
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(t);
  }
}

// ─── Détecte YouTube et renvoie l'URL de miniature directe ───
function youtubeId(url) {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return m ? m[1] : null;
}

// ─── Scrape l'og:image d'une page HTML ───
async function findOgImage(pageUrl) {
  const res = await fetchWithTimeout(pageUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const html = await res.text();

  // Cherche dans cet ordre : og:image, og:image:url, twitter:image, twitter:image:src
  const patterns = [
    /<meta[^>]+property=["']og:image(?::url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::url)?["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
  ];

  for (const re of patterns) {
    const m = html.match(re);
    if (m && m[1]) {
      // Résolution d'URL relative
      try {
        return new URL(m[1], pageUrl).toString();
      } catch {
        return m[1];
      }
    }
  }
  return null;
}

// ─── Devine l'extension à partir du Content-Type ou de l'URL ───
function guessExt(contentType, url) {
  const ct = (contentType || '').toLowerCase();
  if (ct.includes('jpeg') || ct.includes('jpg')) return '.jpg';
  if (ct.includes('png')) return '.png';
  if (ct.includes('webp')) return '.webp';
  if (ct.includes('gif')) return '.gif';
  if (ct.includes('svg')) return '.svg';
  // Fallback : extension depuis l'URL
  const ext = extname(new URL(url).pathname).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)) {
    return ext === '.jpeg' ? '.jpg' : ext;
  }
  return '.jpg';
}

// ─── Télécharge une image et l'écrit sur disque ───
async function downloadImage(imgUrl, outBase) {
  const res = await fetchWithTimeout(imgUrl);
  if (!res.ok) throw new Error(`Image HTTP ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  const ext = guessExt(ct, imgUrl);
  const buf = Buffer.from(await res.arrayBuffer());
  const outPath = `${outBase}${ext}`;
  await writeFile(outPath, buf);
  return outPath;
}

// ─── Vérifie qu'un fichier existe déjà (n'importe quelle extension) ───
async function existsAnyExt(base) {
  for (const ext of ['.jpg', '.png', '.webp', '.gif', '.svg']) {
    try {
      await access(`${base}${ext}`);
      return `${base}${ext}`;
    } catch {
      /* not found */
    }
  }
  return null;
}

// ─── Programme principal ───
async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const force = process.argv.includes('--force');
  const resources = await loadResources();
  console.log(`▸ ${resources.length} ressources à traiter (force=${force})\n`);

  const manifest = {};
  // Si manifeste existant, on conserve ce qui marche déjà
  try {
    const prev = JSON.parse(await readFile(MANIFEST, 'utf8'));
    Object.assign(manifest, prev);
  } catch {
    /* pas de manifeste, on part de zéro */
  }

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const { id, url } of resources) {
    const outBase = resolve(OUT_DIR, id);

    if (!force) {
      const existing = await existsAnyExt(outBase);
      if (existing) {
        const rel = `/ressources/${existing.split('/').pop()}`;
        manifest[id] = rel;
        skipped++;
        console.log(`  ✓ ${id} (déjà téléchargé)`);
        continue;
      }
    }

    try {
      let imgUrl;
      const ytId = youtubeId(url);
      if (ytId) {
        // Tente maxres puis hqdefault
        const candidates = [
          `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`,
          `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`,
          `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
        ];
        for (const c of candidates) {
          try {
            const r = await fetchWithTimeout(c, { method: 'HEAD' });
            if (r.ok) {
              imgUrl = c;
              break;
            }
          } catch {
            /* essaye le suivant */
          }
        }
        if (!imgUrl) imgUrl = candidates[1];
      } else {
        imgUrl = await findOgImage(url);
      }

      if (!imgUrl) {
        console.log(`  ✗ ${id} : aucune og:image trouvée sur ${url}`);
        failed++;
        continue;
      }

      const outPath = await downloadImage(imgUrl, outBase);
      const rel = `/ressources/${outPath.split('/').pop()}`;
      manifest[id] = rel;
      ok++;
      console.log(`  ✓ ${id} → ${rel}`);
    } catch (err) {
      console.log(`  ✗ ${id} : ${err.message}`);
      failed++;
    }
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(
    `\n✓ ${ok} téléchargées · ${skipped} déjà présentes · ${failed} échouées`
  );
  console.log(`✓ Manifeste écrit : ${MANIFEST}`);

  if (failed > 0) {
    console.log(
      "\nℹ Les ressources sans og:image utiliseront le fallback Microlink runtime."
    );
  }
}

main().catch((err) => {
  console.error('✗ Erreur fatale :', err);
  process.exit(1);
});
