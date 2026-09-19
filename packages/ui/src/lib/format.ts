// Formattazione italiana (registro operativo, regola 7). Unico punto: niente toLocaleString sparsi nelle app.
const it = "it-IT";
export const fmtNumber = (n: number, digits = 0) => new Intl.NumberFormat(it, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);
export const fmtCurrency = (n: number, currency = "EUR") => new Intl.NumberFormat(it, { style: "currency", currency }).format(n);
export const fmtPercent = (ratio: number, digits = 0) => new Intl.NumberFormat(it, { style: "percent", maximumFractionDigits: digits }).format(ratio);
export const fmtDate = (d: Date | string) => new Intl.DateTimeFormat(it, { day: "numeric", month: "short", year: "numeric" }).format(new Date(d));
export const fmtTime = (d: Date | string) => new Intl.DateTimeFormat(it, { hour: "2-digit", minute: "2-digit" }).format(new Date(d));
/** Relativa sotto i 7 giorni, assoluta oltre (archetipo A, regola 3). */
export function fmtDateSmart(d: Date | string, now = new Date()) {
  const diff = (now.getTime() - new Date(d).getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(it, { numeric: "auto" });
  if (diff < 60) return "adesso";
  if (diff < 3600) return rtf.format(-Math.round(diff / 60), "minute");
  if (diff < 86400) return rtf.format(-Math.round(diff / 3600), "hour");
  if (diff < 7 * 86400) return rtf.format(-Math.round(diff / 86400), "day");
  return fmtDate(d);
}
