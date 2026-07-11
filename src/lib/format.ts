/** Small formatting helpers shared across pages. */

const MONTH_PAD = (n: number) => String(n).padStart(2, '0');

/** "2026-07-11" → "11.07.2026" */
export function dmy(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return String(date);
  return `${MONTH_PAD(d.getDate())}.${MONTH_PAD(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/** "2026-07-11" → "11.07" */
export function dm(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return String(date);
  return `${MONTH_PAD(d.getDate())}.${MONTH_PAD(d.getMonth() + 1)}`;
}

/** "2026-07-11" → { d: "11.07", y: "2026" } for the two-line date column. */
export function dmSplit(date: string | Date): { dm: string; y: string } {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return { dm: String(date), y: '' };
  return {
    dm: `${MONTH_PAD(d.getDate())}.${MONTH_PAD(d.getMonth() + 1)}`,
    y: String(d.getFullYear()),
  };
}

/** Estimate reading minutes from markdown body (~200 words/min, min 1). */
export function readMinutes(body: string | undefined, override?: number | null): number {
  if (override && override > 0) return override;
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Sort by `order` (asc, nulls last) then by date desc. */
export function byOrderThenDate<T extends { data: { order?: number | null; date?: string } }>(
  a: T,
  b: T
): number {
  const ao = a.data.order ?? Number.POSITIVE_INFINITY;
  const bo = b.data.order ?? Number.POSITIVE_INFINITY;
  if (ao !== bo) return ao - bo;
  const ad = a.data.date ? new Date(a.data.date).getTime() : 0;
  const bd = b.data.date ? new Date(b.data.date).getTime() : 0;
  return bd - ad;
}
