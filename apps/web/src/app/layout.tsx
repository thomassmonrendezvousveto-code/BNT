import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter, Cormorant_Garamond } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Baby Next Time — Savoir quoi faire après une fausse couche',
  description:
    'Baby Next Time aide à savoir quoi faire après une fausse couche : questionnaire, kit personnalisé, orientation vers un professionnel, groupes de parole et ressources utiles.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <div className="site-shell">
          <header className="topbar">
            <div className="container topbar-inner">
              <Link className="brand" href="/" aria-label="Baby Next Time — accueil">
                <span className="brand-mark" aria-hidden="true">
                  <img src="/baby-next-time-logo.png" alt="" />
                </span>
                <span className="brand-text">
                  <span>Prévenir · Accompagner · Soutenir</span>
                </span>
              </Link>

              <nav className="nav" aria-label="Navigation principale">
                <Link href="/">Accueil</Link>
                <Link href="/parcours">Parcours de soin</Link>
                <Link href="/professionnels">Professionnels labellisés</Link>
                <Link href="/ressources">Ressources</Link>
                <Link href="/label">Le label BNT</Link>
                <Link href="/faq">FAQ</Link>
                <Link href="/a-propos">À propos</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </div>
          </header>

          {children}

          <footer className="site-footer">
            <div className="container footer-grid">
              <div className="footer-brand-col">
                <h4>Baby Next Time</h4>
                <p className="footer-baseline">
                  Vous accompagner, à chaque étape.
                  <br />
                  Information fiable, professionnel·les formé·es, soutien sans jugement.
                </p>
              </div>

              <div className="footer-col">
                <h4>
                  <span className="footer-col-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h12l4 4v12H4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M16 4v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                  </span>
                  Le site
                </h4>
                <ul>
                  <li><Link href="/parcours">Parcours de soin</Link></li>
                  <li><Link href="/professionnels">Professionnels labellisés</Link></li>
                  <li><Link href="/ressources">Ressources</Link></li>
                  <li><Link href="/groupes">Groupes de parole</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>
                  <span className="footer-col-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </span>
                  À propos
                </h4>
                <ul>
                  <li><Link href="/a-propos">À propos</Link></li>
                  <li><Link href="/label">Le label BNT</Link></li>
                  <li><Link href="/comite-scientifique">Comité scientifique</Link></li>
                  <li><Link href="/faq">Questions fréquentes</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/fondateurs">Fondateurs</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>
                  <span className="footer-col-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </span>
                  Outils
                </h4>
                <ul>
                  <li><Link href="/parcours">Démarrer mon parcours</Link></li>
                  <li><Link href="/comite-scientifique">Comité scientifique</Link></li>
                  <li><a href="mailto:hello@babynexttime.fr">hello@babynexttime.fr</a></li>
                </ul>
                <p className="footer-copy" style={{ marginTop: 14 }}>
                  © {new Date().getFullYear()} Baby Next Time
                </p>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="container footer-bottom-inner">
                <p className="footer-signoff">
                  Fait avec soin en France · Pensé pour aider à savoir quoi faire maintenant.
                </p>
                <p className="footer-legal">
                  <Link href="/contact">Contact</Link>
                  <span aria-hidden="true">·</span>
                  <Link href="/a-propos">À propos</Link>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
