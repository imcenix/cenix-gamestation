import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * ─── Cenix Game Station — content model ──────────────────────────────────────
 * Nội dung do CMS (imcenix.com/cms) commit vào repo dưới dạng markdown +
 * frontmatter YAML. Mỗi bài là 1 folder trong assets/<collection>/<slug>/.
 * Ảnh đi kèm để cạnh file .md và được symlink ra public/ (link-assets.mjs).
 */

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

/* ── Tin tức (blog / news) ──────────────────────────────────────────────────
 * assets/news/<slug>/post.md  (+ cover.jpg, photos/…)                        */
const news = defineCollection({
  loader: glob({
    pattern: ['*/post.md', '!_*/post.md'],
    base: './assets/news',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title:    z.string(),
    slug:     z.string(),
    // Chuyên mục hiển thị trên filter chip
    category: z.enum(['tin-tuc', 'su-kien', 'gioi-thieu-game', 'phan-tich']).default('tin-tuc'),
    date:     dateSchema,
    excerpt:  z.string().nullable().optional(),
    author:   z.string().default('Cenix Team'),
    read_minutes: z.number().nullable().optional(),
    cover:    z.string().nullable().optional(), // filename, mặc định cover.jpg
    featured: z.boolean().default(false),
    order:    orderSchema,
  }),
});

/* ── Video (embed YouTube) ──────────────────────────────────────────────────
 * assets/videos/<slug>/video.md                                             */
const videos = defineCollection({
  loader: glob({
    pattern: ['*/video.md', '!_*/video.md'],
    base: './assets/videos',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title:    z.string(),
    slug:     z.string(),
    // Dán full URL YouTube (watch?v=… / youtu.be/… / embed/…)
    youtube_url: z.string(),
    category: z.enum(['gameplay', 'review', 'cot-truyen', 'huong-dan', 'giai-tri', 'tin-tuc']).default('gameplay'),
    date:     dateSchema,
    duration: z.string().nullable().optional(), // "18:22" — hiển thị góc thumbnail
    description: z.string().nullable().optional(),
    featured: z.boolean().default(false),
    order:    orderSchema,
  }),
});

/* ── Nhân vật tier-list ─────────────────────────────────────────────────────
 * assets/characters/<slug>/character.md  (+ avatar.png)
 * Mỗi nhân vật là 1 entry; trang Tier-List tự gom theo game + vai trò + hạng. */
const characters = defineCollection({
  loader: glob({
    pattern: ['*/character.md', '!_*/character.md'],
    base: './assets/characters',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    name:       z.string(),
    slug:       z.string(),
    game:       z.string(),                 // slug game, vd "game-a" (khớp tierlists.game)
    role:       z.enum(['dps', 'support', 'healer']),
    tier:       z.enum(['S', 'A', 'B', 'C']),
    rarity:     z.number().default(5),      // số sao
    element:    z.string().nullable().optional(),
    weapon:     z.string().nullable().optional(),
    team:       z.string().nullable().optional(),
    reason:     z.string().nullable().optional(), // "Vì sao tier S"
    build_url:  z.string().nullable().optional(),
    avatar:     z.string().nullable().optional(), // filename, mặc định avatar.png
    order:      orderSchema,
  }),
});

/* ── Meta tier-list theo game (version + changelog + sidebar) ───────────────
 * assets/tierlists/<game-slug>/tierlist.md                                   */
const tierlists = defineCollection({
  loader: glob({
    pattern: ['*/tierlist.md', '!_*/tierlist.md'],
    base: './assets/tierlists',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    game:       z.string(),  // slug, khớp characters.game
    game_label: z.string(),  // tên hiển thị trên chip filter, vd "Game A"
    version:    z.string().nullable().optional(),  // "2.5"
    updated:    dateSchema,
    // Changelog — mỗi dòng là 1 chuỗi, vd "Nhân vật X: A → S"
    changes_up:   z.array(z.string()).default([]),
    changes_down: z.array(z.string()).default([]),
    changes_new:  z.array(z.string()).default([]),
    order:      orderSchema,
  }),
});

/* ── Hướng dẫn (guides / tutorials) ─────────────────────────────────────────
 * assets/guides/<slug>/guide.md  (+ cover.jpg)                              */
const guides = defineCollection({
  loader: glob({
    pattern: ['*/guide.md', '!_*/guide.md'],
    base: './assets/guides',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title:    z.string(),
    slug:     z.string(),
    level:    z.enum(['tan-thu', 'build', 'farm', 'endgame']).default('tan-thu'),
    date:     dateSchema,
    excerpt:  z.string().nullable().optional(),
    cover:    z.string().nullable().optional(),
    tags:     z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order:    orderSchema,
  }),
});

export const collections = { news, videos, characters, tierlists, guides };
