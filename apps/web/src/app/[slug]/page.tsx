import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SEO_PAGES, SEO_PAGE_BY_SLUG } from '@/lib/seo-pages';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return SEO_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGE_BY_SLUG[slug];
  if (!page) return {};
  return {
    title: `${page.title} — Baby Next Time`,
    description: page.description,
  };
}

export default async function SeoPage({ params }: Props) {
  const { slug } = await params;
  const page = SEO_PAGE_BY_SLUG[slug];
  if (!page) notFound();

  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: 880 }}>
          <p className="section-kicker">Guide utile</p>
          <h1>{page.hero}</h1>
          <p className="section-intro">{page.intro}</p>
        </div>
      </section>

      <section className="section soft" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="card" style={{ padding: 28 }}>
            <p className="section-kicker">L’essentiel</p>
            <ul className="list">
              {page.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <div className="actions" style={{ marginTop: 22 }}>
              <Link className="btn" href={page.ctaHref}>{page.ctaLabel}</Link>
              <Link className="btn secondary" href="/questionnaire">Commencer le questionnaire</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
