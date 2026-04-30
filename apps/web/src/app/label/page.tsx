import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Le label Baby Next Time',
  description:
    'Une page claire pour comprendre les critères, les engagements et la candidature au label Baby Next Time.',
};

export default function PageLabel() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="section-kicker">Label Baby Next Time</p>
          <h1>Un cadre de confiance pour les praticien·nes.</h1>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Le label BNT ne sert pas à décorer un annuaire. Il sert à poser des critères simples, lisibles et
            exigeants pour les professionnel·les qui accompagnent l’après fausse couche.
          </p>

          <div className="three-columns" style={{ marginTop: 34 }}>
            <article className="feature-card">
              <span className="card-kicker">Critère</span>
              <h3>Formation et expérience</h3>
              <p>
                Le ou la praticien·ne doit pouvoir démontrer une formation ou une pratique claire autour de la
                périnatalité, du deuil périnatal ou de la fausse couche.
              </p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Critère</span>
              <h3>Qualité d’accueil</h3>
              <p>
                Pas de banalisation, pas d’infantilisation, pas de pression à “aller mieux vite”. Le soin relationnel
                compte autant que la compétence clinique.
              </p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Critère</span>
              <h3>Transparence et engagement</h3>
              <p>
                Le label repose sur une charte, des éléments vérifiables et une mise à jour régulière du référencement.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <p className="section-kicker">Pour les praticien·nes</p>
          <h2>Ce que le label engage.</h2>
          <p className="section-intro" style={{ maxWidth: 720 }}>
            Le label a vocation à être utile aux patientes avant d’être flatteur pour les soignant·es. Il engage sur
            des comportements, une qualité de présence et une manière d’orienter.
          </p>

          <div className="three-columns" style={{ marginTop: 28 }}>
            <article className="feature-card">
              <span className="card-kicker">Engagement</span>
              <h3>Accueillir sans minimiser</h3>
              <p>Reconnaître l’événement, laisser une place au vécu, expliquer clairement la suite possible.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Engagement</span>
              <h3>Orienter quand il le faut</h3>
              <p>Adresser vers un autre relais quand le besoin est psychologique, conjugal, spécialisé ou urgent.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Engagement</span>
              <h3>Rester lisible pour les patientes</h3>
              <p>Modalités, spécialités, limites et disponibilités doivent être compréhensibles sans effort.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card cta-card">
            <div>
              <p className="section-kicker">Vous êtes soignant·e ?</p>
              <h2>Candidater au label</h2>
              <p className="section-intro" style={{ maxWidth: 720 }}>
                Sage-femme, psychologue ou gynécologue : si vous êtes formé·e à l’accompagnement du deuil périnatal et
                que vous adhérez à notre charte, candidatez. Nous reviendrons vers vous sous 7 jours.
              </p>
            </div>
            <div className="cta-card-actions">
              <Link className="btn btn-lg" href="/contact?sujet=label">Déposer ma candidature</Link>
              <Link className="btn secondary" href="/professionnels">Voir l’annuaire actuel</Link>
              <span className="micro">Charte · éléments vérifiables · retour sous 7 jours</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
