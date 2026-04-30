import { getQuestionnaire } from '@bnt/orientation-engine';

export function questionnaireParBloc() {
  const questionnaire = getQuestionnaire();
  const blocs = new Map<string, typeof questionnaire.questions>();

  for (const question of questionnaire.questions) {
    const deja = blocs.get(question.bloc) ?? [];
    deja.push(question);
    blocs.set(question.bloc, deja);
  }

  return {
    ...questionnaire,
    blocs: Array.from(blocs.entries()).map(([bloc, questions]) => ({ bloc, questions })),
  };
}
