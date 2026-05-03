import type { OrientationCode } from '@bnt/orientation-engine';
import { ORIENTATIONS, dateConcrete, contexteUtilisatrice } from './kit-data';

interface SendKitEmailOptions {
  to: string;
  prenom: string;
  orientation: OrientationCode;
  reponses: Record<string, string | number>;
  pdfBuffer?: Buffer; // optionnel : si la génération PDF a échoué, on envoie quand même
}

interface SendResult {
  ok: boolean;
  channel: 'resend' | 'console';
  id?: string;
  error?: string;
}

function buildHtmlEmail(prenom: string, orientation: OrientationCode, reponses: Record<string, string | number>): string {
  const config = ORIENTATIONS[orientation];
  const ctx = contexteUtilisatrice(reponses);
  const today = new Date();

  const etapesHtml = config.etapes
    .map((etape, idx) => {
      const date = dateConcrete(etape.delaiJours, today);
      const fullHref = etape.actionHref.startsWith('http') || etape.actionHref.startsWith('tel:')
        ? etape.actionHref
        : `https://babynexttime.fr${etape.actionHref}`;
      return `
        <tr>
          <td style="padding:18px 0;border-bottom:1px solid #efe5df;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font:bold 12px Helvetica,Arial,sans-serif;color:#b86e55;letter-spacing:0.06em;text-transform:uppercase;">
                  Étape ${idx + 1} · ${etape.quand} · ≈ ${date}
                </td>
              </tr>
              <tr>
                <td style="font:18px Georgia,serif;color:#363838;padding-top:6px;">${etape.titre}</td>
              </tr>
              <tr>
                <td style="font:bold 13px Helvetica,Arial,sans-serif;color:#b86e55;padding-top:4px;">
                  ▸ ${etape.qui}
                </td>
              </tr>
              <tr>
                <td style="font:14px Helvetica,Arial,sans-serif;color:#363838;line-height:1.5;padding-top:6px;">
                  ${etape.desc}
                </td>
              </tr>
              <tr>
                <td style="padding-top:10px;">
                  <a href="${fullHref}" style="color:#b86e55;font-weight:600;text-decoration:underline;">
                    ${etape.actionLabel} →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    })
    .join('');

  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:0;background:#f7f0ed;font-family:Helvetica,Arial,sans-serif;color:#363838;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f0ed;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:14px;overflow:hidden;max-width:600px;">
            <!-- Header -->
            <tr>
              <td style="background:#d89275;padding:28px 32px;color:#ffffff;">
                <div style="font:bold 12px Helvetica;letter-spacing:0.16em;">BABY NEXT TIME</div>
                <div style="font:13px Helvetica;color:#fff7f1;margin-top:6px;">Votre kit personnalisé</div>
              </td>
            </tr>

            <!-- Salutation -->
            <tr>
              <td style="padding:32px 32px 8px;">
                <div style="font:bold 11px Helvetica;color:#716d69;letter-spacing:0.14em;text-transform:uppercase;">
                  Un mot de Chloé
                </div>
                <h1 style="font:22px Georgia,serif;font-weight:normal;color:#363838;margin:8px 0 12px;line-height:1.2;">
                  ${prenom ? `${prenom}, ` : ''}je suis contente que vous soyez là.
                </h1>
                <p style="font:15px Helvetica;color:#363838;line-height:1.55;margin:0;">
                  Ce que vous traversez, je le connais. Ce kit est un point de départ — pas un protocole. Vous le retrouvez
                  ici, et il est aussi attaché à cet email en PDF pour que vous puissiez le rouvrir, l’imprimer, ou le
                  partager avec votre partenaire ou un soignant.
                </p>
              </td>
            </tr>

            <!-- Action du jour -->
            <tr>
              <td style="padding:24px 32px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#d89275;border-radius:12px;">
                  <tr>
                    <td style="padding:24px 24px;">
                      <div style="font:bold 11px Helvetica;color:#fff7f1;letter-spacing:0.14em;text-transform:uppercase;">
                        Si vous ne devez faire qu’une seule chose aujourd’hui
                      </div>
                      <h2 style="font:bold 18px Georgia,serif;color:#ffffff;margin:10px 0 10px;line-height:1.25;">
                        ${config.todayAction.titre}
                      </h2>
                      <p style="font:14px Helvetica;color:#fff7f1;line-height:1.5;margin:0;">
                        ${config.todayAction.desc}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Orientation -->
            <tr>
              <td style="padding:28px 32px 0;">
                <div style="font:bold 11px Helvetica;color:#b86e55;letter-spacing:0.14em;text-transform:uppercase;">
                  Votre orientation principale
                </div>
                <h2 style="font:22px Georgia,serif;font-weight:normal;color:#363838;margin:8px 0 8px;line-height:1.2;">
                  ${config.title}
                </h2>
                <p style="font:italic 14px Helvetica;color:#363838;line-height:1.5;margin:0 0 12px;">
                  ${config.baseline}
                </p>
                ${ctx ? `<p style="background:#fbe7dc;color:#363838;padding:12px 16px;border-radius:10px;font:14px Helvetica;line-height:1.5;margin:0;">${ctx}</p>` : ''}
              </td>
            </tr>

            <!-- Parcours -->
            <tr>
              <td style="padding:28px 32px 12px;">
                <div style="font:bold 11px Helvetica;color:#b86e55;letter-spacing:0.14em;text-transform:uppercase;">
                  Votre parcours pas-à-pas
                </div>
                <h2 style="font:20px Georgia,serif;font-weight:normal;color:#363838;margin:8px 0 18px;line-height:1.2;">
                  Les prochaines étapes, dans l’ordre
                </h2>
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${etapesHtml}
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 32px 32px;">
                <p style="font:13px Helvetica;color:#716d69;line-height:1.5;margin:0 0 12px;">
                  Le kit complet est aussi en pièce jointe. Vous pouvez nous écrire à
                  <a href="mailto:contact@babynexttime.fr" style="color:#b86e55;">contact@babynexttime.fr</a>
                  pour être rappelée par une sage-femme.
                </p>
                <p style="font:italic 12px Helvetica;color:#716d69;line-height:1.5;margin:0;">
                  Ce kit est un repère, pas un diagnostic. En cas d’urgence (saignements abondants, douleur intense,
                  malaise, fièvre), appelez le 15.
                </p>
              </td>
            </tr>
          </table>

          <p style="font:11px Helvetica;color:#716d69;margin:18px 0 0;">
            Baby Next Time · contact@babynexttime.fr
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendKitEmail({
  to,
  prenom,
  orientation,
  reponses,
  pdfBuffer,
}: SendKitEmailOptions): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.KIT_EMAIL_FROM || 'Baby Next Time <contact@babynexttime.fr>';
  const subject = 'Votre kit personnalisé Baby Next Time';
  const html = buildHtmlEmail(prenom, orientation, reponses);

  // Dev fallback : pas de clé Resend, on log côté serveur et on renvoie ok
  if (!apiKey) {
    console.warn('[kit-email] RESEND_API_KEY absente — envoi simulé en console.');
    console.info(`[kit-email] To: ${to}`);
    console.info(`[kit-email] Subject: ${subject}`);
    console.info(`[kit-email] PDF: ${pdfBuffer ? `${pdfBuffer.length} bytes` : 'aucun'}`);
    return { ok: true, channel: 'console' };
  }

  try {
    // Import dynamique pour éviter de charger Resend si pas utilisé
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const attachments = pdfBuffer
      ? [
          {
            filename: `Kit-Baby-Next-Time-${orientation}.pdf`,
            content: pdfBuffer,
          },
        ]
      : undefined;
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      attachments,
    });

    if (result.error) {
      console.error('[kit-email] Resend error:', result.error);
      return { ok: false, channel: 'resend', error: String(result.error.message ?? result.error) };
    }
    return { ok: true, channel: 'resend', id: result.data?.id };
  } catch (err) {
    console.error('[kit-email] Exception:', err);
    return { ok: false, channel: 'resend', error: err instanceof Error ? err.message : String(err) };
  }
}
