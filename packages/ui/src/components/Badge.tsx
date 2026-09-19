import { cn } from "../lib/cn";
export type Status = "success" | "warning" | "danger" | "info" | "neutral" | "accent";

const styles: Record<Status, string> = {
  success: "bg-[var(--pai-semantic-status-success-bg)] text-[var(--pai-semantic-status-success)] border-[var(--pai-semantic-status-success-border)]",
  warning: "bg-[var(--pai-semantic-status-warning-bg)] text-[var(--pai-semantic-status-warning)] border-[var(--pai-semantic-status-warning-border)]",
  danger:  "bg-[var(--pai-semantic-status-danger-bg)]  text-[var(--pai-semantic-status-danger)]  border-[var(--pai-semantic-status-danger-border)]",
  info:    "bg-[var(--pai-semantic-status-info-bg)]    text-[var(--pai-semantic-status-info)]    border-[var(--pai-semantic-status-info-border)]",
  neutral: "bg-[var(--pai-semantic-status-neutral-bg)] text-[var(--pai-semantic-status-neutral)] border-[var(--pai-semantic-status-neutral-border)]",
  accent:  "bg-accent-soft text-accent-strong border-teal-200",
};

/** Stato di un oggetto. Testo sempre presente: il colore da solo non basta (a11y). Punto opzionale per legende. */
export function Badge({ status = "neutral", dot, className, children }: { status?: Status; dot?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 h-6 px-2 rounded-sm border text-xs font-medium whitespace-nowrap", styles[status], className)}>
      {dot && <span aria-hidden className="size-1.5 rounded-pill bg-current" />}
      {children}
    </span>
  );
}
