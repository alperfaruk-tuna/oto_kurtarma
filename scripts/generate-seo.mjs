import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeSiteUrl(input) {
  const trimmed = (input || '').trim();
  if (!trimmed) return '';
  return trimmed.replace(/\/+$/, '');
}

function isoDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

const SITE_URL = normalizeSiteUrl(process.env.SITE_URL) || 'http://localhost:5173';
const lastmod = isoDate();

const pages = [
  { loc: `${SITE_URL}/`, priority: '1.0' },
  { loc: `${SITE_URL}/gallery.html`, priority: '0.7' },
  { loc: `${SITE_URL}/bartin-oto-kurtarma.html`, priority: '0.8' },
  { loc: `${SITE_URL}/kozcagiz-cekici.html`, priority: '0.8' },
];

const sitemapXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map(
      (p) =>
        `  <url>\n` +
        `    <loc>${p.loc}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>weekly</changefreq>\n` +
        `    <priority>${p.priority}</priority>\n` +
        `  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

const robotsTxt =
  `User-agent: *\n` +
  `Allow: /\n\n` +
  `Sitemap: ${SITE_URL}/sitemap.xml\n`;

ensureDir(publicDir);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

function replaceSiteUrlInHtml(filePath) {
  if (!fs.existsSync(filePath)) return;
  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original.replaceAll('__SITE_URL__', SITE_URL);

  const GA_ID = (process.env.GA_ID || '').trim();
  const GSC_VERIFICATION = (process.env.GSC_VERIFICATION || '').trim();

  if (GA_ID) {
    updated = updated.replaceAll('__GA_ID__', GA_ID);
  } else {
    // Remove GA block if not configured
    updated = updated.replace(/<!--\s*GA_START\s*-->[\s\S]*?<!--\s*GA_END\s*-->\s*/g, '');
  }

  if (GSC_VERIFICATION) {
    updated = updated.replaceAll('__GSC_VERIFICATION__', GSC_VERIFICATION);
  } else {
    // Remove GSC verification meta if not configured
    updated = updated.replace(/<!--\s*GSC_START\s*-->[\s\S]*?<!--\s*GSC_END\s*-->\s*/g, '');
  }

  if (updated !== original) fs.writeFileSync(filePath, updated, 'utf8');
}

// Replace placeholders in source HTML so dev/preview matches production.
replaceSiteUrlInHtml(path.join(projectRoot, 'index.html'));
replaceSiteUrlInHtml(path.join(projectRoot, 'gallery.html'));
replaceSiteUrlInHtml(path.join(projectRoot, 'bartin-oto-kurtarma.html'));
replaceSiteUrlInHtml(path.join(projectRoot, 'kozcagiz-cekici.html'));

// Also replace in dist outputs if present (optional).
replaceSiteUrlInHtml(path.join(projectRoot, 'dist', 'index.html'));
replaceSiteUrlInHtml(path.join(projectRoot, 'dist', 'gallery.html'));
replaceSiteUrlInHtml(path.join(projectRoot, 'dist', 'bartin-oto-kurtarma.html'));
replaceSiteUrlInHtml(path.join(projectRoot, 'dist', 'kozcagiz-cekici.html'));

console.log(`[seo] Generated public/robots.txt and public/sitemap.xml for ${SITE_URL}`);
