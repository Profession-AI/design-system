import type { Meta, StoryObj } from "@storybook/react";
import { KpiCard } from "../components/KpiCard";
import { ChartFrame, LegendItem } from "../charts/ChartFrame";
import { chartCategorical } from "../charts/palette";

const meta: Meta = { title: "Dati/Overview KPI" };
export default meta;

export const Archetipo: StoryObj = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <KpiCard label="Fatturato del mese" value="42.180" unit="€" delta="+8 %" deltaIsGood hint="vs agosto" />
      <KpiCard label="Nuove iscrizioni" value="312" delta="−3 %" deltaIsGood={false} hint="vs agosto" />
      <KpiCard label="Costo per lead" value="18,40" unit="€" delta="−12 %" deltaIsGood hint="un calo dei costi è positivo" />
      <KpiCard label="Completamento medio" value="42 %" hint="nessun confronto → nessun colore" />
      <KpiCard label="Caricamento" value="" loading />
      <ChartFrame className="col-span-3" title="Iscrizioni per settimana" period="1 lug – 19 set 2026" legend={<><LegendItem color={chartCategorical[0]} label="Master" /><LegendItem color={chartCategorical[1]} label="Bootcamp" /></>}>
        <div className="h-full grid place-items-center text-sm text-ink-faint">[grafico Recharts/Chart.js con `rechartsTheme` o `chartJsDefaults`]</div>
      </ChartFrame>
    </div>
  ),
};
export const StatiChart: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <ChartFrame title="Caricamento" loading><div /></ChartFrame>
      <ChartFrame title="Vuoto" empty><div /></ChartFrame>
      <ChartFrame title="Errore" error={{ message: "Timeout.", retry: () => {} }}><div /></ChartFrame>
    </div>
  ),
};
export const Palette: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3 text-xs">
      <div className="flex gap-1">{chartCategorical.map((c, i) => <div key={c} className="h-10 flex-1 rounded-sm grid place-items-end pb-1" style={{ background: c }}>{i + 1}</div>)}</div>
      <p className="text-ink-muted">Categoriale: serie 1 sempre teal. Oltre 8 serie: aggrega. Rosso mai.</p>
    </div>
  ),
};
