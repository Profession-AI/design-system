import { Toaster, toast as sonner } from "sonner";
import type { CSSProperties } from "react";

/**
 * Conferme di 4s in basso a destra, mai modali (registro, regola 7). Il testo echeggia il verbo dell'azione:
 * "Pubblica" → "Pubblicato". Montato da RegisterRoot: non serve aggiungerlo nell'app.
 * I colori di stato vengono dai token (stesse tinte di Alert e Badge), non da quelli di sonner.
 */
export const PaiToaster = ({ dark }: { dark?: boolean }) => (
  <Toaster position="bottom-right" offset={16} duration={4000} richColors closeButton={false} theme={dark ? "dark" : "light"}
    toastOptions={{ classNames: { toast: "font-product text-sm shadow-xl", title: "font-medium", description: "text-ink-muted", actionButton: "font-medium" } }}
    style={{
      "--normal-bg": "var(--popover)", "--normal-text": "var(--popover-foreground)", "--normal-border": "var(--border)", "--border-radius": "var(--radius-md)",
      "--success-bg": "var(--pai-semantic-status-success-bg)", "--success-border": "var(--pai-semantic-status-success-border)", "--success-text": "var(--pai-semantic-status-success)",
      "--warning-bg": "var(--pai-semantic-status-warning-bg)", "--warning-border": "var(--pai-semantic-status-warning-border)", "--warning-text": "var(--pai-semantic-status-warning)",
      "--error-bg": "var(--pai-semantic-status-danger-bg)", "--error-border": "var(--pai-semantic-status-danger-border)", "--error-text": "var(--pai-semantic-status-danger)",
      "--info-bg": "var(--pai-semantic-status-info-bg)", "--info-border": "var(--pai-semantic-status-info-border)", "--info-text": "var(--pai-semantic-status-info)",
    } as CSSProperties} />
);

type Kind = "success" | "warning" | "danger" | "info";
export const toast = (kind: Kind, title: string, description?: string, action?: { label: string; onClick: () => void }) =>
  sonner[kind === "danger" ? "error" : kind](title, { description, duration: kind === "danger" ? 8000 : 4000, action });
export const toastSaved = () => toast("success", "Salvato");
