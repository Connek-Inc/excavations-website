import { cities } from '$lib/seo/cities-data';

const SITE_URL = 'https://excavationserable.com';

interface PageEntry {
	path: string;
	priority: string;
	changefreq: string;
	images?: { loc: string; title: string; caption?: string }[];
	video?: { thumbnail: string; title: string; description: string; contentLoc: string };
}

const staticPages: PageEntry[] = [
	{
		path: '',
		priority: '1.0',
		changefreq: 'daily',
		images: [
			{
				loc: `${SITE_URL}/logo.png`,
				title: 'Mini Excavations Érable Logo',
				caption: 'Excavation #1 Quebec — Drain français, fondation, démolition'
			}
		],
		video: {
			thumbnail: `${SITE_URL}/videos/work-1-poster.jpg`,
			title: 'Installation Drain Français Montréal — Mini Excavations Érable',
			description:
				"Vidéo réelle d'installation de drain français au Québec par Mini Excavations Érable. Excavation périphérique avec mini-pelle.",
			contentLoc: `${SITE_URL}/videos/work-1.mp4`
		}
	},
	{ path: 'urgences', priority: '1.0', changefreq: 'weekly' },
	{ path: 'services', priority: '0.95', changefreq: 'weekly' },
	{ path: 'services/excavation', priority: '0.9', changefreq: 'monthly' },
	{ path: 'services/drain-francais', priority: '0.95', changefreq: 'monthly' },
	{ path: 'services/reparation-fissures', priority: '0.9', changefreq: 'monthly' },
	{ path: 'services/demolition', priority: '0.9', changefreq: 'monthly' },
	{ path: 'services/inspection-camera', priority: '0.9', changefreq: 'monthly' },
	{ path: 'blog', priority: '0.8', changefreq: 'weekly' },
	{ path: 'blog/importance', priority: '0.7', changefreq: 'monthly' },
	{ path: 'blog/benefits', priority: '0.7', changefreq: 'monthly' },
	{ path: 'blog/waterproofing', priority: '0.7', changefreq: 'monthly' }
];

const cityPages: PageEntry[] = cities.map((c) => ({
	path: `excavation/${c.slug}`,
	priority: '0.85',
	changefreq: 'monthly'
}));

const allPages: PageEntry[] = [...staticPages, ...cityPages];

const languages = ['fr', 'en', 'es'];

export const prerender = true;

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export async function GET() {
	const today = new Date().toISOString().split('T')[0];

	const urls = allPages
		.map((page) => {
			const loc = page.path ? `${SITE_URL}/${page.path}` : SITE_URL;
			const alternates = languages
				.map(
					(lang) =>
						`    <xhtml:link rel="alternate" hreflang="${lang === 'fr' ? 'fr-CA' : lang === 'en' ? 'en-CA' : 'es'}" href="${loc}${lang === 'fr' ? '' : `?lang=${lang}`}"/>`
				)
				.join('\n');

			const imageBlocks = (page.images || [])
				.map(
					(img) => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>${img.caption ? `\n      <image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
    </image:image>`
				)
				.join('\n');

			const videoBlock = page.video
				? `    <video:video>
      <video:thumbnail_loc>${escapeXml(page.video.thumbnail)}</video:thumbnail_loc>
      <video:title>${escapeXml(page.video.title)}</video:title>
      <video:description>${escapeXml(page.video.description)}</video:description>
      <video:content_loc>${escapeXml(page.video.contentLoc)}</video:content_loc>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
    </video:video>`
				: '';

			return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>${imageBlocks ? '\n' + imageBlocks : ''}${videoBlock ? '\n' + videoBlock : ''}
  </url>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=3600, public'
		}
	});
}
