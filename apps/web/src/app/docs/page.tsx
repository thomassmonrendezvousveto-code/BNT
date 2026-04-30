export default function DocsPage() {
  return (
    <main>
      <section className="section-sm">
        <div className="container">
          <div className="card" style={{ padding: 32 }}>
            <p className="section-kicker">Approche</p>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.8rem)' }}>Ce qui guide Baby Next Time.</h1>
            <p className="section-intro" style={{ maxWidth: 860 }}>
              Baby Next Time part d’un constat simple : après une fausse couche, les réponses existent par fragments,
              mais il manque souvent un cadre lisible, humain et coordonné. Notre travail consiste à relier les bons
              repères, les bons professionnels et les bons formats d’accompagnement.
            </p>
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="three-columns">
            <article className="feature-card">
              <span className="card-kicker">Soin</span>
              <h3>Ne pas banaliser</h3>
              <p>La fausse couche n’est pas un simple incident médical. Elle touche le corps, la psyché, le couple et l’après.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Orientation</span>
              <h3>Rendre les parcours lisibles</h3>
              <p>Nous aidons à distinguer ce qui relève d’une urgence, d’un soutien psychologique, d’un besoin de couple ou d’un suivi médical.</p>
            </article>
            <article className="feature-card">
              <span className="card-kicker">Qualité</span>
              <h3>Créer un cadre de confiance</h3>
              <p>Ressources relues, annuaire qualifié, parole non infantilisante et attention réelle aux situations de vulnérabilité.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
