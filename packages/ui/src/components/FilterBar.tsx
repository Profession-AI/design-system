import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { fmtNumber } from "../lib/format";
/**
 * Ricerca + filtri a sinistra, conteggio + reset a destra. Con una selezione attiva, i filtri
 * lasciano il posto alle azioni bulk (archetipo A, regola 2).
 */
export function FilterBar({ search, onSearch, filters, resultCount, onReset, selectedCount, bulkActions, onClearSelection }: {
  search?: string; onSearch?: (v: string) => void; filters?: ReactNode; resultCount?: number; onReset?: () => void;
  selectedCount?: number; bulkActions?: ReactNode; onClearSelection?: () => void;
}) {
  if (selectedCount && selectedCount > 0) {
    return (
      <div className="mb-3 flex h-control items-center gap-3 rounded-md bg-brand-soft px-3 text-sm">
        <span className="font-medium tabular-nums">{fmtNumber(selectedCount)} {selectedCount === 1 ? "selezionato" : "selezionati"}</span>
        <div className="flex gap-2">{bulkActions}</div>
        <Button size="sm" variant="ghost" className="ml-auto" onClick={onClearSelection}>Annulla selezione</Button>
      </div>
    );
  }
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      {onSearch && <Input type="search" aria-label="Cerca" placeholder="Cerca" value={search ?? ""} onChange={(e) => onSearch(e.target.value)} className="w-64" />}
      {filters}
      <div className="ml-auto flex items-center gap-2 text-sm text-ink-muted">
        {resultCount !== undefined && <span className="tabular-nums">{fmtNumber(resultCount)} {resultCount === 1 ? "risultato" : "risultati"}</span>}
        {onReset && <Button size="sm" variant="ghost" onClick={onReset}>Azzera</Button>}
      </div>
    </div>
  );
}
