import type { ReactNode } from "react";
import { cn } from "../lib/cn";
/** Card prodotto: bordo `line`, nessuna ombra, 24px padding. Due card non si annidano. `danger` per la zona pericolosa. */
export function AppCard({ title, description, actions, danger, children, className, padded = true }: {
  title?: string; description?: string; actions?: ReactNode; danger?: boolean; children: ReactNode; className?: string; padded?: boolean;
}) {
  return (
    <section className={cn("rounded-lg border bg-surface-raised", danger ? "border-[var(--pai-semantic-status-danger-border)]" : "border-line", className)}>
      {(title || actions) && (
        <header className="flex items-start justify-between gap-4 px-6 pt-5 pb-3">
          <div>{title && <h2 className={cn("text-md font-semibold", danger && "text-[var(--pai-semantic-status-danger)]")}>{title}</h2>}{description && <p className="text-sm text-ink-muted mt-0.5">{description}</p>}</div>
          {actions}
        </header>
      )}
      <div className={cn(padded && "px-6 pb-6", title && !padded && "border-t border-line")}>{children}</div>
    </section>
  );
}
export const AppDivider = () => <hr className="border-line my-4" />;

/** Riga di impostazione (archetipo D): etichetta 200px a sinistra, controllo a destra. */
export const SettingRow = ({ label, description, children }: { label: string; description?: string; children: ReactNode }) => (
  <div className="flex items-start gap-6 py-4 border-b border-line last:border-0">
    <div className="w-52 shrink-0"><div className="text-sm font-medium">{label}</div>{description && <div className="text-xs text-ink-muted">{description}</div>}</div>
    <div className="flex-1 min-w-0">{children}</div>
  </div>
);
