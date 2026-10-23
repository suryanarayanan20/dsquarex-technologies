import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE_URL, site, seo, structuredData } from './src/data/site.js'

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`

const manifest = () =>
  JSON.stringify(
    {
      name: site.name,
      short_name: site.shortName,
      description: 'Business websites, custom web applications and AI integration.',
      id: `${SITE_URL}/`,
      start_url: `${SITE_URL}/`,
      scope: `${SITE_URL}/`,
      display: 'standalone',
      background_color: site.themeColor,
      theme_color: site.themeColor,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2
  )

/**
 * Fills index.html from src/data/site.js and emits robots.txt and
 * site.webmanifest, so brand, domain and contact details live in one file.
 */
function siteHtml() {
  const tokens = {
    SITE_URL,
    SITE_NAME: site.name,
    THEME_COLOR: site.themeColor,
    HOME_TITLE: seo.homeTitle,
    HOME_DESCRIPTION: seo.homeDescription,
    KEYWORDS: `${seo.keywords}, ${site.name}`,
    OG_IMAGE: seo.ogImage,
    OG_IMAGE_ALT: seo.ogImageAlt,
  }
  return {
    name: 'site-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let out = html.replace('%STRUCTURED_DATA%', () =>
          JSON.stringify(structuredData(), null, 2).replace(/</g, '\\u003c')
        )
        out = out.replace(/%([A-Z_]+)%/g, (m, key) => (key in tokens ? escapeAttr(tokens[key]) : m))
        const left = out.match(/%[A-Z_]+%/g)
        if (left) throw new Error(`index.html has unknown placeholders: ${left.join(', ')}`)
        return out
      },
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/robots.txt') return res.setHeader('Content-Type', 'text/plain'), res.end(robotsTxt())
        if (req.url === '/site.webmanifest')
          return res.setHeader('Content-Type', 'application/manifest+json'), res.end(manifest())
        next()
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
      this.emitFile({ type: 'asset', fileName: 'site.webmanifest', source: manifest() })
    },
  }
}

export default defineConfig({
  plugins: [siteHtml(), react(), tailwindcss()],
})
