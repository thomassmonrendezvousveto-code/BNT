import type { OrientationCode } from '@bnt/orientation-engine';

export type ActionKind = 'link' | 'download' | 'external' | 'tel';

export type EtapeKit = {
  code: string;
  quand: string;
  delaiJours: number;
  duree: string;
  titre: string;
  qui: string;
  desc: string;
  actionLabel: string;
  actionHref: string;
};

export type OrientationConfig = {
  title: string;
  baseline: string;
  professionnel: string;
  /** Quatre repères-clés pour la carte « ordonnance » en tête du kit. */
  synthese: {
    delai: string;
    format: string;
    cout: string;
  };
  todayAction: {
    titre: string;
    desc: string;
    cta: { label: string; href: string; kind?: ActionKind };
  };
  etapes: EtapeKit[];
};

export const ORIENTATIONS: Record<OrientationCode, OrientationConfig> = {
  urgence_medicale: {
    title: 'Urgence médicale',
    baseline: 'Votre kit commence par la priorité absolue : votre sécurité physique aujourd’hui.',
    professionnel: 'Urgences gynécologiques, maternité ou SAMU',
    synthese: {
      delai: 'Aujourd’hui — urgence',
      format: 'Présentiel — urgences ou maternité',
      cout: 'Gratuit (pris en charge à 100 %)',
    },
    todayAction: {
      titre: 'Maintenant : appelez le 15 ou rejoignez les urgences',
      desc: 'Saignements abondants, douleur intense, malaise ou fièvre — n’attendez pas. Le SAMU vous orientera vers la structure la plus proche. Vous n’êtes pas seule, et il n’y a pas de mauvaise raison d’appeler.',
      cta: { label: 'Appeler le 15', href: 'tel:15', kind: 'tel' },
    },
    etapes: [
      {
        code: '1', quand: 'Maintenant', delaiJours: 0, duree: 'appel + transport',
        titre: 'Sécuriser le médical',
        qui: 'SAMU 15 ou urgences gynécologiques',
        desc: 'Appelez le 15 si saignements abondants, douleur intense, malaise ou fièvre. Si possible, faites-vous accompagner — ne conduisez pas seule.',
        actionLabel: 'Voir les premiers gestes', actionHref: '/je-viens-de-vivre',
      },
      {
        code: '2', quand: 'Dans les 24 h', delaiJours: 1, duree: '30-45 min',
        titre: 'Échographie de contrôle',
        qui: 'Maternité ou gynécologue de garde',
        desc: 'Indispensable pour évaluer la situation et orienter la prise en charge (attente, médicaments, geste).',
        actionLabel: 'Trouver un·e gynécologue', actionHref: '/label',
      },
      {
        code: '3', quand: 'Dans la semaine', delaiJours: 5, duree: '30 min · gratuit',
        titre: 'Reprendre le fil avec une sage-femme',
        qui: 'Sage-femme d’accueil BNT',
        desc: 'Appel pour réexpliquer ce qui s’est passé, vérifier la suite médicale, vous orienter vers un soutien psy si vous le souhaitez.',
        actionLabel: 'Demander à être rappelée', actionHref: '/contact?sujet=urgence-suivi',
      },
      {
        code: '4', quand: 'D’ici 1 mois', delaiJours: 25, duree: 'visio · 90 min',
        titre: 'Premier groupe de parole',
        qui: 'Psychologue BNT + 6 participantes',
        desc: 'Quand vous serez prête. Pour ne plus avoir à porter ça seule.',
        actionLabel: 'Voir les groupes', actionHref: '/groupes',
      },
    ],
  },
  grossesse_suivante_fast_track: {
    title: 'Grossesse suivante : parcours prioritaire',
    baseline: 'Votre kit est calibré pour une nouvelle grossesse — réassurance et suivi rapproché.',
    professionnel: 'Gynécologue-obstétricien référent Baby Next Time',
    synthese: {
      delai: 'Cette semaine — sous 7 jours',
      format: 'Présentiel (échographie) + suivi visio',
      cout: '30 à 100 € / écho · pris en charge à 100 % par la Sécu',
    },
    todayAction: {
      titre: 'Cette semaine : caler une échographie précoce de réassurance',
      desc: 'Confirmer la grossesse, la localiser, mesurer l’embryon. C’est le geste qui apaise le plus à ce stade. Notre annuaire référence des gynécologues qui prennent en compte le contexte d’après-perte.',
      cta: { label: 'Trouver un·e gynécologue référent·e', href: '/label' },
    },
    etapes: [
      {
        code: '1', quand: 'Cette semaine', delaiJours: 3, duree: '30 min',
        titre: 'Échographie précoce de réassurance',
        qui: 'Gynécologue-obstétricien référent',
        desc: 'Confirmer la grossesse, la localiser, mesurer l’embryon.',
        actionLabel: 'Trouver un rendez-vous', actionHref: '/label',
      },
      {
        code: '2', quand: 'Dans 2 semaines', delaiJours: 14, duree: '45 min',
        titre: 'Plan de suivi rapproché',
        qui: 'Sage-femme de parcours BNT',
        desc: 'Construction d’un calendrier d’échographies de réassurance et de jalons clairs jusqu’à 12 SA.',
        actionLabel: 'Voir le parcours grossesse suivante', actionHref: '/parcours#s5',
      },
      {
        code: '3', quand: 'Dans 3 semaines', delaiJours: 21, duree: '4-6 séances',
        titre: 'Soutien psy de grossesse',
        qui: 'Psychologue formé·e à l’anxiété périnatale',
        desc: 'Accompagnement court ciblé sur l’anxiété de grossesse après une perte.',
        actionLabel: 'Trouver un·e psy', actionHref: '/label',
      },
      {
        code: '4', quand: 'D’ici 1 mois', delaiJours: 30, duree: '4 sessions',
        titre: 'Atelier prénatal+',
        qui: 'Sage-femme BNT',
        desc: 'Mini-groupe de 4 femmes : gestion de l’anxiété, plan de naissance, rôle du partenaire.',
        actionLabel: 'Découvrir l’atelier', actionHref: '/parcours#s5',
      },
    ],
  },
  priorite_medicale: {
    title: 'Priorité médicale',
    baseline: 'Votre kit met le médical en premier : clarifier ce qui se passe et sécuriser la suite.',
    professionnel: 'Gynécologue ou sage-femme labellisé·e',
    synthese: {
      delai: 'Sous 7 jours',
      format: 'Présentiel',
      cout: '30 à 60 € · pris en charge à 70 % par la Sécu',
    },
    todayAction: {
      titre: 'Cette semaine : caler une consultation médicale',
      desc: 'Une consultation pour vérifier que tout évolue normalement, comprendre les causes probables, et discuter d’un éventuel arrêt de travail. C’est le pilier de la suite — tout le reste s’organise après.',
      cta: { label: 'Trouver un·e soignant·e labellisé·e', href: '/label' },
    },
    etapes: [
      {
        code: '1', quand: 'Sous 7 jours', delaiJours: 5, duree: '30-45 min',
        titre: 'Consultation médicale',
        qui: 'Gynécologue ou sage-femme labellisé·e',
        desc: 'Vérification physiologique, explication des causes probables, prescription d’un arrêt si besoin.',
        actionLabel: 'Trouver un·e gynécologue', actionHref: '/label',
      },
      {
        code: '2', quand: 'Dans 2 semaines', delaiJours: 14, duree: '20 min',
        titre: 'Échographie ou examens complémentaires',
        qui: 'Gynécologue référent',
        desc: 'Selon le contexte : confirmation de l’expulsion complète ou bilan complémentaire.',
        actionLabel: 'Voir cette étape', actionHref: '/parcours#s1',
      },
      {
        code: '3', quand: 'D’ici 1 mois', delaiJours: 30, duree: '3 à 8 séances',
        titre: 'Suivi psy ouvert',
        qui: 'Psychologue clinicien·ne périnatalité',
        desc: 'Quelques séances individuelles si vous en ressentez le besoin. 50 % remboursable via MonSoutienPsy.',
        actionLabel: 'Trouver un·e psy', actionHref: '/label',
      },
      {
        code: '4', quand: 'D’ici 2 à 3 mois', delaiJours: 75, duree: '6 × 90 min',
        titre: 'Groupe de parole (optionnel)',
        qui: 'Psychologue BNT + 6 participantes',
        desc: 'En visio, toutes les 2 semaines. Pour traverser ça avec d’autres femmes.',
        actionLabel: 'Voir les groupes', actionHref: '/groupes',
      },
    ],
  },
  priorite_psychologique: {
    title: 'Priorité psychologique',
    baseline: 'Votre kit met le soutien psy au centre : ne pas rester seule avec la charge émotionnelle.',
    professionnel: 'Psychologue périnatal Baby Next Time',
    synthese: {
      delai: 'Cette semaine',
      format: 'Téléphone gratuit puis visio ou présentiel',
      cout: 'Gratuit pour l’appel d’écoute · 0 à 60 € / séance ensuite (50 % remboursé MonSoutienPsy)',
    },
    todayAction: {
      titre: 'Aujourd’hui : un appel d’écoute gratuit, sans engagement',
      desc: '30 minutes avec une sage-femme d’accueil BNT. Vous racontez à votre rythme — pas de questionnaire, pas d’évaluation. C’est le geste qui change le plus de choses dans les premières semaines.',
      cta: { label: 'Demander à être rappelée', href: '/contact?sujet=appel-ecoute' },
    },
    etapes: [
      {
        code: '1', quand: 'Cette semaine', delaiJours: 4, duree: '30 min · gratuit',
        titre: 'Premier appel d’écoute',
        qui: 'Sage-femme d’accueil BNT',
        desc: 'Vous racontez à votre rythme. Pas d’évaluation, juste être entendue.',
        actionLabel: 'Demander à être rappelée', actionHref: '/contact?sujet=appel-ecoute',
      },
      {
        code: '2', quand: 'Sous 15 jours', delaiJours: 12, duree: '3 à 8 séances',
        titre: 'Consultation psy individuelle',
        qui: 'Psychologue clinicien·ne périnatalité',
        desc: 'Travail sur la culpabilité, le lien au bébé perdu, la place du partenaire.',
        actionLabel: 'Trouver un·e psy', actionHref: '/label',
      },
      {
        code: '3', quand: 'Dans 1 mois', delaiJours: 30, duree: '6 × 90 min',
        titre: 'Groupe de parole « Après »',
        qui: 'Psychologue BNT + 6 participantes',
        desc: '6 séances toutes les 2 semaines, groupe fermé, mêmes participantes du début à la fin.',
        actionLabel: 'Voir les groupes', actionHref: '/groupes',
      },
      {
        code: '4', quand: 'En continu', delaiJours: 7, duree: 'libre',
        titre: 'Ressources d’apaisement',
        qui: 'Bibliothèque BNT',
        desc: 'Podcasts, guides courts, témoignages — sans pression, dans l’ordre que vous voulez.',
        actionLabel: 'Voir les ressources', actionHref: '/ressources',
      },
    ],
  },
  parcours_complexe_ou_recurrent: {
    title: 'Parcours spécialisé ou renforcé',
    baseline: 'Votre kit propose un parcours coordonné, pensé pour les situations qui se répètent ou se cumulent.',
    professionnel: 'Consultation spécialisée + care manager BNT',
    synthese: {
      delai: 'Sous 15 jours',
      format: 'Présentiel + suivi coordonné à distance',
      cout: '60 à 150 € / consultation · pris en charge à 70-100 % selon spécialiste',
    },
    todayAction: {
      titre: 'Cette semaine : prendre RDV avec un·e gynécologue spécialisé·e',
      desc: 'Bilan étiologique complet, relecture du dossier, plan d’examens si pertinent. Pas une étape de plus, mais le point de départ d’un parcours spécifique pour votre situation.',
      cta: { label: 'Trouver un·e spécialiste', href: '/label' },
    },
    etapes: [
      {
        code: '1', quand: 'Sous 15 jours', delaiJours: 12, duree: '60 min',
        titre: 'Consultation spécialisée',
        qui: 'Gynécologue spécialisé en fausses couches répétées ou PMA',
        desc: 'Bilan étiologique complet, relecture du dossier, plan d’examens si pertinent.',
        actionLabel: 'Trouver un·e spécialiste', actionHref: '/label',
      },
      {
        code: '2', quand: 'Dans 3 semaines', delaiJours: 21, duree: 'continu',
        titre: 'Care manager dédié·e',
        qui: 'Coordinateur·rice BNT',
        desc: 'Une personne référente qui orchestre vos rendez-vous, vos comptes-rendus, votre calendrier.',
        actionLabel: 'Nous écrire', actionHref: '/contact?sujet=parcours-renforce',
      },
      {
        code: '3', quand: 'D’ici 1 mois', delaiJours: 30, duree: '8 à 12 séances',
        titre: 'Suivi psy individuel',
        qui: 'Psychologue formé·e aux pertes répétées',
        desc: 'Travail spécifique sur la confiance corporelle, l’épuisement et la projection.',
        actionLabel: 'Trouver un·e psy spécialisé·e', actionHref: '/label',
      },
      {
        code: '4', quand: 'D’ici 3 mois', delaiJours: 90, duree: '2 à 4 séances',
        titre: 'Accompagnement couple',
        qui: 'Thérapeute de couple périnatalité',
        desc: 'À deux. Pour traverser ce qui se rejoue à chaque épreuve.',
        actionLabel: 'Voir cette étape', actionHref: '/parcours#s4',
      },
    ],
  },
  preconception: {
    title: 'Consultation de préconception',
    baseline: 'Votre kit prépare un nouveau projet : faire le point médical avant de relancer.',
    professionnel: 'Gynécologue référent + sage-femme BNT',
    synthese: {
      delai: 'Sous 15 jours',
      format: 'Présentiel',
      cout: '30 à 60 € · pris en charge à 70 % par la Sécu',
    },
    todayAction: {
      titre: 'Dans les 15 jours : caler une consultation de préconception',
      desc: 'Bilan, vérifications, autorisation médicale claire avant de relancer un projet. Mieux vaut une heure de questions posées qu’un mois d’angoisse silencieuse.',
      cta: { label: 'Trouver un·e gynécologue', href: '/label' },
    },
    etapes: [
      {
        code: '1', quand: 'Sous 15 jours', delaiJours: 12, duree: '45 min',
        titre: 'Consultation de préconception',
        qui: 'Gynécologue référent',
        desc: 'Bilan, vérifications et autorisation médicale claire avant de relancer un projet.',
        actionLabel: 'Trouver un rendez-vous', actionHref: '/label',
      },
      {
        code: '2', quand: 'Dans 1 mois', delaiJours: 30, duree: '4 sessions',
        titre: 'Atelier prénatal+',
        qui: 'Sage-femme BNT',
        desc: 'Mini-groupe sur l’anxiété de grossesse, le plan de naissance, la gestion des échographies de contrôle.',
        actionLabel: 'Voir l’atelier', actionHref: '/parcours#s5',
      },
      {
        code: '3', quand: 'À votre rythme', delaiJours: 30, duree: '3 à 5 séances',
        titre: 'Soutien psy court',
        qui: 'Psychologue périnatalité',
        desc: 'Quelques séances ciblées sur le passage de l’après-perte au prochain projet.',
        actionLabel: 'Trouver un·e psy', actionHref: '/label',
      },
    ],
  },
  parcours_coordonne_standard: {
    title: 'Parcours coordonné standard',
    baseline: 'Votre kit suit notre parcours de référence — six étapes que vous traversez à votre rythme.',
    professionnel: 'Care manager Baby Next Time',
    synthese: {
      delai: 'Cette semaine — sous 7 jours',
      format: 'Téléphone gratuit puis présentiel/visio selon étape',
      cout: 'Gratuit pour l’accueil · 0 à 60 € / séance ensuite (selon étape, en partie remboursable)',
    },
    todayAction: {
      titre: 'Cette semaine : un appel d’accueil gratuit avec une sage-femme',
      desc: '30 minutes pour faire le point. Pas d’évaluation, pas de questionnaire — juste être écoutée et recevoir le guide papier des 4 premières semaines.',
      cta: { label: 'Demander à être rappelée', href: '/contact?sujet=accueil' },
    },
    etapes: [
      {
        code: 'S0', quand: 'Cette semaine', delaiJours: 4, duree: '30 min · gratuit',
        titre: 'Accueil',
        qui: 'Sage-femme d’accueil BNT',
        desc: 'Appel gratuit + guide papier « Les 4 premières semaines » + orientation sur-mesure.',
        actionLabel: 'Demander à être rappelée', actionHref: '/contact?sujet=accueil',
      },
      {
        code: 'S1', quand: 'Sous 1 mois', delaiJours: 15, duree: '30-45 min',
        titre: 'Consultation médicale',
        qui: 'Gynécologue ou sage-femme labellisé·e',
        desc: 'Vérification physiologique, explications, prescription d’un arrêt si besoin, orientation psy.',
        actionLabel: 'Trouver un·e soignant·e', actionHref: '/label',
      },
      {
        code: 'S2', quand: 'D’ici 2 mois', delaiJours: 45, duree: '3 à 8 séances',
        titre: 'Suivi psychologique individuel',
        qui: 'Psychologue clinicien·ne périnatalité',
        desc: '50 % remboursable via MonSoutienPsy.',
        actionLabel: 'Trouver un·e psy', actionHref: '/label',
      },
      {
        code: 'S3', quand: 'D’ici 3 mois', delaiJours: 75, duree: '6 × 90 min',
        titre: 'Groupe de parole (optionnel)',
        qui: 'Psychologue BNT + 6 participantes',
        desc: 'En visio, toutes les 2 semaines. Groupe fermé.',
        actionLabel: 'Voir les groupes', actionHref: '/groupes',
      },
    ],
  },
};

const MOIS_FR = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

export function dateConcrete(delaiJours: number, baseDate: Date = new Date()): string {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + delaiJours);
  return `${d.getDate()} ${MOIS_FR[d.getMonth()]}`;
}

export function contexteUtilisatrice(reponses?: Record<string, string | number>): string | null {
  if (!reponses) return null;
  const a4 = reponses.A4;
  if (a4 === 'moins_de_15_jours')
    return 'Vous êtes dans les premiers jours après le diagnostic : la priorité est de poser un cadre apaisé et un premier appui humain.';
  if (a4 === 'entre_15_jours_et_3_mois')
    return 'C’est le moment de poser un cadre médical et émotionnel clair, à votre rythme.';
  if (a4 === 'plus_de_3_mois')
    return 'Plusieurs mois ont passé. Le parcours peut se reprendre à votre rythme, ciblé sur ce qui reste actif aujourd’hui.';
  if (a4 === 'nouvelle_grossesse_apres_une_perte')
    return 'Une nouvelle grossesse est en cours : votre kit privilégie la réassurance médicale et le soutien psy ciblé.';
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Personnalisation enrichie : génère 1 à 4 paragraphes selon les réponses
// E (émotionnel), F (couple), G (antécédents), H (projet)
// ─────────────────────────────────────────────────────────────────────────────

export type MicroContexte = {
  cle: string;
  titre: string;
  texte: string;
};

export function microContextes(reponses?: Record<string, string | number>): MicroContexte[] {
  if (!reponses) return [];
  const out: MicroContexte[] = [];

  const e1 = reponses.E1;
  const e2 = reponses.E2;
  const e5 = reponses.E5;
  const e6 = reponses.E6;
  if (
    e1 === 'submergee' || e1 === 'tres_triste' || e1 === 'anxieuse' ||
    e2 === 'souvent' || e2 === 'presque_tout_le_temps' ||
    e6 === 'beaucoup' || e6 === 'enormement'
  ) {
    out.push({
      cle: 'emotionnel',
      titre: 'Charge émotionnelle importante',
      texte:
        'Vos réponses montrent une charge émotionnelle forte en ce moment. C’est cohérent avec ce que vous traversez — pas un signe de faiblesse. Le kit place le soutien psy plus tôt dans votre parcours, et les premières étapes restent légères : pas de questionnaire, pas d’évaluation, juste être entendue.',
    });
  } else if (e5 === 'beaucoup' || e5 === 'totalement') {
    out.push({
      cle: 'solitude',
      titre: 'Vous décrivez un sentiment de solitude',
      texte:
        'Beaucoup de femmes nous disent la même chose : l’entourage ne sait pas quoi dire, alors il se tait. Le groupe de parole « Après » a été conçu précisément pour ça — un espace fermé, mêmes participantes du début à la fin, pour ne plus porter ça seule.',
    });
  }

  const f1 = reponses.F1;
  const f4 = reponses.F4;
  if (f1 === 'non') {
    out.push({
      cle: 'couple_seule',
      titre: 'Vous traversez cela sans appui proche',
      texte:
        'Le kit privilégie un premier contact humain rapide (sage-femme d’accueil, gratuit) pour ne pas que la solitude devienne le sujet principal. Si vous en ressentez le besoin, on peut aussi vous mettre en lien avec d’autres femmes qui ont vécu ça.',
    });
  } else if (f1 === 'c_est_complique' || f4 === 'oui') {
    out.push({
      cle: 'couple_tendu',
      titre: 'Le couple traverse une zone de tension',
      texte:
        'Vivre une fausse couche à deux ne veut pas dire la vivre pareil — l’écart de rythme et de mots crée souvent du silence. Une étape « accompagnement couple » est intégrée plus tard dans votre parcours, et un mini-kit pour votre partenaire est ci-dessous : il peut le lire seul.',
    });
  }

  const g1 = reponses.G1;
  const g2 = reponses.G2;
  if (g1 === 'non' && (g2 === '2' || g2 === '3_ou_plus')) {
    out.push({
      cle: 'antecedents',
      titre: 'Plusieurs pertes dans votre histoire',
      texte:
        'Vivre cela à nouveau ne s’additionne pas comme un comptable — chaque épisode rouvre la question du « pourquoi ». Le kit propose un bilan étiologique avec un·e gynécologue spécialisé·e plutôt qu’une consultation standard, pour reprendre la main sur les hypothèses.',
    });
  }

  const h1 = reponses.H1;
  const h2 = reponses.H2;
  if (h1 === 'oui' && h2 !== 'oui') {
    out.push({
      cle: 'projet_actif',
      titre: 'Vous avez un projet de grossesse à court terme',
      texte:
        'Le kit ajoute une consultation de préconception avant de relancer — pas pour ralentir, mais pour partir avec un cadre clair (vérifications, autorisation médicale, gestion de l’angoisse de réassurance). Vous gagnerez du temps, et beaucoup d’angoisse en moins.',
    });
  } else if (h1 === 'je_ne_sais_pas_encore') {
    out.push({
      cle: 'projet_attente',
      titre: 'Vous n’êtes pas prête à projeter — c’est normal',
      texte:
        'Le kit ne pousse aucune décision sur le projet bébé. Les étapes sont toutes des piliers utiles indépendamment du calendrier : médical, psy, et un point « Après » quand vous voudrez le faire.',
    });
  }

  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section « Préparer votre rendez-vous » par orientation
// ─────────────────────────────────────────────────────────────────────────────

export type PrepareRdv = {
  type: string; // intitulé du rdv que ça prépare
  aDire: string[]; // 3-4 phrases prêtes à dire
  aDemander: string[]; // 3-4 questions à poser
  aApporter: string[]; // 2-3 documents/objets
  modeleEmployeur?: string; // texte mailto employeur
};

export const PREPARE_RDV: Record<OrientationCode, PrepareRdv> = {
  urgence_medicale: {
    type: 'Passage aux urgences gynécologiques',
    aDire: [
      '« J’ai des saignements abondants depuis [horaire], je remplis [nombre] protections par heure. »',
      '« J’ai une douleur abdominale [intensité], localisée [endroit]. »',
      '« Mes dernières règles datent du [date], je suis enceinte de [nombre] semaines. »',
      '« Je viens seule / je suis accompagnée par [personne]. »',
    ],
    aDemander: [
      'Quelle est la suite du protocole — surveillance, médicaments, geste ?',
      'Dois-je revenir, et dans combien de temps ?',
      'Quels signes doivent me faire revenir avant ?',
      'Qui contacte mon médecin traitant pour la suite ?',
    ],
    aApporter: [
      'Carte vitale + carte de mutuelle',
      'Si possible : carnet de santé, ordonnances en cours, dernier examen gynéco',
      'Eau, snack, chargeur — l’attente peut être longue',
    ],
  },
  grossesse_suivante_fast_track: {
    type: 'Échographie précoce de réassurance',
    aDire: [
      '« Je suis enceinte d’environ [nombre] semaines, je sors d’une fausse couche en [mois/année]. »',
      '« Je viens pour une échographie de réassurance précoce. »',
      '« J’ai besoin d’un suivi rapproché, c’est pour ça que je viens tôt. »',
      '« Mon contexte est anxiogène — j’aimerais des étapes claires. »',
    ],
    aDemander: [
      'Pouvez-vous me planifier un calendrier de réassurance jusqu’à 12 SA ?',
      'Quels signes doivent me faire reconsulter entre les rendez-vous ?',
      'Quel taux de bêta-HCG attendre, faut-il en faire ?',
      'Connaissez-vous un·e psy formé·e à l’anxiété périnatale à recommander ?',
    ],
    aApporter: [
      'Compte-rendu de la fausse couche précédente',
      'Date des dernières règles, test de grossesse',
      'Carte vitale + mutuelle',
    ],
  },
  priorite_medicale: {
    type: 'Consultation médicale post-fausse couche',
    aDire: [
      '« Je sors d’une fausse couche [stade : confirmée / suspicion / en cours]. »',
      '« J’ai besoin de vérifier que la situation évolue normalement. »',
      '« J’aurais besoin d’un arrêt de travail de [nombre] jours. »',
      '« Je veux comprendre les causes probables et les examens utiles. »',
    ],
    aDemander: [
      'Faut-il une échographie de contrôle, et quand ?',
      'Quels examens biologiques faire (bêta-HCG, bilan) ?',
      'Quand puis-je reprendre une vie normale (sport, sexualité, projet) ?',
      'Quelles douleurs ou saignements doivent m’alerter ?',
    ],
    aApporter: [
      'Carnet de santé + carte vitale',
      'Compte-rendu écho ou prise de sang si vous en avez',
      'Liste de vos questions, écrites à l’avance',
    ],
    modeleEmployeur:
      'Bonjour [Nom], je vous informe que je suis en arrêt de travail à compter du [date] pour raisons médicales. Je vous transmettrai l’arrêt par mail / courrier dès réception. Cordialement, [Prénom Nom].',
  },
  priorite_psychologique: {
    type: 'Premier appel d’écoute (sage-femme BNT)',
    aDire: [
      '« Je viens de vivre une fausse couche [date / période]. »',
      '« Émotionnellement, je dirais que [un mot ou deux suffisent]. »',
      '« Ce qui me pèse le plus en ce moment, c’est [tentez une phrase]. »',
      '« Je ne sais pas ce dont j’ai besoin — c’est pour ça que j’appelle. »',
    ],
    aDemander: [
      'Comment se passe la suite — y a-t-il un cadre, ou je décide à chaque étape ?',
      'Pouvez-vous m’orienter vers un·e psy formé·e à la périnatalité ?',
      'Comment fonctionne le groupe de parole « Après » ?',
      'Que faire si mon conjoint/entourage ne réagit pas comme je voudrais ?',
    ],
    aApporter: [
      'Rien à apporter — c’est un appel téléphonique gratuit de 30 min.',
      'Un endroit calme, où vous ne serez pas interrompue.',
    ],
  },
  parcours_complexe_ou_recurrent: {
    type: 'Consultation spécialisée (FCR / PMA)',
    aDire: [
      '« J’ai vécu [nombre] pertes de grossesse, la dernière en [date]. »',
      '« Je veux savoir si un bilan étiologique est pertinent dans mon cas. »',
      '« Voici mon historique : [tentative spontanée / PMA / FIV / etc.]. »',
      '« J’ai besoin d’un plan clair, pas d’une consultation générique de plus. »',
    ],
    aDemander: [
      'Quels examens font sens dans mon historique précis ?',
      'Quelles causes sont raisonnablement explorables, lesquelles ne le sont pas ?',
      'Quel est le délai d’attente avant une nouvelle tentative ?',
      'Pouvez-vous coordonner les comptes-rendus avec mon care manager BNT ?',
    ],
    aApporter: [
      'Tous vos comptes-rendus médicaux antérieurs (échos, bilans, chirurgie)',
      'Liste écrite de vos antécédents et de vos traitements en cours',
      'Carnet de santé + carte vitale + mutuelle',
    ],
  },
  preconception: {
    type: 'Consultation de préconception',
    aDire: [
      '« J’envisage une nouvelle grossesse dans les [délai]. »',
      '« J’ai vécu une fausse couche en [date], je veux faire le point avant. »',
      '« Je veux savoir ce qui est utile à vérifier avant de relancer. »',
      '« J’ai aussi besoin de gérer l’anxiété de la prochaine grossesse. »',
    ],
    aDemander: [
      'Quels examens biologiques sont pertinents avant de retenter ?',
      'Y a-t-il un délai à respecter, et pourquoi ?',
      'Que prendre (acide folique, vitamines) — quand commencer ?',
      'En cas de nouvelle grossesse, vers qui se tourner pour un suivi rapproché ?',
    ],
    aApporter: [
      'Compte-rendu de la fausse couche précédente',
      'Carnet de santé + dernier bilan biologique si vous en avez',
      'Liste de vos questions, écrites à l’avance',
    ],
  },
  parcours_coordonne_standard: {
    type: 'Appel d’accueil (sage-femme BNT)',
    aDire: [
      '« Je viens de vivre une fausse couche [date / période]. »',
      '« Je voudrais comprendre comment Baby Next Time peut m’aider concrètement. »',
      '« Mes priorités à court terme : [médical / psy / projet / autre]. »',
      '« Je ne sais pas par où commencer — c’est pour ça que j’appelle. »',
    ],
    aDemander: [
      'À quoi ressemble le parcours classique sur les 3 prochains mois ?',
      'Que reste-t-il à ma charge financièrement ?',
      'Comment vous nous mettez en lien avec les bons professionnels ?',
      'Pouvez-vous m’envoyer le guide papier « Les 4 premières semaines » ?',
    ],
    aApporter: [
      'Rien — c’est un appel téléphonique gratuit de 30 min.',
      'Un endroit calme, où vous ne serez pas interrompue.',
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Mini-kit partenaire (générique, conditionnel à F1)
// ─────────────────────────────────────────────────────────────────────────────

export type KitPartenaire = {
  intro: string;
  aDire: string[];
  aEviter: string[];
  aFaire: string[];
  modeleSms: string;
};

export const KIT_PARTENAIRE: KitPartenaire = {
  intro:
    'Beaucoup de partenaires veulent bien faire mais ne savent pas comment. Voici, en une page, ce qui aide vraiment — et ce qui blesse sans le vouloir. À lire seul·e, à votre rythme.',
  aDire: [
    '« Je suis là, et je le serai aussi dans 3 mois. »',
    '« Tu n’as rien fait de mal. »',
    '« Tu as le droit d’en reparler aujourd’hui, demain, dans un an. »',
    '« Qu’est-ce qui te ferait du bien là, maintenant ? Je n’ai pas besoin de réponse, c’est juste une question. »',
  ],
  aEviter: [
    '« Au moins tu sais que tu peux tomber enceinte. »',
    '« On en refera un autre. »',
    '« Il faut tourner la page. »',
    'Le silence prolongé sans signe — il est souvent perçu comme du désintérêt.',
  ],
  aFaire: [
    'Prendre en charge concrètement : courses, repas, RDV médicaux à caler.',
    'Lui demander si elle veut être accompagnée à un rendez-vous médical (pas l’imposer).',
    'Repérer un·e psy formé·e à la périnatalité, sans rien décider à sa place.',
    'Vous accorder à vous aussi un temps : un appel d’écoute partenaire chez BNT existe.',
  ],
  modeleSms:
    'Je viens de remplir un questionnaire avec Baby Next Time, ils m’ont préparé un mini-guide pour toi en une page : ce qui aide, ce qui blesse, ce que tu peux faire de concret. Je te l’envoie, on en reparle quand tu veux.',
};

// ─────────────────────────────────────────────────────────────────────────────
// Checklist actionnable (5 items) par orientation, à cocher
// ─────────────────────────────────────────────────────────────────────────────

export type ChecklistItem = {
  id: string;
  label: string;
};

export const CHECKLIST: Record<OrientationCode, ChecklistItem[]> = {
  urgence_medicale: [
    { id: 'u1', label: 'Appeler le 15 ou se rendre aux urgences gynécologiques.' },
    { id: 'u2', label: 'Être accompagnée — ne pas conduire seule.' },
    { id: 'u3', label: 'Prévenir un·e proche, ne serait-ce que par SMS.' },
    { id: 'u4', label: 'Garder les comptes-rendus reçus aux urgences.' },
    { id: 'u5', label: 'Sous 7 jours : caler la consultation de suivi (étape 2 du kit).' },
  ],
  grossesse_suivante_fast_track: [
    { id: 'g1', label: 'Caler l’échographie précoce de réassurance cette semaine.' },
    { id: 'g2', label: 'Démarrer (si non fait) acide folique + vitamine D.' },
    { id: 'g3', label: 'Identifier un·e psy formé·e à l’anxiété périnatale.' },
    { id: 'g4', label: 'Noter les signes d’alerte à reconsulter (saignements, douleurs).' },
    { id: 'g5', label: 'En parler à votre employeur si rendez-vous fréquents — modèle dispo ci-dessous.' },
  ],
  priorite_medicale: [
    { id: 'm1', label: 'Caler la consultation médicale sous 7 jours.' },
    { id: 'm2', label: 'Préparer la liste écrite de vos questions (modèle ci-dessus).' },
    { id: 'm3', label: 'Demander, si besoin, un arrêt de travail.' },
    { id: 'm4', label: 'Vérifier remboursement MonSoutienPsy si suivi psy envisagé.' },
    { id: 'm5', label: 'Conserver tous les comptes-rendus reçus dans un dossier dédié.' },
  ],
  priorite_psychologique: [
    { id: 'p1', label: 'Demander à être rappelée par une sage-femme BNT (gratuit).' },
    { id: 'p2', label: 'Identifier un endroit calme pour l’appel.' },
    { id: 'p3', label: 'Repérer un·e psy formé·e à la périnatalité (50 % MonSoutienPsy).' },
    { id: 'p4', label: 'Vous inscrire (sans engagement) à un groupe de parole « Après ».' },
    { id: 'p5', label: 'Mettre en pause une décision difficile cette semaine si possible.' },
  ],
  parcours_complexe_ou_recurrent: [
    { id: 'c1', label: 'Réunir tous les comptes-rendus médicaux antérieurs.' },
    { id: 'c2', label: 'Caler la consultation spécialisée (gynéco FCR ou PMA).' },
    { id: 'c3', label: 'Demander à BNT un care manager dédié·e.' },
    { id: 'c4', label: 'Démarrer un suivi psy spécialisé pertes répétées.' },
    { id: 'c5', label: 'Envisager un temps « couple » à 2 ou 3 mois — pas plus tôt.' },
  ],
  preconception: [
    { id: 'pre1', label: 'Caler la consultation de préconception sous 15 jours.' },
    { id: 'pre2', label: 'Démarrer acide folique (400 µg/j) si non fait.' },
    { id: 'pre3', label: 'Faire un point bilan biologique si recommandé.' },
    { id: 'pre4', label: 'Repérer un·e psy en cas d’anxiété de réassurance.' },
    { id: 'pre5', label: 'Discuter en couple du rythme et du calendrier souhaité.' },
  ],
  parcours_coordonne_standard: [
    { id: 's1', label: 'Demander à être rappelée par une sage-femme BNT.' },
    { id: 's2', label: 'Recevoir le guide papier « Les 4 premières semaines ».' },
    { id: 's3', label: 'Caler la consultation médicale sous 1 mois.' },
    { id: 's4', label: 'Évaluer si un suivi psy court vous serait utile.' },
    { id: 's5', label: 'Vous inscrire (sans engagement) au groupe de parole « Après ».' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Pourquoi cette orientation : explicite la décision en 2-3 raisons heuristiques
// ─────────────────────────────────────────────────────────────────────────────

export type RaisonOrientation = {
  cle: string;
  texte: string;
};

export function pourquoiOrientation(
  orientation: OrientationCode,
  reponses?: Record<string, string | number>,
): RaisonOrientation[] {
  if (!reponses) return [];
  const r = reponses;
  const raisons: RaisonOrientation[] = [];

  if (orientation === 'urgence_medicale') {
    if (r.B1 === 'oui' || r.B2 === 'oui')
      raisons.push({ cle: 'b1b2', texte: 'Vous décrivez des saignements ou des douleurs intenses : c’est un signal d’alerte qui doit être vu en consultation rapidement.' });
    if (r.B3 === 'oui')
      raisons.push({ cle: 'b3', texte: 'Vous mentionnez de la fièvre ou un malaise : à évaluer aux urgences sans attendre.' });
    if (r.D2 === 'tres_importants')
      raisons.push({ cle: 'd2', texte: 'L’ampleur des saignements rapportés justifie un avis médical immédiat.' });
    if (raisons.length === 0)
      raisons.push({ cle: 'fallback', texte: 'Plusieurs réponses pointent vers un risque physique immédiat — la priorité absolue est votre sécurité.' });
  }

  if (orientation === 'grossesse_suivante_fast_track') {
    if (r.A4 === 'nouvelle_grossesse_apres_une_perte')
      raisons.push({ cle: 'a4', texte: 'Vous indiquez une nouvelle grossesse après une perte : votre kit est calibré pour la réassurance précoce.' });
    if (r.H4 === 'oui')
      raisons.push({ cle: 'h4', texte: 'Vous avez explicitement souhaité un parcours prioritaire en cas de nouvelle grossesse.' });
    if (r.E7 === 'oui')
      raisons.push({ cle: 'e7', texte: 'Vous exprimez une peur d’une nouvelle grossesse — un suivi rapproché y répond mieux qu’un suivi standard.' });
  }

  if (orientation === 'priorite_medicale') {
    if (r.A4 === 'moins_de_15_jours')
      raisons.push({ cle: 'a4', texte: 'Le diagnostic est récent : un point médical clair est la meilleure base pour la suite.' });
    if (raisons.length === 0)
      raisons.push({ cle: 'fallback', texte: 'Vos réponses pointent prioritairement vers un besoin de clarté médicale avant toute autre étape.' });
  }

  if (orientation === 'priorite_psychologique') {
    if (r.E1 === 'submergee' || r.E1 === 'tres_triste')
      raisons.push({ cle: 'e1', texte: 'Vous décrivez une charge émotionnelle forte aujourd’hui : le soutien psy passe en premier.' });
    if (r.E2 === 'souvent' || r.E2 === 'presque_tout_le_temps')
      raisons.push({ cle: 'e2', texte: 'Le sentiment que tout est trop lourd à porter revient souvent : ne pas rester seule avec ça est l’étape clé.' });
    if (r.E5 === 'beaucoup' || r.E5 === 'totalement')
      raisons.push({ cle: 'e5', texte: 'Vous décrivez un fort sentiment de solitude : le groupe de parole « Après » répond exactement à ça.' });
    if (r.E8 === 'oui')
      raisons.push({ cle: 'e8', texte: 'Vous avez exprimé le souhait de parler à un·e psy formé·e à la périnatalité.' });
  }

  if (orientation === 'parcours_complexe_ou_recurrent') {
    if (r.G1 === 'non' && (r.G2 === '2' || r.G2 === '3_ou_plus'))
      raisons.push({ cle: 'g2', texte: 'Plusieurs pertes dans votre histoire : un bilan étiologique spécialisé fait plus sens qu’une consultation standard.' });
    if (r.G3 === 'oui')
      raisons.push({ cle: 'g3', texte: 'Un parcours PMA dans votre histoire : votre suivi gagne à être coordonné avec un·e spécialiste.' });
    if (r.G4 === 'oui')
      raisons.push({ cle: 'g4', texte: 'Vous mentionnez des antécédents médicaux ou gynécologiques inquiétants : le bilan dédié est l’angle utile.' });
  }

  if (orientation === 'preconception') {
    if (r.H1 === 'oui')
      raisons.push({ cle: 'h1', texte: 'Vous avez exprimé un projet de grossesse à court terme : la consultation de préconception sécurise le départ.' });
    if (r.H3 === 'oui')
      raisons.push({ cle: 'h3', texte: 'Vous avez explicitement demandé un rendez-vous de réassurance avant une prochaine grossesse.' });
    if (r.H2 === 'non')
      raisons.push({ cle: 'h2', texte: 'Vous ne souhaitez pas attendre une longue récupération avant de relancer — l’étape de préconception est faite pour ça.' });
  }

  if (orientation === 'parcours_coordonne_standard') {
    raisons.push({ cle: 'std1', texte: 'Aucun signal d’alerte médicale n’a été détecté dans vos réponses.' });
    raisons.push({ cle: 'std2', texte: 'Le retentissement émotionnel est présent mais pas dominant aujourd’hui — le parcours classique en 4 étapes est adapté.' });
    raisons.push({ cle: 'std3', texte: 'Le projet bébé n’est pas une urgence à court terme dans ce que vous décrivez.' });
  }

  return raisons.slice(0, 3);
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ orientée par parcours (4-5 questions)
// ─────────────────────────────────────────────────────────────────────────────

export type FaqItem = {
  q: string;
  a: string;
};

export const FAQ: Record<OrientationCode, FaqItem[]> = {
  urgence_medicale: [
    { q: 'Je n’ose pas appeler le 15 — est-ce vraiment justifié ?', a: 'Oui. Le SAMU est habitué à ce type d’appel et orientera selon la situation. Il vaut mieux appeler pour rien que ne pas appeler. Vous pouvez aussi appeler les urgences gynécologiques de votre maternité de référence.' },
    { q: 'Et si on me dit que ce n’est rien ?', a: 'C’est possible — et c’est rassurant. Mais le geste d’avoir vérifié n’est jamais inutile. Demandez quand même un compte-rendu écrit pour la suite.' },
    { q: 'Puis-je perdre beaucoup de sang ?', a: 'Une fausse couche peut s’accompagner de saignements importants. Le critère d’alerte : remplir une garniture par heure pendant plusieurs heures consécutives, ou se sentir faible/malaiseuse.' },
  ],
  grossesse_suivante_fast_track: [
    { q: 'Est-ce trop tôt pour une échographie ?', a: 'Non. À partir de 6-7 SA, l’échographie permet de voir l’embryon et son activité cardiaque. C’est précisément le geste qui apaise le plus l’angoisse à ce stade.' },
    { q: 'Vais-je être suivie différemment cette fois ?', a: 'Oui : votre kit prévoit un calendrier d’échographies de réassurance plus rapproché que pour une grossesse sans antécédent, jusqu’à environ 12 SA.' },
    { q: 'Comment gérer l’angoisse entre les rendez-vous ?', a: 'Un suivi psy court formé à l’anxiété périnatale (4-6 séances) est inclus dans votre parcours. Il fait une vraie différence — c’est le retour le plus fréquent des participantes.' },
    { q: 'Mon partenaire peut-il être inclus ?', a: 'Oui. L’atelier prénatal+ et certaines consultations sont conçus pour vous deux. Le mini-kit partenaire ci-dessous est un bon point de départ.' },
  ],
  priorite_medicale: [
    { q: 'Vais-je avoir besoin d’un curetage ou d’un médicament ?', a: 'Cela dépend de l’évolution naturelle. Trois options sont possibles : attente surveillée, médicament (misoprostol), ou geste chirurgical. La consultation médicale est faite pour décider, pas pour vous l’imposer.' },
    { q: 'Combien de temps avant que mon corps revienne à la normale ?', a: 'Le retour des règles intervient généralement entre 4 et 8 semaines. Les saignements peuvent durer 1 à 2 semaines. Le corps a son rythme — votre soignant·e fixera des repères.' },
    { q: 'Dois-je arrêter le travail ?', a: 'Vous en avez le droit. Un arrêt de quelques jours à 2 semaines est fréquent et légitime — physique et émotionnellement. Demandez-le explicitement en consultation.' },
    { q: 'Et un suivi psy, c’est utile dans mon cas ?', a: 'C’est utile pour la majorité des femmes, même quand « ça va ». Quelques séances ciblées suffisent souvent — pas un engagement long.' },
  ],
  priorite_psychologique: [
    { q: 'Je n’ai pas envie d’en parler — vais-je devoir tout raconter ?', a: 'Non. L’appel d’écoute n’est pas un interrogatoire. Vous racontez ce que vous voulez, dans l’ordre que vous voulez. Beaucoup de femmes commencent par : « je ne sais pas par où commencer », et c’est très bien.' },
    { q: 'Le groupe de parole, j’ai peur que ce soit trop intense.', a: 'Le format est volontairement contenu : 6 séances, mêmes participantes du début à la fin, animées par une psy. Vous pouvez n’écouter qu’écouter au début. Beaucoup disent que c’est l’étape qui a le plus changé leur traversée.' },
    { q: 'Combien ça coûte ?', a: 'L’appel d’écoute initial est gratuit. Les séances individuelles avec un·e psy clinicien·ne sont remboursées à 50 % via MonSoutienPsy (8 séances/an). Le groupe de parole est inclus dans le parcours BNT.' },
    { q: 'Mon entourage minimise — comment faire ?', a: 'C’est très fréquent. Le travail psy aide à reposer ses limites sans casser les liens. Et le groupe de parole offre un endroit où votre vécu est compris d’emblée — sans avoir à le justifier.' },
  ],
  parcours_complexe_ou_recurrent: [
    { q: 'Pourquoi un bilan spécialisé plutôt qu’une consultation classique ?', a: 'Au-delà de 2 pertes, l’hypothèse « hasard » devient moins probable. Un bilan étiologique permet d’explorer les causes raisonnablement explorables (anatomiques, immunologiques, hormonales, génétiques) — sans promesse de réponse, mais avec un cadre clair.' },
    { q: 'Combien de temps prend un bilan complet ?', a: 'Comptez 6 à 12 semaines selon les examens. Votre care manager BNT coordonne pour éviter les attentes inutiles entre les rendez-vous.' },
    { q: 'Est-ce que je peux retomber enceinte pendant le bilan ?', a: 'Oui, et beaucoup le font. Le bilan ne suspend pas la vie. Si une grossesse démarre, le suivi bascule en parcours rapproché — l’équipe est prévenue.' },
    { q: 'Et le couple, dans tout ça ?', a: 'Les pertes répétées épuisent à deux, souvent sur des rythmes différents. Une étape « accompagnement couple » avec un·e thérapeute périnatalité est intégrée à votre parcours.' },
  ],
  preconception: [
    { q: 'Quel est le bon délai avant de retenter ?', a: 'Médicalement, après une fausse couche précoce non compliquée, il n’y a pas de délai obligatoire. Émotionnellement, c’est très individuel. La consultation de préconception est faite pour poser ça calmement, pas pour décider à votre place.' },
    { q: 'Que prendre en complément (vitamines, acide folique) ?', a: 'L’acide folique 400 µg/jour est recommandé dès l’envie de grossesse. Vitamine D et iode sont souvent prescrits selon le bilan. Votre soignant·e ajustera.' },
    { q: 'Vais-je être plus suivie pour la prochaine grossesse ?', a: 'Oui : un parcours grossesse suivante prioritaire (échos rapprochées + soutien psy ciblé) bascule automatiquement quand la grossesse démarre, à condition de prévenir l’équipe BNT.' },
    { q: 'Et si l’angoisse est trop forte pour relancer ?', a: 'C’est légitime. Quelques séances psy ciblées avant ou pendant les premiers mois de grossesse aident la majorité des femmes. Le projet bébé n’est jamais une urgence — c’est un choix.' },
  ],
  parcours_coordonne_standard: [
    { q: 'Pourquoi ce parcours plutôt qu’un autre ?', a: 'Vos réponses ne pointent pas vers une priorité unique (médicale, psy, complexité) : le parcours classique en 4 étapes couvre l’essentiel sans surdimensionner. Vous pouvez basculer vers un parcours plus ciblé à tout moment.' },
    { q: 'Combien ça coûte ?', a: 'L’appel d’accueil et le guide papier sont gratuits. Les consultations médicales et psy sont remboursées dans les conditions habituelles (sécu + mutuelle, MonSoutienPsy pour les psy). Le groupe de parole est inclus.' },
    { q: 'Puis-je sauter une étape ?', a: 'Oui — c’est même prévu. Le kit est un repère, pas un protocole. Vous prenez ce qui vous est utile.' },
    { q: 'Et si rien ne va plus dans 3 semaines ?', a: 'Vous nous écrivez. Le parcours est ré-orientable à tout moment vers un parcours plus médical, plus psy, ou plus spécialisé.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Verbatim : 1 témoignage par orientation pour humaniser
// ─────────────────────────────────────────────────────────────────────────────

export type Verbatim = {
  citation: string;
  signature: string;
};

export const VERBATIM: Record<OrientationCode, Verbatim> = {
  urgence_medicale: {
    citation: '« J’hésitais à appeler le 15 — j’avais peur de déranger. Je l’ai fait, et ils m’ont juste dit “vous avez bien fait”. C’est tout ce que j’avais besoin d’entendre. »',
    signature: 'Sarah, 32 ans',
  },
  grossesse_suivante_fast_track: {
    citation: '« Pour cette deuxième grossesse, savoir que j’avais un calendrier d’échos rapprochées a tout changé. Je ne comptais plus les jours dans le vide — j’avais des étapes. »',
    signature: 'Léa, 29 ans',
  },
  priorite_medicale: {
    citation: '« Ma gynéco a pris le temps de m’expliquer, dessin à l’appui. C’est bête mais c’est ça qui m’a fait sortir de la culpabilité — comprendre que mon corps n’avait pas “raté” quelque chose. »',
    signature: 'Inès, 34 ans',
  },
  priorite_psychologique: {
    citation: '« Le groupe de parole a été l’endroit où je n’avais plus à expliquer. On savait toutes. Pour la première fois en six mois, j’ai pu pleurer sans devoir rassurer celui qui m’écoutait. »',
    signature: 'Marion, 36 ans',
  },
  parcours_complexe_ou_recurrent: {
    citation: '« Trois pertes en deux ans. Le bilan n’a pas tout expliqué — mais il m’a sortie de l’idée que c’était “de ma faute”. Et le care manager m’a évité 4 mois d’errance entre les spés. »',
    signature: 'Camille, 38 ans',
  },
  preconception: {
    citation: '« On a fait la consult de préconception avant de relancer. Une heure de questions, et je suis sortie en sachant exactement quoi faire et qui appeler si ça démarrait. C’était la première fois que je me sentais préparée. »',
    signature: 'Aurélie, 31 ans',
  },
  parcours_coordonne_standard: {
    citation: '« Je ne savais pas par où commencer. L’appel d’accueil m’a donné un cadre — pas un planning rigide, juste : “voilà ce qui est possible, vous prenez ce qui vous va”. C’est exactement ce dont j’avais besoin. »',
    signature: 'Hélène, 33 ans',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Vos droits, en clair — les 4 droits-clés en post-fausse-couche, adaptés
// selon le stade dans le parcours (réponse A4) et le positionnement (A1).
// ─────────────────────────────────────────────────────────────────────────────

export type Droit = {
  cle: string;
  titre: string;
  contenu: string;
  source?: string;
  /** Si true, ce droit est mis en avant pour cette personne. */
  prioritaire?: boolean;
};

const DROITS_BASE: Droit[] = [
  {
    cle: 'arret_sans_carence',
    titre: 'Arrêt de travail sans jour de carence',
    contenu:
      'Depuis le 1ᵉʳ janvier 2024, l’arrêt de travail prescrit après une fausse couche (avant 22 SA) est indemnisé dès le 1ᵉʳ jour, sans les 3 jours de carence habituels. Le motif n’a pas à figurer sur le certificat — un arrêt « pour raison médicale » suffit.',
    source: 'Loi du 7 juillet 2023 · article L. 1225-4-3 du Code du travail',
  },
  {
    cle: 'protection_licenciement',
    titre: 'Protection contre le licenciement',
    contenu:
      'Vous ne pouvez pas être licenciée pendant les 10 semaines qui suivent une interruption spontanée de grossesse survenue entre la 14ᵉ et la 21ᵉ semaine d’aménorrhée. Aucune démarche à faire de votre part : la protection est automatique.',
    source: 'Article L. 1225-4-3 du Code du travail',
  },
  {
    cle: 'mon_soutien_psy',
    titre: '12 séances de psychologue 50 % remboursées',
    contenu:
      'Le dispositif Mon Soutien Psy de l’Assurance Maladie permet, sans avance de frais en tiers payant intégral et sans prescription médicale obligatoire, jusqu’à 12 séances par an chez un·e psychologue conventionné·e (50 € la séance, 50 % pris en charge par la Sécu).',
    source: 'Mon Soutien Psy · Assurance Maladie (depuis juin 2024)',
  },
  {
    cle: 'confidentialite',
    titre: 'Confidentialité totale',
    contenu:
      'Vous n’êtes jamais obligée de mentionner le mot « fausse couche » à votre employeur. Le médecin remet un arrêt sans précision de motif. Vos collègues, votre RH, votre manager n’ont aucun droit d’en connaître la cause.',
    source: 'Secret médical · article L. 1110-4 du Code de la santé publique',
  },
];

const DROIT_GROSSESSE_SUIVANTE: Droit = {
  cle: 'declaration_grossesse',
  titre: 'Déclaration de grossesse — vos droits',
  contenu:
    'Dès la confirmation de la nouvelle grossesse, vous pouvez déclarer la grossesse à la Sécu pour bénéficier du remboursement à 100 % des consultations dès le 6ᵉ mois, du congé maternité (16 semaines minimum), et de la protection contre le licenciement pendant toute la grossesse et 10 semaines après le congé.',
  source: 'Articles L. 1225-1 à L. 1225-29 du Code du travail',
};

const DROIT_DEUIL_PERINATAL: Droit = {
  cle: 'conge_deuil',
  titre: 'Congé de deuil et accompagnement',
  contenu:
    'En cas de perte au-delà de 22 SA, un congé de deuil périnatal de 15 jours s’ajoute aux droits maternels classiques. Pour le ou la partenaire : 7 jours d’absence rémunérés, mobilisables dans les 13 semaines.',
  source: 'Article L. 3142-1-1 du Code du travail',
};

const DROIT_PARTENAIRE: Droit = {
  cle: 'partenaire_jours',
  titre: 'Pour la personne à vos côtés',
  contenu:
    'Le ou la partenaire d’une femme ayant vécu une fausse couche peut prendre un arrêt de travail (motif médical, sans précision). Si la perte intervient au-delà de 22 SA, 7 jours d’absence rémunérés sont garantis par la loi.',
  source: 'Code du travail · article L. 3142-1-1',
};

export type DroitsPersonnalises = {
  intro: string;
  droits: Droit[];
};

/**
 * Renvoie un bloc « Vos droits » adapté au stade du parcours.
 * 4 droits universels, complétés par 0-1 droit conditionnel selon les réponses.
 */
export function droitsPersonnalises(
  reponses?: Record<string, string | number>,
): DroitsPersonnalises {
  const a4 = reponses?.A4;
  const a1 = reponses?.A1;

  // Cas 1 : la personne est partenaire (A1 = je_suis_le_partenaire)
  if (a1 === 'je_suis_le_partenaire') {
    return {
      intro:
        'En tant que personne aux côtés d’une femme qui vient de vivre une fausse couche, vous avez aussi des droits — souvent ignorés.',
      droits: [
        DROIT_PARTENAIRE,
        ...DROITS_BASE.filter((d) => d.cle === 'mon_soutien_psy' || d.cle === 'confidentialite'),
      ],
    };
  }

  // Cas 2 : nouvelle grossesse en cours
  if (a4 === 'nouvelle_grossesse_apres_une_perte') {
    return {
      intro:
        'Une nouvelle grossesse démarre. Voici les droits qui vous accompagnent — ceux liés à la perte précédente restent valables, et ceux de la grossesse en cours s’y ajoutent.',
      droits: [
        DROIT_GROSSESSE_SUIVANTE,
        ...DROITS_BASE.filter((d) => d.cle !== 'protection_licenciement'),
      ],
    };
  }

  // Cas 3 : phase récente post-diagnostic (< 15 jours, 15j-3 mois)
  // → on met en avant l’arrêt + la protection licenciement
  if (
    a4 === 'moins_de_15_jours' ||
    a4 === 'entre_15_jours_et_3_mois'
  ) {
    return {
      intro:
        'Vous avez le droit de vous arrêter, d’être protégée, d’être accompagnée — sans avoir à vous justifier. Voici les 4 droits que la loi française vous garantit.',
      droits: DROITS_BASE.map((d) =>
        d.cle === 'arret_sans_carence' || d.cle === 'protection_licenciement'
          ? { ...d, prioritaire: true }
          : d,
      ),
    };
  }

  // Cas 4 : > 3 mois ou préconception — focus suivi psy + projet futur
  if (a4 === 'plus_de_3_mois') {
    return {
      intro:
        'Plusieurs mois ont passé, mais ces droits restent ouverts — y compris si vous décidez aujourd’hui de prendre un suivi psy ou de vous arrêter pour traverser ce qui revient.',
      droits: DROITS_BASE.map((d) =>
        d.cle === 'mon_soutien_psy' ? { ...d, prioritaire: true } : d,
      ),
    };
  }

  // Cas par défaut : tous les droits, sans priorisation particulière
  return {
    intro:
      'Voici les 4 droits-clés en France après une fausse couche. Ils vous appartiennent, sans démarche particulière, dès le diagnostic.',
    droits: DROITS_BASE,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Export iCalendar (.ics) — génère un fichier qui ajoute les rendez-vous
// recommandés au calendrier de la personne (Apple, Google, Outlook).
// ─────────────────────────────────────────────────────────────────────────────

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** Format DTSTAMP / DTSTART iCalendar : YYYYMMDDTHHMMSSZ (UTC). */
function toICSDate(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}` +
    `T${pad2(date.getUTCHours())}${pad2(date.getUTCMinutes())}${pad2(date.getUTCSeconds())}Z`
  );
}

/** Échappe les caractères spéciaux iCalendar (RFC 5545). */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Génère un fichier .ics avec un VEVENT par étape du parcours.
 * Chaque RDV est positionné à 10h00 locale, durée 1h, avec un rappel J-1 9h.
 */
export function genererICS(
  orientationCode: OrientationCode,
  baseDate: Date = new Date(),
): string {
  const config = ORIENTATIONS[orientationCode];
  const now = toICSDate(new Date());

  const events = config.etapes
    .map((etape, idx) => {
      // RDV à 10h00 locale du jour cible
      const start = new Date(baseDate);
      start.setDate(start.getDate() + etape.delaiJours);
      start.setHours(10, 0, 0, 0);
      const end = new Date(start);
      end.setHours(11, 0, 0, 0);

      const uid = `bnt-${orientationCode}-${etape.code}-${start.getTime()}@babynexttime.fr`;
      const summary = `Baby Next Time — ${etape.titre}`;
      const description = [
        etape.desc,
        '',
        `Avec : ${etape.qui}`,
        `Durée : ${etape.duree}`,
        '',
        `Étape suivante : ${etape.actionLabel} → https://babynexttime.fr${etape.actionHref}`,
      ].join('\n');

      return [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${now}`,
        `DTSTART:${toICSDate(start)}`,
        `DTEND:${toICSDate(end)}`,
        `SUMMARY:${escapeICS(summary)}`,
        `DESCRIPTION:${escapeICS(description)}`,
        `LOCATION:${escapeICS('À organiser — voir lien Baby Next Time')}`,
        `URL:https://babynexttime.fr${etape.actionHref}`,
        `CATEGORIES:Baby Next Time,Parcours de soin`,
        `SEQUENCE:${idx}`,
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${escapeICS(`Rappel : ${etape.titre} demain`)}`,
        'TRIGGER:-PT24H',
        'END:VALARM',
        'END:VEVENT',
      ].join('\r\n');
    })
    .join('\r\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Baby Next Time//Parcours de soin FR//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:Baby Next Time — ${config.title}`,
    'X-WR-TIMEZONE:Europe/Paris',
    events,
    'END:VCALENDAR',
  ].join('\r\n');
}
