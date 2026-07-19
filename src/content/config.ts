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
    category: z.enum(['trailer', 'gameplay', 'review', 'cot-truyen', 'huong-dan', 'giai-tri', 'tin-tuc']).default('gameplay'),
    date: dateSchema,
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

/* Review "Cú Lẹ" — mỗi game 1 entry. */
const reviews = defineCollection({
  loader: glob({ pattern: ['*/review.md', '!_*/review.md'], base: './assets/reviews', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    title:  z.string(),                       // tên game
    cover:  z.string().nullable().optional(), // ảnh (dọc/vuông)
    score:  z.union([z.number(), z.string()]).nullable().optional(), // điểm (vd 8)
    review: z.string().nullable().optional(), // đánh giá sơ (hiện trong popup)
    platforms: z.array(z.string()).default([]),   // Loại máy (PS5, Steam, ...)
    genre:  z.union([z.string(), z.array(z.string())]).nullable().optional(), // Thể loại (1 hoặc nhiều)
    date:   dateSchema,
    order:  orderSchema,
  }),
});

/* ── PSN — thẻ tổng quan PlayStation (chỉ dùng 1 entry) ─────────────────────
 * assets/psn/<slug>/profile.md  (+ avatar.png)
 * Trang /profile đọc entry đầu tiên; anh cập nhật số liệu qua CMS.           */
const psn = defineCollection({
  loader: glob({
    pattern: ['*/profile.md', '!_*/profile.md'],
    base: './assets/psn',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    display_name: z.string().default('CENIX TR'),
    psn_id:       z.string().default('Mirirem'),
    avatar:       z.string().nullable().optional(),
    level:        z.number().default(0),
    platinum:     z.number().default(0),
    gold:         z.number().default(0),
    silver:       z.number().default(0),
    bronze:       z.number().default(0),
  }),
});

/* ── Platinum — mỗi cúp bạch kim PS5 đã đạt = 1 entry ───────────────────────
 * assets/platinum/<slug>/trophy.md  (+ cover.jpg)
 * Đạt cúp mới → anh đăng qua CMS: cover, tên game, ngày đạt, số cúp phụ.     */
const platinum = defineCollection({
  loader: glob({
    pattern: ['*/trophy.md', '!_*/trophy.md'],
    base: './assets/platinum',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title:  z.string(),
    cover:  z.string().nullable().optional(),
    date:   dateSchema, // ngày đạt cúp bạch kim
    gold:   z.number().default(0),
    silver: z.number().default(0),
    bronze: z.number().default(0),
    order:  orderSchema,
  }),
});

const profile = defineCollection({
  loader: glob({
    pattern: ['*/item.md', '!_*/item.md'],
    base: './assets/profile',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    type: z.enum(['psn', 'platinum', 'steam', 'switch', 'mobile', 'nostalgia']),
    title: z.string(),
    thumbnail: z.string().nullable().optional(),
    order: orderSchema,
    psn_id: z.string().nullable().optional(),
    level: z.number().nullable().optional(),
    platinum: z.number().nullable().optional(),
    gold: z.number().nullable().optional(),
    silver: z.number().nullable().optional(),
    bronze: z.number().nullable().optional(),
    playstation_games: z.string().nullable().optional(),
    steam_games: z.string().nullable().optional(),
    gaming_years: z.string().nullable().optional(),
    steam_achievements: z.number().nullable().optional(),
    date: dateSchema.nullable().optional(),
    appid: z.number().nullable().optional(),
    last_played: dateSchema.nullable().optional(),
    achieved: z.number().nullable().optional(),
    total: z.number().nullable().optional(),
    hours: z.number().nullable().optional(),
  }),
});
export const collections = { news, videos, tierlists, guides, reviews, psn, platinum, profile };
