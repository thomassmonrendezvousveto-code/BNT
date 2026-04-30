import { NextResponse } from 'next/server';
import type { OrientationCode } from '@bnt/orientation-engine';
import { buildKitPdf } from '@/lib/kit-pdf';
import { sendKitEmail } from '@/lib/kit-email';

export const runtime = 'nodejs';

interface KitEmailPayload {
  email?: unknown;
  prenom?: unknown;
  orientation?: unknown;
  reponses?: unknown;
}

const VALID_ORIENTATIONS: OrientationCode[] = [
  'urgence_medicale',
  'grossesse_suivante_fast_track',
  'priorite_medicale',
  'priorite_psychologique',
  'parcours_complexe_ou_recurrent',
  'preconception',
  'parcours_coordonne_standard',
];

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  let payload: KitEmailPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON invalide' }, { status: 400 });
  }

  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const prenom = typeof payload.prenom === 'string' ? payload.prenom.trim() : '';
  const orientation = payload.orientation as OrientationCode;
  const reponses = (payload.reponses && typeof payload.reponses === 'object'
    ? (payload.reponses as Record<string, string | number>)
    : {});

  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Email invalide' }, { status: 400 });
  }
  if (!VALID_ORIENTATIONS.includes(orientation)) {
    return NextResponse.json({ ok: false, error: 'Orientation invalide' }, { status: 400 });
  }

  try {
    const pdfBuffer = await buildKitPdf({ prenom, orientation, reponses });
    const result = await sendKitEmail({ to: email, prenom, orientation, reponses, pdfBuffer });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error ?? 'Envoi impossible' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, channel: result.channel, id: result.id ?? null });
  } catch (err) {
    console.error('[api/kit-email] Exception:', err);
    const message = err instanceof Error ? err.message : 'Erreur serveur';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
