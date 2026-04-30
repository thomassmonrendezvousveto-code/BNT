import Link from 'next/link';
import { Reveal } from '@/components/reveal';

export default function HomePage() {
  return (
    <main id="top">
      <section className="hero hero-simple">
        <div className="container hero-simple-layout">
          <div className="hero-simple-mark" aria-hidden="true">
            <img src="/baby-next-time-logo.png" alt="" />
          </div>
          <div className="hero-simple-text">
            <p className="eyebrow">Baby Next Time</p>
            <h1>Vous accompagner, à chaque étape.</h1>
            <p className="hero-lede">
              Une plateforme dédiée, un parcours clair, des professionnel·les formé·es. Choisissez l'entrée qui vous
              parle.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="three-doors">
            <Reveal delay={0}>
              <Link className="door-card" href="/ressources">
                <span className="door-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none">
                    <rect x="5" y="6" width="22" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 12h12M10 17h12M10 22h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <h3>Plateforme digitale</h3>
                <p>
                  Un kit personnalisé, des repères concrets, des ressources fiables. À votre rythme, depuis chez vous.
                </p>
                <span className="door-cta">Découvrir la plateforme →</span>
              </Link>
            </Reveal>

            <Reveal delay={80}>
              <Link className="door-card" href="/parcours">
                <span className="door-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M16 5v3M16 24v3M5 16h3M24 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="16" cy="16" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                <h3>Parcours de soin</h3>
                <p>
                  Six étapes pensées de bout en bout. Vous savez où vous en êtes, ce qui vient ensuite, et avec qui
                  l'aborder.
                </p>
                <span className="door-cta">Voir le parcours →</span>
              </Link>
            </Reveal>

            <Reveal delay={160}>
              <Link className="door-card" href="/professionnels">
                <span className="door-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 27c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="23" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                <h3>Professionnel·les labellisés</h3>
                <p>
                  Sage-femmes, psychologues, gynécologues spécifiquement formé·es à l'accompagnement après une fausse
                  couche.
                </p>
                <span className="door-cta">Trouver un·e professionnel·le →</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
