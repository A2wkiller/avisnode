import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://avixnode.com';

const games = [
  { id: 'Minecraft', name: 'Minecraft', img: '/assets/minecraft.png' },
  { id: 'Rust', name: 'Rust', img: '/assets/Rust-Logo.jpg' },
  { id: 'ARK', name: 'Ark: SE', img: '/assets/ark.png' },
  { id: 'Valheim', name: 'Valheim', img: '/assets/valheim-logo.png' },
  { id: 'GarrysMod', name: 'Garry\'s Mod', img: '/assets/garrysmod.png' },
  { id: 'CS2', name: 'CS:GO', img: '/assets/csgo.png' },
];

const staticPages = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: '/games', priority: '0.9', changefreq: 'weekly' },
  { url: '/dedicated', priority: '0.8', changefreq: 'monthly' },
  { url: '/shared', priority: '0.8', changefreq: 'monthly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/tos', priority: '0.3', changefreq: 'yearly' },
];

const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Static Pages
  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${page.url}" />
  </url>`;
  });

  // Game Pages
  games.forEach(game => {
    xml += `
  <url>
    <loc>${BASE_URL}/games/${game.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${BASE_URL}${game.img}</image:loc>
      <image:title>${game.name} Server Hosting</image:title>
      <image:caption>High-performance ${game.name} server hosting at AvixNode</image:caption>
      <image:license>https://avixnode.com/tos</image:license>
    </image:image>
  </url>`;
  });

  xml += `
</urlset>`;

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');

  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml

User-agent: GPTBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('✅ robots.txt generated successfully at public/robots.txt');
};

generateSitemap();
