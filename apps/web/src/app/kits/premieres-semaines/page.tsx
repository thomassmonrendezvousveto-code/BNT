import Link from 'next/link';
import type { Metadata } from 'next';
import { PrintKitButton } from '@/components/print-kit-button';

export const metadata: Metadata = {
  title: 'Kit des premières semaines — Baby Next Time',
  description:
    'Un guide doux, clair et imprimable pour les premières semaines après le diagnostic d’une fausse couche.',
};

const gestes = [
  {
    title: 'Vous poser et respirer',
    text:
      'Même quelques minutes dans le calme. Ce qui vient de se passer est réel. Vous n’avez rien à prouver, rien à accélérer.',
  },
  {
    title: 'Prévenir une personne de confiance',
    text:
      'Votre partenaire, une amie, un proche. Pas forcément pour raconter tout de suite, simplement pour ne pas rester seule avec ce que vous vivez.',
  },
  {
    title: 'Noter les informations médicales utiles',
    text:
      'Date, semaine de grossesse, ce qu’on vous a dit, ce que vous devez surveiller, les examens prévus. Cela vous aidera quand le choc retombera un peu.',
  },
  {
    title: 'Vous autoriser à ralentir',
    text:
      'Un arrêt de travail peut être nécessaire. Le repos n’est pas une faiblesse. C’est parfois la condition pour traverser ce moment sans s’effondrer.',
  },
];

const reperes = [
  'Vous pouvez ressentir du vide, de la colère, de la honte, du soulagement, ou rien de très net. Tout cela peut coexister.',
  'Le corps et le cœur ne vont pas au même rythme. On peut se sentir “mieux” physiquement et très mal intérieurement.',
  'Le partenaire peut vivre quelque chose de très fort aussi, parfois de manière plus silencieuse.',
  'Il n’existe pas de bonne façon de traverser une fausse couche. Seulement des appuis plus ou moins aidants.',
];

export default function KitPremieresSemainesPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="kit-guide-hero">
            <div>
              <p className="section-kicker">Kit Baby Next Time</p>
              <h1>Les premières semaines après une fausse couche.</h1>
              <p className="section-intro" style={{ maxWidth: 760 }}>
                Un guide simple pour vous aider à traverser les premiers jours et les premières semaines, avec des
                repères concrets, sans injonction et sans vocabulaire froid.
              </p>

              <div className="actions no-print" style={{ marginTop: 24 }}>
                <PrintKitButton />
                <Link className="btn" href="/questionnaire">
                  Commencer le questionnaire
                </Link>
              </div>
            </div>

            <aside className="kit-guide-side">
              <img src="/baby-next-time-logo.png" alt="Baby Next Time" />
              <p>Vous accompagner, à chaque étape.</p>
              <p>Information fiable, professionnel·les formé·es, soutien sans jugement.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-kicker">Aujourd’hui</p>
          <h2>Quatre gestes utiles, tout de suite.</h2>
          <div className="three-columns" style={{ marginTop: 28 }}>
            {gestes.map((g) => (
              <article className="feature-card" key={g.title}>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="grid">
            <div className="col-7 card" style={{ padding: 28 }}>
              <p className="section-kicker">Repères émotionnels</p>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}>Ce que vous ressentez a le droit d’exister.</h2>
              <ul className="list" style={{ marginTop: 18 }}>
                {reperes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="col-5 card" style={{ padding: 28 }}>
              <p className="section-kicker">Pour le couple</p>
              <h3 style={{ marginTop: 0 }}>À deux, les rythmes peuvent être différents.</h3>
              <p>
                L’un peut avoir besoin de parler tout de suite, l’autre non. L’un peut vouloir comprendre, l’autre
                juste tenir. Cela ne veut pas dire qu’un des deux souffre moins.
              </p>
              <p>
                Si vous le pouvez, choisissez une phrase simple pour vous retrouver : <em>“On n’a pas besoin de vivre
                ça pareil pour le traverser ensemble.”</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-kicker">Par où continuer</p>
          <h2>Les prochains appuis possibles.</h2>
          <div className="three-columns" style={{ marginTop: 28 }}>
            <Link href="/label" className="feature-card link-card">
              <span className="card-kicker">Un soignant</span>
              <h3>Trouver quelqu’un qui saura accueillir</h3>
              <p>Sage-femme, psychologue, gynécologue : un annuaire pensé pour l’après, pas seulement pour l’urgence.</p>
              <span className="card-cta">Voir le label →</span>
            </Link>
            <Link href="/groupes" className="feature-card link-card">
              <span className="card-kicker">Un espace de parole</span>
              <h3>Ne pas traverser cela seule</h3>
              <p>Découvrir les groupes de parole et le Premier cercle, en petit groupe, dans un cadre doux et sérieux.</p>
              <span className="card-cta">Voir les groupes →</span>
            </Link>
            <Link href="/ressources" className="feature-card link-card">
              <span className="card-kicker">Des repères</span>
              <h3>Lire, écouter, comprendre</h3>
              <p>Podcasts, témoignages, guides et fiches pratiques pour reprendre pied à votre rythme.</p>
              <span className="card-cta">Voir les ressources →</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
