'use client';

import { useMemo, useState } from 'react';
import ogManifest from '../../public/ressources/manifest.json';

// ─── Types ───
type Format = 'podcast' | 'temoignage' | 'guide' | 'fiche' | 'video';
type Pour = 'tous' | 'femmes' | 'partenaires' | 'couples' | 'soignants';
type Moment = 'tous' | 'juste_apres' | 'premieres_semaines' | 'reprise_pro' | 'nouveau_projet';

type Ressource = {
  id: string;
  format: Format;
  pour: Pour;
  moment: Moment;
  titre: string;
  desc: string;
  duree: string;
  auteur?: string;
  accent?: 'peach' | 'sage';
  nouveau?: boolean;
  url?: string;
};

const LABEL_FORMAT: Record<Format, string> = {
  podcast: 'Podcast',
  temoignage: 'Témoignage',
  guide: 'Guide',
  fiche: 'Fiche pratique',
  video: 'Vidéo',
};

// Récupère l'image principale (og:image) d'un lien.
// 1) D'abord, on cherche dans le manifeste pré-généré au build (public/ressources/manifest.json).
// 2) Sinon, fallback runtime : URL directe pour YouTube, API Microlink pour le reste.
const OG_MANIFEST = ogManifest as Record<string, string>;

function getVisualUrl(id: string, url: string | undefined): string | null {
  // 1) Image bundlée localement (via scripts/fetch-og-images.mjs)
  const local = OG_MANIFEST[id];
  if (local) return local;

  // 2) Fallback runtime
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) return `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`;
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&embed=image.url`;
}

const LABEL_POUR: Record<Pour, string> = {
  tous: 'Tout le monde',
  femmes: 'Pour elle',
  partenaires: 'Pour lui',
  couples: 'Pour le couple',
  soignants: 'Soignants',
};

const LABEL_MOMENT: Record<Moment, string> = {
  tous: 'Toutes étapes',
  juste_apres: 'Juste après',
  premieres_semaines: 'Premières semaines',
  reprise_pro: 'Reprise pro',
  nouveau_projet: 'Nouveau projet',
};

// ─── Dataset (ressources réelles, vérifiées sur le web) ───
const RESSOURCES: Ressource[] = [
  // ─── PODCASTS ───
  {
    id: 'pod-au-revoir',
    format: 'podcast',
    pour: 'tous',
    moment: 'tous',
    titre: 'Au Revoir Podcast — portraits de parents endeuillés',
    desc:
      'Sophie de Chivré reçoit, depuis 2020, des parents qui racontent le chemin parcouru depuis la perte de leur bébé. Format long, intime, pudique.',
    duree: 'Épisodes ~40 min',
    auteur: 'Sophie de Chivré · Naître et Vivre',
    url: 'https://naitre-et-vivre.org/aurevoir-podcast-sophie-de-chivre/',
  },
  {
    id: 'pod-fausse-couche-fertilite',
    format: 'podcast',
    pour: 'femmes',
    moment: 'tous',
    titre: 'Fausse couche et Fertilité',
    desc:
      'Linda Conchaudron, spécialiste du deuil périnatal depuis 2015, traite en profondeur tout ce qui se rapporte à la fausse couche et à la conception d’un bébé arc-en-ciel.',
    duree: 'Épisodes 30 à 60 min',
    auteur: 'Linda Conchaudron',
    url: 'https://podcasts.apple.com/fr/podcast/fausse-couche-et-fertilit%C3%A9/id1588420862',
  },
  {
    id: 'pod-oeufs-clos',
    format: 'podcast',
    pour: 'femmes',
    moment: 'tous',
    titre: 'Les œufs clos',
    desc:
      'Témoignages autour du désir d’enfant : fausse couche, PMA, GPA, IMG. Voix multiples, ton documentaire.',
    duree: 'Épisodes 25 à 50 min',
    auteur: 'Les œufs clos',
    url: 'https://podcasts.apple.com/fr/podcast/les-oeufs-clos/id1561576401',
  },
  {
    id: 'pod-dose-psy',
    format: 'podcast',
    pour: 'tous',
    moment: 'tous',
    titre: 'Dose de psy — Deuil périnatal, fausse couche, mortinaissance',
    desc:
      'Dre Janick Coutu, psychologue, reçoit Lory Zéphyr pour aborder le deuil périnatal sans détour. Très clinique, très clair.',
    duree: 'Épisode ~1h',
    auteur: 'Dre Janick Coutu × Lory Zéphyr',
    url: 'https://dosedepsy.captivate.fm/episode/deuil-perinatal-lory-zephyr',
    accent: 'peach',
  },
  {
    id: 'pod-agapa',
    format: 'podcast',
    pour: 'tous',
    moment: 'tous',
    titre: 'Les podcasts AGAPA',
    desc:
      'L’association AGAPA produit une série de podcasts d’écoute et d’accompagnement après une perte périnatale (IVG, IMG, fausse couche, mortinaissance).',
    duree: 'Plusieurs épisodes',
    auteur: 'Association AGAPA',
    url: 'https://www.association-agapa.fr/les-podcasts/',
  },
  {
    id: 'pod-la-gyneco',
    format: 'podcast',
    pour: 'femmes',
    moment: 'tous',
    titre: 'La Gynéco',
    desc:
      'Le podcast aborde des sujets souvent tabous mais essentiels : le deuil périnatal, la place insuffisante accordée aux pertes dans notre société.',
    duree: 'Épisodes ~30 min',
    auteur: 'La Gynéco',
    url: 'https://podcasts.apple.com/fr/podcast/la-gyn%C3%A9co/id1715054736',
  },

  // ─── TÉMOIGNAGES ───
  {
    id: 'tem-oms-lisa',
    format: 'temoignage',
    pour: 'femmes',
    moment: 'premieres_semaines',
    titre: 'L’histoire de Lisa',
    desc:
      'Témoignage publié par l’Organisation Mondiale de la Santé dans sa campagne « Why we need to talk about losing a baby ».',
    duree: 'Lecture 8 min',
    auteur: 'Organisation Mondiale de la Santé',
    url: 'https://www.who.int/fr/news-room/spotlight/why-we-need-to-talk-about-losing-a-baby/lisa-s-story',
  },
  {
    id: 'tem-bliss',
    format: 'temoignage',
    pour: 'femmes',
    moment: 'premieres_semaines',
    titre: 'Fausse couche tardive et deuil périnatal',
    desc:
      'Récit publié sur Bliss Stories — une fausse couche tardive racontée à la première personne, sans détour.',
    duree: 'Lecture 10 min',
    auteur: 'Bliss Stories',
    url: 'https://bliss-stories.fr/blogs/temoignages-grossesse-accouchement-post-partum/temoignage-fausse-couche-tardive-deuil-perinatal',
    accent: 'peach',
  },
  {
    id: 'tem-slate-aquien',
    format: 'temoignage',
    pour: 'femmes',
    moment: 'tous',
    titre: '« Trois mois sous silence » — bonnes feuilles',
    desc:
      'Extrait du livre de Judith Aquien (Payot) : ce qu’on traverse vraiment quand on fait une fausse couche en France. Politique, juste, lumineux.',
    duree: 'Lecture 12 min',
    auteur: 'Judith Aquien · Slate.fr',
    url: 'https://www.slate.fr/story/209162/bonnes-feuilles-trois-mois-sous-silence-judith-aquien-editions-payot-fausse-couche-tabou',
  },
  {
    id: 'tem-slate-hommes',
    format: 'temoignage',
    pour: 'partenaires',
    moment: 'tous',
    titre: 'Quand les hommes ont du mal à exprimer leur tristesse',
    desc:
      'Slate enquête sur la place du partenaire après une fausse couche ou une IMG. Plusieurs témoignages, peu de pathos.',
    duree: 'Lecture 10 min',
    auteur: 'Slate.fr',
    url: 'https://www.slate.fr/story/178950/arret-grossesse-fausse-couche-img-hommes-tristesse-stereotypes-genre',
  },
  {
    id: 'tem-sosbebe-pere',
    format: 'temoignage',
    pour: 'partenaires',
    moment: 'premieres_semaines',
    titre: 'Fausse couche : du côté du père',
    desc:
      'Recueil de témoignages de pères publié par SOS Bébé. Court, sobre, honnête — à mettre entre toutes les mains.',
    duree: 'Lecture 6 min',
    auteur: 'SOS Bébé',
    url: 'https://www.sosbebe.org/grossesse/fausse-couche-du-cote-du-pere/',
  },
  {
    id: 'tem-agapa-chapitre',
    format: 'temoignage',
    pour: 'femmes',
    moment: 'nouveau_projet',
    titre: '« Un nouveau chapitre s’ouvre »',
    desc:
      'Témoignage AGAPA d’une mère qui retrouve l’élan d’un nouveau projet parental après plusieurs pertes. Lent, juste.',
    duree: 'Lecture 7 min',
    auteur: 'Association AGAPA',
    url: 'https://www.association-agapa.fr/temoignages/un-nouveau-chapitre-souvre/',
    accent: 'peach',
  },

  // ─── GUIDES & FICHES PRATIQUES ───
  {
    id: 'fiche-loi-2023',
    format: 'fiche',
    pour: 'tous',
    moment: 'juste_apres',
    titre: 'Loi de 2023 : arrêt maladie sans jour de carence',
    desc:
      'Depuis le 1er janvier 2024, l’arrêt de travail après une fausse couche (avant 22 SA) est indemnisé dès le premier jour, dans le privé comme dans le public.',
    duree: 'Lecture 4 min',
    auteur: 'info.gouv.fr',
    url: 'https://www.info.gouv.fr/actualite/un-arret-maladie-sans-jour-de-carence-pour-les-fausses-couches',
    accent: 'peach',
  },
  {
    id: 'fiche-service-public',
    format: 'fiche',
    pour: 'tous',
    moment: 'juste_apres',
    titre: 'Mesures pour mieux accompagner les femmes après une fausse couche',
    desc:
      'Synthèse Service-Public.gouv.fr : arrêt sans carence, protection contre le licenciement (10 sem.), parcours psy gratuit depuis 09/2024.',
    duree: 'Lecture 5 min',
    auteur: 'Service-Public.gouv.fr',
    url: 'https://www.service-public.gouv.fr/particuliers/actualites/A16676',
  },
  {
    id: 'fiche-droits-salariees',
    format: 'fiche',
    pour: 'femmes',
    moment: 'reprise_pro',
    titre: 'Vos droits en tant que salariée après une fausse couche',
    desc:
      'Arrêt de travail, protection contre le licenciement (entre 14 et 21 SA), accompagnement médico-psy. Tout est expliqué, sourcé sur le Code du travail.',
    duree: 'Lecture 7 min',
    auteur: 'Académie RH',
    url: 'https://www.academie-rh.com/post/fausse-couche-droits-des-salariees-en-matiere-darret-de-travail-et-de-protection-contre-la-rupture-du-contrat',
  },
  {
    id: 'guide-monsoutienpsy',
    format: 'guide',
    pour: 'tous',
    moment: 'premieres_semaines',
    titre: 'MonSoutienPsy : 12 séances remboursées par an',
    desc:
      'Mode d’emploi officiel : 50 € la séance, 60 % remboursés par l’Assurance Maladie, 40 % via mutuelle. Le partenaire peut aussi être orienté.',
    duree: 'Lecture 6 min',
    auteur: 'Ameli.fr',
    url: 'https://www.ameli.fr/assure/remboursements/rembourse/remboursement-seance-psychologue-mon-soutien-psy',
  },
  {
    id: 'guide-ameli-prise-en-charge',
    format: 'guide',
    pour: 'tous',
    moment: 'juste_apres',
    titre: 'Prise en charge médicale d’une fausse couche précoce',
    desc:
      'Référentiel Ameli destiné aux médecins, accessible aux patientes : non-intervention, médicament (misoprostol), aspiration. Forfait dédié.',
    duree: 'Lecture 8 min',
    auteur: 'Ameli.fr',
    url: 'https://www.ameli.fr/medecin/exercice-liberal/prise-charge-situation-type-soin/prises-en-charge-des-fausses-couches-precoces-en-ville',
  },
  {
    id: 'guide-parcours-bretagne',
    format: 'guide',
    pour: 'tous',
    moment: 'tous',
    titre: 'Parcours fausse couche — Réseau Périnatalité Bretagne',
    desc:
      'Référentiel régional détaillé du parcours ISG (interruption spontanée de grossesse). Sert de modèle de ce qu’on peut attendre d’une prise en charge.',
    duree: 'Lecture 15 min',
    auteur: 'Réseau Périnatalité Bretagne',
    url: 'https://perinatalite.bzh/axes-thematiques/accompagnement-psychique-perinatal/parcours-fausse-couche/',
  },
  {
    id: 'guide-caf',
    format: 'guide',
    pour: 'tous',
    moment: 'juste_apres',
    titre: 'CAF · Fausse couche : la comprendre pour mieux agir',
    desc:
      'Article CAF posé et complet : causes, droits, recours, pistes d’accompagnement.',
    duree: 'Lecture 6 min',
    auteur: 'caf.fr',
    url: 'https://www.caf.fr/allocataires/vies-de-famille/articles/fausse-couche-la-comprendre-pour-mieux-agir',
  },

  // ─── VIDÉOS ───
  {
    id: 'video-coucou-girls',
    format: 'video',
    pour: 'femmes',
    moment: 'tous',
    titre: 'Coucou Les Girls : briser le tabou de la fausse couche',
    desc:
      'Juliette Katz raconte sa fausse couche face caméra. Direct, courageux, beaucoup partagé.',
    duree: '12 min',
    auteur: 'Juliette Katz · YouTube',
    url: 'https://www.youtube.com/watch?v=MmldF97Csjw',
  },

  // ─── ASSOCIATIONS ───
  {
    id: 'asso-agapa',
    format: 'guide',
    pour: 'tous',
    moment: 'tous',
    titre: 'AGAPA : écoute et accompagnement',
    desc:
      'Association nationale (~20 antennes) — écoute téléphonique, cafés-rencontres, groupes de parole, accompagnement individuel après IVG, IMG, FC, mortinaissance.',
    duree: 'Ressource permanente',
    auteur: 'Association AGAPA',
    url: 'https://www.association-agapa.fr/ecoute-et-accompagnement/',
    accent: 'sage',
  },
  {
    id: 'asso-petite-emilie',
    format: 'guide',
    pour: 'tous',
    moment: 'tous',
    titre: 'Petite Émilie : familles en deuil périnatal et IMG',
    desc:
      'Association centrée IMG et deuil périnatal : livrets gratuits pour les parents, livres pour enfants, forum modéré, soutien email, formation des soignants.',
    duree: 'Ressource permanente',
    auteur: 'Association Petite Émilie',
    url: 'https://www.petiteemilie.org/articles/94422-petite-emilie-un-engagement-pour-les-familles-en-deuil-perinatal',
    accent: 'sage',
  },
];

export function ResourcesLibrary() {
  const [format, setFormat] = useState<Format | 'tous'>('tous');
  const [pour, setPour] = useState<Pour>('tous');
  const [moment, setMoment] = useState<Moment>('tous');
  const [search, setSearch] = useState('');

  const filtres = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RESSOURCES.filter((r) => {
      if (format !== 'tous' && r.format !== format) return false;
      if (pour !== 'tous' && r.pour !== pour && r.pour !== 'tous') return false;
      if (moment !== 'tous' && r.moment !== moment && r.moment !== 'tous') return false;
      if (q) {
        const hay = `${r.titre} ${r.desc} ${r.auteur ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [format, pour, moment, search]);

  function reinit() {
    setFormat('tous');
    setPour('tous');
    setMoment('tous');
    setSearch('');
  }

  const aFiltreActif = format !== 'tous' || pour !== 'tous' || moment !== 'tous' || search !== '';

  return (
    <div className="ressources-library">
      <div className="label-search">
        <label className="label-search-input">
          <span className="visually-hidden">Recherche dans les ressources</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Rechercher une ressource (titre, sujet, auteur)…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search ? (
            <button
              type="button"
              className="label-search-clear"
              onClick={() => setSearch('')}
              aria-label="Effacer la recherche"
            >
              ×
            </button>
          ) : null}
        </label>
      </div>

      <div className="filters" style={{ marginTop: 18 }}>
        <div className="filter-row">
          <div className="filter-label">Format</div>
          <div className="chips">
            <button type="button" className={`chip${format === 'tous' ? ' is-active' : ''}`} onClick={() => setFormat('tous')}>Tous</button>
            {(Object.keys(LABEL_FORMAT) as Format[]).map((f) => (
              <button
                key={f}
                type="button"
                className={`chip${format === f ? ' is-active' : ''}`}
                onClick={() => setFormat(f)}
              >
                {LABEL_FORMAT[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-label">Pour qui</div>
          <div className="chips">
            {(Object.keys(LABEL_POUR) as Pour[]).map((p) => (
              <button
                key={p}
                type="button"
                className={`chip${pour === p ? ' is-active' : ''}`}
                onClick={() => setPour(p)}
              >
                {LABEL_POUR[p]}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-label">Moment</div>
          <div className="chips">
            {(Object.keys(LABEL_MOMENT) as Moment[]).map((m) => (
              <button
                key={m}
                type="button"
                className={`chip${moment === m ? ' is-active' : ''}`}
                onClick={() => setMoment(m)}
              >
                {LABEL_MOMENT[m]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="label-meta">
        <p>
          <strong>{filtres.length}</strong> {filtres.length > 1 ? 'ressources' : 'ressource'} sur {RESSOURCES.length}
        </p>
        {aFiltreActif ? (
          <button type="button" className="label-reset" onClick={reinit}>
            Réinitialiser les filtres
          </button>
        ) : null}
      </div>

      {filtres.length === 0 ? (
        <div className="label-empty">
          <h3>Aucune ressource ne correspond à ces critères.</h3>
          <p>
            Essayez de relâcher un filtre ou élargir votre recherche. La bibliothèque s’étoffe chaque mois — vous
            pouvez nous suggérer une ressource manquante.
          </p>
          <div className="label-empty-actions">
            <button type="button" className="btn" onClick={reinit}>Voir toutes les ressources</button>
            <a className="btn secondary" href="/contact?sujet=ressource-manquante">Suggérer une ressource</a>
          </div>
        </div>
      ) : (
        <div className="resource-grid" style={{ marginTop: 24 }}>
          {filtres.map((r) => {
            const visual = getVisualUrl(r.id, r.url);
            const inner = (
              <>
                <div
                  className={`res-visual${r.accent ? ` accent-${r.accent}` : ''}`}
                  aria-hidden="true"
                >
                  {visual ? (
                    <img
                      src={visual}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Si l'image ne charge pas, on la cache pour laisser le gradient
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span className="res-visual-tag">{LABEL_FORMAT[r.format]}</span>
                </div>
                <div className="res-content">
                  {r.nouveau ? (
                    <div className="res-head">
                      <span className="res-tag mini peach">Nouveau</span>
                    </div>
                  ) : null}
                  <h3>{r.titre}</h3>
                  <p>{r.desc}</p>
                  {r.auteur ? <p className="res-auteur">▸ {r.auteur}</p> : null}
                  <div className="res-meta">
                    <span>{r.duree}</span>
                    <span>{LABEL_POUR[r.pour]}</span>
                    <span>{LABEL_MOMENT[r.moment]}</span>
                  </div>
                </div>
              </>
            );
            return r.url ? (
              <a className="res-card res-card-link" key={r.id} href={r.url} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <article className="res-card" key={r.id}>
                {inner}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
