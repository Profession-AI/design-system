import { useMemo, useState, type ReactNode } from "react";
import { Checkbox } from "@heroui/react";
import { cn } from "../lib/cn";
import { DensityScope, useRegister, type Density } from "../lib/Register";
import { SkeletonRows } from "./Skeleton";
import { EmptyState } from "./EmptyState";
import { Alert } from "./Alert";

export type SortDir = "asc" | "desc";
export interface Column<T> {
  key: string;
  header: string;
  /** Cella. Default: String(row[key]). */
  cell?: (row: T) => ReactNode;
  /** Numeri e importi → "right" + tabular-nums automatici. */
  align?: "left" | "right";
  sortable?: boolean;
  width?: string;
  /** Prima colonna: identità con sottotesto. */
  primary?: boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Densità: le tabelle di lavoro sono compact di default (registro, regola 4). */
  density?: Density;
  sort?: { key: string; dir: SortDir };
  onSortChange?: (s: { key: string; dir: SortDir }) => void;
  selectable?: boolean;
  selected?: Set<string>;
  onSelectedChange?: (s: Set<string>) => void;
  onRowClick?: (row: T) => void;
  /** Colonna ⋯ (ContextMenu). */
  rowActions?: (row: T) => ReactNode;
  // ---- quattro stati obbligatori ----
  loading?: boolean;
  error?: { message: string; retry: () => void };
  empty?: { title: string; description?: string; action?: { label: string; onPress: () => void } };
  /** Mostrato quando rows è vuoto ma esistono filtri attivi: messaggio diverso dal vuoto. */
  noResults?: { onReset: () => void };
  hasActiveFilters?: boolean;
  caption?: string;
  className?: string;
}

const SortGlyph = ({ dir }: { dir?: SortDir }) => (
  <span aria-hidden className={cn("ml-1 inline-block text-[10px] leading-none", dir ? "text-ink" : "text-ink-faint")}>{dir === "asc" ? "▲" : dir === "desc" ? "▼" : "↕"}</span>
);

export function DataTable<T>(p: DataTableProps<T>) {
  const ctx = useRegister();
  const density = p.density ?? "compact";
  const [internalSort, setInternalSort] = useState<{ key: string; dir: SortDir } | undefined>();
  const sort = p.sort ?? internalSort;
  const setSort = p.onSortChange ?? setInternalSort;

  const sortedRows = useMemo(() => {
    if (!sort || p.onSortChange) return p.rows;
    const col = p.columns.find((c) => c.key === sort.key);
    if (!col) return p.rows;
    return [...p.rows].sort((a, b) => {
      const av = (a as any)[sort.key], bv = (b as any)[sort.key];
      const r = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.dir === "asc" ? r : -r;
    });
  }, [p.rows, sort, p.columns, p.onSortChange]);

  const allKeys = p.rows.map(p.rowKey);
  const allSelected = p.selected && allKeys.length > 0 && allKeys.every((k) => p.selected!.has(k));
  const someSelected = p.selected && allKeys.some((k) => p.selected!.has(k));
  const toggleAll = () => p.onSelectedChange?.(allSelected ? new Set() : new Set(allKeys));
  const toggle = (k: string) => { const s = new Set(p.selected); s.has(k) ? s.delete(k) : s.add(k); p.onSelectedChange?.(s); };

  const body = () => {
    if (p.loading) return <SkeletonRows rows={8} cols={p.columns.length} />;
    if (p.error) return <div className="p-4"><Alert status="danger" title="Impossibile caricare i dati" action={{ label: "Riprova", onPress: p.error.retry }}>{p.error.message}</Alert></div>;
    if (p.rows.length === 0 && p.hasActiveFilters && p.noResults)
      return <EmptyState title="Nessun risultato per questi filtri" description="Prova ad allargare il periodo o a togliere un filtro." action={{ label: "Azzera filtri", onPress: p.noResults.onReset }} />;
    if (p.rows.length === 0 && p.empty) return <EmptyState {...p.empty} />;
    return null;
  };
  const overlay = body();

  return (
    <DensityScope density={density} className={cn("rounded-lg border border-line bg-surface-raised overflow-hidden", p.className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[length:var(--pai-font-ui)]">
          {p.caption && <caption className="sr-only">{p.caption}</caption>}
          <thead className="bg-surface-sunken text-ink-muted text-xs font-medium">
            <tr className="h-row">
              {p.selectable && (
                <th scope="col" className="w-10 px-cell-x text-left">
                  <Checkbox size="sm" aria-label="Seleziona tutto" isSelected={!!allSelected} isIndeterminate={!!someSelected && !allSelected} onValueChange={toggleAll} />
                </th>
              )}
              {p.columns.map((c) => {
                const active = sort?.key === c.key;
                const dir = active ? sort!.dir : undefined;
                const label = c.sortable ? (
                  <button type="button" className="inline-flex items-center hover:text-ink rounded-xs"
                    aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
                    onClick={() => setSort({ key: c.key, dir: active && dir === "asc" ? "desc" : "asc" })}>
                    {c.header}<SortGlyph dir={dir} />
                  </button>
                ) : c.header;
                return <th key={c.key} scope="col" style={{ width: c.width }} className={cn("px-cell-x font-medium whitespace-nowrap", c.align === "right" ? "text-right" : "text-left")}>{label}</th>;
              })}
              {p.rowActions && <th scope="col" className="w-12" aria-label="Azioni" />}
            </tr>
          </thead>
          {!overlay && (
            <tbody className="divide-y divide-line">
              {sortedRows.map((row) => {
                const k = p.rowKey(row);
                const isSel = p.selected?.has(k);
                return (
                  <tr key={k}
                    className={cn("h-row transition-colors duration-fast", p.onRowClick && "cursor-pointer hover:bg-surface-sunken", isSel && "bg-accent-soft")}
                    onClick={p.onRowClick ? () => p.onRowClick!(row) : undefined}
                    tabIndex={p.onRowClick ? 0 : undefined}
                    onKeyDown={p.onRowClick ? (e) => { if (e.key === "Enter") p.onRowClick!(row); } : undefined}>
                    {p.selectable && (
                      <td className="px-cell-x" onClick={(e) => e.stopPropagation()}>
                        <Checkbox size="sm" aria-label={`Seleziona riga ${k}`} isSelected={!!isSel} onValueChange={() => toggle(k)} />
                      </td>
                    )}
                    {p.columns.map((c) => (
                      <td key={c.key} className={cn("px-cell-x whitespace-nowrap", c.align === "right" && "text-right tabular-nums", c.primary && "font-medium text-ink")}>
                        {c.cell ? c.cell(row) : String((row as any)[c.key] ?? "")}
                      </td>
                    ))}
                    {p.rowActions && <td className="px-2 text-right" onClick={(e) => e.stopPropagation()}>{p.rowActions(row)}</td>}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {overlay}
      </div>
    </DensityScope>
  );
}

/** Helper per la cella identità: nome + sottotesto (archetipo A, regola 3). */
export const IdentityCell = ({ name, sub }: { name: ReactNode; sub?: ReactNode }) => (
  <div className="flex flex-col leading-tight"><span>{name}</span>{sub && <span className="text-xs text-ink-muted font-normal">{sub}</span>}</div>
);
