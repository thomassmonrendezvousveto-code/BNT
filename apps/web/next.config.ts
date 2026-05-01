import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@bnt/orientation-engine'],
  // PDFKit a besoin de ses fichiers .afm (Helvetica, etc.) à l'exécution.
  // Sans cette directive, Vercel ne les inclut pas dans le bundle serverless
  // et l'API /kit-email échoue avec "ENOENT: Helvetica.afm".
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/pdfkit/js/data/**/*'],
  },
};

export default nextConfig;
