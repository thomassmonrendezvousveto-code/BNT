import Link from 'next/link';
import type { Metadata } from 'next';
import { CopyButton } from '@/components/copy-button';

export const metadata: Metadata = {
  title: 'Premiers jours après le diagnostic — Baby Next Time',
  description:
    'Vous venez d’apprendre que vous traversez une fausse couche. Voici des repères doux pour les jours qui suivent : ce qui peut arriver, comment l’expliquer, vos droits, et la suite.',
};

const TEXTE_PROCHE = `Bonjour,

J’ai appris que je traverse une fausse couche.
Je n’ai pas forcément l’énergie d’en parler davantage tout de suite, mais j’avais besoin de te le dire.
Si tu veux m’aider, le plus utile pour le moment est simplement d’être là, sans chercher à minimiser ou à trouver les bons mots.

Je te recontacterai quand je pourrai.`;

const TEXTE_EMPLOYEUR = `Bonjour,

Je vous informe que je traverse une fausse couche, confirmée par un professionnel de santé. Je vais avoir besoin de quelques jours d’arrêt et reviendrai vers vous dès que possible avec les éléments concrets.

Merci pour votre compréhension.

Cordialement.`;

export default function PageJeViensDeVivre() {
  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <p className="section-kicker">Premiers jours après le diagnostic</p>
          <h1>Vous venez d’apprendre. On vous accompagne pour la suite.</h1>
          <p className="section-intro" style={{ maxWidth: 720 }}>
            Le diagnostic vient de tomber. Voici des repères simples pour les prochains jours — sans pression, à votre
            rythme. Vous pouvez tout lire maintenant, ou y revenir plus tard.
          </p>
        </div>
      </section>

      <section className="section soft" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="section-kicker">Pour les prochains jours</p>
          <h2>Quatre appuis simples.</h2>

          <div className="three-columns" style={{ marginTop: 28 }}>
            <article className="feature-card">
              <h3>Vous poser</h3>
              <p>Vous asseoir, vous allonger, respirer. Rien à prouver, rien à accélérer.</p>
            </article>
            <article className="feature-card">
              <h3>Prévenir une seule personne</h3>
              <p>Pas tout le monde. Une personne qui pourra juste être là, sans vous faire parler davantage.</p>
            </article>
            <article className="feature-card">
              <h3>Noter trois repères</h3>
              <p>Date du diagnostic, semaine de grossesse, ce qu’on vous a dit. Pour vos prochains rendez-vous.</p>
            </article>
            <article className="feature-card">
              <h3>Demander un arrêt si besoin</h3>
              <p>Le repos peut être une nécessité. Vous n’avez pas à reprendre comme si de rien n’était.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-kicker">Vous n’avez pas à l’expliquer seule</p>
          <h2>Des messages prêts à copier.</h2>

          <div className="three-columns" style={{ marginTop: 28, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            <article className="feature-card">
              <span className="card-kicker">À un proche</span>
              <h3>Dire juste l’essentiel</h3>
              <pre className="code" style={{ whiteSpace: 'pre-wrap' }}>{TEXTE_PROCHE}</pre>
              <div className="actions" style={{ marginTop: 14 }}>
                <CopyButton text={TEXTE_PROCHE} label="Copier le message" />
              </div>
            </article>
            <article className="feature-card">
              <span className="card-kicker">À l’employeur</span>
              <h3>Annoncer un arrêt sans tout détailler</h3>
              <pre className="code" style={{ whiteSpace: 'pre-wrap' }}>{TEXTE_EMPLOYEUR}</pre>
              <div className="actions" style={{ marginTop: 14 }}>
                <CopyButton text={TEXTE_EMPLOYEUR} label="Copier le message" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <p className="section-kicker">Vos droits</p>
          <h2>Très simplement.</h2>
          <div className="three-columns" style={{ marginTop: 28 }}>
            <article className="feature-card">
              <h3>Arrêt sans jour de carence</h3>
              <p>Depuis 2024, l’arrêt de travail après une fausse couche est indemnisé dès le premier jour.</p>
            </article>
            <article className="feature-card">
              <h3>Pas besoin d’un long récit</h3>
              <p>Un arrêt médical suffit. Vous n’avez pas à entrer dans des détails que vous ne voulez pas donner.</p>
            </article>
            <article className="feature-card">
              <h3>Un appui peut être utile vite</h3>
              <p>Une sage-femme, un·e psychologue ou un·e gynécologue peuvent aider à remettre un peu d’ordre ensuite.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-kicker">Quand vous serez prête</p>
          <h2>La suite, en quatre portes simples.</h2>
          <div className="quick-access" style={{ marginTop: 28 }}>
            <Link className="quick-card" href="/questionnaire">
              <span className="card-kicker">Questionnaire</span>
              <strong>Faire le questionnaire</strong>
              <span>Pour identifier ce dont vous avez le plus besoin et recevoir un kit personnalisé.</span>
            </Link>
            <Link className="quick-card" href="/professionnels">
              <span className="card-kicker">Orientation</span>
              <strong>Trouver un professionnel</strong>
              <span>Un·e sage-femme, un·e psy, un·e gynécologue qui sache accueillir cela.</span>
            </Link>
            <Link className="quick-card" href="/groupes">
              <span className="card-kicker">Accompagnement</span>
              <strong>Rejoindre un groupe</strong>
              <span>Quand un espace de parole collectif devient juste pour vous.</span>
            </Link>
            <Link className="quick-card" href="/ressources">
              <span className="card-kicker">Repères</span>
              <strong>Lire les ressources</strong>
              <span>Si vous avez besoin de comprendre davantage, plus tard.</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
