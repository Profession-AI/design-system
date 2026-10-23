import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Pagination as UIPagination, PaginationContent, PaginationEllipsis, PaginationItem } from "../ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { fmtNumber } from "../lib/format";

/** Pagine da mostrare: prima, ultima, corrente ±1; `null` = ellissi. */
function pageList(page: number, pages: number): (number | null)[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, pages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages));
  const sorted = [...set].sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? [null, p] : [p]));
}

/** "1–25 di 312 · [25 righe ▾] · ‹ 1 2 3 … ›". Page size limitato a 25/50/100. */
export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }: {
  page: number; pageSize: number; total: number; onPageChange: (p: number) => void; onPageSizeChange?: (s: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1, to = Math.min(page * pageSize, total);
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm text-ink-muted">
      <span className="tabular-nums">{fmtNumber(from)}–{fmtNumber(to)} di {fmtNumber(total)}</span>
      <div className="flex items-center gap-3">
        {onPageSizeChange && (
          <Select value={String(pageSize)} onValueChange={(v) => onPageSizeChange(Number(v))}>
            <SelectTrigger size="sm" aria-label="Righe per pagina" className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>{[25, 50, 100].map((n) => <SelectItem key={n} value={String(n)}>{n} righe</SelectItem>)}</SelectContent>
          </Select>
        )}
        <UIPagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button variant="ghost" size="icon-sm" aria-label="Pagina precedente" disabled={page <= 1} onClick={() => onPageChange(page - 1)}><ChevronLeftIcon /></Button>
            </PaginationItem>
            {pageList(page, pages).map((p, i) => (
              <PaginationItem key={p ?? `e${i}`}>
                {p === null ? <PaginationEllipsis className="size-8" /> : (
                  <Button variant={p === page ? "outline" : "ghost"} size="icon-sm" aria-current={p === page ? "page" : undefined} aria-label={`Pagina ${p}`} className="tabular-nums" onClick={() => onPageChange(p)}>{p}</Button>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <Button variant="ghost" size="icon-sm" aria-label="Pagina successiva" disabled={page >= pages} onClick={() => onPageChange(page + 1)}><ChevronRightIcon /></Button>
            </PaginationItem>
          </PaginationContent>
        </UIPagination>
      </div>
    </div>
  );
}
