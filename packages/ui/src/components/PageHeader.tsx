import type { ReactNode } from "react";
import { cn } from "../lib/cn";
/** Titolo + conteggio + azioni a destra (archetipo A/B). Una sola azione primaria. */
export function PageHeader({ title, count, description, actions, back, className }: {
  title: string; count?: number; description?: string; actions?: ReactNode; back?: ReactNode; className?: string;
}) {
  return (
    <header className={cn("flex items-start justify-between gap-6 py-6", className)}>
      <div className="min-w-0">
        {back && <div className="mb-2 text-sm text-ink-muted">{back}</div>}
        <h1 className="text-xl font-semibold tracking-heading leading-heading">
          {title}{count !== undefined && <span className="ml-2 text-ink-faint font-medium tabular-nums">({new Intl.NumberFormat("it-IT").format(count)})</span>}
        </h1>
        {description && <p className="mt-1 text-sm text-ink-muted max-w-reading">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
