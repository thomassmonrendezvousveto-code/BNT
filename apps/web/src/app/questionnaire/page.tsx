import { questionnaireParBloc } from '@/lib/questionnaire';
import { QuestionnaireWizard } from '@/components/questionnaire-wizard';

export default function QuestionnairePage() {
  const questionnaire = questionnaireParBloc();

  return (
    <main>
      <section className="section-sm">
        <div className="container" style={{ maxWidth: 880 }}>
          <p className="section-kicker">Questionnaire d’orientation</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', marginBottom: 16 }}>
            Trouver quoi faire ensuite, simplement.
          </h1>
          <p className="section-intro">
            En 5 à 8 minutes, on repère ensemble ce dont vous avez le plus besoin aujourd’hui : un relais médical, un
            soutien psychologique, un accompagnement de couple, ou un parcours plus coordonné. À la fin, vous obtenez
            une orientation claire, votre prochaine étape et le bon kit à ouvrir.
          </p>

          <div className="actions" style={{ marginTop: 22 }}>
            <a className="btn secondary" href="/je-viens-de-vivre">Voir d’abord les premiers jours après le diagnostic</a>
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ paddingTop: 0, paddingBottom: 72 }}>
        <div className="container">
          <QuestionnaireWizard blocs={questionnaire.blocs} />
        </div>
      </section>
    </main>
  );
}
