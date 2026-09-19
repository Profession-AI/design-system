import { addToast, ToastProvider } from "@heroui/react";
/**
 * Conferme di 4s, mai modali (registro, regola 7). Il testo echeggia il verbo dell'azione: "Pubblica" → "Pubblicato".
 * Montare <PaiToastProvider/> una volta nella radice.
 */
export const PaiToastProvider = () => <ToastProvider placement="bottom-right" toastOffset={16} toastProps={{ radius: "md", timeout: 4000, classNames: { base: "shadow-xl" } }} />;

type Kind = "success" | "warning" | "danger" | "info";
export const toast = (kind: Kind, title: string, description?: string, action?: { label: string; onPress: () => void }) =>
  addToast({ title, description, color: kind === "info" ? "default" : kind, timeout: kind === "danger" ? 8000 : 4000,
    endContent: action ? <button type="button" className="text-sm font-medium underline-offset-2 hover:underline" onClick={action.onPress}>{action.label}</button> : undefined });
export const toastSaved = () => toast("success", "Salvato");
