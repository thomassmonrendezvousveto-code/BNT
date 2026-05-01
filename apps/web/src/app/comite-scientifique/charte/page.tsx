import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charte du comité scientifique — Baby Next Time',
  description:
    'Mission, composition, indépendance, rythme, indemnisation, gouvernance, conflits d’intérêts : le cadre de fonctionnement du comité scientifique de Baby Next Time, public et opposable.',
};

type Article = {
  id: string;
  numero: string;
  titre: string;
  paragraphes: string[];
  bullets?: string[];
};

const ARTICLES: Article[] = [
  {
    id: 'mission',
    numero: 'Article 1',
    titre: 'Mission',
    paragraphes: [
      'Le comité scientifique de Baby Next Time (ci-après « le comité ») a pour mission de garantir la justesse médicale et éthique de tout ce que BNT publie ou propose à ses utilisatrices et utilisateurs : ressources, fiches médicales, kits personnalisés, référentiel du label des soignant·e·s, communications publiques.',
      'Le comité ne se substitue pas aux institutions sanitaires (HAS, ANSM, CNGOF, Ordre des médecins). Il s’appuie sur leurs recommandations et signale les écarts éventuels.',
    ],
  },
  {
    id: 'composition',
    numero: 'Article 2',
    titre: 'Composition cible et indépendance',
    paragraphes: [
      'Le comité vise une composition stable de 6 à 8 membres, représentant la diversité des disciplines impliquées dans l’accompagnement après une fausse couche :',
    ],
    bullets: [
      'Au moins un·e médecin généraliste',
      'Au moins un·e gynécologue ou obstétricien·ne',
      'Au moins un·e sage-femme',
      'Au moins un·e psychologue clinicien·ne formé·e à la périnatalité',
      'Au moins un·e juriste en droit de la santé',
      'Une représentation, autant que possible, des territoires (urbain / rural / outre-mer) et des modes d’exercice (libéral / hospitalier / centre de santé)',
    ],
  },
  {
    id: 'independance',
    numero: 'Article 3',
    titre: 'Indépendance vis-à-vis de BNT',
    paragraphes: [
      'Aucun membre du comité ne détient de participation au capital de BNT, ni n’en perçoit de rémunération hors des indemnisations prévues à l’Article 5.',
      'Les fondateurs (Thomas Savey, Chloé Azpiazu) participent aux séances comme invité·e·s permanent·e·s mais ne disposent pas du droit de vote sur les avis médicaux et éthiques.',
      'Le comité peut auditionner toute personne extérieure utile à ses travaux (autres soignant·e·s, juristes, patientes, associations).',
    ],
  },
  {
    id: 'rythme',
    numero: 'Article 4',
    titre: 'Rythme et modalités de travail',
    paragraphes: [
      'Le comité se réunit en session plénière 4 fois par an, en visio-conférence (séances de 90 minutes), avec un ordre du jour communiqué 7 jours à l’avance.',
      'Entre les sessions plénières, le comité peut être consulté de manière asynchrone par voie écrite (mail ou plateforme dédiée) sur des contenus urgents — par exemple lors d’une mise à jour de recommandation HAS qui appelle une révision rapide d’une fiche.',
      'Le compte-rendu de chaque session est rédigé par un·e membre désigné·e à tour de rôle, validé par les autres membres dans les 14 jours, et publié dans une version anonymisée sur cette page sous 30 jours.',
    ],
  },
  {
    id: 'indemnisation',
    numero: 'Article 5',
    titre: 'Indemnisation',
    paragraphes: [
      'Chaque membre du comité reçoit une indemnisation forfaitaire de 80 € HT par heure de travail effectif (sessions plénières, revues asynchrones documentées, rédaction de compte-rendu).',
      'Les frais de déplacement sont remboursés sur justificatif si une session présentielle est organisée (rare, sur volontariat).',
      'Les contributions ponctuelles à la communication publique de BNT (interview, signature d’une tribune, intervention en webinaire) ne donnent pas lieu à rémunération supplémentaire — elles relèvent de l’engagement de chaque membre.',
    ],
  },
  {
    id: 'gouvernance',
    numero: 'Article 6',
    titre: 'Gouvernance et processus de décision',
    paragraphes: [
      'Le comité fonctionne au consensus sur les questions de fond. En cas de désaccord persistant après une seconde lecture, la décision est prise à la majorité des deux tiers des membres présents.',
      'Sur les contenus médicaux publiés sur le site, chaque membre dispose d’un droit de veto motivé. Un veto entraîne le retrait immédiat du contenu jusqu’à révision.',
      'La présidence du comité est assurée à tour de rôle pour des mandats d’un an. Le ou la président·e est garant·e du respect de la charte et de la qualité des comptes-rendus.',
    ],
  },
  {
    id: 'conflits',
    numero: 'Article 7',
    titre: 'Conflits d’intérêts',
    paragraphes: [
      'Chaque membre remplit, à son entrée au comité puis annuellement, une déclaration publique de liens d’intérêts (DPI) couvrant : participations à des laboratoires, financements de recherche, mandats associatifs, conventions avec l’industrie pharmaceutique ou les groupes de cliniques.',
      'Les DPI sont publiées sur la fiche personnelle de chaque membre.',
      'En cas de lien d’intérêts avec un sujet à l’ordre du jour, le ou la membre concerné·e se retire de la décision et le compte-rendu en fait mention explicite.',
    ],
  },
  {
    id: 'confidentialite',
    numero: 'Article 8',
    titre: 'Confidentialité et données',
    paragraphes: [
      'Les discussions internes au comité sont confidentielles jusqu’à publication officielle de leurs conclusions. Les membres s’engagent à ne pas commenter publiquement les positions des autres membres exprimées en séance.',
      'Aucune donnée nominative d’utilisatrice de BNT n’est jamais partagée au comité. Si une donnée est utile à une discussion, elle est systématiquement anonymisée et agrégée.',
    ],
  },
  {
    id: 'evolution',
    numero: 'Article 9',
    titre: 'Évolution de la charte',
    paragraphes: [
      'La charte est révisée annuellement, à l’occasion de la première session plénière de l’année.',
      'Toute modification doit être adoptée à la majorité des deux tiers des membres en exercice et signée par chaque membre.',
      'Les versions précédentes restent consultables — l’historique est public.',
    ],
  },
  {
    id: 'departure',
    numero: 'Article 10',
    titre: 'Entrée et sortie du comité',
    paragraphes: [
      'Un nouveau membre est coopté à l’unanimité du comité actuel après audition par au moins deux membres en exercice.',
      'Tout membre peut quitter le comité à tout moment, sur simple notification écrite. Sa fiche reste consultable pendant 6 mois sous une mention « ancien·ne membre — période [début–fin] ».',
      'Le comité peut également, à l’unanimité moins une voix, mettre fin au mandat d’un·e membre en cas de manquement caractérisé à la présente charte.',
    ],
  },
];

export default function PageCharte() {
  const adoptee = '14 mai 2026';
  const version = '1.0';

  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: 880 }}>
          <p className="section-kicker">Comité scientifique</p>
          <h1>Charte de fonctionnement</h1>
          <p className="section-intro">
            Le cadre que se donne le comité scientifique de Baby Next Time. Public, opposable, révisable
            chaque année. Cette charte engage à la fois ses membres et BNT.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginTop: 14 }}>
            Version {version} — adoptée le {adoptee}. <Link href="/comite-scientifique">Retour à la page du comité →</Link>
          </p>
        </div>
      </section>

      <section className="section soft">
        <div className="container" style={{ maxWidth: 880 }}>
          <p className="section-kicker">Sommaire</p>
          <h2>Les 10 articles de la charte.</h2>
          <ol className="charte-toc">
            {ARTICLES.map((a) => (
              <li key={a.id}>
                <a href={`#${a.id}`}>
                  <span>{a.numero}</span>
                  <span>{a.titre}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          {ARTICLES.map((article) => (
            <article key={article.id} id={article.id} className="charte-article">
              <p className="section-kicker">{article.numero}</p>
              <h2>{article.titre}</h2>
              {article.paragraphes.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {article.bullets ? (
                <ul className="charte-list">
                  {article.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section soft">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="card">
            <p className="section-kicker">Adoption</p>
            <h2>Cette charte est en cours de signature.</h2>
            <p>
              La présente charte (version {version}) a été rédigée par les fondateurs de BNT et est
              actuellement soumise à la lecture des deux premiers membres du comité.
              Sa signature formelle est prévue lors de la première session plénière du comité, en {adoptee}.
              Toute remarque ou proposition de modification est bienvenue à
              {' '}
              <a href="mailto:hello@babynexttime.fr?subject=Charte%20du%20comité%20scientifique">
                hello@babynexttime.fr
              </a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
