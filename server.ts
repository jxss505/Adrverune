/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { handleEnquirySubmission, handleEnquiryHealthCheck } from './src/server/enquiryHandler';
import { SEO_PAGES, PATH_ROUTE_MAP } from './src/seo/seoConfig';
import { NavRoute } from './src/types';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Environment constraint: Dev server must run strictly on port 3000
const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

// Disable X-Powered-By to prevent framework fingerprinting
app.disable('x-powered-by');

// Enable trust proxy for secure reverse proxy IP handling in Cloud Run / load balancers
app.set('trust proxy', 1);

// HTTP Response Compression (gzip/deflate for fast network transfer)
app.use(compression());

// Body parsing middleware with strict size bounds
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Comprehensive Security Headers Middleware
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  if (isProd) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // Content Security Policy permitting required assets (Google Fonts, GA4, self, preview iframe)
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https:",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.supabase.co wss://*.supabase.co",
    "frame-ancestors 'self' https://*.google.com https://*.google.dev https://*.run.app https://*.netlify.app",
    "base-uri 'self'",
    "form-action 'self'"
  ];
  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));

  next();
});

// Guard Middleware: Block direct HTTP requests to server-side source files, configurations, and dotfiles
app.use((req, res, next) => {
  const normalizedPath = req.path.toLowerCase();
  const forbiddenPatterns = [
    /^\/server(\.ts|\.js)?/i,
    /^\/src\/server\//i,
    /^\/\.env/i,
    /^\/package(\.json|\-lock\.json)?/i,
    /^\/tsconfig(\.json)?/i,
    /^\/vite\.config/i,
    /^\/metadata\.json/i,
    /\.(env|lock|md|log|yml|yaml|git|dockerignore|sh)$/i
  ];

  if (forbiddenPatterns.some((pattern) => pattern.test(normalizedPath))) {
    res.status(403).json({
      error: 'Forbidden',
      message: 'Direct access to server architectural files is prohibited.'
    });
    return;
  }
  next();
});

// Cross-Origin Validation Middleware for API Endpoints
function validateApiOrigin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const origin = req.headers.origin;
  const host = req.get('host');

  // Allow requests without Origin (same-origin navigation or internal server requests)
  if (!origin) {
    return next();
  }

  // Check if Origin matches the host
  try {
    const originUrl = new URL(origin);
    if (originUrl.host === host) {
      return next();
    }

    // Also allow configured APP_URL origin
    if (process.env.APP_URL) {
      const appUrl = new URL(process.env.APP_URL);
      if (originUrl.host === appUrl.host) {
        return next();
      }
    }
  } catch {
    // Malformed origin header
  }

  res.status(403).json({
    success: false,
    message: 'Cross-origin submission rejected. Submissions are only permitted from the official website.'
  });
}

// Helper to determine active origin
function getOrigin(req: express.Request): string {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/+$/, '');
  }
  const host = req.get('host') || `localhost:${PORT}`;
  const protocol = req.protocol || 'http';
  return `${protocol}://${host}`;
}

// ============================================================================
// 1. DYNAMIC TECHNICAL SEO ENDPOINTS (robots.txt and sitemap.xml)
// ============================================================================

app.get('/robots.txt', (req, res) => {
  const origin = getOrigin(req);
  const robotsTxt = `# ADVERUNE Technical SEO Crawler Directives
# https://adverune.com

User-agent: *
Allow: /
Disallow: /api/

# Canonical Sitemap Index
Sitemap: ${origin}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(robotsTxt);
});

app.get('/sitemap.xml', (req, res) => {
  const origin = getOrigin(req);
  const today = new Date().toISOString().split('T')[0];

  const canonicalRoutes: { path: string; priority: string; changefreq: string }[] = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/packages', priority: '0.9', changefreq: 'weekly' },
    { path: '/process', priority: '0.8', changefreq: 'monthly' },
    { path: '/work', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/insights', priority: '0.8', changefreq: 'weekly' },
    { path: '/contact', priority: '0.9', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' }
  ];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const item of canonicalRoutes) {
    const loc = `${origin}${item.path === '/' ? '' : item.path}`;
    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${loc}</loc>\n`;
    sitemapXml += `    <lastmod>${today}</lastmod>\n`;
    sitemapXml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    sitemapXml += `    <priority>${item.priority}</priority>\n`;
    sitemapXml += `  </url>\n`;
  }

  sitemapXml += `</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.status(200).send(sitemapXml);
});

// ============================================================================
// 2. ENQUIRY API ENDPOINTS
// ============================================================================

app.post('/api/enquiry', validateApiOrigin, (req, res) => {
  handleEnquirySubmission(req, res).catch((err) => {
    console.error('[UNCAUGHT SERVER ERROR /api/enquiry]', err);
    res.status(500).json({
      success: false,
      message: 'An unexpected server error occurred while processing your inquiry. Please try again shortly.'
    });
  });
});

app.get('/api/enquiry/health', (req, res) => {
  handleEnquiryHealthCheck(req, res).catch((err) => {
    console.error('[HEALTH CHECK ERROR]', err);
    res.status(500).json({ status: 'error', message: 'Health check failed' });
  });
});

// ============================================================================
// 3. SERVER-SIDE HTML METADATA PRE-RENDERING INJECTOR
// ============================================================================

function injectPageSEO(
  rawHtml: string,
  pathname: string,
  origin: string
): { html: string; status: number } {
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '').toLowerCase();
  const route: NavRoute = PATH_ROUTE_MAP[cleanPath] || 'not-found';
  const pageSeo = SEO_PAGES[route as keyof typeof SEO_PAGES] || SEO_PAGES['not-found'];
  const status = route === 'not-found' ? 404 : 200;
  const canonicalUrl = `${origin}${pageSeo.path === '/' ? '' : pageSeo.path}`;

  const schemas = pageSeo.schemaGenerator(origin);
  const jsonLdScript =
    schemas.length > 0
      ? `\n    <script type="application/ld+json" id="adverune-schema">\n${JSON.stringify(
          schemas.length === 1 ? schemas[0] : schemas,
          null,
          2
        )}\n    </script>`
      : '';

  let html = rawHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${pageSeo.title}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${pageSeo.description}" />`
  );

  // Replace OpenGraph Tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${pageSeo.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${pageSeo.description}" />`
  );

  // Inject Canonical, Keywords, OpenGraph URL, and JSON-LD before </head>
  const headAdditions = `
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="keywords" content="${pageSeo.keywords.join(', ')}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="ADVERUNE" />
    <meta name="twitter:title" content="${pageSeo.title}" />
    <meta name="twitter:description" content="${pageSeo.description}" />${jsonLdScript}
  `;

  html = html.replace('</head>', `${headAdditions}\n  </head>`);

  return { html, status };
}

// ============================================================================
// 4. SERVER INITIALIZATION & ROUTING
// ============================================================================

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });

    app.use(vite.middlewares);

    // Development SSR/Metadata Handler for all HTML document requests
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      // Skip API and file requests
      if (url.startsWith('/api/') || url.includes('.')) {
        return next();
      }

      try {
        const origin = getOrigin(req);
        const templatePath = path.resolve(__dirname, 'index.html');
        const rawTemplate = await fs.readFile(templatePath, 'utf-8');
        const transformedHtml = await vite.transformIndexHtml(url, rawTemplate);
        const { html, status } = injectPageSEO(transformedHtml, req.baseUrl || req.path, origin);

        res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    console.log('[DEV MODE] Vite middleware with SEO HTML pre-rendering mounted.');
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(
      express.static(distPath, {
        index: false,
        maxAge: '1y',
        immutable: true,
        etag: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, must-revalidate');
          } else if (
            filePath.endsWith('.js') ||
            filePath.endsWith('.css') ||
            filePath.endsWith('.woff2') ||
            filePath.endsWith('.woff') ||
            filePath.endsWith('.svg')
          ) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
        }
      })
    );

    // Production SSR/Metadata Handler
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api/') || url.includes('.')) {
        return next();
      }

      try {
        const origin = getOrigin(req);
        const templatePath = path.resolve(distPath, 'index.html');
        const rawTemplate = await fs.readFile(templatePath, 'utf-8');
        const { html, status } = injectPageSEO(rawTemplate, req.path, origin);

        res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (err) {
        next(err);
      }
    });

    console.log('[PROD MODE] Production static assets and SEO pre-rendering mounted.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ADVERUNE ENGINE] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[FATAL SERVER STARTUP ERROR]', err);
  process.exit(1);
});
