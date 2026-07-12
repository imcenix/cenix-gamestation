import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * ─── Cenix Game Station — content model ──────────────────────────────────────
 * Nội dung do CMS (imcenix.com/cms) commit vào repo dưới dạng markdown +
 * frontmatter YAML. Mỗi bài là 1 folder trong assets/<collection>/<slug>/.
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

/* ── Tin tức ─────────────────────────────────────────────────────────────── */
const news = defineCollection({
  loader: glob({ pattern: ['*/post.md', '!_*/post.md'], base: './assets/news', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    title:    z.string(),
    slug:     z.string(),
    category: z.enum(['tin-tuc', 'su-kien', 'gioi-thieu-game', 'phan-tich']).default('tin-tuc'),
    date:     dateSchema,
    excerpt:  z.string().nullable().optional(),
    author:   z.string().default('Cenix Team'),
    read_minutes: z.number().nullable().optional(),
    cover:    z.string().nullable().optional(),
    featured: z.boolean().default(false),
    order:    orderSchema,
  }),
});

/* ── Video ───────────────────────────────────────────────────────────────── */
const videos = defineCollection({
  loader: glob({ pattern: ['*/video.md', '!_*/video.md'], base: './assets/videos', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    title:    z.string(),
    slug:     z.string(),
    youtube_url: z.string(),
    category: z.enum(['gameplay', 'review', 'cot-truyen', 'huong-dan', 'giai-tri', 'tin-tuc']).default('gameplay'),
    date:     dateSchema,
    duration: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    featured: z.boolean().default(false),
    order:    orderSchema,
  }),
});

/* ── Nhân vật (roster — chỉ hồ sơ, KHÔNG có tier/role xếp hạng) ────────────────
 * assets/characters/<slug>/character.md  (+ avatar.png)
 * Tier-list tra cứu nhân vật theo slug để dựng bảng + popup.                   */
const characters = defineCollection({
  loader: glob({ pattern: ['*/character.md', '!_*/character.md'], base: './assets/characters', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    name:       z.string(),
    slug:       z.string(),
    game:       z.string(),   // slug game, khớp tierlists.game
    rarity:     z.number().default(5),
    element:    z.string().nullable().optional(),
    weapon:     z.string().nullable().optional(),
    team:       z.string().nullable().optional(),
    reason:     z.string().nullable().optional(),
    build_url:  z.string().nullable().optional(),
    avatar:     z.string().nullable().optional(),
    order:      orderSchema,
  }),
});

/* ── Bảng tier (1 entry / game) ───────────────────────────────────────────────
 * assets/tierlists/<game-slug>/tierlist.md
 * Mỗi ô S/A/B/C theo vai trò là 1 danh sách SLUG nhân vật (roster).            */
const tierRow = z.array(z.string()).default([]);
const tierlists = defineCollection({
  loader: glob({ pattern: ['*/tierlist.md', '!_*/tierlist.md'], base: './assets/tierlists', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    game:       z.string(),
    game_label: z.string(),
    cover:      z.string().nullable().optional(),
    blurb:      z.string().nullable().optional(),
    version:    z.string().nullable().optional(),
    updated:    dateSchema,
    order:      orderSchema,
    // Xếp hạng theo vai trò — mỗi ô là danh sách slug nhân vật
    dps_s: tierRow, dps_a: tierRow, dps_b: tierRow, dps_c: tierRow,
    support_s: tierRow, support_a: tierRow, support_b: tierRow, support_c: tierRow,
    healer_s: tierRow, healer_a: tierRow, healer_b: tierRow, healer_c: tierRow,
    // Changelog
    changes_up:   z.array(z.string()).default([]),
    changes_down: z.array(z.string()).default([]),
    changes_new:  z.array(z.string()).default([]),
  }),
});

/* ── Hướng dẫn ───────────────────────────────────────────────────────────── */
const guides = defineCollection({
  loader: glob({ pattern: ['*/guide.md', '!_*/guide.md'], base: './assets/guides', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    title:    z.string(),
    slug:     z.string(),
    level:    z.enum(['tan-thu', 'build', 'farm', 'endgame', 'code']).default('tan-thu'),
    date:     dateSchema,
    excerpt:  z.string().nullable().optional(),
    cover:    z.string().nullable().optional(),
    tags:     z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order:    orderSchema,
  }),
});

export const collections = { news, videos, characters, tierlists, guides };
