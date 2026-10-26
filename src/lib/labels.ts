/** Display labels + ordering for enum-ish fields. */

export const NEWS_CATEGORIES = [
  { key: 'tin-tuc',         label: 'TIN TỨC' },
  { key: 'su-kien',         label: 'SỰ KIỆN' },
  { key: 'gioi-thieu-game', label: 'GIỚI THIỆU GAME' },
  { key: 'phan-tich',       label: 'PHÂN TÍCH' },
] as const;

export const VIDEO_CATEGORIES = [
  { key: 'gameplay',   label: 'GAMEPLAY' },
  { key: 'trailer',    label: 'TRAILER' },
  { key: 'review',     label: 'REVIEW' },
  { key: 'cot-truyen', label: 'CỐT TRUYỆN' },
  { key: 'huong-dan',  label: 'HƯỚNG DẪN' },
  { key: 'giai-tri',   label: 'GIẢI TRÍ' },
  { key: 'tin-tuc',    label: 'TIN TỨC' },
] as const;

export const GUIDE_LEVELS = [
  { key: 'tan-thu', label: 'TÂN THỦ',  no: '01', title: 'Tân thủ',           desc: '7 ngày đầu, reroll, quay banner nào trước' },
  { key: 'build',   label: 'BUILD',    no: '02', title: 'Build nhân vật',    desc: 'Vũ khí, di vật, chỉ số ưu tiên từng nhân vật' },
  { key: 'farm',    label: 'FARM',     no: '03', title: 'Farm & tài nguyên', desc: 'Lịch farm theo tuần, tối ưu thể lực, event shop' },
  { key: 'endgame', label: 'ENDGAME',  no: '04', title: 'Endgame',           desc: 'Clear full sao, đội hình rẻ, boss tuần' },
] as const;

/** Extra guide sub-category shown as a filter chip but NOT in the roadmap. */
export const GUIDE_FILTERS = [
  ...GUIDE_LEVELS.map((l) => ({ key: l.key, label: l.label })),
  { key: 'code', label: 'CODE' },
] as const;

export const ROLES = [
  { key: 'dps',     label: 'DPS' },
  { key: 'support', label: 'SUPPORT' },
  { key: 'healer',  label: 'HEALER' },
] as const;

export const TIERS = ['S', 'A', 'B', 'C'] as const;

export const TIER_COLOR: Record<string, string> = {
  S: '#ff5c5c',
  A: '#ffb347',
  B: '#c8f03c',
  C: '#7fb4ff',
};

const map = (arr: readonly { key: string; label: string }[]) =>
  Object.fromEntries(arr.map((x) => [x.key, x.label]));

export const NEWS_LABEL = map(NEWS_CATEGORIES);
export const VIDEO_LABEL = map(VIDEO_CATEGORIES);
export const GUIDE_LABEL = map(GUIDE_FILTERS);
export const ROLE_LABEL = map(ROLES);

/** Loại tướng (class) — dùng chung CMS editor + tooltip website. */
export const HERO_CLASSES = [
  { key: 'warrior',  label: 'Warrior',  icon: '⚔️' },
  { key: 'knight',   label: 'Knight',   icon: '🛡️' },
  { key: 'tank',     label: 'Tank',     icon: '🧱' },
  { key: 'wizard',   label: 'Wizard',   icon: '🔮' },
  { key: 'mage',     label: 'Mage',     icon: '✨' },
  { key: 'archer',   label: 'Archer',   icon: '🏹' },
  { key: 'assassin', label: 'Assassin', icon: '🗡️' },
  { key: 'rogue',    label: 'Rogue',    icon: '🥷' },
  { key: 'healer',   label: 'Healer',   icon: '💚' },
  { key: 'support',  label: 'Support',  icon: '🤝' },
] as const;
export const HERO_CLASS_MAP: Record<string, { key: string; label: string; icon: string }> =
  Object.fromEntries(HERO_CLASSES.map((c) => [c.key, c]));

/* ── Game của bài hướng dẫn ──────────────────────────────────────────────
 * Trang /huong-dan lọc theo game. Bài được gán game theo thứ tự:
 *   1. field `game` trong frontmatter (nếu có) — khớp `key` bên dưới
 *   2. tiêu đề / slug khớp `match`
 *   3. còn lại: tự lấy phần đầu tiêu đề trước " - " hoặc ":" làm tên game
 *      (icon = cover của bài mới nhất) → game mới tự hiện, không cần sửa code.
 * Thêm game "chính thức" (có icon riêng) = thêm 1 dòng ở đây + ảnh vuông
 * public/game-icons/<key>.jpg. Thứ tự mảng = thứ tự box trên trang.        */
export type GuideGame = { key: string; label: string; icon: string | null; match: RegExp[] };

export const GUIDE_GAMES: GuideGame[] = [
  { key: 'nioh-3',          label: 'Nioh 3',           icon: '/game-icons/nioh-3.jpg',          match: [/\bnioh\b/i] },
  { key: 'wandering-sword', label: 'Wandering Sword',  icon: '/game-icons/wandering-sword.jpg', match: [/wandering[\s-]sword/i] },
  { key: 'hero-adventure',  label: "Hero's Adventure", icon: '/game-icons/hero-adventure.jpg',  match: [/hero'?s?[\s-]adventure/i] },
  { key: 'poe-2',           label: 'Path of Exile 2',  icon: '/game-icons/poe-2.jpg',           match: [/path of exile/i, /^poe[\s-]?2\b/i] },
  { key: 'phantom-blade-zero', label: 'Phantom Blade Zero', icon: '/game-icons/phantom-blade-zero.jpg', match: [/phantom[\s-]blade/i] },
];

const slugifyGame = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** Trả về { key, label } game của 1 bài guide. */
export function guideGameOf(d: { title: string; slug: string; game?: string | null }): { key: string; label: string } {
  if (d.game) {
    const k = slugifyGame(d.game);
    const known = GUIDE_GAMES.find((g) => g.key === k || slugifyGame(g.label) === k || g.match.some((r) => r.test(d.game!)));
    return known ? { key: known.key, label: known.label } : { key: k, label: d.game.trim() };
  }
  const hit = GUIDE_GAMES.find((g) => g.match.some((r) => r.test(d.title) || r.test(d.slug)));
  if (hit) return { key: hit.key, label: hit.label };
  const prefix = d.title.split(/\s[-–—]\s|:/)[0].trim();
  if (prefix && prefix !== d.title.trim()) return { key: slugifyGame(prefix), label: prefix };
  return { key: 'khac', label: 'Khác' };
}
