import type { ReactNode } from "react";
import { Button } from "../ui/button";
/**
 * Stato vuoto = invito ad agire. Due varianti: `empty` (non c'è ancora nulla) e `no-results` (filtro senza esiti):
 * hanno testi e azioni diverse, non riusare lo stesso messaggio.
 */
export function EmptyState({ icon, title, description, action, secondary }: {
  icon?: ReactNode; title: string; description?: string;
  action?: { label: string; onClick: () => void }; secondary?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      {icon && <div className="text-ink-faint [&>svg]:size-8">{icon}</div>}
      <div className="text-md font-semibold">{title}</div>
      {description && <p className="max-w-reading text-sm text-ink-muted">{description}</p>}
      {(action || secondary) && (
        <div className="mt-2 flex gap-2">
          {action && <Button onClick={action.onClick}>{action.label}</Button>}
          {secondary && <Button variant="ghost" onClick={secondary.onClick}>{secondary.label}</Button>}
        </div>
      )}
    </div>
  );
}
