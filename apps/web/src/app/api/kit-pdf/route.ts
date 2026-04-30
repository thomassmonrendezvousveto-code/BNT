import type { OrientationCode } from '@bnt/orientation-engine';
import { buildKitPdf } from '@/lib/kit-pdf';

export const runtime = 'nodejs';

const VALID_ORIENTATIONS: OrientationCode[] = [
  'urgence_medicale',
  'grossesse_suivante_fast_track',
  'priorite_medicale',
  'priorite_psychologique',
  'parcours_complexe_ou_recurrent',
  'preconception',
  'parcours_coordonne_standard',
];

export async function POST(request: Request) {
  let payload: {
    prenom?: string;
    orientation?: OrientationCode;
    reponses?: Record<string, string | number>;
  };

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'JSON invalide' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const prenom = (payload.prenom ?? '').toString().trim();
  const orientation = payload.orientation as OrientationCode;
  const reponses = payload.reponses ?? {};

  if (!VALID_ORIENTATIONS.includes(orientation)) {
    return new Response(JSON.stringify({ ok: false, error: 'Orientation invalide' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    const pdfBuffer = await buildKitPdf({ prenom, orientation, reponses });
    // Convert Node Buffer → Uint8Array (BodyInit-compatible)
    const body = new Uint8Array(pdfBuffer);
    return new Response(body, {
      status: 200,
      headers: {
        'content-type': 'application/pdf',
        'content-disposition': `attachment; filename="Kit-Baby-Next-Time-${orientation}.pdf"`,
        'cache-control': 'no-store',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur serveur';
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
