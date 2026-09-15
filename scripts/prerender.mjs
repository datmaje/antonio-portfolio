// scripts/prerender.mjs
// Runs after `vite build`. Reads Sanity, writes one static HTML per route
// into dist/, plus sitemap.xml. Crawlers and link previews read these;
// browsers get the same files and React takes over on mount.
//
// COUPLING: the experience-years rule is duplicated from src/lib/experience.ts
// (count from January 2015). Change one, change the other.

import { createClient } from '@sanity/client'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SITE = 'https://www.antoniocarcagni.com'
const OG_IMAGE = `${SITE}/og-image.png`
const LINKEDIN = 'https://www.linkedin.com/in/antoniocarcagn%C3%AC/'
const CAREER_START = Date.UTC(2015, 0, 1)

// --- env ------------------------------------------------------------------
// Vite loads .env automatically, plain Node does not. Read it as a fallback
// so `npm run build` works locally and on Vercel without extra flags.
function env(key, fallback) {
  if (process.env[key]) return process.env[key]
  const f = join(ROOT, '.env')
  if (existsSync(f)) {
    for (const line of readFileSync(f, 'utf8').split('\n')) {
      const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/)
      if (m && m[1] === key) return m[2].replace(/^["']|["']$/g, '')
    }
  }
  return fallback
}

const projectId = env('VITE_SANITY_PROJECT_ID')
const dataset = env('VITE_SANITY_DATASET', 'production')
if (!projectId) {
  console.error('[prerender] VITE_SANITY_PROJECT_ID missing. Aborting.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-12-01',
  useCdn: false, // build time: always read live, never the CDN cache
})

// --- helpers --------------------------------------------------------------
const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const ld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

const years = Math.floor((Date.now() - CAREER_START) / (365.25 * 24 * 3600 * 1000))

// Same substitutions the frontend applies to CMS copy.
const withYears = (t = '') =>
  String(t)
    .replace(/\{\{years\}\}/g, String(years))
    .replace(/\b\d+\+?\s+years\s+of\s+experience\b/gi, `${years}+ years of experience`)

const toPlain = (blocks = []) =>
  (Array.isArray(blocks) ? blocks : [])
    .filter((b) => b?._type === 'block')
    .map((b) => (b.children || []).map((c) => c.text || '').join(''))
    .filter(Boolean)
    .join('\n\n')

const clip = (s = '', n = 160) => {
  const t = String(s).replace(/\s+/g, ' ').trim()
  return t.length <= n ? t : t.slice(0, t.lastIndexOf(' ', n - 1)).replace(/[,;:.]$/, '') + '…'
}

// --- data -----------------------------------------------------------------
const PUBLISHED = `_type == "project" && status == "published"`

const [projects, about, skills, certifications] = await Promise.all([
  client.fetch(`*[${PUBLISHED}]|order(order asc){
    title, "slug": slug.current, description, organization, role, cluster,
    period, location, tags, context, roleDetail, scope, economics, fte,
    stakeholders, techTools, results, links[]{label, url}, publishedAt, _updatedAt
  }`),
  client.fetch(`*[_type == "about"][0]{content}`),
  client.fetch(`*[_type == "skill"]|order(order asc){category, skills}`),
  client.fetch(`*[_type == "certification"]|order(order asc){title, issuer, validFrom}`),
])

const valid = projects.filter((p) => p.slug)
const skipped = projects.length - valid.length
if (skipped) console.warn(`[prerender] ${skipped} published project(s) without a slug, skipped`)

const aboutText = withYears(toPlain(about?.content))
const allSkills = skills.flatMap((s) => s.skills || [])

// --- page assembly --------------------------------------------------------
const template = readFileSync(join(DIST, 'index.html'), 'utf8')

function page({ route, title, description, head = '', body }) {
  const canonical = `${SITE}${route}`
  const meta = `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${route === '/' ? 'profile' : 'article'}" />
    <meta property="og:site_name" content="Antonio Carcagnì" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Antonio Carcagnì, Digital and IT Leader" />
    <meta property="og:locale" content="en_GB" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
${head}`

  // The static block sits inside #root. React's createRoot() clears the
  // container on first render, so it is replaced, never duplicated.
  const shell = `<div style="max-width:52rem;margin:0 auto;padding:4rem 1.5rem;color:#e2e8f0;font-family:system-ui,sans-serif;line-height:1.6">${body}</div>`

  let html = template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/i, '')
    .replace('</head>', `${meta}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${shell}</div>`)

  const out = join(DIST, route === '/' ? '.' : route.slice(1))
  mkdirSync(out, { recursive: true })
  writeFileSync(join(out, 'index.html'), html, 'utf8')
  return html.length
}

const section = (h, t) => (t ? `<h2>${esc(h)}</h2><p>${esc(String(t)).replace(/\n+/g, '</p><p>')}</p>` : '')

// --- / --------------------------------------------------------------------
page({
  route: '/',
  title: 'Antonio Carcagnì | Digital & IT Leader',
  description: clip(
    aboutText ||
      `Digital and IT leader with ${years}+ years across digital transformation, Meter-to-Cash, cloud operations and Agile delivery.`
  ),
  head: ld({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Antonio Carcagnì',
    jobTitle: 'Digital & IT Leader',
    url: SITE,
    image: OG_IMAGE,
    sameAs: [LINKEDIN],
    address: { '@type': 'PostalAddress', addressLocality: 'Milan', addressCountry: 'IT' },
    description: clip(aboutText, 300),
    knowsAbout: allSkills,
    hasCredential: certifications.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      ...(c.issuer ? { recognizedBy: { '@type': 'Organization', name: c.issuer } } : {}),
      ...(c.validFrom ? { validFrom: c.validFrom } : {}),
    })),
  }),
  body: `
    <h1>Antonio Carcagnì</h1>
    <p>Digital &amp; IT Leader, Milan, Italy</p>
    ${aboutText ? `<p>${esc(aboutText).replace(/\n+/g, '</p><p>')}</p>` : ''}
    ${skills.length ? `<h2>Skills</h2>${skills.map((s) => `<h3>${esc(s.category)}</h3><p>${esc((s.skills || []).join(', '))}</p>`).join('')}` : ''}
    ${certifications.length ? `<h2>Certifications</h2><ul>${certifications.map((c) => `<li>${esc(c.title)}${c.issuer ? `, ${esc(c.issuer)}` : ''}${c.validFrom ? ` (${esc(c.validFrom)})` : ''}</li>`).join('')}</ul>` : ''}
    <h2>Projects</h2>
    <ul>${valid.map((p) => `<li><a href="/projects/${esc(p.slug)}">${esc(p.title)}</a>: ${esc(p.description || '')}</li>`).join('')}</ul>
    <p><a href="${LINKEDIN}">LinkedIn</a></p>`,
})

// --- /projects ------------------------------------------------------------
const clusters = [...new Set(valid.map((p) => p.cluster).filter(Boolean))]
page({
  route: '/projects',
  title: 'Projects | Antonio Carcagnì',
  description: clip(
    `${valid.length} project and programme records across ${clusters.join(', ')}.`
  ),
  head: ld({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projects by Antonio Carcagnì',
    numberOfItems: valid.length,
    itemListElement: valid.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/projects/${p.slug}`,
      name: p.title,
    })),
  }),
  body: `
    <h1>Projects</h1>
    ${clusters
      .map(
        (c) =>
          `<h2>${esc(c)}</h2><ul>${valid
            .filter((p) => p.cluster === c)
            .map(
              (p) =>
                `<li><a href="/projects/${esc(p.slug)}">${esc(p.title)}</a>${p.period ? ` (${esc(p.period)})` : ''}: ${esc(p.description || '')}</li>`
            )
            .join('')}</ul>`
      )
      .join('')}`,
})

// --- /projects/:slug ------------------------------------------------------
for (const p of valid) {
  page({
    route: `/projects/${p.slug}`,
    title: `${p.title} | Antonio Carcagnì`,
    description: clip(p.description || p.context || p.title),
    head: ld({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: p.title,
      url: `${SITE}/projects/${p.slug}`,
      abstract: clip(p.description || '', 300),
      author: { '@type': 'Person', name: 'Antonio Carcagnì', url: SITE },
      ...(p.organization ? { sourceOrganization: { '@type': 'Organization', name: p.organization } } : {}),
      ...(p.tags?.length ? { keywords: p.tags.join(', ') } : {}),
      ...(p.period ? { temporalCoverage: p.period } : {}),
      isPartOf: { '@type': 'CollectionPage', name: 'Projects', url: `${SITE}/projects` },
    }),
    body: `
      <h1>${esc(p.title)}</h1>
      <p>${esc(p.description || '')}</p>
      <p>${[p.organization, p.role, p.period, p.location].filter(Boolean).map(esc).join(' · ')}</p>
      ${section('Context', p.context)}
      ${section('Role', p.roleDetail)}
      ${section('Scope', p.scope)}
      ${section('Economics', p.economics)}
      ${section('Team', p.fte)}
      ${section('Stakeholders', p.stakeholders)}
      ${section('Tech & Tools', p.techTools)}
      ${section('Results', p.results)}
      ${p.links?.length ? `<ul>${p.links.map((l) => `<li><a href="${esc(l.url)}">${esc(l.label)}</a></li>`).join('')}</ul>` : ''}
      <p><a href="/projects">All projects</a></p>`,
  })
}

// --- sitemap.xml ----------------------------------------------------------
const today = new Date().toISOString().slice(0, 10)
const urls = [
  { loc: `${SITE}/`, pri: '1.0', mod: today },
  { loc: `${SITE}/projects`, pri: '0.8', mod: today },
  ...valid.map((p) => ({
    loc: `${SITE}/projects/${p.slug}`,
    pri: '0.7',
    mod: (p._updatedAt || p.publishedAt || today).slice(0, 10),
  })),
]

writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.mod}</lastmod><priority>${u.pri}</priority></url>`).join('\n')}
</urlset>
`,
  'utf8'
)

console.log(`[prerender] ${urls.length} pages + sitemap.xml, ${years}+ years, ${allSkills.length} skills, ${certifications.length} certifications`)
