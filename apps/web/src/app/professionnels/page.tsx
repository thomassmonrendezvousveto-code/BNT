import Link from 'next/link';
import type { Metadata } from 'next';
import { LabelDirectory } from '@/components/label-directory';

export const metadata: Metadata = {
  title: 'Trouver un professionnel — Baby Next Time',
  description:
    'Un annuaire orienté après fausse couche pour trouver un·e sage-femme, un·e psychologue ou un·e gynécologue qui sache accueillir.',
};

export default function ProfessionnelsPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="section-kicker">Trouver un professionnel</p>
          <h1>Trouver quelqu’un qui saura accueillir.</h1>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Après une fausse couche, on n’a pas seulement besoin d’un rendez-vous. On a besoin d’un·e professionnel·le
            capable d’expliquer, de ne pas banaliser, et d’orienter sans maladresse.
          </p>

          <div className="three-columns" style={{ marginTop: 28 }}>
            <article className="feature-card">
              <span className="card-kicker">Sage-femme</span>
              <h3>Pour refaire le point</h3>
              <p>Quand vous avez besoin de repères médicaux simples, d’un temps d’écoute et d’une orientation lisible.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Psychologue</span>
              <h3>Pour ne pas rester seule avec l’après</h3>
              <p>Quand la charge émotionnelle prend toute la place, tout de suite ou plusieurs semaines plus tard.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Gynécologue</span>
              <h3>Pour sécuriser la suite</h3>
              <p>Quand il faut clarifier ce qui s’est passé, vérifier la récupération, ou préparer un nouveau projet.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <LabelDirectory />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card cta-card">
            <div>
              <p className="section-kicker">Besoin d’aide pour choisir ?</p>
              <h2>Le questionnaire peut vous orienter.</h2>
              <p className="section-intro" style={{ maxWidth: 720 }}>
                Si vous hésitez entre un besoin médical, psychologique ou un parcours plus coordonné, commencez par le
                questionnaire. Il est là pour ça.
              </p>
            </div>
            <div className="cta-card-actions">
              <Link className="btn btn-lg" href="/questionnaire">Commencer le questionnaire</Link>
              <Link className="btn secondary" href="/label">Comprendre le label BNT</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
