import { calculeOrientationBNT } from '@bnt/orientation-engine';

export async function POST(request: Request) {
  const body = await request.json();
  const reponses = body?.reponses ?? {};
  const resultat = calculeOrientationBNT(reponses);

  return Response.json(resultat, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
