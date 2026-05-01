import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Questions fréquentes — Baby Next Time',
  description:
    'Réponses claires aux questions sur la fausse couche : urgences, coûts, suivi médical, soutien psy, droits au travail, nouvelle grossesse, et le projet Baby Next Time.',
};

type FaqEntry = {
  q: string;
  a: string | string[]; // string ou liste de paragraphes
};

type FaqSection = {
  id: string;
  kicker: string;
  titre: string;
  intro?: string;
  items: FaqEntry[];
};

const sections: FaqSection[] = [
  {
    id: 'premiers-jours',
    kicker: 'Premiers jours',
    titre: 'Après le diagnostic',
    intro: 'Vous venez d’apprendre. Voilà ce qui aide dans les premières heures et les premiers jours.',
    items: [
      {
        q: 'Mon diagnostic est confirmé, que faire dans les premières heures ?',
        a: [
          'Vous avez le droit de ne rien faire d’autre que vous reposer ce jour-là. Il n’y a aucun rendez-vous obligatoire dans l’immédiat.',
          'Dans les heures qui viennent : prévenez une personne de confiance (partenaire, proche, ami·e). Annulez les engagements non-essentiels des 48 prochaines heures. Si vous travaillez, un arrêt court est légitime — votre médecin traitant peut le prescrire par téléconsultation.',
        ],
      },
      {
        q: 'Combien de temps les saignements peuvent-ils durer ?',
        a: 'Entre 3 jours et 2 semaines selon les situations. Si les saignements s’intensifient au lieu de diminuer après 48-72 h, ou s’ils deviennent malodorants, recontactez votre soignant·e sans attendre.',
      },
      {
        q: 'Quelles sont les étapes du parcours BNT ensuite ?',
        a: 'Après le diagnostic, le parcours BNT propose 6 étapes optionnelles, échelonnées sur les semaines et mois qui suivent : appel d’accueil avec une sage-femme, consultation médicale de relais, suivi psy individuel ou en groupe, accompagnement couple, et, si vous le souhaitez plus tard, préparation à une nouvelle grossesse. Vous choisissez où entrer, où vous arrêter, où reprendre.',
      },
      {
        q: 'Je n’ai personne à qui en parler — qui peut m’écouter ?',
        a: 'L’appel d’accueil de 30 minutes avec une sage-femme BNT est gratuit. Pas un interrogatoire, pas de questionnaire — juste être entendue. Vous pouvez le demander dans les 48 h via le formulaire de contact.',
      },
    ],
  },
  {
    id: 'couts',
    kicker: 'Argent',
    titre: 'Coûts et remboursements',
    intro: 'Ce qui est gratuit, ce qui est remboursé, ce qui reste à votre charge.',
    items: [
      {
        q: 'Tout est-il payant chez Baby Next Time ?',
        a: 'Non. L’appel d’accueil de 30 minutes avec une sage-femme BNT est gratuit. Le guide papier « Les 4 premières semaines » est offert. Le questionnaire d’orientation et les kits personnalisés sont gratuits. Seuls les groupes de parole et les ateliers de préparation à la grossesse suivante sont payants — avec une participation symbolique (de 0 à 120 € pour des cycles de 4 à 6 séances).',
      },
      {
        q: 'Que rembourse la Sécurité sociale ?',
        a: 'Les consultations médicales (gynécologue, sage-femme) sont remboursées dans les conditions habituelles : 70 % du tarif conventionné par la sécu, complété par votre mutuelle. En secteur 1, vous n’avez en général aucune avance de frais avec la carte Vitale et une mutuelle responsable.',
      },
      {
        q: 'Et les séances de psy, c’est remboursé ?',
        a: 'Oui, en partie, via le dispositif MonSoutienPsy de l’Assurance Maladie : jusqu’à 12 séances par an chez un·e psychologue partenaire, remboursées à 60 % par la sécu et le complément par la mutuelle. Hors dispositif, les séances coûtent en général entre 50 et 80 €, parfois remboursées par les mutuelles selon les contrats.',
      },
      {
        q: 'Et si je n’ai pas de mutuelle ?',
        a: 'Vous restez couverte à 70 % par la sécu pour les consultations. Si vos revenus sont modestes, vous pouvez avoir droit à la Complémentaire santé solidaire (C2S) — gratuite ou à coût réduit selon les revenus. La sage-femme BNT peut vous orienter sur la marche à suivre.',
      },
      {
        q: 'Combien coûte un parcours BNT complet ?',
        a: [
          'En moyenne : 0 à 250 € de reste à charge pour l’ensemble du parcours (S0 à S5), selon que vous prenez le groupe de parole, les ateliers prénatal+ et l’accompagnement couple.',
          'Pour la cohorte pilote 2026 (6 places, septembre-novembre), la participation est de 39 € entièrement remboursée à la fin si vous allez au bout du parcours.',
        ],
      },
    ],
  },
  {
    id: 'medical',
    kicker: 'Corps',
    titre: 'Accompagnement médical',
    intro: 'Ce qui se passe physiquement, comment le suivre, quand reconsulter.',
    items: [
      {
        q: 'Vais-je avoir besoin d’un curetage ou d’un médicament ?',
        a: 'Cela dépend de l’évolution naturelle. Trois options sont possibles : attente surveillée (le corps évacue tout seul), médicament (misoprostol par voie orale ou vaginale), ou geste chirurgical (aspiration sous anesthésie). La consultation médicale est faite pour décider AVEC vous, pas pour vous l’imposer. Vous avez le droit de poser toutes vos questions.',
      },
      {
        q: 'Combien de temps avant que mon corps revienne à la normale ?',
        a: 'Le retour des règles intervient généralement entre 4 et 8 semaines après la fin de la fausse couche. Les saignements directs peuvent durer 1 à 2 semaines. La fatigue physique peut persister plusieurs semaines. Le corps a son rythme — votre soignant·e fixera des repères pour vous.',
      },
      {
        q: 'Une fausse couche signifie-t-elle que j’aurai des difficultés à concevoir ?',
        a: 'Non, dans l’immense majorité des cas. Une fausse couche isolée n’altère pas la fertilité. Les chances de mener une grossesse à terme dans l’année qui suit sont très proches de la population générale. Au-delà de 2 pertes consécutives, un bilan étiologique peut être proposé pour explorer les causes.',
      },
      {
        q: 'Combien de temps avant de pouvoir reconcevoir, médicalement parlant ?',
        a: 'Il n’y a pas de délai obligatoire après une fausse couche précoce non compliquée — vous pouvez reconcevoir dès le retour de cycle si vous le souhaitez. Émotionnellement, c’est une autre histoire : c’est très individuel. La consultation de préconception est faite pour poser ça calmement, pas pour décider à votre place.',
      },
      {
        q: 'Vais-je être plus suivie pour la prochaine grossesse ?',
        a: 'Oui, si vous le demandez. BNT propose un parcours « grossesse suivante prioritaire » : calendrier d’échographies de réassurance plus rapproché jusqu’à 12 SA, soutien psy court intégré (4-6 séances), accès rapide en cas d’angoisse. Ce suivi bascule automatiquement quand vous prévenez l’équipe BNT du début d’une nouvelle grossesse.',
      },
    ],
  },
  {
    id: 'psy',
    kicker: 'Tête et cœur',
    titre: 'Soutien psychologique',
    intro: 'Quand consulter, quel format choisir, ce qu’on travaille.',
    items: [
      {
        q: 'Je n’ai pas envie d’en parler — vais-je devoir tout raconter ?',
        a: 'Non. L’appel d’écoute n’est pas un interrogatoire. Vous racontez ce que vous voulez, dans l’ordre que vous voulez. Beaucoup de femmes commencent par : « je ne sais pas par où commencer », et c’est très bien. Le silence aussi a sa place.',
      },
      {
        q: 'Le groupe de parole, j’ai peur que ce soit trop intense.',
        a: 'Le format est volontairement contenu : 6 séances de 90 minutes, mêmes participantes du début à la fin, animées par une psychologue formée à la périnatalité. Vous pouvez n’écouter qu’écouter au début. Beaucoup disent que c’est l’étape qui a le plus changé leur traversée — précisément parce qu’on n’a plus à expliquer.',
      },
      {
        q: 'Et un suivi psy individuel, c’est utile dans mon cas ?',
        a: 'C’est utile pour la majorité des femmes, même quand « ça va ». Quelques séances ciblées (3 à 8) suffisent souvent — pas un engagement long. Le psy travaille avec vous sur la culpabilité, le lien au bébé perdu, la place du partenaire, la reprise professionnelle, la projection dans une nouvelle grossesse.',
      },
      {
        q: 'Mon entourage minimise — comment faire ?',
        a: 'C’est très fréquent (« c’est arrivé à plein de monde », « tu pourras en refaire un », « c’était trop tôt »). Le travail psy aide à reposer ses limites sans casser les liens. Le groupe de parole offre un endroit où votre vécu est compris d’emblée — sans avoir à le justifier.',
      },
      {
        q: 'Je vais bien — ai-je quand même besoin d’un accompagnement ?',
        a: 'Pas forcément, et c’est une réponse complètement légitime. BNT n’oblige à rien. Si vous vous sentez ressourcée, entourée et en paix, vous pouvez ne prendre que ce qui vous parle (par exemple le kit en ligne et rien d’autre). On reste joignable si jamais ça change dans les semaines suivantes.',
      },
    ],
  },
  {
    id: 'couple',
    kicker: 'Avec les autres',
    titre: 'Couple, partenaire, entourage',
    intro: 'Comment en parler, comment être soutenue, comment soutenir l’autre.',
    items: [
      {
        q: 'Comment en parler à mon partenaire qui réagit différemment ?',
        a: 'Le deuil ne se vit pas au même rythme à deux — c’est la règle, pas l’exception. L’un peut vouloir « passer à autre chose » quand l’autre a besoin de revenir dessus. Ni l’un ni l’autre n’a tort. L’accompagnement couple (2 à 4 séances avec un·e thérapeute formé·e au deuil périnatal) aide à mettre des mots sur ces décalages avant qu’ils ne deviennent du ressentiment.',
      },
      {
        q: 'Mon partenaire peut-il participer aux étapes du parcours ?',
        a: 'Oui, sur plusieurs : l’appel d’accueil S0 (s’il le souhaite), l’accompagnement couple S4, certains ateliers prénatal+ S5. BNT propose aussi un mini-kit partenaire (1 page) avec des phrases qui aident, des phrases qui blessent, et des actions concrètes — vous pouvez le lui transmettre directement.',
      },
      {
        q: 'Que dire (ou ne pas dire) à mes proches ?',
        a: 'À votre rythme, et à qui vous voulez. Vous n’êtes pas obligée d’expliquer. Une formule courte qui marche bien : « j’ai vécu une fausse couche, je suis accompagnée, j’ai surtout besoin de calme et de patience pour les semaines qui viennent ». Le kit téléchargeable contient des modèles de message pour les proches, l’employeur, et un message pour soi-même.',
      },
      {
        q: 'Et si je vis ça seule ?',
        a: 'BNT est pensée d’abord pour vous, pas pour un couple. Tous les parcours, ressources et accompagnements sont accessibles sans partenaire. La sage-femme BNT et le groupe de parole peuvent constituer le premier réseau de soutien si l’entourage proche manque ou ne sait pas vous accompagner.',
      },
    ],
  },
  {
    id: 'travail',
    kicker: 'Vie pro',
    titre: 'Travail, droits, employeur',
    intro: 'Vos droits légaux, comment les activer, comment en parler au travail.',
    items: [
      {
        q: 'Combien de temps d’arrêt ai-je le droit de prendre ?',
        a: 'Pas de durée légale fixée, mais les arrêts courts (3 à 14 jours) sont fréquents et tout à fait légitimes après une fausse couche, physiquement comme émotionnellement. Votre médecin traitant ou votre gynécologue peut prescrire l’arrêt — y compris en téléconsultation. Aucune justification détaillée n’est exigée par l’employeur.',
      },
      {
        q: 'Mon partenaire a-t-il droit à un congé ?',
        a: 'Oui. Depuis 2023, le partenaire d’une femme ayant subi une interruption spontanée de grossesse a droit à 3 jours de congé pour évènement familial, sans condition d’ancienneté. L’employeur ne peut pas le refuser. Source : article L3142-4 du Code du travail.',
      },
      {
        q: 'Que dire à mon employeur ?',
        a: 'Le minimum suffit : « je traverse une fausse couche, confirmée par un professionnel de santé. Je vais transmettre mon arrêt de travail. » Aucune obligation de détailler. Le kit téléchargeable contient un modèle de mail prêt à envoyer.',
      },
      {
        q: 'Je suis interdite de licenciement pendant combien de temps ?',
        a: 'Depuis la loi de 2023, aucun licenciement ne peut être prononcé pendant les 10 semaines qui suivent la fausse couche (sauf faute grave ou impossibilité de maintenir le contrat pour un motif étranger). Cette protection s’ajoute aux protections classiques contre les discriminations.',
      },
    ],
  },
  {
    id: 'nouvelle-grossesse',
    kicker: 'Et après',
    titre: 'Une nouvelle grossesse',
    intro: 'Quand, comment, avec quel accompagnement.',
    items: [
      {
        q: 'Quel est le bon délai avant de retenter ?',
        a: 'Médicalement, après une fausse couche précoce non compliquée, il n’y a pas de délai obligatoire. Émotionnellement, c’est très individuel — certaines se sentent prêtes au cycle suivant, d’autres ont besoin de plusieurs mois ou années. La consultation de préconception est faite pour poser ça calmement, pas pour décider à votre place.',
      },
      {
        q: 'Que prendre en complément (vitamines, acide folique) ?',
        a: 'L’acide folique 400 µg/jour est recommandé dès l’envie de grossesse, idéalement 1 mois avant la conception. Vitamine D et iode sont parfois prescrits selon le bilan. Votre soignant·e ajustera selon vos antécédents.',
      },
      {
        q: 'Et si l’angoisse est trop forte pour relancer un projet ?',
        a: 'C’est légitime, et très fréquent. Quelques séances psy ciblées avant ou pendant les premiers mois de grossesse aident la majorité des femmes. L’atelier prénatal+ proposé en S5 est précisément conçu pour ça : anxiété de grossesse, plan de naissance rassurant, gestion des écho de contrôle. Le projet bébé n’est jamais une urgence — c’est un choix.',
      },
      {
        q: 'Si je retombe enceinte, comment serai-je suivie ?',
        a: 'Vous prévenez l’équipe BNT : vous basculez automatiquement sur un parcours grossesse suivante prioritaire — calendrier d’échographies de réassurance plus rapproché, soutien psy court intégré, accès rapide en cas d’angoisse. C’est le retour le plus fréquent : « savoir que j’avais des étapes a tout changé ».',
      },
    ],
  },
  {
    id: 'projet',
    kicker: 'Le projet',
    titre: 'Baby Next Time, c’est quoi exactement ?',
    intro: 'Qui est derrière, comment c’est financé, comment rejoindre le réseau.',
    items: [
      {
        q: 'Qui est derrière Baby Next Time ?',
        a: 'BNT est un projet indépendant fondé par Thomas Savey et Chloé Azpiazu en 2026, accompagné par un comité scientifique composé de gynécologues, sages-femmes et psychologues spécialisés dans la périnatalité. Voir la page À propos et Comité scientifique pour plus de détails.',
      },
      {
        q: 'Comment est-ce financé ?',
        a: 'BNT est indépendant, sans levée de fonds. Le modèle repose sur trois sources : la participation symbolique aux groupes et ateliers (autour de 20-30 % du budget), des partenariats avec des entreprises souhaitant proposer un accompagnement périnatalité à leurs salarié·es (programme pilote 2026), et le mécénat de fondations engagées sur la santé des femmes.',
      },
      {
        q: 'Comment puis-je devenir soignant·e labellisé·e BNT ?',
        a: 'Si vous êtes gynécologue, sage-femme ou psychologue formé·e à la périnatalité et à l’accompagnement après une fausse couche, vous pouvez candidater au label BNT depuis la page Le label BNT. Le label engage à respecter une charte (formation, supervision, tarifs transparents, secteur 1 ou pratique sans dépassement excessif).',
      },
      {
        q: 'Mes données personnelles sont-elles protégées ?',
        a: 'Oui. BNT est responsable de traitement au sens du RGPD. Les réponses au questionnaire sont stockées de façon pseudonymisée, jamais vendues, jamais transmises à des tiers sans votre consentement explicite. Vous pouvez à tout moment demander la suppression de vos données en écrivant à hello@babynexttime.fr.',
      },
    ],
  },
];

export default function PageFaq() {
  const totalQuestions = sections.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="section-kicker">Questions fréquentes</p>
          <h1>Tout ce qu’on nous demande, rassemblé ici.</h1>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            {totalQuestions} réponses claires, organisées par thème. Si vous ne trouvez pas la vôtre,
            écrivez-nous — on s’engage à répondre sous 48 h ouvrées.
          </p>

          <nav className="faq-toc" aria-label="Sommaire des questions">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="faq-toc-link">
                <span className="faq-toc-kicker">{s.kicker}</span>
                <span className="faq-toc-titre">{s.titre}</span>
                <span className="faq-toc-count">{s.items.length} questions</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.id} className="section soft" id={section.id} style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="container" style={{ maxWidth: 920 }}>
            <p className="section-kicker">{section.kicker}</p>
            <h2>{section.titre}</h2>
            {section.intro ? (
              <p style={{ color: 'var(--muted)', maxWidth: 720, marginBottom: 28 }}>{section.intro}</p>
            ) : null}

            <div className="faq" style={{ marginTop: 16 }}>
              {section.items.map((item, idx) => (
                <details className="faq-item" key={`${section.id}-${idx}`}>
                  <summary>{item.q}</summary>
                  {Array.isArray(item.a) ? (
                    item.a.map((para, i) => <p key={i}>{para}</p>)
                  ) : (
                    <p>{item.a}</p>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <div className="card cta-card">
            <div>
              <p className="section-kicker">Vous ne trouvez pas votre question ?</p>
              <h2>On répond personnellement, sous 48 h.</h2>
              <p style={{ maxWidth: 720, color: 'var(--muted)' }}>
                Une sage-femme ou un·e psy de l’équipe BNT vous répond directement. Pas de bot, pas de
                formulaire perdu : un email, une vraie réponse.
              </p>
            </div>
            <div className="actions">
              <Link className="btn" href="/contact">Poser ma question</Link>
              <Link className="btn secondary" href="/parcours">Voir le parcours de soin</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
