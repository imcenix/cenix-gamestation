import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const orderSchema = z
  .union([z.number(), z.string()])
  .nullable()
  .optional()
  .transform((value) => {
    if (value === null || value === undefined || value === '') return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  });

const dateSchema = z.union([z.string(), z.date()]).transform((v) =>
  typeof v === 'string' ? v : v.toISOString().slice(0, 10)
);

const news = defineCollection({
  loader: glob({ pattern: ['*/post.md', '!_*/post.md'], base: './assets/news', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    title: z.string(), slug: z.string(),
    category: z.enum(['tin-tuc', 'su-kien', 'gioi-thieu-game', 'phan-tich']).default('tin-tuc'),
    date: dateSchema,
    excerpt: z.string().nullable().optional(),
    author: z.string().default('Cenix Team'),
    read_minutes: z.number().nullable().optional(),
    cover: z.string().nullable().optional(),
    featured: z.boolean().default(false),
    order: orderSchema,
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: ['*/video.md', '!_*/video.md'], base: './assets/videos', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    title: z.string(), slug: z.string(), youtube_url: z.string(),
    category: z.enum(['gameplay', 'review', 'cot-truyen', 'huong-dan', 'giai-tri', 'tin-tuc']).default('gameplay'),
    date: dateSchema,
    duration: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    featured: z.boolean().default(false),
    order: orderSchema,
  }),
});

/* Bảng tier — 1 entry/game. Frontmatter = info game; BODY = JSON các hàng tier. */
const tierlists = defineCollection({
  loader: glob({ pattern: ['*/tierlist.md', '!_*/tierlist.md'], base: './assets/tierlists', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    game_label: z.string(),
    genre:   z.string().nullable().optional(),
    blurb:   z.string().nullable().optional(),
    version: z.string().nullable().optional(),
    updated: z.union([z.string(), z.date()]).nullable().optional()
             .transform((v) => (!v ? null : typeof v === 'string' ? v : v.toISOString().slice(0, 10))),
    cover:   z.string().nullable().optional(),
    order:   orderSchema,
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: ['*/guide.md', '!_*/guide.md'], base: './assets/guides', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    title: z.string(), slug: z.string(),
    level: z.enum(['tan-thu', 'build', 'farm', 'endgame', 'code']).default('tan-thu'),
    date: dateSchema,
    excerpt: z.string().nullable().optional(),
    cover: z.string().nullable().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: orderSchema,
  }),
});

export const collections = { news, videos, tierlists, guides };
