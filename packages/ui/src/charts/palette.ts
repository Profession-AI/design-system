// Palette grafici (decisione 10). Importa dai token generati: nessun hex qui.
import flat from "../../../../tokens/dist/tokens.flat.json";
import { isDev } from "../lib/dev";

export const chartCategorical = flat["chart.categorical"] as string[];   // serie 1 = teal, sempre
export const chartSequential  = flat["chart.sequential"]  as string[];   // heatmap, intensità
export const chartDiverging   = flat["chart.diverging"]   as string[];   // scostamenti ± (purple ↔ orange, mai rosso)
export const chartGrid = flat["chart.grid"] as string;
export const chartAxis = flat["chart.axis"] as string;

/** Colore per serie con guardia: oltre 8 serie il grafico va ripensato, non allargato. */
export const seriesColor = (i: number) => {
  if (isDev && i >= chartCategorical.length) console.warn("[pai] più di 8 serie: aggrega o dividi il grafico.");
  return chartCategorical[i % chartCategorical.length];
};

/** Opzioni pronte per Recharts. */
export const rechartsTheme = {
  cartesianGrid: { stroke: chartGrid, vertical: false, strokeDasharray: undefined },
  axis: { stroke: chartAxis, tick: { fill: chartAxis, fontSize: 12, fontFamily: "Figtree, Inter, system-ui" }, tickLine: false, axisLine: false },
  tooltipStyle: { borderRadius: 8, border: `1px solid ${chartGrid}`, boxShadow: "0 24px 48px -12px rgba(0,0,0,.25)", fontSize: 13, fontFamily: "Figtree, Inter, system-ui" },
  strokeWidth: 2,
};

/** Opzioni pronte per Chart.js. */
export const chartJsDefaults = {
  color: chartAxis,
  font: { family: "Figtree, Inter, system-ui", size: 12 },
  borderColor: chartGrid,
  scales: { x: { grid: { display: false } }, y: { grid: { color: chartGrid }, border: { display: false } } },
  plugins: { legend: { position: "top" as const, align: "end" as const, labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true } } },
};
