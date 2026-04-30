'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { QuestionSchema, ResultatOrientation } from '@bnt/orientation-engine';
import { ResultsCard } from './results-card';
import { BNT_LAST_ANSWERS_KEY, BNT_LAST_RESULT_KEY } from '@/lib/result-storage';

interface BlocQuestionnaire {
  bloc: string;
  questions: QuestionSchema[];
}

interface Props {
  blocs: BlocQuestionnaire[];
}

const BLOC_LABELS: Record<string, { titre: string; intro: string }> = {
  A: {
    titre: 'Vous, aujourd’hui',
    intro: 'Quelques questions pour comprendre où vous en êtes — sans vous bousculer.',
  },
  C: {
    titre: 'Cadre médical actuel',
    intro: 'Ce que les soignant·es vous ont dit, et ce que vous avez compris.',
  },
  D: {
    titre: 'Comment va le corps',
    intro: 'Sommeil, douleur, fatigue. Soyez honnête, c’est utile.',
  },
  E: {
    titre: 'Comment va le cœur',
    intro: 'Le retentissement émotionnel. Tout est valide ici.',
  },
  F: {
    titre: 'Couple et entourage',
    intro: 'Pour repérer si un temps à deux ou un soutien proche serait utile.',
  },
  G: {
    titre: 'Histoire et complexité',
    intro: 'Vos antécédents, pour ajuster le parcours.',
  },
  H: {
    titre: 'Et après',
    intro: 'Vos envies pour la suite — sans engagement, juste pour orienter.',
  },
  P: {
    titre: 'Pour le partenaire',
    intro: 'Quelques questions adressées à la personne qui accompagne.',
  },
};

const STORAGE_KEY = 'bnt-quest-answers-v1';

function pretty(option: string): string {
  return option.replaceAll('_', ' ').replace(/^\w/, (c) => c.toUpperCase());
}

function blocInfo(bloc: string): { titre: string; intro: string } {
  return BLOC_LABELS[bloc] ?? { titre: bloc, intro: '' };
}

function questionVisible(question: QuestionSchema, answers: Record<string, string | number>): boolean {
  if (!question.condition_affichage) return true;
  return Object.entries(question.condition_affichage).every(([dependsOn, allowedValues]) => {
    const actual = answers[dependsOn];
    if (actual === undefined || actual === null || actual === '') return false;
    return allowedValues.includes(String(actual));
  });
}

export function QuestionnaireWizard({ blocs }: Props) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultat, setResultat] = useState<ResultatOrientation | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // ─── Hydratation depuis localStorage (côté client uniquement) ───
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          setAnswers(parsed as Record<string, string | number>);
        }
      }
    } catch {
      // localStorage indispo (mode privé strict, etc.) — pas grave
    } finally {
      setHydrated(true);
    }
  }, []);

  // ─── Sauvegarde automatique à chaque changement ───
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (Object.keys(answers).length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      }
    } catch {
      // pas grave
    }
  }, [answers, hydrated]);

  const visibleBlocs = useMemo(() => {
    return blocs
      .map((bloc) => ({
        ...bloc,
        questions: bloc.questions.filter((q) => questionVisible(q, answers)),
      }))
      .filter((bloc) => bloc.questions.length > 0);
  }, [blocs, answers]);

  const totalVisibleQuestions = useMemo(
    () => visibleBlocs.reduce((acc, bloc) => acc + bloc.questions.length, 0),
    [visibleBlocs],
  );

  const completed = useMemo(() => {
    return visibleBlocs.reduce((acc, bloc) => {
      return (
        acc +
        bloc.questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== '').length
      );
    }, 0);
  }, [visibleBlocs, answers]);

  const progressPct = totalVisibleQuestions === 0 ? 0 : Math.round((completed / totalVisibleQuestions) * 100);
  const canSubmit = completed >= Math.max(5, Math.round(totalVisibleQuestions * 0.4));

  function setAnswer(id: string, value: string | number) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function reinitialiserQuestionnaire() {
    if (typeof window === 'undefined') return;
    const ok = window.confirm(
      'Voulez-vous vraiment effacer toutes vos réponses et recommencer ? Cette action est irréversible.',
    );
    if (!ok) return;
    setAnswers({});
    setResultat(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // pas grave
    }
  }

  // Nettoyage : supprime les réponses devenues invisibles
  useEffect(() => {
    const idsVisibles = new Set(visibleBlocs.flatMap((b) => b.questions.map((q) => q.id)));
    const aNettoyer = Object.keys(answers).filter((id) => !idsVisibles.has(id));
    if (aNettoyer.length > 0) {
      setAnswers((prev) => {
        const next = { ...prev };
        for (const id of aNettoyer) delete next[id];
        return next;
      });
    }
  }, [visibleBlocs, answers]);

  useEffect(() => {
    if (resultat) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [resultat]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/orientation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reponses: answers }),
      });
      const data = await response.json();
      setResultat(data);
      try {
        localStorage.setItem(BNT_LAST_RESULT_KEY, JSON.stringify(data));
        localStorage.setItem(BNT_LAST_ANSWERS_KEY, JSON.stringify(answers));
      } catch {
        // pas grave
      }
    } finally {
      setLoading(false);
    }
  }

  const aDesReponses = Object.keys(answers).length > 0;

  return (
    <div className="quiz-shell">
      {/* Bandeau de sauvegarde + reset */}
      {hydrated && aDesReponses && !resultat ? (
        <div className="quiz-saved">
          <span>
            ✓ Vos réponses sont enregistrées dans ce navigateur. Vous pouvez fermer l’onglet et reprendre plus tard.
          </span>
          <button type="button" className="quiz-reset" onClick={reinitialiserQuestionnaire}>
            Recommencer
          </button>
        </div>
      ) : null}

      {/* Barre de progression sticky */}
      <div className="quiz-progress" role="status" aria-live="polite">
        <div className="quiz-progress-track">
          <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="quiz-progress-meta">
          <span><strong>{completed}</strong> / {totalVisibleQuestions} questions répondues</span>
          <span>{progressPct}%</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="quiz-form">
        {visibleBlocs.map((bloc, index) => {
          const info = blocInfo(bloc.bloc);
          return (
            <section key={bloc.bloc} className="quiz-bloc">
              <header className="quiz-bloc-header">
                <span className="quiz-bloc-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="quiz-bloc-title">{info.titre}</h2>
                  {info.intro ? <p className="quiz-bloc-intro">{info.intro}</p> : null}
                </div>
              </header>

              <div className="quiz-questions">
                {bloc.questions.map((question) => {
                  const value = answers[question.id];
                  return (
                    <fieldset key={question.id} className="quiz-question">
                      <legend className="quiz-q-label">{question.libelle}</legend>

                      {question.type === 'choix_unique' && question.options ? (
                        <div className="quiz-choices">
                          {question.options.map((option) => {
                            const checked = value === option;
                            return (
                              <label
                                key={option}
                                className={`quiz-choice ${checked ? 'is-selected' : ''}`}
                              >
                                <input
                                  checked={checked}
                                  name={question.id}
                                  onChange={() => setAnswer(question.id, option)}
                                  type="radio"
                                  value={option}
                                  className="visually-hidden"
                                />
                                <span>{pretty(option)}</span>
                              </label>
                            );
                          })}
                        </div>
                      ) : question.type === 'echelle_numerique' ? (
                        <div className="quiz-scale">
                          {Array.from(
                            { length: (question.max ?? 10) - (question.min ?? 0) + 1 },
                            (_, i) => (question.min ?? 0) + i,
                          ).map((n) => {
                            const checked = value === n;
                            return (
                              <label
                                key={n}
                                className={`quiz-scale-item ${checked ? 'is-selected' : ''}`}
                              >
                                <input
                                  checked={checked}
                                  name={question.id}
                                  onChange={() => setAnswer(question.id, n)}
                                  type="radio"
                                  value={n}
                                  className="visually-hidden"
                                />
                                <span>{n}</span>
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        <input
                          id={question.id}
                          className="quiz-input"
                          onChange={(event) => setAnswer(question.id, event.target.value)}
                          placeholder="Votre réponse (facultatif)"
                          type="text"
                          value={String(value ?? '')}
                        />
                      )}
                    </fieldset>
                  );
                })}
              </div>
            </section>
          );
        })}

        <div className="quiz-submit">
          <div>
            <p className="quiz-submit-title">Prête à voir votre kit&nbsp;?</p>
            <p className="quiz-submit-help">
              {canSubmit
                ? 'Vous pouvez valider quand vous voulez. Vos réponses restent modifiables après.'
                : `Encore quelques réponses (au moins ${Math.max(5, Math.round(totalVisibleQuestions * 0.4))}) pour générer un kit fiable.`}
            </p>
          </div>
          <button className="btn btn-lg" disabled={loading || !canSubmit} type="submit">
            {loading ? 'Calcul en cours…' : 'Voir mon kit personnalisé →'}
          </button>
        </div>
      </form>

      <div ref={resultsRef} className="quiz-results">
        {resultat ? (
          <>
            <div className="actions" style={{ marginBottom: 18 }}>
              <Link className="btn secondary" href="/resultat">Ouvrir ma restitution sur une page dédiée</Link>
            </div>
            <ResultsCard resultat={resultat} reponses={answers} />
          </>
        ) : null}
      </div>
    </div>
  );
}
