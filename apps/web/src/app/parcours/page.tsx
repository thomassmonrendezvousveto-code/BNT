import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parcours de soin — Baby Next Time',
  description:
    'Six étapes pensées de bout en bout, à partir du diagnostic de fausse couche jusqu’à un éventuel nouveau projet parental. Coûts, durées, modalités et inscription pour chaque étape.',
};

type Etape = {
  code: string;
  when: string;
  titre: string;
  soignant: string;
  desc: string;
  kpi: string;
  cout: string;
  coutDetail?: string;
  duree: string;
  modalites: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaSecondaireLabel?: string;
  ctaSecondaireHref?: string;
};

const etapes: Etape[] = [
  {
    code: 'S0',
    when: 'Dans la semaine qui suit le diagnostic',
    titre: 'Premier contact post-diagnostic',
    soignant: 'Sage-femme d’accueil BNT',
    desc:
      'Appel gratuit de 30 min dans la semaine qui suit le diagnostic. Écoute. Remise d’un guide papier « Les 4 premières semaines ». Orientation vers un·e soignant·e labellisé·e selon votre demande.',
    kpi: 'Délai moyen < 48 h',
    cout: 'Gratuit',
    coutDetail: 'Pris en charge par BNT et nos partenaires',
    duree: '1 appel de 30 min',
    modalites: ['Téléphone', 'Visio'],
    ctaLabel: 'Demander mon appel d’accueil',
    ctaHref: '/contact?sujet=accueil-s0',
  },
  {
    code: 'S1',
    when: 'J+7 à J+30',
    titre: 'Consultation médicale',
    soignant: 'Gynécologue ou sage-femme labellisé·e',
    desc:
      'Rendez-vous présentiel : vérification physiologique, explications de causes probables, prescription d’un arrêt si nécessaire, orientation psy.',
    kpi: 'Tarif conventionné · zéro avance de frais possible',
    cout: 'Remboursé à 100 %',
    coutDetail: 'Secteur 1 — carte Vitale + mutuelle',
    duree: '1 RDV de 30 à 45 min',
    modalites: ['Cabinet', 'Hospitalier'],
    ctaLabel: 'Trouver un·e gynéco labellisé·e',
    ctaHref: '/label?profession=gynecologue',
    ctaSecondaireLabel: 'Trouver une sage-femme',
    ctaSecondaireHref: '/label?profession=sage_femme',
  },
  {
    code: 'S2',
    when: 'M+1 à M+3',
    titre: 'Suivi psychologique individuel',
    soignant: 'Psychologue clinicien·ne périnatalité',
    desc:
      '3 à 8 séances individuelles. Travail sur la culpabilité, le lien au bébé perdu, la place du partenaire, la reprise professionnelle.',
    kpi: '50 % remboursable via MonSoutienPsy (Assurance Maladie)',
    cout: '0 à 60 € / séance',
    coutDetail: 'Dispositif MonSoutienPsy : 12 séances remboursées 50 %',
    duree: '3 à 8 séances de 50 min (sur 8 à 12 sem.)',
    modalites: ['Cabinet', 'Visio'],
    ctaLabel: 'Trouver un·e psy labellisé·e',
    ctaHref: '/label?profession=psychologue',
    ctaSecondaireLabel: 'Lire le mode d’emploi MonSoutienPsy',
    ctaSecondaireHref: '/ressources?format=guide',
  },
  {
    code: 'S3',
    when: 'M+2 à M+5',
    titre: 'Groupe de parole',
    soignant: 'Psychologue BNT + 6 participantes',
    desc:
      '6 séances de 90 min, en visio, toutes les 2 semaines. Groupe fermé. Thèmes : la culpabilité, le couple, l’entourage, la mémoire du bébé, la reprise, la projection.',
    kpi: '≥ 85 % de participation sur 6 séances',
    cout: '90 €',
    coutDetail: 'Pour les 6 séances · participation symbolique, ajustable',
    duree: '6 × 90 min sur 12 semaines',
    modalites: ['Visio', 'Groupe fermé de 6'],
    ctaLabel: 'M’inscrire au prochain groupe',
    ctaHref: '/groupes',
    ctaSecondaireLabel: 'Voir le calendrier 2026',
    ctaSecondaireHref: '/groupes#calendrier',
  },
  {
    code: 'S4',
    when: 'M+3 à M+6',
    titre: 'Accompagnement couple',
    soignant: 'Thérapeute de couple formé·e au deuil périnatal',
    desc:
      '2 à 4 séances à deux. Travail sur la communication, le rythme différent du deuil chez chaque partenaire, la sexualité, le projet parental.',
    kpi: 'Optionnel · proposé à 100 % des couples',
    cout: '70 à 100 € / séance',
    coutDetail: 'Souvent partiellement remboursé par les mutuelles',
    duree: '2 à 4 séances de 60 à 90 min',
    modalites: ['Cabinet', 'Visio'],
    ctaLabel: 'Demander une orientation couple',
    ctaHref: '/contact?sujet=therapie-couple',
    ctaSecondaireLabel: 'Lire le guide « Traverser à deux »',
    ctaSecondaireHref: '/ressources?format=guide&pour=couples',
  },
  {
    code: 'S5',
    when: 'M+6 à M+9',
    titre: 'Préparation à la grossesse suivante',
    soignant: 'Sage-femme BNT + psy en supervision',
    desc:
      'Ateliers prénatal+ : anxiété de grossesse, plan de naissance rassurant, rôle du partenaire, gestion des écho de contrôle. Mini-groupes de 4.',
    kpi: 'Réduction mesurée de l’anxiété (échelle PASS −30 %)',
    cout: '120 €',
    coutDetail: 'Pour les 4 ateliers · gratuit pour la cohorte pilote 2026',
    duree: '4 ateliers de 90 min sur 6 semaines',
    modalites: ['Visio', 'Mini-groupe de 4'],
    ctaLabel: 'Candidater à la cohorte « Après »',
    ctaHref: '/cohorte',
    ctaSecondaireLabel: 'Lire la fiche « Préparer une nouvelle grossesse »',
    ctaSecondaireHref: '/ressources?format=fiche&moment=nouveau_projet',
  },
];

export default function PageParcours() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="section-kicker">Parcours de soin</p>
          <h1>Un parcours clair, pensé de bout en bout.</h1>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Six étapes, à partir des jours qui suivent le diagnostic jusqu’à un éventuel nouveau projet parental.
            Chaque étape est optionnelle — vous choisissez où entrer, où vous arrêter, où reprendre plus tard.
          </p>

          <div className="parcours-entry-block">
            <p className="section-kicker">Comment commencer</p>
            <h2>Deux façons d’entrer dans le parcours.</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 720 }}>
              Selon le moment où vous nous rejoignez, choisissez l’une ou l’autre. Les deux mènent au même
              accompagnement personnalisé.
            </p>
            <div className="parcours-entry-grid">
              <Link className="parcours-entry-card primary" href="/questionnaire">
                <span className="parcours-entry-kicker">Recommandé</span>
                <h3>Commencer le questionnaire</h3>
                <p>5 minutes pour identifier le bon point d’entrée et recevoir un kit personnalisé.</p>
                <span className="parcours-entry-cta">Lancer le questionnaire →</span>
              </Link>
              <Link className="parcours-entry-card" href="/je-viens-de-vivre">
                <span className="parcours-entry-kicker">Vous venez de vivre une fausse couche</span>
                <h3>Accéder directement aux premiers repères</h3>
                <p>Les prochaines heures, les messages utiles, vos droits — sans passer par le questionnaire.</p>
                <span className="parcours-entry-cta">Voir les repères immédiats →</span>
              </Link>
            </div>
          </div>

          <div className="parcours-legend" style={{ marginTop: 24 }}>
            <div className="legend-item">
              <span className="legend-pill peach">Coût</span>
              <span>De gratuit à payant. Précisé pour chaque étape.</span>
            </div>
            <div className="legend-item">
              <span className="legend-pill sage">Durée</span>
              <span>Temps total estimé pour cette étape.</span>
            </div>
            <div className="legend-item">
              <span className="legend-pill ink">Modalités</span>
              <span>Cabinet, visio, groupe, téléphone — au choix.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="parcours-list">
            {etapes.map((e, i) => (
              <article className="parcours-card parcours-card-rich" key={e.code} id={e.code.toLowerCase()}>
                <div className="parcours-tag">
                  <strong>{e.code}</strong>
                  <span>{e.when}</span>
                </div>
                <div className="parcours-body">
                  <h3>{i + 1}. {e.titre}</h3>
                  <p className="parcours-soignant">▸ {e.soignant}</p>
                  <p>{e.desc}</p>

                  <dl className="parcours-details">
                    <div className="parcours-detail">
                      <dt>Coût</dt>
                      <dd>
                        <strong>{e.cout}</strong>
                        {e.coutDetail ? <span>{e.coutDetail}</span> : null}
                      </dd>
                    </div>
                    <div className="parcours-detail">
                      <dt>Durée</dt>
                      <dd>
                        <strong>{e.duree}</strong>
                      </dd>
                    </div>
                    <div className="parcours-detail">
                      <dt>Modalités</dt>
                      <dd>
                        {e.modalites.map((m) => (
                          <span className="chip mini" key={m}>{m}</span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  <div className="parcours-actions">
                    <Link className="btn" href={e.ctaHref}>{e.ctaLabel}</Link>
                    {e.ctaSecondaireLabel && e.ctaSecondaireHref ? (
                      <Link className="btn secondary" href={e.ctaSecondaireHref}>{e.ctaSecondaireLabel}</Link>
                    ) : null}
                  </div>
                </div>
                <div className="parcours-kpi">
                  <span className="kicker">Indicateur</span>
                  <p>{e.kpi}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="three-columns">
            <Link href="/label" className="feature-card link-card">
              <span className="card-kicker">Pour démarrer S1 / S2</span>
              <h3>Trouver un·e soignant·e</h3>
              <p>Annuaire des soignant·e·s labellisé·e·s, filtrable par ville et profession.</p>
              <span className="card-cta">Voir l’annuaire →</span>
            </Link>
            <Link href="/groupes" className="feature-card link-card">
              <span className="card-kicker">Pour démarrer S3</span>
              <h3>Groupes de parole</h3>
              <p>Cohortes ouvertes. La prochaine commence en septembre 2026.</p>
              <span className="card-cta">Voir les groupes →</span>
            </Link>
            <Link href="/cohorte" className="feature-card link-card">
              <span className="card-kicker">Cohorte pilote</span>
              <h3>Candidater à la cohorte « Après »</h3>
              <p>6 places, septembre-novembre 2026. Participation symbolique de 39 € remboursée.</p>
              <span className="card-cta">Postuler →</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
