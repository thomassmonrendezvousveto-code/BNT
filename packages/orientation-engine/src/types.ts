export type ValeurReponse = string | number | boolean | null | undefined;
export type ReponsesBNT = Record<string, ValeurReponse>;

export type OrientationCode =
  | 'urgence_medicale'
  | 'grossesse_suivante_fast_track'
  | 'priorite_medicale'
  | 'priorite_psychologique'
  | 'parcours_complexe_ou_recurrent'
  | 'preconception'
  | 'parcours_coordonne_standard';

export interface ScoreParDomaine {
  medical: number;
  psychologique: number;
  complexite: number;
  couple: number;
  projection: number;
  soutien: number;
}

export interface ModuleSecondaire {
  code: string;
  actif: boolean;
}

export interface ResultatOrientation {
  orientationPrincipale: OrientationCode;
  scores: ScoreParDomaine;
  hardStops: string[];
  forcages: string[];
  modulesSecondaires: ModuleSecondaire[];
  professionelPrincipal: string;
  delai: string;
  message: string;
  actions: string[];
  clesDeclenchees: string[];
}

export interface QuestionSchema {
  id: string;
  bloc: string;
  etape: string;
  type: string;
  libelle: string;
  options?: string[];
  min?: number;
  max?: number;
  obligatoire: boolean;
  /**
   * Affiche la question uniquement si TOUTES les conditions sont remplies.
   * Une condition est remplie si la réponse à la question référencée fait partie
   * des valeurs listées (au moins une correspondance par clé).
   * Ex: { A2: ["oui"], A3: ["oui", "en_cours_de_confirmation"] }
   */
  condition_affichage?: Record<string, string[]>;
}
