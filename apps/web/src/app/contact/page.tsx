import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Baby Next Time',
  description: 'Nous écrire — quatre adresses thématiques selon votre demande, ou un formulaire général.',
};

const adresses = [
  {
    sujet: 'Demande générale',
    email: 'hello@babynexttime.fr',
    desc: 'Toute question qui ne rentre pas dans les autres catégories.',
  },
  {
    sujet: 'Soignant·e — candidature au label',
    email: 'label@babynexttime.fr',
    desc: 'Sage-femme, psy ou gynécologue : candidature au label, audit, charte.',
  },
  {
    sujet: 'Cohortes & groupes de parole',
    email: 'cohortes@babynexttime.fr',
    desc: 'Inscription à une cohorte, candidature pilote, organisation, dates.',
  },
  {
    sujet: 'Presse & partenariats',
    email: 'presse@babynexttime.fr',
    desc: 'Sollicitation média, demande d’interview, partenariat associatif.',
  },
];

export default function PageContact() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="section-kicker">Contact</p>
          <h1>Nous écrire.</h1>
          <p className="section-intro" style={{ maxWidth: 820 }}>
            Nous lisons et répondons personnellement à chaque message — souvent dans les 48 h. Choisissez l’adresse qui
            correspond le mieux à votre demande, ou utilisez le formulaire ci-dessous.
          </p>
        </div>
      </section>

      <section className="section soft" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-grid">
            {adresses.map((a) => (
              <article className="contact-info" key={a.email}>
                <span className="card-kicker">{a.sujet}</span>
                <h3>
                  <a href={`mailto:${a.email}`}>{a.email}</a>
                </h3>
                <p>{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 32 }}>
            <p className="section-kicker">Ou via le formulaire</p>
            <h2>Un message libre</h2>
            <form className="form" data-form>
              <div className="form-grid">
                <label>
                  <span>Prénom et nom</span>
                  <input type="text" name="name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" required />
                </label>
              </div>
              <label>
                <span>Sujet</span>
                <select name="sujet">
                  <option>Demande générale</option>
                  <option>Soignant·e — candidature au label</option>
                  <option>Cohortes & groupes de parole</option>
                  <option>Presse & partenariats</option>
                  <option>Autre</option>
                </select>
              </label>
              <label>
                <span>Votre message</span>
                <textarea name="message" rows={6} required />
              </label>
              <label className="checkbox">
                <input type="checkbox" required />
                <span>
                  J’accepte que Baby Next Time conserve mon message le temps d’y répondre. Aucune donnée n’est
                  partagée avec un tiers.
                </span>
              </label>
              <button type="submit" className="btn btn-lg">Envoyer</button>
              <small>Pour une urgence médicale, appelez le 15 ou le 112.</small>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
