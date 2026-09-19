import { Button } from "@heroui/react";
import type { ReactNode } from "react";
/**
 * Stato vuoto = invito ad agire. Due varianti: `empty` (non c'è ancora nulla) e `no-results` (filtro senza esiti):
 * hanno testi e azioni diverse, non riusare lo stesso messaggio.
 */
export function EmptyState({ icon, title, description, action, secondary }: {
  icon?: ReactNode; title: string; description?: string;
  action?: { label: string; onPress: () => void }; secondary?: { label: string; onPress: () => void };
}) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-16 px-6">
      {icon && <div className="text-ink-faint [&>svg]:size-8">{icon}</div>}
      <div className="text-md font-semibold">{title}</div>
      {description && <p className="text-sm text-ink-muted max-w-reading">{description}</p>}
      {(action || secondary) && (
        <div className="flex gap-2 mt-2">
          {action && <Button color="primary" onPress={action.onPress}>{action.label}</Button>}
          {secondary && <Button variant="light" onPress={secondary.onPress}>{secondary.label}</Button>}
        </div>
      )}
    </div>
  );
}
