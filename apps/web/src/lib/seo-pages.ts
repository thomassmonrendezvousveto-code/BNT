export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  hero: string;
  intro: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const SEO_PAGES: SeoPage[] = [
  {
    slug: 'fausse-couche-que-faire',
    title: 'Fausse couche : que faire maintenant ?',
    description: 'Les premiers repères après une fausse couche : urgence, gestes utiles, droits et prochaines étapes.',
    hero: 'Fausse couche : que faire maintenant ?',
    intro:
      'Quand une fausse couche survient, on a rarement besoin de beaucoup de contenu. On a surtout besoin de savoir quoi faire, dans quel ordre, et vers qui se tourner.',
    bullets: [
      'vérifier s’il existe un besoin médical urgent',
      'poser quelques gestes simples pour les prochaines heures',
      'trouver un relais médical ou psychologique si nécessaire',
      'savoir quand le questionnaire peut aider',
    ],
    ctaLabel: 'Voir la page d’appui immédiate',
    ctaHref: '/je-viens-de-vivre',
  },
  {
    slug: 'fausse-couche-arret-travail',
    title: 'Fausse couche et arrêt de travail',
    description: 'Comprendre simplement l’arrêt de travail après une fausse couche et les repères utiles pour l’employeur.',
    hero: 'Fausse couche et arrêt de travail',
    intro:
      'Après une fausse couche, le repos peut être une nécessité. Cette page rappelle l’essentiel sans vous noyer dans un cours de droit.',
    bullets: [
      'un arrêt peut être nécessaire physiquement ou psychiquement',
      'l’indemnisation sans jour de carence existe dans certains cas',
      'vous n’avez pas à tout raconter à votre employeur',
      'un message prêt à copier peut suffire',
    ],
    ctaLabel: 'Voir les messages utiles',
    ctaHref: '/je-viens-de-vivre',
  },
  {
    slug: 'fausse-couche-partenaire',
    title: 'Fausse couche : quelle place pour le partenaire ?',
    description: 'Des repères pour les partenaires après une fausse couche : comprendre, soutenir, traverser ensemble.',
    hero: 'Fausse couche : quelle place pour le partenaire ?',
    intro:
      'Le partenaire peut se sentir présent, impuissant, de trop, ou complètement silencieux. Cette place mérite aussi d’être pensée.',
    bullets: [
      'les rythmes émotionnels peuvent être très différents',
      'on peut soutenir sans se rendre invisible',
      'un accompagnement de couple peut être utile',
      'certaines ressources sont pensées spécifiquement pour les partenaires',
    ],
    ctaLabel: 'Voir les groupes et ressources',
    ctaHref: '/groupes',
  },
  {
    slug: 'fausse-couche-retour-au-travail',
    title: 'Retour au travail après une fausse couche',
    description: 'Comment penser le retour au travail après une fausse couche, sans se brusquer et sans s’expliquer davantage que nécessaire.',
    hero: 'Retour au travail après une fausse couche',
    intro:
      'Le retour au travail peut être un deuxième choc. Cette page rassemble les premiers repères pour le préparer avec un peu plus de douceur.',
    bullets: [
      'prévoir ce qu’on veut dire ou non',
      'repérer le bon moment pour reprendre',
      's’autoriser à demander un arrêt si besoin',
      'préparer une phrase simple pour protéger son énergie',
    ],
    ctaLabel: 'Trouver les bons repères',
    ctaHref: '/ressources',
  },
  {
    slug: 'plus-de-desir-apres-fausse-couche',
    title: 'Plus de désir après une fausse couche',
    description: 'Quand le désir de grossesse, de sexualité ou de projection disparaît après une fausse couche : repères simples.',
    hero: 'Plus de désir après une fausse couche',
    intro:
      'Après une fausse couche, le désir peut se brouiller. Cela peut concerner la sexualité, un nouveau projet d’enfant, ou même l’envie de parler.',
    bullets: [
      'l’absence de désir peut être une réponse de protection',
      'le couple ne vit pas toujours cela au même rythme',
      'il n’y a pas d’obligation à relancer un projet rapidement',
      'un espace de parole peut aider à remettre du mouvement',
    ],
    ctaLabel: 'Voir le questionnaire',
    ctaHref: '/questionnaire',
  },
  {
    slug: 'peur-de-retomber-enceinte',
    title: 'Peur de retomber enceinte après une fausse couche',
    description: 'Des repères sur la peur de retomber enceinte après une fausse couche et la préparation d’un nouveau projet.',
    hero: 'Peur de retomber enceinte après une fausse couche',
    intro:
      'Vouloir une nouvelle grossesse et la redouter en même temps est fréquent. Cette ambivalence ne dit rien contre vous.',
    bullets: [
      'la peur peut persister même quand le corps est prêt',
      'une consultation de réassurance peut aider',
      'le partenaire peut vivre d’autres peurs encore',
      'on peut préparer un nouveau projet sans se forcer à aller vite',
    ],
    ctaLabel: 'Voir le parcours de suite',
    ctaHref: '/parcours',
  },
];

export const SEO_PAGE_BY_SLUG = Object.fromEntries(SEO_PAGES.map((page) => [page.slug, page])) as Record<string, SeoPage>;
