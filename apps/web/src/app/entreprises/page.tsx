import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pour les entreprises — Baby Next Time',
  description:
    'Depuis 2024, la loi reconnaît la fausse couche comme un motif d’arrêt sans jour de carence. Aucune entreprise n’est outillée pour accompagner ses salarié·e·s. Nous lançons un programme pilote pour 5 entreprises à la rentrée 2026.',
};

export default function PageEntreprises() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="section">
        <div className="container">
          <p className="section-kicker">Pour les entreprises</p>
          <h1>Accompagner les salarié·e·s qui traversent une fausse couche, sans improviser.</h1>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Depuis le 1er janvier 2024, la loi française reconnaît la fausse couche comme un motif d’arrêt
            de travail sans jour de carence et instaure une protection contre le licenciement. Pourtant,
            la quasi-totalité des entreprises traitent encore ces situations en silence ou de façon
            improvisée — au prix de souffrances évitables et de risques juridiques bien réels.
          </p>
        </div>
      </section>

      {/* ─── Le constat (3 chiffres) ─── */}
      <section className="section soft">
        <div className="container">
          <p className="section-kicker">Le constat</p>
          <h2>Un sujet massif, traité comme s’il était marginal.</h2>

          <div className="three-columns" style={{ marginTop: 34 }}>
            <article className="stat">
              <p className="stat-number">1 sur 4</p>
              <p className="stat-label">
                Grossesses qui se terminent par une fausse couche en France — soit environ 200 000 par an.
              </p>
            </article>
            <article className="stat">
              <p className="stat-number">8 à 15 %</p>
              <p className="stat-label">
                Salariées en âge de procréer touchées chaque année selon les estimations épidémiologiques.
              </p>
            </article>
            <article className="stat">
              <p className="stat-number">~ 0 %</p>
              <p className="stat-label">
                Entreprises françaises disposant d’un protocole RH formel et partagé pour ces situations.
              </p>
            </article>
          </div>

          <p className="micro" style={{ marginTop: 18, color: 'var(--muted)' }}>
            Sources : INSERM, OMS, Service-Public.gouv.fr (loi du 7 juillet 2023).
          </p>
        </div>
      </section>

      {/* ─── Notre vision (3 axes haut niveau) ─── */}
      <section className="section">
        <div className="container">
          <p className="section-kicker">Ce que nous proposons</p>
          <h2>Trois leviers, pensés ensemble avec vos équipes.</h2>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Les modalités exactes (formats, durées, intervenant·e·s, livrables) seront définies avec
            les premières entreprises partenaires. Voici les trois axes que nous voulons couvrir.
          </p>

          <div className="three-columns" style={{ marginTop: 34 }}>
            <article className="feature-card">
              <span className="card-kicker">01</span>
              <h3>Sensibilisation des équipes</h3>
              <p>
                Pour que personne — manager, collègue, RH — ne dise une parole maladroite, ne reste muet par
                gêne, ou ne prenne une décision juridiquement risquée par méconnaissance.
              </p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">02</span>
              <h3>Outils RH concrets</h3>
              <p>
                Pour que la fonction RH dispose de références claires : protocole de prise en charge,
                modèles de communication, droits applicables, rôles de chacun·e.
              </p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">03</span>
              <h3>Accès aux ressources BNT pour les salarié·e·s</h3>
              <p>
                Pour que les personnes concernées accèdent — sans démarche RH, sans révélation forcée — à
                notre bibliothèque, à nos parcours et à nos soignant·e·s labellisé·e·s.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─── Pourquoi maintenant ─── */}
      <section className="section soft">
        <div className="container">
          <div className="card">
            <p className="section-kicker">Pourquoi maintenant</p>
            <h2>Le cadre légal a changé. Les protocoles internes, pas encore.</h2>
            <p style={{ maxWidth: 820, marginTop: 16 }}>
              La loi du 7 juillet 2023 (entrée en vigueur en janvier 2024) a transformé la fausse couche en
              événement reconnu par le Code du travail. Concrètement, votre entreprise est désormais tenue
              d’indemniser un arrêt sans jour de carence, et vous ne pouvez pas licencier une salariée
              entre 14 et 21 SA d’aménorrhée en cas d’interruption spontanée. La majorité des managers et
              des RH ignorent encore ces dispositions — ce qui expose à la fois la salariée et l’entreprise.
            </p>
            <p style={{ maxWidth: 820, marginTop: 12 }}>
              Le sujet va devenir un standard QVT dans les 3 prochaines années, comme l’est devenu le
              burn-out. Les entreprises qui s’y prennent dès maintenant construiront une marque employeur
              solide et éviteront les contentieux à venir.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Programme pilote ─── */}
      <section className="section">
        <div className="container">
          <p className="section-kicker">Programme pilote rentrée 2026</p>
          <h2>5 entreprises pilotes pour co-construire l’offre BNT.</h2>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Plutôt que de vous vendre un produit standardisé, nous ouvrons cinq places à des entreprises
            qui veulent être les premières à s’outiller — et qui acceptent d’écrire avec nous le cadre
            (modules, formats, indicateurs, tarification) qui servira ensuite à toutes les autres.
          </p>

          <div className="entreprises-pilote">
            <article className="pilote-side">
              <h3>Ce que nous apportons</h3>
              <ul className="pilote-list">
                <li>Un référent BNT dédié pour la durée du pilote (septembre 2026 — janvier 2027).</li>
                <li>Un état des lieux RH de votre entreprise sur le sujet (audit doc + entretiens).</li>
                <li>La co-construction des trois leviers (sensibilisation, outils RH, accès salarié·e·s).</li>
                <li>Un déploiement test sur un périmètre que vous choisissez (BU, site, équipe).</li>
                <li>Une évaluation finale partagée publiquement (avec votre accord).</li>
              </ul>
            </article>
            <article className="pilote-side">
              <h3>Ce que nous attendons de vous</h3>
              <ul className="pilote-list">
                <li>Un·e référent·e RH ou QVT identifié·e, mobilisable ~3 h / mois sur 5 mois.</li>
                <li>Un sponsor au CODIR ou au CSE qui porte le sujet en interne.</li>
                <li>Un retour d’expérience structuré à mi-parcours et en fin de pilote.</li>
                <li>L’autorisation de citer votre entreprise (logo + verbatim) après le pilote — facultatif.</li>
              </ul>
            </article>
          </div>

          <div className="alert-medical" style={{ marginTop: 28 }}>
            <div className="alert-icon" aria-hidden="true">!</div>
            <div>
              <h3>La tarification du pilote sera définie avec les entreprises retenues.</h3>
              <p>
                Notre objectif est que le pilote soit accessible (y compris à des PME) et qu’il rémunère
                honnêtement le travail des intervenant·e·s. Les modalités précises (forfait, paiement
                conditionnel à la satisfaction, etc.) seront discutées lors du premier rendez-vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ courte ─── */}
      <section className="section soft">
        <div className="container">
          <p className="section-kicker">Questions fréquentes</p>
          <h2>Ce que les DRH nous demandent en premier.</h2>

          <div className="faq" style={{ marginTop: 28 }}>
            <details className="faq-item">
              <summary>Comment garantissez-vous la confidentialité des salarié·e·s concerné·e·s ?</summary>
              <p>
                Aucune donnée nominative de salarié·e ne transite par votre entreprise via BNT. Les
                personnes accèdent à nos ressources via un lien anonyme (ou un code) — vous ne savez
                jamais qui consulte quoi. Côté RGPD, BNT est responsable de traitement et signe un avenant
                spécifique avec votre DPO.
              </p>
            </details>
            <details className="faq-item">
              <summary>À combien de salarié·e·s s’adresse votre offre ?</summary>
              <p>
                Pour le pilote, nous recherchons des entreprises de tous formats : PME (50-250),
                ETI (250-5 000) et grands groupes. Plusieurs profils nous permettront d’adapter
                l’offre finale à différentes échelles. Les structures de moins de 50 personnes
                sont également les bienvenues, tant qu’il existe une fonction RH identifiée.
              </p>
            </details>
            <details className="faq-item">
              <summary>Pourquoi votre offre n’est-elle pas plus précise ?</summary>
              <p>
                Parce que nous refusons de vendre un produit que nous n’avons pas encore co-conçu avec des
                praticien·ne·s du terrain. Une offre trop figée à ce stade trahirait notre méthode :
                construire avec, pas pour.
              </p>
            </details>
            <details className="faq-item">
              <summary>Qui anime concrètement les interventions ?</summary>
              <p>
                Une équipe pluridisciplinaire (médecins, sages-femmes, psychologues périnatalité) issue
                de notre comité scientifique et de notre réseau de soignant·e·s labellisé·e·s. Tous les
                intervenant·e·s sont diplômé·e·s, supervisé·e·s et rémunéré·e·s.
              </p>
            </details>
            <details className="faq-item">
              <summary>Quel est le calendrier ?</summary>
              <p>
                Candidatures ouvertes jusqu’au 30 juin 2026. Sélection en juillet. Lancement du pilote
                début septembre 2026. Restitution finale en janvier 2027.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ─── CTA final ─── */}
      <section className="section">
        <div className="container">
          <div className="card cta-card">
            <div>
              <p className="section-kicker">Vous êtes DRH, RSE, QVT, dirigeant·e</p>
              <h2>Candidater au programme pilote</h2>
              <p className="section-intro" style={{ maxWidth: 720 }}>
                5 places ouvertes. Premier rendez-vous en visio (45 min) pour vérifier l’adéquation
                réciproque. Aucun engagement avant.
              </p>
            </div>
            <div className="cta-card-actions">
              <Link className="btn btn-lg" href="/contact?sujet=entreprise-pilote">
                Candidater
              </Link>
              <span className="micro">hello@babynexttime.fr</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
