import { cn } from "../lib/cn";
import { Skeleton } from "./Skeleton";

/**
 * Archetipo B. Delta colorato SOLO se il confronto è definito; `deltaIsGood` decide il colore
 * (un calo dei costi è positivo). Nessun gradiente, nessuna icona decorativa.
 */
export function KpiCard({ label, value, unit, delta, deltaIsGood, hint, loading, className }: {
  label: string; value: string; unit?: string;
  delta?: string; deltaIsGood?: boolean; hint?: string; loading?: boolean; className?: string;
}) {
  const deltaColor = delta === undefined ? "" : deltaIsGood === undefined ? "text-ink-muted" : deltaIsGood ? "text-[var(--pai-semantic-status-success)]" : "text-[var(--pai-semantic-status-danger)]";
  return (
    <div className={cn("rounded-lg border border-line bg-surface-raised p-5 flex flex-col gap-2", className)}>
      {loading ? (
        <><Skeleton className="h-3 w-24" /><Skeleton className="h-8 w-32" /><Skeleton className="h-3 w-16" /></>
      ) : (
        <>
          <div className="text-sm text-ink-muted">{label}</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-semibold tracking-heading tabular-nums leading-none">{value}</span>
            {unit && <span className="text-sm text-ink-muted">{unit}</span>}
          </div>
          {(delta || hint) && (
            <div className="flex items-center gap-2 text-xs">
              {delta && <span className={cn("font-medium tabular-nums", deltaColor)}>{delta}</span>}
              {hint && <span className="text-ink-faint">{hint}</span>}
            </div>
          )}
        </>
      )}
    </div>
  );
}
