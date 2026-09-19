import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Skeleton } from "../components/Skeleton";
import { Alert } from "../components/Alert";
import { EmptyState } from "../components/EmptyState";
/**
 * Cornice per qualsiasi grafico (archetipo B, regola 3): titolo, periodo, legenda in alto a destra,
 * altezza fissa, i quattro stati. Il grafico dentro è agnostico (Recharts, Chart.js, D3).
 */
export function ChartFrame({ title, period, legend, height = 280, loading, error, empty, children, className }: {
  title: string; period?: string; legend?: ReactNode; height?: number; loading?: boolean;
  error?: { message: string; retry: () => void }; empty?: boolean; children: ReactNode; className?: string;
}) {
  return (
    <figure className={cn("rounded-lg border border-line bg-surface-raised p-5 flex flex-col gap-4", className)}>
      <figcaption className="flex items-start justify-between gap-4">
        <div><div className="text-md font-semibold">{title}</div>{period && <div className="text-xs text-ink-muted">{period}</div>}</div>
        {legend && <div className="flex flex-wrap gap-3 text-xs text-ink-muted">{legend}</div>}
      </figcaption>
      <div style={{ height }} className="relative">
        {loading ? <Skeleton className="absolute inset-0" />
          : error ? <Alert status="danger" title="Grafico non disponibile" action={{ label: "Riprova", onPress: error.retry }}>{error.message}</Alert>
          : empty ? <EmptyState title="Nessun dato nel periodo" description="Allarga il periodo per vedere l'andamento." />
          : children}
      </div>
    </figure>
  );
}
export const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <span className="inline-flex items-center gap-1.5"><span aria-hidden className="size-2 rounded-pill" style={{ background: color }} />{label}</span>
);
