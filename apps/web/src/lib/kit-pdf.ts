// Import du bundle "standalone" qui inclut les fonts (Helvetica, etc.) inline.
// Évite l'erreur Vercel "ENOENT Helvetica.afm" liée au bundling pnpm/Next.
// @ts-expect-error - le sous-chemin standalone n'a pas de types
import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';
import type { OrientationCode } from '@bnt/orientation-engine';
import {
  ORIENTATIONS,
  dateConcrete,
  contexteUtilisatrice,
  PREPARE_RDV,
  CHECKLIST,
  pourquoiOrientation,
  microContextes,
  VERBATIM,
} from './kit-data';

// Palette BNT
const INK = '#363838';
const MUTED = '#716d69';
const PEACH = '#d89275';
const PEACH_DARK = '#b86e55';
const PEACH_SOFT = '#fbe7dc';
const BEIGE = '#f7f0ed';
const SAGE = '#9ca190';

interface BuildKitPdfOptions {
  prenom: string;
  orientation: OrientationCode;
  reponses: Record<string, string | number>;
}

export function buildKitPdf({ prenom, orientation, reponses }: BuildKitPdfOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const config = ORIENTATIONS[orientation];
    if (!config) {
      reject(new Error(`Unknown orientation: ${orientation}`));
      return;
    }

    const doc = new PDFDocument({
      size: 'A4',
      margin: 0,
      info: {
        Title: 'Kit Baby Next Time',
        Author: 'Baby Next Time',
        Subject: `Kit personnalisé — ${config.title}`,
      },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const W = doc.page.width;
    const H = doc.page.height;
    const M = 56; // marge intérieure
    const contentW = W - M * 2;

    // ─── Header band ───
    doc.rect(0, 0, W, 110).fill(PEACH);
    doc.fillColor('#ffffff');
    doc.font('Helvetica-Bold').fontSize(11);
    doc.text('BABY NEXT TIME', M, 36, { characterSpacing: 2 });
    doc.font('Helvetica').fontSize(9).fillColor('#fff7f1');
    doc.text('Kit personnalisé · accompagnement post-fausse couche', M, 54);

    // Date à droite
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.fontSize(9).fillColor('#fff7f1');
    doc.text(`Édité le ${dateStr}`, M, 78);

    // ─── Salutation ───
    let y = 140;
    doc.fillColor(MUTED).font('Helvetica').fontSize(9);
    doc.text('UN MOT DE CHLOÉ', M, y, { characterSpacing: 1.5 });
    y += 18;
    doc.fillColor(INK).font('Times-Roman').fontSize(20);
    const salut = prenom ? `${prenom}, je suis contente que vous soyez là.` : 'Je suis contente que vous soyez là.';
    doc.text(salut, M, y, { width: contentW });
    y = doc.y + 10;
    doc.fillColor(INK).font('Helvetica').fontSize(10.5);
    doc.text(
      'Ce que vous traversez, je le connais. C’est précisément pour qu’on ne reste pas seule avec ça que ' +
        'Baby Next Time existe. Ce kit est un point de départ — pas un protocole. Vous avancez à votre rythme, ' +
        'étape par étape.',
      M, y, { width: contentW, lineGap: 2 },
    );
    y = doc.y + 24;

    // ─── Action du jour (encart pêche) ───
    const todayBoxH = 138;
    doc.roundedRect(M, y, contentW, todayBoxH, 14).fill(PEACH);
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(8);
    doc.text('SI VOUS NE DEVEZ FAIRE QU’UNE SEULE CHOSE AUJOURD’HUI', M + 22, y + 18, {
      characterSpacing: 1.6,
    });
    doc.fillColor('#ffffff').font('Times-Bold').fontSize(16);
    doc.text(config.todayAction.titre, M + 22, y + 38, { width: contentW - 44 });
    doc.fillColor('#fff7f1').font('Helvetica').fontSize(10);
    doc.text(config.todayAction.desc, M + 22, doc.y + 6, { width: contentW - 44, lineGap: 1.5 });
    y += todayBoxH + 22;

    // ─── Orientation principale ───
    doc.fillColor(PEACH_DARK).font('Helvetica-Bold').fontSize(8);
    doc.text('VOTRE ORIENTATION PRINCIPALE', M, y, { characterSpacing: 1.6 });
    y += 14;
    doc.fillColor(INK).font('Times-Roman').fontSize(20);
    doc.text(config.title, M, y, { width: contentW });
    y = doc.y + 6;
    doc.fillColor(INK).font('Helvetica-Oblique').fontSize(10.5);
    doc.text(config.baseline, M, y, { width: contentW, lineGap: 1.5 });
    y = doc.y + 8;

    const ctx = contexteUtilisatrice(reponses);
    if (ctx) {
      const ctxBoxH = 48;
      doc.roundedRect(M, y, contentW, ctxBoxH, 8).fill(PEACH_SOFT);
      doc.fillColor(INK).font('Helvetica').fontSize(10);
      doc.text(ctx, M + 16, y + 14, { width: contentW - 32, lineGap: 1.5 });
      y += ctxBoxH + 18;
    } else {
      y += 8;
    }

    doc.fillColor(MUTED).font('Helvetica').fontSize(9);
    doc.text(`Professionnel principal : ${config.professionnel}`, M, y);
    y = doc.y + 22;

    // ─── Section : Parcours pas-à-pas ───
    if (y > H - 120) { doc.addPage(); y = M; }

    doc.fillColor(PEACH_DARK).font('Helvetica-Bold').fontSize(8);
    doc.text('VOTRE PARCOURS PAS-À-PAS', M, y, { characterSpacing: 1.6 });
    y += 14;
    doc.fillColor(INK).font('Times-Roman').fontSize(18);
    doc.text('Les prochaines étapes, dans l’ordre', M, y, { width: contentW });
    y = doc.y + 4;
    doc.fillColor(MUTED).font('Helvetica').fontSize(9.5);
    doc.text(
      'Chaque étape est concrète, datée, avec un contact ou un lien. Vous pouvez en sauter, les replanifier, ' +
        'ou nous écrire si vous avez besoin d’aide.',
      M, y, { width: contentW, lineGap: 1.5 },
    );
    y = doc.y + 18;

    // ─── Étapes (timeline-like) ───
    config.etapes.forEach((etape, idx) => {
      const stepBoxMinH = 110;
      // pagination si plus assez de place
      if (y + stepBoxMinH > H - M) {
        doc.addPage();
        y = M;
      }

      const startY = y;

      // Rond numéroté à gauche
      const dotX = M + 18;
      const dotY = startY + 18;
      const dotR = 14;
      doc.circle(dotX, dotY, dotR).fill(PEACH);
      doc.fillColor('#ffffff').font('Times-Bold').fontSize(12);
      doc.text(String(idx + 1), dotX - 4, dotY - 6.5, { width: 8, align: 'center' });

      // Contenu à droite
      const cx = M + 50;
      const cw = contentW - 50;
      let cy = startY + 6;

      // Pills (when, date, duree)
      doc.font('Helvetica-Bold').fontSize(8).fillColor('#ffffff');
      const whenW = doc.widthOfString(etape.quand) + 14;
      doc.roundedRect(cx, cy, whenW, 16, 8).fill(PEACH);
      doc.fillColor('#ffffff').text(etape.quand, cx + 7, cy + 4);

      const dateLabel = `≈ ${dateConcrete(etape.delaiJours, today)}`;
      const dateW = doc.widthOfString(dateLabel) + 14;
      const dateX = cx + whenW + 6;
      doc.roundedRect(dateX, cy, dateW, 16, 8).fill(PEACH_SOFT);
      doc.fillColor(PEACH_DARK).text(dateLabel, dateX + 7, cy + 4);

      doc.fillColor(MUTED).font('Helvetica').fontSize(8.5);
      doc.text(etape.duree, dateX + dateW + 8, cy + 4);

      cy += 24;

      // Titre de l'étape
      doc.fillColor(INK).font('Times-Roman').fontSize(13);
      doc.text(etape.titre, cx, cy, { width: cw });
      cy = doc.y + 2;

      // Qui
      doc.fillColor(PEACH_DARK).font('Helvetica-Bold').fontSize(9);
      doc.text(`▸ ${etape.qui}`, cx, cy, { width: cw });
      cy = doc.y + 4;

      // Description
      doc.fillColor(INK).font('Helvetica').fontSize(9.5);
      doc.text(etape.desc, cx, cy, { width: cw, lineGap: 1.5 });
      cy = doc.y + 6;

      // Lien d'action
      const fullHref = etape.actionHref.startsWith('http') || etape.actionHref.startsWith('tel:')
        ? etape.actionHref
        : `https://babynexttime.fr${etape.actionHref}`;
      doc.fillColor(PEACH_DARK).font('Helvetica-Oblique').fontSize(9);
      doc.text(`${etape.actionLabel} → ${fullHref}`, cx, cy, { width: cw, link: fullHref, underline: true });
      cy = doc.y + 14;

      // Trait fin séparateur
      if (idx < config.etapes.length - 1) {
        doc.strokeColor('#e8dfd9').lineWidth(0.5);
        doc.moveTo(cx, cy).lineTo(M + contentW, cy).stroke();
        cy += 12;
      }

      y = cy;
    });

    // ─── Pourquoi cette orientation ───
    const raisons = pourquoiOrientation(orientation, reponses);
    if (raisons.length > 0) {
      if (y > H - 160) { doc.addPage(); y = M; }
      doc.fillColor(SAGE).font('Helvetica-Bold').fontSize(8);
      doc.text('POURQUOI CETTE ORIENTATION', M, y, { characterSpacing: 1.6 });
      y += 14;
      doc.fillColor(INK).font('Times-Roman').fontSize(14);
      doc.text('Ce qui nous a guidés dans vos réponses', M, y, { width: contentW });
      y = doc.y + 8;
      doc.fillColor(INK).font('Helvetica').fontSize(10);
      raisons.forEach((r) => {
        if (y > H - 60) { doc.addPage(); y = M; }
        doc.text(`✓  ${r.texte}`, M, y, { width: contentW, lineGap: 2 });
        y = doc.y + 6;
      });
      y += 14;
    }

    // ─── Personnalisation enrichie ───
    const ctxs = microContextes(reponses);
    if (ctxs.length > 0) {
      if (y > H - 160) { doc.addPage(); y = M; }
      doc.fillColor(PEACH_DARK).font('Helvetica-Bold').fontSize(8);
      doc.text('ADAPTÉ À VOTRE SITUATION', M, y, { characterSpacing: 1.6 });
      y += 14;
      doc.fillColor(INK).font('Times-Roman').fontSize(14);
      doc.text('Ce que vos réponses changent dans votre kit', M, y, { width: contentW });
      y = doc.y + 8;
      ctxs.forEach((ctx) => {
        if (y > H - 80) { doc.addPage(); y = M; }
        doc.fillColor(PEACH_DARK).font('Helvetica-Bold').fontSize(10.5);
        doc.text(ctx.titre, M, y, { width: contentW });
        y = doc.y + 4;
        doc.fillColor(INK).font('Helvetica').fontSize(10);
        doc.text(ctx.texte, M, y, { width: contentW, lineGap: 2 });
        y = doc.y + 12;
      });
    }

    // ─── Checklist actionnable ───
    const checklist = CHECKLIST[orientation];
    if (checklist && checklist.length > 0) {
      if (y > H - 180) { doc.addPage(); y = M; }
      doc.fillColor(PEACH_DARK).font('Helvetica-Bold').fontSize(8);
      doc.text('VOTRE CHECK-LIST DE LA SEMAINE', M, y, { characterSpacing: 1.6 });
      y += 14;
      doc.fillColor(INK).font('Times-Roman').fontSize(14);
      doc.text('À cocher dans les 7 prochains jours', M, y, { width: contentW });
      y = doc.y + 10;
      checklist.forEach((it) => {
        if (y > H - 50) { doc.addPage(); y = M; }
        // Case à cocher
        doc.lineWidth(0.8).strokeColor(PEACH_DARK).rect(M, y + 1, 12, 12).stroke();
        doc.fillColor(INK).font('Helvetica').fontSize(10);
        doc.text(it.label, M + 22, y, { width: contentW - 22, lineGap: 2 });
        y = Math.max(doc.y, y + 18) + 4;
      });
      y += 10;
    }

    // ─── Préparer votre rendez-vous ───
    const prep = PREPARE_RDV[orientation];
    if (prep) {
      if (y > H - 200) { doc.addPage(); y = M; }
      doc.fillColor(PEACH_DARK).font('Helvetica-Bold').fontSize(8);
      doc.text('PRÉPARER VOTRE RENDEZ-VOUS', M, y, { characterSpacing: 1.6 });
      y += 14;
      doc.fillColor(INK).font('Times-Roman').fontSize(14);
      doc.text(`Comment aborder : ${prep.type}`, M, y, { width: contentW });
      y = doc.y + 4;
      doc.fillColor(MUTED).font('Helvetica-Oblique').fontSize(9);
      doc.text('Adaptez les crochets [ ] à votre situation.', M, y, { width: contentW });
      y = doc.y + 10;

      const sections: Array<{ titre: string; items: string[] }> = [
        { titre: 'À DIRE', items: prep.aDire },
        { titre: 'À DEMANDER', items: prep.aDemander },
        { titre: 'À APPORTER', items: prep.aApporter },
      ];
      sections.forEach((sec) => {
        if (y > H - 80) { doc.addPage(); y = M; }
        doc.fillColor(PEACH_DARK).font('Helvetica-Bold').fontSize(9);
        doc.text(sec.titre, M, y, { characterSpacing: 1.2 });
        y = doc.y + 4;
        doc.fillColor(INK).font('Helvetica').fontSize(10);
        sec.items.forEach((line) => {
          if (y > H - 40) { doc.addPage(); y = M; }
          doc.text(`›  ${line}`, M + 8, y, { width: contentW - 8, lineGap: 1.5 });
          y = doc.y + 4;
        });
        y += 8;
      });

      if (prep.modeleEmployeur) {
        if (y > H - 80) { doc.addPage(); y = M; }
        doc.fillColor(PEACH_DARK).font('Helvetica-Bold').fontSize(9);
        doc.text('MODÈLE DE MAIL — EMPLOYEUR', M, y, { characterSpacing: 1.2 });
        y = doc.y + 6;
        doc.fillColor(INK).font('Helvetica-Oblique').fontSize(9.5);
        doc.text(prep.modeleEmployeur, M, y, { width: contentW, lineGap: 1.5 });
        y = doc.y + 14;
      }
    }

    // ─── Verbatim ───
    const verb = VERBATIM[orientation];
    if (verb) {
      if (y > H - 110) { doc.addPage(); y = M; }
      doc.fillColor(SAGE).font('Helvetica-Bold').fontSize(8);
      doc.text('UN TÉMOIGNAGE', M, y, { characterSpacing: 1.6 });
      y += 14;
      doc.fillColor(INK).font('Times-Italic').fontSize(12);
      doc.text(verb.citation, M, y, { width: contentW, lineGap: 2 });
      y = doc.y + 6;
      doc.fillColor(MUTED).font('Helvetica').fontSize(9.5);
      doc.text(verb.signature, M, y, { width: contentW });
      y = doc.y + 16;
    }

    // ─── Footer (sur la dernière page) ───
    if (y > H - 120) { doc.addPage(); y = M; }

    y += 10;
    doc.strokeColor('#e8dfd9').lineWidth(1);
    doc.moveTo(M, y).lineTo(M + contentW, y).stroke();
    y += 18;

    doc.fillColor(SAGE).font('Helvetica-Bold').fontSize(8);
    doc.text('POUR ALLER PLUS LOIN', M, y, { characterSpacing: 1.6 });
    y += 14;
    doc.fillColor(INK).font('Helvetica').fontSize(10);
    [
      '· Ressources : https://babynexttime.fr/ressources',
      '· Groupes de parole : https://babynexttime.fr/groupes',
      '· Cohorte pilote « Après » : https://babynexttime.fr/cohorte',
      '· Nous écrire : https://babynexttime.fr/contact',
    ].forEach((line) => {
      doc.text(line, M, y, { width: contentW });
      y = doc.y + 4;
    });

    y += 14;
    doc.fillColor(MUTED).font('Helvetica-Oblique').fontSize(8.5);
    doc.text(
      'Ce kit est un repère, pas un diagnostic. En cas de signe d’alerte (saignements abondants, ' +
        'douleur intense, malaise, fièvre), appelez le 15 ou rendez-vous aux urgences gynécologiques.',
      M, y, { width: contentW, lineGap: 1.5 },
    );
    y = doc.y + 14;

    doc.fillColor(PEACH_DARK).font('Helvetica-Bold').fontSize(8.5);
    doc.text('Baby Next Time · babynexttime.fr · contact@babynexttime.fr', M, y, { width: contentW });

    doc.end();
  });
}
