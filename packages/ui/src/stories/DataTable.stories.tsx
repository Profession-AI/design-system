import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@heroui/react";
import { DataTable, IdentityCell, type DataTableProps } from "../components/DataTable";
import { Badge } from "../components/Badge";
import { FilterBar } from "../components/FilterBar";
import { Pagination } from "../components/Pagination";
import { ContextMenu } from "../components/Tooltip";
import { fmtCurrency, fmtDateSmart } from "../lib/format";

type Lead = { id: string; azienda: string; contatto: string; stato: "nuovo" | "contattato" | "vinto" | "perso"; valore: number; aggiornato: string };
const stato: Record<Lead["stato"], { s: any; l: string }> = { nuovo: { s: "info", l: "Nuovo" }, contattato: { s: "warning", l: "Contattato" }, vinto: { s: "success", l: "Vinto" }, perso: { s: "neutral", l: "Perso" } };
const rows: Lead[] = Array.from({ length: 12 }, (_, i) => ({
  id: `l${i}`, azienda: ["Acme S.p.A.", "Beta Srl", "Gamma Group", "Delta SB"][i % 4], contatto: ["Laura Bianchi", "Marco Rossi", "Sara Neri"][i % 3],
  stato: (["nuovo", "contattato", "vinto", "perso"] as const)[i % 4], valore: 1250 * (i + 1), aggiornato: new Date(Date.now() - i * 86400e3 * 1.7).toISOString(),
}));
const columns = [
  { key: "azienda", header: "Azienda", primary: true, sortable: true, cell: (r: Lead) => <IdentityCell name={r.azienda} sub={r.contatto} /> },
  { key: "stato", header: "Stato", cell: (r: Lead) => <Badge status={stato[r.stato].s} dot>{stato[r.stato].l}</Badge> },
  { key: "aggiornato", header: "Aggiornato", sortable: true, cell: (r: Lead) => <span className="text-ink-muted">{fmtDateSmart(r.aggiornato)}</span> },
  { key: "valore", header: "Valore", align: "right" as const, sortable: true, cell: (r: Lead) => fmtCurrency(r.valore) },
];

const meta: Meta = { title: "Dati/DataTable", component: DataTable as any };
export default meta;
type S = StoryObj<DataTableProps<Lead>>;

export const ArchetipoListaCompleto: S = {
  render: () => {
    const [sel, setSel] = useState(new Set<string>()); const [page, setPage] = useState(1); const [q, setQ] = useState("");
    const filtered = rows.filter((r) => r.azienda.toLowerCase().includes(q.toLowerCase()));
    return (
      <div>
        <FilterBar search={q} onSearch={setQ} resultCount={filtered.length} onReset={() => setQ("")} selectedCount={sel.size} onClearSelection={() => setSel(new Set())}
          bulkActions={<><Button size="sm" variant="flat">Assegna</Button><Button size="sm" variant="flat" color="danger">Archivia</Button></>} />
        <DataTable columns={columns} rows={filtered} rowKey={(r) => r.id} selectable selected={sel} onSelectedChange={setSel} onRowClick={() => {}}
          hasActiveFilters={q !== ""} noResults={{ onReset: () => setQ("") }} empty={{ title: "Nessun lead ancora", description: "Importa un CSV o creane uno.", action: { label: "Crea lead", onPress: () => {} } }}
          rowActions={(r) => <ContextMenu items={[{ key: "e", label: "Modifica", onPress: () => {} }, { key: "d", label: "Elimina", danger: true, onPress: () => {} }]} label={`Azioni per ${r.azienda}`} />} />
        <Pagination page={page} pageSize={25} total={312} onPageChange={setPage} onPageSizeChange={() => {}} />
      </div>
    );
  },
};
export const Caricamento: S = { args: { columns, rows: [], rowKey: (r: any) => r.id, loading: true } };
export const Vuoto: S = { args: { columns, rows: [], rowKey: (r: any) => r.id, empty: { title: "Nessun lead ancora", description: "Importa un CSV o creane uno.", action: { label: "Crea lead", onPress: () => {} } } } };
export const FiltroSenzaRisultati: S = { args: { columns, rows: [], rowKey: (r: any) => r.id, hasActiveFilters: true, noResults: { onReset: () => {} } } };
export const Errore: S = { args: { columns, rows: [], rowKey: (r: any) => r.id, error: { message: "Il server non ha risposto entro 10 secondi.", retry: () => {} } } };
export const Comfortable: S = { args: { columns, rows, rowKey: (r: any) => r.id, density: "comfortable" } };
