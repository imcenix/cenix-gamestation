import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://game.imcenix.com';

type SitemapItem = {
  path: string;
  lastmod?: string | null;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
};

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const formatLastmod = (value: unknown): string | null => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
};

const toUrlEntry = ({ path, lastmod, changefreq, priority }: SitemapItem) => {
  const absoluteUrl = new URL(path, SITE_URL).toString();
  return [
    '  <url>',
    `    <loc>${escapeXml(absoluteUrl)}</loc>`,
    lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : '',
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
    typeof priority === 'number' ? `    <priority>${priority.toFixed(1)}</priority>` : '',
    '  </url>',
  ].filter(Boolean).join('\n');
};

export const GET: APIRoute = async () => {
  const [news, guides, tierlists] = await Promise.all([
    getCollection('news'),
    getCollection('guides'),
    getCollection('tierlists'),
  ]);

  const items: SitemapItem[] = [
    { path: '/', changefreq: 'daily', priority: 1 },
    { path: '/tin-tuc/', changefreq: 'daily', priority: 0.9 },
    { path: '/huong-dan/', changefreq: 'weekly', priority: 0.8 },
    { path: '/tier-list/', changefreq: 'weekly', priority: 0.8 },
    { path: '/review/', changefreq: 'weekly', priority: 0.8 },
    { path: '/video/', changefreq: 'weekly', priority: 0.7 },
    { path: '/profile/', changefreq: 'monthly', priority: 0.6 },
    ...news.map((entry) => ({
      path: `/tin-tuc/${entry.data.slug}/`,
      lastmod: formatLastmod(entry.data.date),
      changefreq: 'weekly' as const,
      priority: 0.8,
    })),
    ...guides.map((entry) => ({
      path: `/huong-dan/${entry.data.slug}/`,
      lastmod: formatLastmod(entry.data.date),
      changefreq: 'monthly' as const,
      priority: 0.7,
    })),
    ...tierlists.map((entry) => ({
      path: `/tier-list/${entry.id}/`,
      lastmod: formatLastmod(entry.data.updated),
      changefreq: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...items.map(toUrlEntry),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
