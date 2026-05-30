import type { RequestHandler } from '@sveltejs/kit';

interface SitemapUrl {
	loc: string;
	lastmod?: string;
	changefreq: string;
	priority: string;
}

export const GET: RequestHandler = async () => {
	const BASE = 'https://kenshinzato.dev';

	const urls: SitemapUrl[] = [
		{ loc: BASE, changefreq: 'monthly', priority: '1.0' }
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
