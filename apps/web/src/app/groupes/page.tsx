import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Groupes de parole — Baby Next Time',
  description:
    'Cohortes fermées de 6 à 8 personnes, animées par une psychologue formée à la périnatalité. Pour les femmes, les couples et les partenaires.',
};

const cohortes = [
  {
    title: 'Cohorte « Après » — printemps',
    cible: 'Femmes ayant vécu une fausse couche dans les 6 derniers mois',
    format: '6 séances · 90 min · visio · groupe fermé de 6 à 8',
    quand: 'Mardis 19h — 20h30 · à partir du 24 mars 2026',
    statut: 'open',
    statutLabel: 'Inscriptions ouvertes',
    prix: '290 € / personne · 50 % remboursable Mon Soutien Psy',
  },
  {
    title: 'Cohorte « Traverser à deux »',
    cible: '4 couples ayant vécu une fausse couche dans les 12 derniers mois',
    format: '6 séances · 90 min · visio · groupe fermé de 4 couples',
    quand: 'Jeudis 20h — 21h30 · à partir du 9 avril 2026',
    statut: 'soon',
    statutLabel: 'Bientôt complet',
    prix: '450 € / couple',
  },
  {
    title: 'Cohorte « La place des absents »',
    cible: 'Partenaires dont la conjointe a vécu une fausse couche',
    format: '4 séances · 90 min · visio · groupe fermé de 6',
    quand: 'Lundis 19h — 20h30 · à partir du 14 avril 2026',
    statut: 'open',
    statutLabel: 'Inscriptions ouvertes',
    prix: '190 € / personne',
  },
  {
    title: 'Cohorte pilote « Après » — septembre',
    cible: '6 femmes ayant vécu une fausse couche entre 2 et 18 mois',
    format: '6 séances · 90 min · visio · groupe fermé de 6',
    quand: 'Septembre — novembre 2026 · créneau à définir avec le groupe',
    statut: 'pilote',
    statutLabel: 'Cohorte pilote',
    prix: '39 € symboliques, remboursés à l’issue',
    cta: { label: 'Candidater', href: '/cohorte' },
  },
];

export default function PageGroupes() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="section-kicker">Groupes de parole</p>
          <h1>Un espace sûr pour déposer, écouter, avancer.</h1>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Nos cohortes rassemblent 6 à 8 personnes qui ont vécu une fausse couche. Elles sont animées par une
            psychologue du label, sur 4 à 6 séances, en visio. Groupes fermés — le même groupe se retrouve à chaque
            séance.
          </p>

          <div className="three-columns" style={{ marginTop: 34 }}>
            <article className="feature-card">
              <span className="card-kicker">Pourquoi un groupe ?</span>
              <h3>Vous n’êtes pas seule</h3>
              <p>Entendre d’autres femmes, dans un cadre cadré, sans jugement. C’est l’effet le plus rapporté.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Comment ça marche ?</span>
              <h3>Petit, fermé, animé</h3>
              <p>6 à 8 personnes maximum. Le même groupe sur toute la durée. Une psy garante du cadre.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Et si ce n’est pas le bon moment ?</span>
              <h3>Aucune pression</h3>
              <p>Vous pouvez vous inscrire à une cohorte plus tardive, ou commencer par un suivi individuel.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <p className="section-kicker">Cohortes</p>
          <h2>Prochaines sessions</h2>

          <div className="groupes-grid" style={{ marginTop: 24 }}>
            {cohortes.map((c) => (
              <article className="offer-card group-card" key={c.title}>
                <div className="group-header">
                  <span className={`badge status-${c.statut}`}>{c.statutLabel}</span>
                </div>
                <h3>{c.title}</h3>
                <p className="group-cible"><strong>Pour qui :</strong> {c.cible}</p>
                <p className="group-format"><strong>Format :</strong> {c.format}</p>
                <p className="group-quand"><strong>Quand :</strong> {c.quand}</p>
                <p className="group-prix">{c.prix}</p>
                <div className="group-cta">
                  {c.cta ? (
                    <Link className="btn" href={c.cta.href}>{c.cta.label}</Link>
                  ) : (
                    <Link className="btn secondary" href="/contact?sujet=groupe">M’inscrire à cette cohorte</Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Encart couples & partenaires — la photo en illustration */}
      <section className="section">
        <div className="container">
          <div className="aftermath-partner aftermath-partner-photo">
            <figure className="aftermath-partner-figure" aria-hidden="true">
              <img
                src="/couple-partenaire.jpg"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="aftermath-partner-text">
              <div className="aftermath-partner-label">Couples &amp; partenaires</div>
              <h2>Deux cohortes pensées pour vivre ce deuil à deux — ou en tant que partenaire.</h2>
              <p>
                Le deuil périnatal n’est jamais vécu de la même manière par les deux parents,
                souvent décalé dans le temps. Nos cohortes <em>« Traverser à deux »</em> et{' '}
                <em>« La place des absents »</em> existent pour ça : un espace cadré pour
                déposer ce qu’on n’ose pas dire à la maison, ou pour simplement reconnaître
                qu’on est aussi traversé·e par cette perte.
              </p>
              <div className="aftermath-partner-actions">
                <Link className="btn" href="/contact?sujet=groupe-couples">
                  M’inscrire « Traverser à deux »
                </Link>
                <Link className="btn secondary" href="/contact?sujet=groupe-partenaires">
                  M’inscrire « La place des absents »
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card cta-card">
            <div>
              <p className="section-kicker">Pas la bonne date ?</p>
              <h2>Être prévenu·e des prochaines cohortes</h2>
              <p className="section-intro" style={{ maxWidth: 720 }}>
                Laissez-nous votre email — on vous écrit dès qu’une cohorte qui vous correspond ouvre. Aucun spam, on
                vous écrit 4 à 6 fois par an maximum.
              </p>
            </div>
            <div className="cta-card-actions">
              <Link className="btn btn-lg" href="/#newsletter">Être prévenu·e</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
