import { cn } from "../lib/cn";
/** Placeholder di caricamento. Mai uno spinner a pagina intera (registro, regola 8). */
export const Skeleton = ({ className }: { className?: string }) => (
  <div aria-hidden className={cn("animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700 motion-reduce:animate-none", className)} />
);
export const SkeletonRows = ({ rows = 8, cols = 5 }: { rows?: number; cols?: number }) => (
  <div role="status" aria-label="Caricamento" className="divide-y divide-line">
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="flex items-center gap-4 h-row px-cell-x">
        {Array.from({ length: cols }).map((_, c) => <Skeleton key={c} className={cn("h-3", c === 0 ? "w-48" : "w-20")} />)}
      </div>
    ))}
  </div>
);
