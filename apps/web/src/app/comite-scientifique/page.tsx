import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comité scientifique — Baby Next Time',
  description:
    'Les médecins, sages-femmes et psychologues qui veillent à la justesse médicale et éthique de tout ce que nous publions.',
};

type Membre = {
  id: string;
  nom: string;
  initiales: string;
  role: string;
  exerciceLieu: string;
  doctolibUrl?: string;
  rpps?: string;
  parcours: string[]; // diplômes / formation publics & vérifiables
  conventionnement?: string;
  // ─── À compléter par Tom (validé par chaque membre) ───
  contribution?: string; // ce qu'iel apporte au comité — 2-3 phrases
  citation?: string; // verbatim signé
};

// ─── Premiers membres du comité ───
// Toutes les infos de cette liste sont publiques (Doctolib, annuaire Ameli, RPPS).
// Les champs `contribution` et `citation` doivent être validés mot pour mot par chaque membre
// avant publication. Les laisser vides affiche un placeholder discret.
const MEMBRES: Membre[] = [
  {
    id: 'claire-migliorini',
    nom: 'Dr Claire Migliorini',
    initiales: 'CM',
    role: 'Médecin généraliste',
    exerciceLieu: 'Cabinet à Anglet (64)',
    doctolibUrl: 'https://www.doctolib.fr/medecin-generaliste/saint-jean-de-luz/claire-migliorini',
    parcours: [
      'D.E.S. de Médecine Générale — Faculté de Médecine de Poitiers (2020)',
      'D.I.U. Aide à l’arrêt du tabac — Université Bordeaux Segalen (2022)',
    ],
    conventionnement: 'Conventionnée secteur 1 · carte Vitale acceptée',
    // contribution: 'À compléter avec Claire',
    // citation: 'À compléter avec Claire',
  },
  {
    id: 'marie-vicenty',
    nom: 'Dr Marie Vicenty',
    initiales: 'MV',
    role: 'Médecin généraliste',
    exerciceLieu: 'Cabinet du Dr Siham Azerki, Hagetmau (40)',
    doctolibUrl: undefined, // À compléter si Marie a un Doctolib
    rpps: '10101024445',
    parcours: [
      'Inscrite à l’Ordre des Médecins · activité libérale depuis février 2021',
    ],
    conventionnement: undefined,
    // contribution: 'À compléter avec Marie',
    // citation: 'À compléter avec Marie',
  },
];

export default function PageComite() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="section">
        <div className="container">
          <p className="section-kicker">Comité scientifique</p>
          <h1>Garantir la justesse médicale et éthique de tout ce que nous publions.</h1>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Notre comité réunit des médecins, sages-femmes et psychologues qui valident nos contenus, supervisent
            le label des soignants et garantissent que chaque ressource publiée tient face à la littérature et à
            l’éthique du soin. Aucune fiche médicale n’est mise en ligne sans leur revue.
          </p>
        </div>
      </section>

      {/* ─── Trois missions (intentions, pas processus) ─── */}
      <section className="section soft">
        <div className="container">
          <p className="section-kicker">Leur rôle</p>
          <h2>Pourquoi un comité scientifique chez Baby Next Time.</h2>
          <div className="three-columns" style={{ marginTop: 34 }}>
            <article className="feature-card">
              <span className="card-kicker">01</span>
              <h3>Justesse des contenus médicaux</h3>
              <p>
                Pour qu’aucune fiche médicale, ressource ou recommandation publiée sur ce site ne soit
                approximative, dépassée ou hors-cadre des bonnes pratiques.
              </p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">02</span>
              <h3>Cadre éthique du label soignants</h3>
              <p>
                Pour que le label BNT reste exigeant et lisible — et qu’il s’appuie sur le regard de
                praticien·ne·s du terrain, pas seulement sur celui des fondateurs.
              </p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">03</span>
              <h3>Veille collective</h3>
              <p>
                Pour suivre ensemble les évolutions législatives, les recommandations HAS et la littérature
                — afin que ce site reste à jour.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─── Membres ─── */}
      <section className="section">
        <div className="container">
          <p className="section-kicker">Nos premiers membres</p>
          <h2>2 médecins ont rejoint le comité en avril 2026.</h2>
          <p className="section-intro" style={{ maxWidth: 720 }}>
            Le comité s’étoffe progressivement. L’objectif est d’atteindre 6 à 8 membres d’ici fin 2026 :
            généralistes, gynécologues, sages-femmes, psychologues, et au moins un·e juriste en droit de la santé.
          </p>

          <div className="comite-grid" style={{ marginTop: 34 }}>
            {MEMBRES.map((m) => (
              <article className="comite-card" key={m.id} id={m.id}>
                <header className="comite-head">
                  <div className="profile-initials" aria-hidden="true">{m.initiales}</div>
                  <div className="comite-identite">
                    <h3>{m.nom}</h3>
                    <p className="comite-role">{m.role}</p>
                    <p className="comite-lieu">▸ {m.exerciceLieu}</p>
                  </div>
                </header>

                {m.contribution ? (
                  <div className="comite-section">
                    <p className="comite-label">Sa contribution au comité</p>
                    <p>{m.contribution}</p>
                  </div>
                ) : (
                  <div className="comite-section comite-todo">
                    <p className="comite-label">Sa contribution au comité</p>
                    <p>
                      <em>Bio en cours de validation avec l’intéressé·e — publication imminente.</em>
                    </p>
                  </div>
                )}

                {m.citation ? (
                  <blockquote className="profile-quote comite-quote">
                    {m.citation}
                  </blockquote>
                ) : null}

                <div className="comite-section">
                  <p className="comite-label">Parcours public</p>
                  <ul className="comite-parcours">
                    {m.parcours.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  {m.conventionnement ? <p className="comite-meta">{m.conventionnement}</p> : null}
                </div>

                <footer className="comite-footer">
                  {m.rpps ? <span className="comite-meta">RPPS {m.rpps}</span> : null}
                  {m.doctolibUrl ? (
                    <a
                      className="btn secondary"
                      href={m.doctolibUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir sur Doctolib →
                    </a>
                  ) : null}
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cadre en construction (transparence) ─── */}
      <section className="section soft">
        <div className="container">
          <div className="alert-medical">
            <div className="alert-icon" aria-hidden="true">!</div>
            <div>
              <h3>Le cadre de fonctionnement se construit avec les premiers membres.</h3>
              <p>
                Rythme des revues, modalités d’indemnisation, gouvernance, processus de décision : tout cela
                fait l’objet d’une discussion en ce moment même. Nous publierons ici la charte de fonctionnement
                dès qu’elle aura été co-signée par l’ensemble du comité — probablement avant l’été 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Rejoindre ─── */}
      <section className="section">
        <div className="container">
          <div className="card cta-card">
            <div>
              <p className="section-kicker">Vous êtes soignant·e</p>
              <h2>Rejoindre le comité scientifique</h2>
              <p className="section-intro" style={{ maxWidth: 720 }}>
                Nous cherchons des médecins (généralistes, gynécologues), des sages-femmes, des psychologues
                périnatalité, et un·e juriste en droit de la santé. Le rythme et les modalités d’engagement
                sont en cours de définition avec les premiers membres — vous pouvez participer à les écrire.
              </p>
            </div>
            <div className="cta-card-actions">
              <Link className="btn btn-lg" href="/contact?sujet=comite-scientifique">Échanger avec nous</Link>
              <span className="micro">hello@babynexttime.fr</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
