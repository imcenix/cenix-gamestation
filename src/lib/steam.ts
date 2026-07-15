/** Đọc data Steam đã fetch lúc build (Actions chạy scripts/fetch-steam.mjs
 *  → src/data/steam.json). Dev local không có file đó thì rơi về sample. */

import sample from '../data/steam.sample.json';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export interface SteamRecentGame {
  appid: number;
  name: string;
  lastPlayed: string;      // ISO date
  achieved: number | null; // null = game không có achievement / stats ẩn
  total: number | null;
  hours: number;           // tổng giờ chơi
  header: string;          // ảnh header từ Steam CDN
}

export interface SteamData {
  fetchedAt: string;
  profile: { personaName: string; level: number; badges: number; url: string };
  totals: {
    games: number;
    dlc: number | null; // null = API không trả được → ẩn ô DLC
    achievements: number;
    perfectGames: number;
    twoWeeksHours: number;
  };
  recent: SteamRecentGame[];
}

export async function loadSteam(): Promise<SteamData> {
  try {
    // Đọc ở build-time để Vite không resolve một file tùy chọn trước khi catch chạy.
    const realPath = path.join(process.cwd(), 'src', 'data', 'steam.json');
    return JSON.parse(await readFile(realPath, 'utf8')) as SteamData;
  } catch {
    return sample as unknown as SteamData;
  }
}
