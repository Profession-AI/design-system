import { Button, Input } from "@heroui/react";
import type { ReactNode } from "react";
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
      <div className="flex items-center gap-3 h-control mb-3 px-3 rounded-md bg-accent-soft text-sm">
        <span className="font-medium tabular-nums">{fmtNumber(selectedCount)} {selectedCount === 1 ? "selezionato" : "selezionati"}</span>
        <div className="flex gap-2">{bulkActions}</div>
        <Button size="sm" variant="light" className="ml-auto" onPress={onClearSelection}>Annulla selezione</Button>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      {onSearch && <Input size="sm" type="search" aria-label="Cerca" placeholder="Cerca" value={search} onValueChange={onSearch} className="w-64" />}
      {filters}
      <div className="ml-auto flex items-center gap-2 text-sm text-ink-muted">
        {resultCount !== undefined && <span className="tabular-nums">{fmtNumber(resultCount)} {resultCount === 1 ? "risultato" : "risultati"}</span>}
        {onReset && <Button size="sm" variant="light" onPress={onReset}>Azzera</Button>}
      </div>
    </div>
  );
}
