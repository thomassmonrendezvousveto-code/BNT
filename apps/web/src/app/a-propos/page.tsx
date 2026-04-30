import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos — Baby Next Time',
  description:
    'Pourquoi Baby Next Time existe, ce que le projet cherche à réparer dans l’après fausse couche, et le cadre qui guide ses choix.',
};

export default function AProposPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="section-kicker">À propos</p>
          <h1>Baby Next Time aide à savoir quoi faire après une fausse couche.</h1>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Ni média généraliste, ni simple annuaire, ni plateforme floue. Un parcours guidé pour traverser l’après,
            trouver le bon relais, et ne pas se retrouver seule devant des morceaux d’informations éparpillés.
          </p>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="three-columns">
            <article className="feature-card">
              <span className="card-kicker">Questionnaire</span>
              <h3>Le questionnaire oriente</h3>
              <p>Le cœur du site. Il aide à distinguer l’urgence, le besoin médical, le soutien psy ou le parcours coordonné.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Kit</span>
              <h3>Le kit rassure</h3>
              <p>Une restitution simple, relisible, imprimable, qui dit quoi faire ensuite sans surcharger.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Label & groupes</span>
              <h3>Le reste prolonge l’accompagnement</h3>
              <p>Le label sécurise l’orientation. Les groupes viennent quand un espace collectif devient juste.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="testimonial">
            <div className="testimonial-photo">
              <img src="/fondateurs.jpg" alt="Thomas Savey et Chloé Azpiazu" />
            </div>
            <div>
              <p className="section-kicker">Notre histoire</p>
              <blockquote>
                « Nous avons cherché un accompagnement, et nous avons surtout trouvé des fragments. Baby Next Time est
                né de ce manque. »
              </blockquote>
              <figcaption>Thomas Savey & Chloé Azpiazu</figcaption>
              <div className="actions" style={{ marginTop: 18 }}>
                <Link className="btn secondary" href="/fondateurs">Lire l’histoire des fondateurs</Link>
                <Link className="btn secondary" href="/comite-scientifique">Voir le comité scientifique</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
