/** Display labels + ordering for enum-ish fields. */

export const NEWS_CATEGORIES = [
  { key: 'tin-tuc',         label: 'TIN TỨC' },
  { key: 'su-kien',         label: 'SỰ KIỆN' },
  { key: 'gioi-thieu-game', label: 'GIỚI THIỆU GAME' },
  { key: 'phan-tich',       label: 'PHÂN TÍCH' },
] as const;

export const VIDEO_CATEGORIES = [
  { key: 'gameplay',   label: 'GAMEPLAY' },
  { key: 'review',     label: 'REVIEW' },
  { key: 'cot-truyen', label: 'CỐT TRUYỆN' },
  { key: 'huong-dan',  label: 'HƯỚNG DẪN' },
  { key: 'giai-tri',   label: 'GIẢI TRÍ' },
  { key: 'tin-tuc',    label: 'TIN TỨC' },
] as const;

export const GUIDE_LEVELS = [
  { key: 'tan-thu', label: 'TÂN THỦ',  no: '01', title: 'Tân thủ',          desc: '7 ngày đầu, reroll, quay banner nào trước' },
  { key: 'build',   label: 'BUILD',    no: '02', title: 'Build nhân vật',   desc: 'Vũ khí, di vật, chỉ số ưu tiên từng nhân vật' },
  { key: 'farm',    label: 'FARM',     no: '03', title: 'Farm & tài nguyên', desc: 'Lịch farm theo tuần, tối ưu thể lực, event shop' },
  { key: 'endgame', label: 'ENDGAME',  no: '04', title: 'Endgame',          desc: 'Clear full sao, đội hình rẻ, boss tuần' },
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
export const GUIDE_LABEL = map(GUIDE_LEVELS);
export const ROLE_LABEL = map(ROLES);
