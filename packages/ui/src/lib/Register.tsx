import { createContext, useContext, useEffect, type ReactNode } from "react";
import { cn } from "./cn";
import { TooltipProvider } from "../ui/tooltip";
import { PaiToaster } from "../components/Toast";

export type Register = "operational" | "learner" | "marketing";
export type Density = "comfortable" | "compact";

const Ctx = createContext<{ register: Register; density: Density; dark: boolean }>({ register: "operational", density: "comfortable", dark: false });
export const useRegister = () => useContext(Ctx);

/**
 * Radice obbligatoria di ogni app. Applica registro, densità e tema (decisioni 12 e 16), monta il
 * provider dei tooltip e il toaster. Copia registro e `.dark` anche su <html>, così i portali di
 * Radix (dialog, select, menu: montati su <body>) ereditano le stesse variabili.
 * <RegisterRoot register="operational" density="comfortable" dark={false}>…</RegisterRoot>
 */
export function RegisterRoot({ register = "operational", density = "comfortable", dark = false, className, children }:
  { register?: Register; density?: Density; dark?: boolean; className?: string; children: ReactNode }) {
  useEffect(() => {
    const el = document.documentElement;
    const classes = [`pai-${register}`, `pai-density-${density}`];
    el.classList.add(...classes);
    el.classList.toggle("dark", dark);
    return () => { el.classList.remove(...classes, "dark"); };
  }, [register, density, dark]);
  return (
    <Ctx.Provider value={{ register, density, dark }}>
      <TooltipProvider delayDuration={300}>
        <div className={cn(`pai-${register}`, `pai-density-${density}`, dark && "dark", "min-h-full bg-surface-panel text-ink", className)}>{children}</div>
        <PaiToaster dark={dark} />
      </TooltipProvider>
    </Ctx.Provider>
  );
}

/** Override locale di densità: le tabelle di lavoro sono compact di default (regola 4). */
export function DensityScope({ density, children, className }: { density: Density; children: ReactNode; className?: string }) {
  const parent = useRegister();
  return <Ctx.Provider value={{ ...parent, density }}><div className={cn(`pai-density-${density}`, className)}>{children}</div></Ctx.Provider>;
}
