import Link from 'next/link';
import type { Metadata } from 'next';
import { ResourcesLibrary } from '@/components/resources-library';

export const metadata: Metadata = {
  title: 'Ressources — Baby Next Time',
  description:
    'Bibliothèque taggée : podcasts, témoignages, guides pratiques, fiches médicales. Filtres par format, public et moment du parcours.',
};

export default function PageRessources() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="section-kicker">Bibliothèque</p>
          <h1>Tout ce que nous aurions voulu trouver, rassemblé.</h1>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Podcasts, témoignages, guides pratiques, fiches médicales, repères émotionnels. Tout est lu, trié,
            commenté par notre équipe et nos soignants partenaires. 100 % gratuit, 100 % vérifié — filtrable par
            format, public concerné et moment du parcours.
          </p>

          <div style={{ marginTop: 34 }}>
            <ResourcesLibrary />
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="card cta-card">
            <div>
              <p className="section-kicker">Newsletter</p>
              <h2>Les Douze Semaines, hebdomadaire</h2>
              <p className="section-intro" style={{ maxWidth: 720 }}>
                Recevez chaque semaine une micro-ressource (podcast, témoignage, fiche). Sobre, sans spam, désabonnement
                en un clic.
              </p>
            </div>
            <div className="cta-card-actions">
              <Link className="btn" href="/#newsletter">S’inscrire</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
