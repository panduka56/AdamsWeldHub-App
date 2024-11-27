import { writeFileSync } from 'fs'
import { safetyTips } from '../app/data/safetyTips'
import { troubleshootingIssues } from '../app/data/troubleshootingIssues'

const baseUrl = 'https://your-domain.com'

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${safetyTips.map(tip => `
        <url>
          <loc>${baseUrl}/safety/${tip.id}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
      ${troubleshootingIssues.map(issue => `
        <url>
          <loc>${baseUrl}/troubleshooting/${issue.id}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`

  writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap() 