import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  transpilePackages: ['@bnt/orientation-engine'],
  // PDFKit doit rester un module Node externe — sinon il est bundlé par
  // Next.js et perd accès à son dossier `data/` (Helvetica.afm, etc.).
  serverExternalPackages: ['pdfkit'],
  // Monorepo pnpm : on pointe la racine de tracing au repo racine pour
  // que Next.js suive bien les symlinks pnpm.
  outputFileTracingRoot: path.join(__dirname, '../..'),
  // En complément, on s'assure que tout pdfkit (incluant ses .afm) est
  // bien copié dans le bundle serverless de Vercel (chemin pnpm réel).
  outputFileTracingIncludes: {
    '/api/**/*': [
      '../../node_modules/.pnpm/pdfkit@*/node_modules/pdfkit/**/*',
      './node_modules/pdfkit/**/*',
    ],
  },
};

export default nextConfig;
