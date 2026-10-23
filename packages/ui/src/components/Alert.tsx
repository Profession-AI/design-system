import type { ReactNode } from "react";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../lib/cn";
import type { Status } from "./Badge";

/** Messaggio inline persistente. Dice cosa è successo e come rimediare; nessuna scusa (content fundamentals). */
export function Alert({ status = "info", title, children, action, onClose, className }: {
  status?: Exclude<Status, "brand" | "neutral">; title?: string; children?: ReactNode;
  action?: { label: string; onClick: () => void }; onClose?: () => void; className?: string;
}) {
  const v = `--pai-semantic-status-${status}`;
  return (
    <div role={status === "danger" ? "alert" : "status"}
      className={cn("flex gap-3 rounded-md border p-3 text-sm", className)}
      style={{ background: `var(${v}-bg)`, borderColor: `var(${v}-border)` }}>
      <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-pill" style={{ background: `var(${v})` }} />
      <div className="min-w-0 flex-1">
        {title && <div className="font-semibold" style={{ color: `var(${v})` }}>{title}</div>}
        {children && <div className="text-ink">{children}</div>}
      </div>
      {action && <Button size="sm" variant="ghost" onClick={action.onClick}>{action.label}</Button>}
      {onClose && <Button size="icon-sm" variant="ghost" aria-label="Chiudi" onClick={onClose}><XIcon /></Button>}
    </div>
  );
}
