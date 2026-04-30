'use client';

import { useMemo, useState } from 'react';

// ─── Types ───
type Profession = 'sage_femme' | 'psychologue' | 'gynecologue';
type Modalite = 'visio' | 'cabinet' | 'domicile' | 'hospitalier';
type Statut = 'labellise' | 'candidat';

type Soignant = {
  id: string;
  nom: string;
  profession: Profession;
  ville: string;
  departement: string;
  desc: string;
  mentionBio: string;
  modalites: Modalite[];
  doctolibUrl: string;
  statut: Statut;
  nouveau?: boolean;
};

// ─── Labels FR ───
const LABEL_PROFESSION: Record<Profession, string> = {
  sage_femme: 'Sage-femme',
  psychologue: 'Psychologue',
  gynecologue: 'Gynécologue',
};

const LABEL_MODALITE: Record<Modalite, string> = {
  visio: 'Visio',
  cabinet: 'Cabinet',
  domicile: 'Domicile',
  hospitalier: 'Hospitalier',
};

// ─── Périmètre pilote : département 64 ───
const VILLES = ['Bayonne', 'Anglet', 'Biarritz', 'Saint-Jean-de-Luz'];

// ─── Dataset (profils Doctolib réels — bio publique mentionnant périnatalité / deuil / fausse couche) ───
const SOIGNANTS: Soignant[] = [
  {
    id: 'quihillalt',
    nom: 'Maylis Quihillalt',
    profession: 'psychologue',
    ville: 'Bayonne',
    departement: 'Pyrénées-Atlantiques (64)',
    desc:
      'Psychologue clinicienne formée à la périnatalité. Reçoit pour la fausse couche, le deuil périnatal, la transition à la parentalité et la dépression du post-partum.',
    mentionBio:
      '« J’ai beaucoup étudié le champ de la périnatalité et peux vous accueillir pour des questions relevant de la fausse couche, du deuil périnatal et de la dépression du post-partum. »',
    modalites: ['cabinet'],
    doctolibUrl: 'https://www.doctolib.fr/psychologue/bayonne/maylis-quihillalt',
    statut: 'candidat',
  },
  {
    id: 'ben-kraiem',
    nom: 'Dr Yasmine Ben Kraiem',
    profession: 'gynecologue',
    ville: 'Bayonne',
    departement: 'Pyrénées-Atlantiques (64)',
    desc:
      'Gynécologue médicale spécialisée en endocrinologie gynécologique et suivi des fausses couches à répétition (bilan étiologique, accompagnement préconception).',
    mentionBio:
      '« Spécialisée en endocrinologie gynécologique, suivi des fausses couches à répétition. »',
    modalites: ['cabinet'],
    doctolibUrl: 'https://www.doctolib.fr/gynecologue-medicale/bayonne/yasmine-ben-kraiem-biarritz',
    statut: 'candidat',
  },
  {
    id: 'monsegu',
    nom: 'Carine Monségu',
    profession: 'sage_femme',
    ville: 'Anglet',
    departement: 'Pyrénées-Atlantiques (64)',
    desc:
      'Sage-femme libérale. Formation en deuil périnatal (Tulle, 2016). Accompagnement personnalisé : grossesse, retour à la maison après une fausse couche ou un deuil.',
    mentionBio:
      '« Formation en deuil périnatal — Tulle 2016. Accompagnement avec douceur, bienveillance et écoute. »',
    modalites: ['cabinet'],
    doctolibUrl: 'https://www.doctolib.fr/sage-femme/anglet/carine-monsegu',
    statut: 'candidat',
  },
  {
    id: 'lebreton',
    nom: 'Julie Lebreton',
    profession: 'psychologue',
    ville: 'Anglet',
    departement: 'Pyrénées-Atlantiques (64)',
    desc:
      'Psychologue clinicienne. Spécialisée en psychotraumatologie, périnatalité, parentalité, victimologie. Approche intégrative et humaniste.',
    mentionBio:
      '« Spécialisée en psychotraumatologie, parentalité, développement de l’enfant, adolescent, victimologie, périnatalité. »',
    modalites: ['cabinet'],
    doctolibUrl: 'https://www.doctolib.fr/psychologue/saint-pierre-d-irube/julie-lebreton-saint-pierre-d-irube',
    statut: 'candidat',
  },
];

function getInitiales(nom: string): string {
  return nom
    .replace(/^(Dr|M\.|Mme)\s+/i, '')
    .split(/\s+/)
    .map((m) => m[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function LabelDirectory() {
  const [profession, setProfession] = useState<Profession | 'toutes'>('toutes');
  const [modalite, setModalite] = useState<Modalite | 'toutes'>('toutes');
  const [ville, setVille] = useState<string>('toutes');
  const [search, setSearch] = useState('');

  const filtres = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SOIGNANTS.filter((s) => {
      if (profession !== 'toutes' && s.profession !== profession) return false;
      if (modalite !== 'toutes' && !s.modalites.includes(modalite)) return false;
      if (ville !== 'toutes' && s.ville !== ville) return false;
      if (q) {
        const hay = `${s.nom} ${s.ville} ${s.desc}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => a.ville.localeCompare(b.ville, 'fr'));
  }, [profession, modalite, ville, search]);

  function reinit() {
    setProfession('toutes');
    setModalite('toutes');
    setVille('toutes');
    setSearch('');
  }

  const aFiltreActif =
    profession !== 'toutes' || modalite !== 'toutes' || ville !== 'toutes' || search !== '';

  return (
    <div className="label-directory">
      <div className="pilot-banner">
        <span className="pilot-tag">Phase pilote — 64</span>
        <p>
          L’annuaire démarre dans les <strong>Pyrénées-Atlantiques (64)</strong> — Bayonne, Anglet, Biarritz, Saint-Jean-de-Luz.
          Nous ne référençons que les soignant·e·s dont la <strong>bio Doctolib publique mentionne explicitement</strong> la périnatalité,
          le deuil périnatal ou la fausse couche. Ces profils sont actuellement <strong>candidat·e·s à la labellisation</strong> Baby Next Time
          (audit charte + entretien en cours). Les autres départements arrivent au fil des candidatures.
        </p>
      </div>

      <div className="label-search" style={{ marginTop: 24 }}>
        <label className="label-search-input">
          <span className="visually-hidden">Recherche par nom ou spécialité</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Rechercher par nom, ville ou spécialité…"
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
          <div className="filter-label">Profession</div>
          <div className="chips">
            <button
              type="button"
              className={`chip${profession === 'toutes' ? ' is-active' : ''}`}
              onClick={() => setProfession('toutes')}
            >
              Toutes
            </button>
            <button
              type="button"
              className={`chip${profession === 'sage_femme' ? ' is-active' : ''}`}
              onClick={() => setProfession('sage_femme')}
            >
              Sage-femme
            </button>
            <button
              type="button"
              className={`chip${profession === 'psychologue' ? ' is-active' : ''}`}
              onClick={() => setProfession('psychologue')}
            >
              Psychologue
            </button>
            <button
              type="button"
              className={`chip${profession === 'gynecologue' ? ' is-active' : ''}`}
              onClick={() => setProfession('gynecologue')}
            >
              Gynécologue
            </button>
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-label">Modalité</div>
          <div className="chips">
            <button
              type="button"
              className={`chip${modalite === 'toutes' ? ' is-active' : ''}`}
              onClick={() => setModalite('toutes')}
            >
              Toutes
            </button>
            <button
              type="button"
              className={`chip${modalite === 'visio' ? ' is-active' : ''}`}
              onClick={() => setModalite('visio')}
            >
              Visio
            </button>
            <button
              type="button"
              className={`chip${modalite === 'cabinet' ? ' is-active' : ''}`}
              onClick={() => setModalite('cabinet')}
            >
              Cabinet
            </button>
            <button
              type="button"
              className={`chip${modalite === 'domicile' ? ' is-active' : ''}`}
              onClick={() => setModalite('domicile')}
            >
              Domicile
            </button>
            <button
              type="button"
              className={`chip${modalite === 'hospitalier' ? ' is-active' : ''}`}
              onClick={() => setModalite('hospitalier')}
            >
              Hospitalier
            </button>
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-label">Ville</div>
          <div className="chips">
            <button
              type="button"
              className={`chip${ville === 'toutes' ? ' is-active' : ''}`}
              onClick={() => setVille('toutes')}
            >
              Toutes
            </button>
            {VILLES.map((v) => (
              <button
                key={v}
                type="button"
                className={`chip${ville === v ? ' is-active' : ''}`}
                onClick={() => setVille(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="label-meta">
        <p>
          <strong>{filtres.length}</strong> {filtres.length > 1 ? 'profils' : 'profil'} sur {SOIGNANTS.length} dans
          l’annuaire pilote 64
        </p>
        {aFiltreActif ? (
          <button type="button" className="label-reset" onClick={reinit}>
            Réinitialiser les filtres
          </button>
        ) : null}
      </div>

      {filtres.length === 0 ? (
        <div className="label-empty">
          <h3>Aucun profil ne correspond à ces critères.</h3>
          <p>
            L’annuaire pilote 64 contient <strong>{SOIGNANTS.length} profils vérifiés</strong> pour l’instant. Élargissez
            les filtres, ou écrivez-nous : nous orientons à la main vers d’autres soignant·e·s du Pays Basque.
          </p>
          <div className="label-empty-actions">
            <button type="button" className="btn" onClick={reinit}>
              Voir tous les profils
            </button>
            <a className="btn secondary" href="/contact?sujet=label-aucun-resultat">
              Nous écrire pour être orientée
            </a>
          </div>
        </div>
      ) : (
        <div className="label-list" style={{ marginTop: 24 }}>
          {filtres.map((s) => (
            <article className="profile-card profile-card-rich" key={s.id}>
              <div className="profile-photo profile-initials" aria-hidden="true">
                {getInitiales(s.nom)}
              </div>
              <div className="profile-body">
                <div className="profile-head">
                  <span className="badge">
                    {LABEL_PROFESSION[s.profession]} — {s.ville}
                  </span>
                  {s.statut === 'candidat' ? (
                    <span className="badge sage">Candidat·e à la labellisation</span>
                  ) : (
                    <span className="badge peach">Labellisé·e</span>
                  )}
                  {s.nouveau ? <span className="badge peach">Nouveau</span> : null}
                </div>
                <h3>{s.nom}</h3>
                <p>{s.desc}</p>
                <blockquote className="profile-quote">{s.mentionBio}</blockquote>
                <div className="pro-tags">
                  {s.modalites.map((m) => (
                    <span className="chip mini" key={m}>
                      {LABEL_MODALITE[m]}
                    </span>
                  ))}
                </div>
                <ul className="profile-meta">
                  <li>
                    <strong>Département :</strong> {s.departement}
                  </li>
                  <li>
                    <strong>Source :</strong> bio Doctolib publique (mention périnatalité / deuil / fausse couche)
                  </li>
                </ul>
                <div className="profile-actions">
                  <a className="btn" href={s.doctolibUrl} target="_blank" rel="noopener noreferrer">
                    Prendre rendez-vous sur Doctolib →
                  </a>
                  <a className="btn secondary" href={`/contact?sujet=label-feedback-${s.id}`}>
                    Signaler un problème
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
