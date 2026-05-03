import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@bnt/orientation-engine'],
  // PDFKit doit rester un module Node externe — sinon il est bundlé par
  // Next.js et perd accès à son dossier `data/` (Helvetica.afm, etc.).
  serverExternalPackages: ['pdfkit'],
  // En complément, on s'assure que tout pdfkit (incluant ses .afm) est
  // bien copié dans le bundle serverless de Vercel.
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/pdfkit/**/*'],
  },
};

export default nextConfig;
