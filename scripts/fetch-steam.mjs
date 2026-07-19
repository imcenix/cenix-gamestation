import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const profileUrl = process.env.STEAM_PROFILE_URL || 'https://steamcommunity.com/id/imcenix/';
const response = await fetch(profileUrl, {
  headers: {
    'user-agent': 'CenixGameStation/1.0 (+https://game.imcenix.com)',
    'accept-language': 'en-US,en;q=0.9',
  },
});

if (!response.ok) throw new Error(`Steam profile request failed: ${response.status}`);
const html = await response.text();
const now = new Date();

const decode = (value = '') => value
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;|&#34;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const toNumber = (value = '0') => Number(value.replace(/,/g, '')) || 0;
const toIsoDate = (label) => {
  if (!label) return now.toISOString().slice(0, 10);
  const parsed = new Date(`${label} ${now.getUTCFullYear()} UTC`);
  if (Number.isNaN(parsed.getTime())) return now.toISOString().slice(0, 10);
  if (parsed.getTime() > now.getTime() + 7 * 86400000) parsed.setUTCFullYear(parsed.getUTCFullYear() - 1);
  return parsed.toISOString().slice(0, 10);
};

const recent = html
  .split(/<div class="recent_game">/i)
  .slice(1, 11)
  .map((block) => {
    const appid = Number(block.match(/steamcommunity\.com\/app\/(\d+)/i)?.[1] || 0);
    const name = decode(block.match(/<div class="game_name">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i)?.[1] || '');
    if (!appid || !name) return null;
    const hours = Number((block.match(/([\d,.]+)\s+hrs on record/i)?.[1] || '0').replace(/,/g, '')) || 0;
    const lastPlayed = toIsoDate(block.match(/last played on\s+(\d{1,2}\s+[A-Za-z]{3,9})/i)?.[1]);
    const achievementMatch = block.match(/class="ellipsis">\s*([\d,]+)\s+of\s+([\d,]+)/i);
    return {
      appid,
      name,
      lastPlayed,
      achieved: achievementMatch ? toNumber(achievementMatch[1]) : null,
      total: achievementMatch ? toNumber(achievementMatch[2]) : null,
      hours,
      header: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
    };
  })
  .filter(Boolean)
  .filter((game, index, games) => games.findIndex((item) => item.appid === game.appid) === index);

const personaName = decode(html.match(/class="actual_persona_name">([\s\S]*?)<\/span>/i)?.[1] || 'Cenix');
const level = toNumber(html.match(/friendPlayerLevelNum">\s*([\d,]+)/i)?.[1]);
const badges = toNumber(html.match(/\/badges\/[\s\S]{0,500}?profile_count_link_total">\s*([\d,]+)/i)?.[1]);
const achievements = toNumber(html.match(/data-tooltip-text="([\d,]+) achievements/i)?.[1]);
const perfectGames = toNumber(html.match(/href="[^"]*tab=perfect"[\s\S]{0,180}?class="value">\s*([\d,]+)/i)?.[1]);
const twoWeeksHours = Number((html.match(/([\d,.]+) hours past 2 weeks/i)?.[1] || '0').replace(/,/g, '')) || 0;

const showcaseBlock = html.match(/<div class="achievement_showcase">([\s\S]*?)<div class="showcase_content_bg showcase_stats_row">/i)?.[1] || '';
const showcase = [...showcaseBlock.matchAll(/<div class="showcase_achievement[^"]*"[^>]*data-tooltip-html="([^"]+)"[\s\S]*?<a href="([^"]*\/stats\/(\d+)\/achievements\/)"[\s\S]*?<img src="([^"]+)"/gi)]
  .slice(0, 6)
  .map((match) => {
    const [game = '', name = '', ...rarityParts] = match[1].split(/<br\s*\/?>/i).map(decode);
    return {
      appid: Number(match[3]),
      game,
      name,
      rarity: rarityParts.join(' '),
      icon: decode(match[4]),
      url: decode(match[2]),
    };
  });

const data = {
  fetchedAt: now.toISOString(),
  profile: { personaName, level, badges, url: profileUrl },
  totals: { games: 0, dlc: null, achievements, perfectGames, twoWeeksHours },
  recent,
  showcase,
};

const output = path.join(process.cwd(), 'src', 'data', 'steam.json');
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Steam profile synced: ${recent.length} recent games, ${achievements} achievements, ${showcase.length} showcased`);
