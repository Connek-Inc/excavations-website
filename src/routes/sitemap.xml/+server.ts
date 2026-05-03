import { cities } from '$lib/seo/cities-data';

const SITE_URL = 'https://excavationserable.com';

const staticPages = [
	{ path: '', priority: '1.0', changefreq: 'weekly' },
	{ path: 'urgences', priority: '1.0', changefreq: 'weekly' },
	{ path: 'services', priority: '0.9', changefreq: 'weekly' },
	{ path: 'services/excavation', priority: '0.9', changefreq: 'monthly' },
	{ path: 'services/drain-francais', priority: '0.9', changefreq: 'monthly' },
	{ path: 'services/reparation-fissures', priority: '0.9', changefreq: 'monthly' },
	{ path: 'services/demolition', priority: '0.9', changefreq: 'monthly' },
	{ path: 'services/inspection-camera', priority: '0.9', changefreq: 'monthly' },
	{ path: 'blog', priority: '0.8', changefreq: 'weekly' },
	{ path: 'blog/importance', priority: '0.7', changefreq: 'monthly' },
	{ path: 'blog/benefits', priority: '0.7', changefreq: 'monthly' },
	{ path: 'blog/waterproofing', priority: '0.7', changefreq: 'monthly' }
];

const cityPages = cities.map((c) => ({
	path: `excavation/${c.slug}`,
	priority: '0.85',
	changefreq: 'monthly' as const
}));

const allPages = [...staticPages, ...cityPages];

const languages = ['fr', 'en', 'es'];

export const prerender = true;

export async function GET() {
	const today = new Date().toISOString().split('T')[0];

	const urls = allPages
		.map((page) => {
			const loc = page.path ? `${SITE_URL}/${page.path}` : SITE_URL;
			const alternates = languages
				.map(
					(lang) =>
						`    <xhtml:link rel="alternate" hreflang="${lang}" href="${loc}?lang=${lang}"/>`
				)
				.join('\n');
			return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>
  </url>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600, public'
		}
	});
}
