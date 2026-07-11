import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL(SITE.url)).toString().replace(/\/$/, '');

  const news = await getCollection('news');
  const guides = await getCollection('guides');

  const items = [
    ...news.map((n) => ({ ...n.data, path: `/tin-tuc/${n.data.slug}` })),
    ...guides.map((g) => ({ ...g.data, path: `/huong-dan/${g.data.slug}` })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const body = items
    .map(
      (it) => `    <item>
      <title>${esc(it.title)}</title>
      <link>${base}${it.path}</link>
      <guid>${base}${it.path}</guid>
      <pubDate>${new Date(it.date).toUTCString()}</pubDate>
      ${'excerpt' in it && it.excerpt ? `<description>${esc(String(it.excerpt))}</description>` : ''}
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${base}</link>
    <description>${esc(SITE.tagline)}</description>
    <language>vi</language>
${body}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
