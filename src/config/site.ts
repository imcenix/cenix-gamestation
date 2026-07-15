/** Site-wide config for Cenix Game Station. Edit here, not in components. */

export const SITE = {
  name: 'Cenix Game Station',
  short: 'CENIX',
  domain: 'game.imcenix.com',
  url: 'https://game.imcenix.com',
  tagline: 'Blog game, tier-list & hướng dẫn — viết bởi người chơi thật, không clickbait.',
  est: 'EST. 2026 — BLOG GAME · TIER-LIST · HƯỚNG DẪN',
  footerNote: 'MADE BY GAMERS, FOR GAMERS',
  socials: {
    youtube: 'https://youtube.com/@cenix',
    facebook: 'https://facebook.com/cenix',
    discord: 'https://discord.gg/cenix',
  },
} as const;

/** Primary nav — active state matches BaseLayout `activeNav`. */
export const NAV = [
  { label: 'Home',      href: '/',          key: 'home' },
  { label: 'News',      href: '/tin-tuc',   key: 'news' },
  { label: 'Video',     href: '/video',     key: 'video' },
  { label: 'Tier List', href: '/tier-list', key: 'tier' },
  { label: 'Review',    href: '/review',    key: 'review' },
  { label: 'Tips',      href: '/huong-dan', key: 'guide' },
] as const;

/** 'profile' không nằm trong menu chính — nó là nút lime bên phải Nav. */
export type NavKey = (typeof NAV)[number]['key'] | 'profile';

/** Cenix Profile (/profile) — thông số cá nhân gaming, sửa ở đây. */
export const PROFILE = {
  psnId: 'Mirirem',
  psnUrl: 'https://psnprofiles.com/Mirirem',
  steamVanity: 'imcenix',
  steamUrl: 'https://steamcommunity.com/id/imcenix/',
  platinumTrophies: 14,
  playstationGames: '400+',
  steamGames: '150+',
  gamingYears: '30+',
  intro:
    'Life is more fun when you play games.\nA cross-platform gaming profile documenting Cenix’s journey through memorable worlds, hard-earned achievements, and milestones across console, PC, and mobile.',
} as const;
