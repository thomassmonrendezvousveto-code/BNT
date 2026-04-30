'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { ResultatOrientation } from '@bnt/orientation-engine';
import { ResultsCard } from '@/components/results-card';
import { BNT_LAST_ANSWERS_KEY, BNT_LAST_RESULT_KEY } from '@/lib/result-storage';

export default function ResultatPage() {
  const [resultat, setResultat] = useState<ResultatOrientation | null>(null);
  const [reponses, setReponses] = useState<Record<string, string | number>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const rawResultat = localStorage.getItem(BNT_LAST_RESULT_KEY);
      const rawReponses = localStorage.getItem(BNT_LAST_ANSWERS_KEY);
      if (rawResultat) setResultat(JSON.parse(rawResultat));
      if (rawReponses) setReponses(JSON.parse(rawReponses));
    } catch {
      // pas grave
    } finally {
      setLoaded(true);
    }
  }, []);

  return (
    <main>
      <section className="section-sm">
        <div className="container" style={{ maxWidth: 1080 }}>
          <p className="section-kicker">Votre résultat</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}>Une restitution claire, à relire quand vous voulez.</h1>
          <p className="section-intro" style={{ maxWidth: 760 }}>
            Cette page reprend votre orientation, les prochaines étapes recommandées et les ressources les plus utiles
            pour maintenant.
          </p>
        </div>
      </section>

      <section className="section-sm" style={{ paddingTop: 0, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 1080 }}>
          {!loaded ? null : resultat ? (
            <ResultsCard resultat={resultat} reponses={reponses} />
          ) : (
            <div className="card" style={{ padding: 28 }}>
              <p className="section-kicker">Aucun résultat enregistré</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Commencez par le questionnaire.</h2>
              <p>
                Cette page affiche la dernière restitution générée dans ce navigateur. Si vous n’avez pas encore fait
                le questionnaire ici, il faut commencer par là.
              </p>
              <div className="actions" style={{ marginTop: 20 }}>
                <Link className="btn" href="/questionnaire">Commencer le questionnaire</Link>
                <Link className="btn secondary" href="/je-viens-de-vivre">Je viens de vivre ça</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
