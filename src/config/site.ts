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

export type NavKey = (typeof NAV)[number]['key'];
