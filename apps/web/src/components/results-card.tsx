'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { ResultatOrientation } from '@bnt/orientation-engine';
import {
  ORIENTATIONS,
  dateConcrete,
  contexteUtilisatrice,
  microContextes,
  PREPARE_RDV,
  KIT_PARTENAIRE,
  CHECKLIST,
  pourquoiOrientation,
  FAQ,
  VERBATIM,
  droitsPersonnalises,
  genererICS,
} from '@/lib/kit-data';

function pretty(text: string): string {
  return text.replaceAll('_', ' ');
}

interface Props {
  resultat: ResultatOrientation;
  reponses?: Record<string, string | number>;
}

export function ResultsCard({ resultat, reponses }: Props) {
  const config = ORIENTATIONS[resultat.orientationPrincipale];
  const orientation = resultat.orientationPrincipale;
  const contexte = contexteUtilisatrice(reponses);
  const contextes = useMemo(() => microContextes(reponses), [reponses]);
  const raisons = useMemo(() => pourquoiOrientation(orientation, reponses), [orientation, reponses]);
  const prepare = PREPARE_RDV[orientation];
  const checklist = CHECKLIST[orientation];
  const faq = FAQ[orientation];
  const verbatim = VERBATIM[orientation];
  const droits = useMemo(() => droitsPersonnalises(reponses), [reponses]);

  // Conditions pour le mini-kit partenaire
  const showKitPartenaire = reponses?.F1 === 'oui' || reponses?.F1 === 'c_est_complique' || reponses?.F1 === 'non';

  // Capture email (obligatoire pour débloquer le kit)
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [emailEnvoye, setEmailEnvoye] = useState(false);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [envoiErreur, setEnvoiErreur] = useState<string | null>(null);
  const [pdfEnCours, setPdfEnCours] = useState(false);

  // Checklist cochée — persistée dans localStorage par orientation
  const checklistKey = `bnt-checklist-${orientation}`;
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [checklistHydrated, setChecklistHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(checklistKey);
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
    setChecklistHydrated(true);
  }, [checklistKey]);

  useEffect(() => {
    if (!checklistHydrated || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(checklistKey, JSON.stringify(checked));
    } catch {}
  }, [checked, checklistKey, checklistHydrated]);

  function toggleCheck(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleEnvoyerKit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnvoiEnCours(true);
    setEnvoiErreur(null);
    try {
      const response = await fetch('/api/kit-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          prenom,
          orientation: resultat.orientationPrincipale,
          reponses: reponses ?? {},
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        setEnvoiErreur(data.error ?? 'Envoi impossible. Vous pouvez quand même consulter votre kit ci-dessous.');
        // Même en cas d'erreur d'envoi, on dévoile le kit pour ne pas bloquer la femme
        setEmailEnvoye(true);
      } else {
        setEmailEnvoye(true);
      }
    } catch (err) {
      console.error(err);
      setEnvoiErreur('Réseau indisponible. Le kit reste accessible ici.');
      setEmailEnvoye(true);
    } finally {
      setEnvoiEnCours(false);
    }
  }

  async function telechargerPdf() {
    setPdfEnCours(true);
    try {
      const response = await fetch('/api/kit-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom,
          orientation: resultat.orientationPrincipale,
          reponses: reponses ?? {},
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Kit-Baby-Next-Time-${resultat.orientationPrincipale}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF download error:', err);
      // Fallback : print du navigateur
      if (typeof window !== 'undefined') window.print();
    } finally {
      setPdfEnCours(false);
    }
  }

  function telechargerICS() {
    const ics = genererICS(orientation);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Baby-Next-Time-${orientation}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // mailto: pour partager le kit partenaire
  const partenaireMailto = useMemo(() => {
    const subject = encodeURIComponent('Pour toi — un mini-guide de Baby Next Time');
    const body = encodeURIComponent(
      `${KIT_PARTENAIRE.modeleSms}\n\n` +
        `À DIRE :\n${KIT_PARTENAIRE.aDire.map((s) => `• ${s}`).join('\n')}\n\n` +
        `À ÉVITER :\n${KIT_PARTENAIRE.aEviter.map((s) => `• ${s}`).join('\n')}\n\n` +
        `À FAIRE :\n${KIT_PARTENAIRE.aFaire.map((s) => `• ${s}`).join('\n')}\n\n` +
        `— ${prenom || 'moi'}`,
    );
    return `mailto:?subject=${subject}&body=${body}`;
  }, [prenom]);

  const totalChecked = checklist.filter((it) => checked[it.id]).length;

  return (
    <div className="kit-card">
      {/* Mot d'accueil personnel */}
      <header className="kit-welcome">
        <div className="kit-welcome-photo">
          <img src="/fondateurs.jpg" alt="Chloé Azpiazu et Thomas Savey" />
        </div>
        <div>
          <span className="kicker">Un mot de Chloé</span>
          <h2>
            {prenom ? `${prenom}, ` : ''}je suis contente que vous soyez là.
          </h2>
          <p>
            Ce que vous traversez, je le connais. C’est précisément pour ne pas qu’on reste seule avec ça que
            Baby Next Time existe. Ce kit est un point de départ — pas un protocole. Vous avancez à votre rythme,
            étape par étape.
          </p>
        </div>
      </header>

      {!emailEnvoye ? (
        <div className="kit-gate">
          <div className="kit-gate-teaser">
            <span className="kicker">Votre orientation est prête</span>
            <h2>{config.title}</h2>
            <p className="kit-baseline">Vous pouvez lire votre restitution tout de suite ci-dessous.</p>
            <p className="kit-gate-help" style={{ marginTop: 12 }}>
              Si vous le souhaitez, nous pouvons aussi vous envoyer ce kit par email en PDF, pour le relire plus tard
              ou le partager avec votre partenaire ou un soignant.
            </p>
          </div>

          <form className="kit-gate-form" onSubmit={handleEnvoyerKit}>
            <h3>Recevoir ce kit par email</h3>
            <label className="kit-field">
              <span>Votre prénom</span>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Comment souhaitez-vous qu’on vous appelle ?"
                required
              />
            </label>
            <label className="kit-field">
              <span>Votre email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="prenom@exemple.fr"
                required
              />
            </label>
            <button className="btn btn-lg" type="submit" disabled={envoiEnCours}>
              {envoiEnCours ? 'Envoi en cours…' : 'Recevoir mon kit par email'}
            </button>
            <small className="kit-gate-mini">
              Facultatif. La restitution reste visible ici, même sans email.
            </small>
          </form>
        </div>
      ) : envoiErreur ? (
        <div className="kit-confirmation kit-confirmation-erreur">
          ⚠ Envoi du mail indisponible — votre kit reste accessible ici. Vous pouvez aussi le télécharger en PDF ci-dessous.
        </div>
      ) : (
        <div className="kit-confirmation">
          ✓ Kit envoyé sur <strong>{email}</strong> — vérifiez vos courriers indésirables si vous ne le voyez pas.
        </div>
      )}

      {/* Action du jour, ULTRA visible */}
      <section className="kit-today">
        <span className="kit-today-eyebrow">Si vous ne devez faire qu’une seule chose aujourd’hui</span>
        <h3>{config.todayAction.titre}</h3>
        <p>{config.todayAction.desc}</p>
        {config.todayAction.cta.kind === 'tel' ? (
          <a className="btn btn-lg" href={config.todayAction.cta.href}>
            {config.todayAction.cta.label}
          </a>
        ) : config.todayAction.cta.kind === 'external' ? (
          <a className="btn btn-lg" href={config.todayAction.cta.href}>
            {config.todayAction.cta.label}
          </a>
        ) : (
          <Link className="btn btn-lg" href={config.todayAction.cta.href}>
            {config.todayAction.cta.label}
          </Link>
        )}
      </section>

      {/* Carte « ordonnance » — synthèse 4 repères clés */}
      <section className="kit-ordonnance" aria-label="Synthèse de votre orientation">
        <header className="kit-ordonnance-head">
          <span className="kit-ordonnance-eyebrow">Votre orientation — en un coup d’œil</span>
          <h3 className="kit-ordonnance-title">{config.title}</h3>
          <p className="kit-ordonnance-baseline">{config.baseline}</p>
        </header>

        <dl className="kit-ordonnance-grid">
          <div className="kit-ordonnance-cell">
            <span className="kit-ordonnance-label" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              Délai recommandé
            </span>
            <dd className="kit-ordonnance-value">{config.synthese.delai}</dd>
          </div>
          <div className="kit-ordonnance-cell">
            <span className="kit-ordonnance-label" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M12 2a4 4 0 0 0-4 4v3a4 4 0 1 0 8 0V6a4 4 0 0 0-4-4z" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M5 13a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M12 20v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              Avec qui
            </span>
            <dd className="kit-ordonnance-value">{config.professionnel}</dd>
          </div>
          <div className="kit-ordonnance-cell">
            <span className="kit-ordonnance-label" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              Format conseillé
            </span>
            <dd className="kit-ordonnance-value">{config.synthese.format}</dd>
          </div>
          <div className="kit-ordonnance-cell">
            <span className="kit-ordonnance-label" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 1 1 0 7H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              Coût estimé
            </span>
            <dd className="kit-ordonnance-value">{config.synthese.cout}</dd>
          </div>
        </dl>

        {contexte ? <p className="kit-ordonnance-contexte">{contexte}</p> : null}
      </section>

      {/* Pourquoi cette orientation */}
      {raisons.length > 0 ? (
        <section className="kit-pourquoi">
          <span className="kicker">Pourquoi cette orientation</span>
          <h3>Ce qui nous a guidés dans vos réponses</h3>
          <ul className="kit-pourquoi-list">
            {raisons.map((r) => (
              <li key={r.cle}>
                <span className="kit-pourquoi-check">✓</span>
                <span>{r.texte}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Personnalisation enrichie */}
      {contextes.length > 0 ? (
        <section className="kit-microctx">
          <span className="kicker">Adapté à votre situation</span>
          <h3>Ce que vos réponses changent dans votre kit</h3>
          <div className="kit-microctx-grid">
            {contextes.map((ctx) => (
              <article key={ctx.cle} className="kit-microctx-card">
                <h4>{ctx.titre}</h4>
                <p>{ctx.texte}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Timeline visuelle pas-à-pas */}
      <section className="kit-timeline-section">
        <span className="kicker">Votre parcours pas-à-pas</span>
        <h3 className="kit-section-title">Les prochaines étapes, dans l’ordre</h3>
        <p className="kit-section-help">
          Chaque étape est concrète, datée, avec un contact ou un lien direct. Vous pouvez en sauter, les replanifier,
          ou nous écrire si vous avez besoin d’aide.
        </p>

        <div className="kit-timeline-tools no-print">
          <button type="button" className="btn secondary kit-ics-btn" onClick={telechargerICS}>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              <circle cx="12" cy="14" r="1" fill="currentColor"/>
              <circle cx="8" cy="14" r="1" fill="currentColor"/>
              <circle cx="16" cy="14" r="1" fill="currentColor"/>
              <circle cx="12" cy="18" r="1" fill="currentColor"/>
              <circle cx="8" cy="18" r="1" fill="currentColor"/>
            </svg>
            Ajouter ces RDV à mon calendrier
          </button>
          <span className="kit-ics-help">
            Fichier <code>.ics</code> compatible Apple Calendar, Google Agenda et Outlook. Un rappel J-1 est inclus.
          </span>
        </div>

        <ol className="kit-timeline">
          {config.etapes.map((etape, idx) => (
            <li key={etape.code} className="kit-timeline-step">
              <div className="kit-timeline-marker">
                <div className="kit-timeline-dot">{idx + 1}</div>
                {idx < config.etapes.length - 1 ? <div className="kit-timeline-line" /> : null}
              </div>
              <div className="kit-timeline-body">
                <div className="kit-timeline-meta">
                  <span className="kit-timeline-when">{etape.quand}</span>
                  <span className="kit-timeline-date">≈ {dateConcrete(etape.delaiJours)}</span>
                  <span className="kit-timeline-duree">{etape.duree}</span>
                </div>
                <h4>{etape.titre}</h4>
                <p className="kit-timeline-qui">▸ {etape.qui}</p>
                <p className="kit-timeline-desc">{etape.desc}</p>
                {etape.actionHref.startsWith('http') ? (
                  <a className="btn secondary" href={etape.actionHref} target="_blank" rel="noopener">
                    {etape.actionLabel} →
                  </a>
                ) : (
                  <Link className="btn secondary" href={etape.actionHref}>
                    {etape.actionLabel} →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Checklist actionnable cochable */}
      <section className="kit-checklist">
        <span className="kicker">Votre check-list de la semaine</span>
        <h3>Ce qui compte de cocher dans les 7 prochains jours</h3>
        <p className="kit-checklist-progress">
          {totalChecked} / {checklist.length} étapes cochées
          {totalChecked === checklist.length ? ' — bravo, vous avez tout fait.' : ''}
        </p>
        <ul className="kit-checklist-list">
          {checklist.map((it) => (
            <li key={it.id} className={checked[it.id] ? 'kit-checklist-item done' : 'kit-checklist-item'}>
              <label>
                <input
                  type="checkbox"
                  checked={!!checked[it.id]}
                  onChange={() => toggleCheck(it.id)}
                />
                <span>{it.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* Préparer votre rendez-vous */}
      <section className="kit-prepare">
        <span className="kicker">Préparer votre rendez-vous</span>
        <h3>Comment aborder : {prepare.type}</h3>
        <p className="kit-prepare-help">
          Tout ce qui suit est prêt à copier-coller — adaptez les crochets [ ] à votre situation.
        </p>

        <div className="kit-prepare-grid">
          <article className="kit-prepare-card">
            <h4>À dire</h4>
            <ul>
              {prepare.aDire.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </article>
          <article className="kit-prepare-card">
            <h4>À demander</h4>
            <ul>
              {prepare.aDemander.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </article>
          <article className="kit-prepare-card">
            <h4>À apporter</h4>
            <ul>
              {prepare.aApporter.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </article>
        </div>

        {prepare.modeleEmployeur ? (
          <details className="kit-prepare-employer">
            <summary>Modèle de mail à votre employeur (arrêt de travail)</summary>
            <pre>{prepare.modeleEmployeur}</pre>
            <a
              className="btn secondary"
              href={`mailto:?subject=${encodeURIComponent('Arrêt de travail')}&body=${encodeURIComponent(prepare.modeleEmployeur)}`}
            >
              Ouvrir dans ma messagerie
            </a>
          </details>
        ) : null}
      </section>

      {/* Vos droits, en clair */}
      <section className="kit-droits" aria-label="Vos droits">
        <span className="kicker">Vos droits, en clair</span>
        <h3>Ce que la loi française vous garantit — sans démarche particulière.</h3>
        <p className="kit-droits-intro">{droits.intro}</p>

        <div className="kit-droits-grid">
          {droits.droits.map((d) => (
            <article
              key={d.cle}
              className={d.prioritaire ? 'kit-droit-card prioritaire' : 'kit-droit-card'}
            >
              {d.prioritaire ? <span className="kit-droit-tag">Pour vous, en priorité</span> : null}
              <h4>{d.titre}</h4>
              <p>{d.contenu}</p>
              {d.source ? <p className="kit-droit-source">{d.source}</p> : null}
            </article>
          ))}
        </div>

        <p className="kit-droits-disclaimer">
          Ces repères ne remplacent pas un conseil juridique personnalisé. Pour les situations
          spécifiques (CDD, intérim, fonction publique, indépendant·e), nous vous orientons vers une
          permanence juridique gratuite — écrivez-nous.
        </p>
      </section>

      {/* Mini-kit partenaire */}
      {showKitPartenaire ? (
        <section className="kit-partenaire">
          <span className="kicker">Mini-kit pour votre partenaire</span>
          <h3>Une page à lire seul·e — sans expert·e, sans jargon</h3>
          <p className="kit-partenaire-intro">{KIT_PARTENAIRE.intro}</p>

          <div className="kit-partenaire-grid">
            <article>
              <h4>À dire</h4>
              <ul>
                {KIT_PARTENAIRE.aDire.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </article>
            <article>
              <h4>À éviter</h4>
              <ul>
                {KIT_PARTENAIRE.aEviter.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </article>
            <article>
              <h4>À faire concrètement</h4>
              <ul>
                {KIT_PARTENAIRE.aFaire.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </article>
          </div>

          <a className="btn" href={partenaireMailto}>
            Envoyer ce mini-kit à mon/ma partenaire
          </a>
        </section>
      ) : null}

      {/* Verbatim humain */}
      {verbatim ? (
        <section className="kit-verbatim">
          <blockquote>
            <p>{verbatim.citation}</p>
            <footer>— {verbatim.signature}</footer>
          </blockquote>
        </section>
      ) : null}

      {/* FAQ orientée */}
      {faq && faq.length > 0 ? (
        <section className="kit-faq">
          <span className="kicker">Vos questions probables</span>
          <h3>Réponses ciblées sur votre orientation</h3>
          <div className="kit-faq-list">
            {faq.map((item, idx) => (
              <details
                key={idx}
                className="kit-faq-item"
                open={openFaq === idx}
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) setOpenFaq(idx);
                }}
              >
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {/* Pistes complémentaires + ressources */}
      <section className="kit-extras">
        <div>
          <span className="kicker">Pistes complémentaires</span>
          <ul className="list">
            {resultat.modulesSecondaires.length > 0 ? (
              resultat.modulesSecondaires.map((module) => <li key={module.code}>{pretty(module.code)}</li>)
            ) : (
              <li>Pas de piste complémentaire majeure repérée à ce stade.</li>
            )}
          </ul>
        </div>
        <div>
          <span className="kicker">Pour aller plus loin</span>
          <ul className="list">
            <li><Link href="/ressources">Ressources : podcasts, guides, témoignages</Link></li>
            <li><Link href="/groupes">Groupes de parole</Link></li>
            <li><Link href="/groupes">Premier cercle et accompagnements collectifs</Link></li>
            <li><Link href="/contact">Nous écrire pour un suivi personnalisé</Link></li>
          </ul>
        </div>
      </section>

      <div className="kit-save no-print">
        <button type="button" className="btn" onClick={telechargerPdf} disabled={pdfEnCours}>
          {pdfEnCours ? 'Préparation du PDF…' : 'Télécharger le PDF'}
        </button>
        <Link className="btn secondary" href="/contact?sujet=orientation">
          Être rappelée par une sage-femme BNT
        </Link>
      </div>
    </div>
  );
}
