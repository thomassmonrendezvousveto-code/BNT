import questionnaire from './data/questionnaire.schema.fr.json';
import regles from './data/scoring.rules.fr.json';
import type { ModuleSecondaire, OrientationCode, QuestionSchema, ReponsesBNT, ResultatOrientation, ScoreParDomaine } from './types';

const REGLES_REPONSES = regles.regles_reponses as Array<{
  question_id: string;
  reponse: string;
  cle_moteur: string;
  domaine: string;
  points: number;
  sortie_preferee: string;
}>;

const REGLES_COMPOSEES = regles.regles_composees as Array<any>;
const SORTIES = regles.sorties as Record<string, any>;
const SEUILS = regles.seuils as any;

function initScores(): ScoreParDomaine {
  return { medical: 0, psychologique: 0, complexite: 0, couple: 0, projection: 0, soutien: 0 };
}

function estReponseActive(valeur: ReponsesBNT[string], attendu: string): boolean {
  if (valeur === null || valeur === undefined) return false;
  return String(valeur) === attendu;
}

function ajoutePoint(scores: ScoreParDomaine, domaine: string, points: number): void {
  if (domaine === 'medical') scores.medical += points;
  if (domaine === 'psychologique') scores.psychologique += points;
  if (domaine === 'complexite') scores.complexite += points;
  if (domaine === 'couple') scores.couple += points;
  if (domaine === 'projection') scores.projection += points;
  if (domaine === 'soutien') scores.soutien += points;
}

function appliqueReglesReponses(reponses: ReponsesBNT, scores: ScoreParDomaine, hardStops: string[], cles: string[]): void {
  for (const regle of REGLES_REPONSES) {
    if (!estReponseActive(reponses[regle.question_id], regle.reponse)) continue;
    cles.push(regle.cle_moteur);

    if (regle.domaine === 'urgence') {
      hardStops.push(regle.cle_moteur);
      continue;
    }

    ajoutePoint(scores, regle.domaine, Number(regle.points || 0));
  }
}

function conditionOK(reponses: ReponsesBNT, condition: { question_id: string; dans: string[] }): boolean {
  const valeur = reponses[condition.question_id];
  if (valeur === null || valeur === undefined) return false;
  return condition.dans.includes(String(valeur));
}

function appliqueReglesComposees(
  reponses: ReponsesBNT,
  scores: ScoreParDomaine,
  forcages: string[],
  cles: string[],
  modules: Set<string>,
): void {
  for (const regle of REGLES_COMPOSEES) {
    const ok = (regle.si_toutes || []).every((condition: { question_id: string; dans: string[] }) => conditionOK(reponses, condition));
    if (!ok) continue;

    if (regle.effet?.cle) cles.push(regle.effet.cle);
    if (regle.effet?.orientation_forcee) forcages.push(regle.effet.orientation_forcee);
    if (regle.effet?.module) modules.add(regle.effet.module);
    if (regle.effet?.ajouter_points) {
      for (const [domaine, points] of Object.entries(regle.effet.ajouter_points)) {
        ajoutePoint(scores, domaine, Number(points || 0));
      }
    }
  }
}

function deduitOrientation(reponses: ReponsesBNT, scores: ScoreParDomaine, hardStops: string[], forcages: string[]): OrientationCode {
  if (hardStops.length > 0) return 'urgence_medicale';
  if (forcages.includes('grossesse_suivante_fast_track')) return 'grossesse_suivante_fast_track';
  if (forcages.includes('priorite_medicale')) return 'priorite_medicale';
  if (forcages.includes('priorite_psychologique')) return 'priorite_psychologique';

  if (scores.medical >= SEUILS.medical.priorite_medicale) return 'priorite_medicale';
  if (scores.psychologique >= SEUILS.psychologique.priorite_psychologique) return 'priorite_psychologique';
  if (scores.complexite >= SEUILS.complexite.parcours_complexe_ou_recurrent) return 'parcours_complexe_ou_recurrent';

  const projectionBloquee = reponses[SEUILS.projection.condition_bloquante_question] === SEUILS.projection.valeur_bloquante;
  if (scores.projection >= SEUILS.projection.module_preconception && !projectionBloquee) return 'preconception';

  return 'parcours_coordonne_standard';
}

function deduitModules(
  reponses: ReponsesBNT,
  scores: ScoreParDomaine,
  modules: Set<string>,
  orientation: OrientationCode,
  forcages: string[],
): ModuleSecondaire[] {
  if (scores.couple >= 3) modules.add('module_couple_prioritaire');
  if (scores.projection >= 2 && reponses['H2'] !== 'oui') modules.add('module_preconception');
  if (scores.medical >= 5 && scores.psychologique >= 6) modules.add('module_psy_en_parallele');
  if (['moi_et_mon_partenaire', 'mon_partenaire_repond_pour_lui'].includes(String(reponses['A5'] || ''))) modules.add('module_partenaire');
  if (forcages.includes('grossesse_suivante_fast_track')) modules.add('module_reassurance_grossesse_suivante');
  if (orientation === 'parcours_coordonne_standard') modules.add('module_groupe_de_parole');

  return Array.from(modules).map((code) => ({ code, actif: true }));
}

export function getQuestionnaire(): { version: string; langue: string; nom: string; questions: QuestionSchema[] } {
  return {
    version: questionnaire.version,
    langue: questionnaire.langue,
    nom: questionnaire.nom,
    questions: questionnaire.questions as QuestionSchema[],
  };
}

export function calculeOrientationBNT(reponses: ReponsesBNT): ResultatOrientation {
  const scores = initScores();
  const hardStops: string[] = [];
  const forcages: string[] = [];
  const clesDeclenchees: string[] = [];
  const modules = new Set<string>();

  appliqueReglesReponses(reponses, scores, hardStops, clesDeclenchees);
  appliqueReglesComposees(reponses, scores, forcages, clesDeclenchees, modules);

  const orientationPrincipale = deduitOrientation(reponses, scores, hardStops, forcages);
  const configSortie = SORTIES[orientationPrincipale] ?? {
    professionnel_principal: 'Care manager Baby Next Time',
    delai: 'Sous 72 h',
    message: 'Un professionnel Baby Next Time va vous aider à identifier la bonne prochaine étape.',
    actions: ['Être rappelée', 'Recevoir mon kit'],
  };

  return {
    orientationPrincipale,
    scores,
    hardStops,
    forcages,
    modulesSecondaires: deduitModules(reponses, scores, modules, orientationPrincipale, forcages),
    professionelPrincipal: configSortie.professionnel_principal,
    delai: configSortie.delai,
    message: configSortie.message,
    actions: configSortie.actions,
    clesDeclenchees,
  };
}
