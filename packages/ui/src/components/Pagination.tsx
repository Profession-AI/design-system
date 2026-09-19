import { Pagination as HPagination, Select, SelectItem } from "@heroui/react";
import { fmtNumber } from "../lib/format";
/** "1–25 di 312 · [25 ▾] · ‹ 1 2 3 … ›". Page size limitato a 25/50/100. */
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
          <Select size="sm" aria-label="Righe per pagina" className="w-24" selectedKeys={[String(pageSize)]} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
            {[25, 50, 100].map((n) => <SelectItem key={String(n)}>{`${n} righe`}</SelectItem>)}
          </Select>
        )}
        <HPagination size="sm" showControls page={page} total={pages} onChange={onPageChange} />
      </div>
    </div>
  );
}
