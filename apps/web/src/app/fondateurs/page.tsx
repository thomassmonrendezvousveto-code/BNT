import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fondateurs — Baby Next Time',
  description:
    'Thomas Savey et Chloé Azpiazu : pourquoi nous avons fondé Baby Next Time, et les trois principes qui guident chacune de nos décisions.',
};

export default function PageFondateurs() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="founders-hero">
            <div className="founders-hero-text">
              <p className="section-kicker">Fondateurs</p>
              <h1>Un projet qui part d’une histoire vécue.</h1>
              <p className="section-intro" style={{ maxWidth: 620 }}>
                Nous avons vécu une fausse couche. Nous avons cherché un accompagnement et nous n’avons rien trouvé qui
                ressemble à un parcours. Personne ne prenait soin du couple, ni de l’après. Baby Next Time, c’est ce
                que nous aurions voulu trouver.
              </p>
            </div>
            <div className="founders-hero-photo">
              <img src="/fondateurs.jpg" alt="Thomas Savey et Chloé Azpiazu, co-fondateurs de Baby Next Time" />
            </div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="founders-grid">
            <article className="founder-card">
              <span className="badge">Co-fondateur · Produit & Growth</span>
              <h2>Thomas Savey</h2>
              <p>
                10 ans d’expérience en tech et entrepreneuriat. Ancien opérateur dans plusieurs startups européennes.
                Convaincu que l’impact passe par l’exécution soignée — et que les sujets intimes méritent autant de
                rigueur que la finance.
              </p>
            </article>
            <article className="founder-card">
              <span className="badge peach">Co-fondatrice · Éthique & Soin</span>
              <h2>Chloé Azpiazu</h2>
              <p>
                Formée aux sciences humaines et à l’accompagnement. Attentive aux mots, aux cadres, aux personnes. Elle
                garantit qu’aucune décision ne se prend sans que la parole des concernées ait été entendue — et
                respectée.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-kicker">Pourquoi nous</p>
          <h2>Trois convictions qui guident toutes nos décisions.</h2>

          <div className="three-columns" style={{ marginTop: 34 }}>
            <article className="feature-card">
              <span className="card-kicker">01</span>
              <h3>Indépendance totale</h3>
              <p>
                Aucune marque de couches, de formule infantile ou de test de grossesse ne financera jamais Baby Next
                Time. La confiance se gagne, elle ne se monétise pas.
              </p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">02</span>
              <h3>Le soin avant la croissance</h3>
              <p>
                On accepte de grandir lentement pour tenir la qualité. Chaque cohorte est animée par une psychologue
                diplômée, rémunérée, supervisée.
              </p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">03</span>
              <h3>La parole vécue au centre</h3>
              <p>
                Chloé a vécu ce que traversent les femmes qu’on accompagne. Aucun produit, aucune ressource ne sort
                sans qu’une voix concernée l’ait validé.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="card cta-card">
            <div>
              <p className="section-kicker">Vous nous écrivez</p>
              <h2>Une question, une proposition, une histoire à partager ?</h2>
              <p className="section-intro" style={{ maxWidth: 720 }}>
                Nous lisons et répondons personnellement à chaque message — souvent dans les 48 h.
              </p>
            </div>
            <div className="cta-card-actions">
              <Link className="btn btn-lg" href="/contact">Nous écrire</Link>
              <span className="micro">hello@babynexttime.fr</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
