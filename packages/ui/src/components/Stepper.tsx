import { cn } from "../lib/cn";
export interface Step { key: string; label: string; hasError?: boolean }
/**
 * Stepper del form multi-step (archetipo C). I passi completati sono cliccabili, i futuri no.
 * Il passo con errori bloccanti mostra l'indicatore danger.
 */
export function Stepper({ steps, current, onStepClick }: { steps: Step[]; current: number; onStepClick?: (i: number) => void }) {
  return (
    <ol className="flex items-center gap-2 text-sm" aria-label="Passaggi">
      {steps.map((s, i) => {
        const done = i < current, active = i === current;
        const dot = s.hasError ? "bg-[var(--pai-semantic-status-danger)] text-white" : done ? "bg-accent text-black" : active ? "border-2 border-accent text-accent" : "border border-line-strong text-ink-faint";
        const inner = (
          <span className={cn("flex items-center gap-2", active ? "text-ink font-medium" : done ? "text-ink" : "text-ink-faint")}>
            <span aria-hidden className={cn("size-6 shrink-0 rounded-pill grid place-items-center text-xs font-semibold tabular-nums", dot)}>{s.hasError ? "!" : done ? "✓" : i + 1}</span>
            {s.label}
          </span>
        );
        return (
          <li key={s.key} className="flex items-center gap-2" aria-current={active ? "step" : undefined}>
            {done && onStepClick ? <button type="button" className="rounded-xs" onClick={() => onStepClick(i)}>{inner}</button> : inner}
            {i < steps.length - 1 && <span aria-hidden className={cn("h-px w-8", done ? "bg-accent" : "bg-line")} />}
          </li>
        );
      })}
    </ol>
  );
}

/** Footer sticky del form (archetipo C): stato bozza a sinistra, Indietro/Continua a destra. */
export function StepFooter({ status, children }: { status?: string; children: React.ReactNode }) {
  return (
    <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-line bg-surface-panel px-6 py-3">
      <span className="text-xs text-ink-muted">{status}</span>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
