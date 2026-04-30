import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cohorte pilote « Après » — Baby Next Time',
  description:
    'Septembre 2026. 6 femmes. 6 séances. Une psychologue formée à la périnatalité. Participation symbolique de 39 € remboursée à l’issue. Candidatures jusqu’au 15 juillet.',
};

export default function PageCohorte() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <span className="badge peach" style={{ marginBottom: 16 }}>Cohorte pilote · septembre 2026</span>
          <h1>Cohorte pilote « Après ».</h1>
          <p className="hero-lede" style={{ marginBottom: 12 }}>
            6 femmes, 6 séances de 90 min, une psychologue formée à la périnatalité.
          </p>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            On lance avec Chloé et une psychologue clinicienne notre première cohorte de groupe de parole. C’est un
            pilote : on assume de l’écrire avec vous, et de tirer les leçons pour les cohortes suivantes.
          </p>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="three-columns">
            <article className="feature-card">
              <span className="card-kicker">Format</span>
              <h3>6 séances · 90 min · visio</h3>
              <p>Toutes les 2 semaines, sur 10 semaines. Groupe fermé : les 6 mêmes participantes à chaque séance.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Animation</span>
              <h3>Une psychologue formée à la périnatalité</h3>
              <p>Diplômée, rémunérée, supervisée. Charte éthique signée. Pas de bénévolat déguisé.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Tarif pilote</span>
              <h3>39 € symboliques, remboursés</h3>
              <p>Participation symbolique pour engager. Remboursée à 100 % si le parcours est mené à terme.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-kicker">Pour qui</p>
          <h2>Les critères pour candidater</h2>

          <div className="parcours-list" style={{ marginTop: 24 }}>
            <article className="parcours-card">
              <div className="parcours-tag"><strong>1</strong></div>
              <div className="parcours-body">
                <h3>Avoir vécu une fausse couche entre 2 et 18 mois auparavant</h3>
                <p>Précoce, tardive, répétée ou IMG — toutes formes acceptées.</p>
              </div>
            </article>
            <article className="parcours-card">
              <div className="parcours-tag"><strong>2</strong></div>
              <div className="parcours-body">
                <h3>Ne pas être actuellement en parcours psy aigu</h3>
                <p>Le groupe est complémentaire d’un suivi individuel, pas un substitut en situation aiguë.</p>
              </div>
            </article>
            <article className="parcours-card">
              <div className="parcours-tag"><strong>3</strong></div>
              <div className="parcours-body">
                <h3>Disponibilité pour 6 séances entre septembre et novembre 2026</h3>
                <p>Le créneau hebdomadaire (soir ou samedi matin) sera arbitré avec le groupe à la première séance.</p>
              </div>
            </article>
            <article className="parcours-card">
              <div className="parcours-tag"><strong>4</strong></div>
              <div className="parcours-body">
                <h3>Accepter un retour structuré à l’issue</h3>
                <p>Un entretien individuel d’une heure pour nous aider à construire la suite. C’est le cœur du deal.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="card cta-card">
            <div>
              <p className="section-kicker">Candidater</p>
              <h2>Candidatures jusqu’au 15 juillet 2026</h2>
              <p className="section-intro" style={{ maxWidth: 720 }}>
                10 candidates seront reçues en entretien individuel de 15 min sur la deuxième quinzaine de juillet. Les
                6 retenues sont notifiées avant le 31 juillet. Pas de classement « meilleurs profils » — on cherche un
                groupe équilibré.
              </p>
            </div>
            <div className="cta-card-actions">
              <Link className="btn btn-lg" href="/contact?sujet=cohorte">Déposer ma candidature</Link>
              <span className="micro">Confidentialité totale · Réponse personnelle · Pas de spam</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="founders-teaser">
            <div className="testimonial-photo">
              <img src="/cercle-femmes-entraide.png" alt="Illustration d’un cercle de femmes" />
            </div>
            <div>
              <span className="hero-eyebrow" style={{ marginBottom: 16 }}>Pourquoi un pilote</span>
              <h2>On préfère apprendre avec 6 femmes que reproduire à l’aveugle.</h2>
              <p className="hero-copy">
                Cette cohorte n’est pas un produit fini. C’est l’occasion d’écrire, à 6 + 1, ce que devrait être un
                vrai parcours d’accompagnement après une fausse couche. Vos retours nourriront tout ce qui suit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
