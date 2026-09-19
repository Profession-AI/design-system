import { createContext, useContext, type ReactNode } from "react";
import { cn } from "./cn";

export type Register = "operational" | "learner" | "marketing";
export type Density = "comfortable" | "compact";

const Ctx = createContext<{ register: Register; density: Density }>({ register: "operational", density: "comfortable" });
export const useRegister = () => useContext(Ctx);

/**
 * Radice obbligatoria di ogni app. Applica registro, densità e tema (decisioni 12 e 16).
 * <RegisterRoot register="operational" density="comfortable" dark={false}>…</RegisterRoot>
 */
export function RegisterRoot({ register = "operational", density = "comfortable", dark = false, className, children }:
  { register?: Register; density?: Density; dark?: boolean; className?: string; children: ReactNode }) {
  return (
    <Ctx.Provider value={{ register, density }}>
      <div className={cn(`pai-${register}`, `pai-density-${density}`, dark && "dark", "min-h-full bg-surface-panel text-ink", className)}>{children}</div>
    </Ctx.Provider>
  );
}

/** Override locale di densità: le tabelle di lavoro sono compact di default (regola 4). */
export function DensityScope({ density, children, className }: { density: Density; children: ReactNode; className?: string }) {
  const parent = useRegister();
  return <Ctx.Provider value={{ ...parent, density }}><div className={cn(`pai-density-${density}`, className)}>{children}</div></Ctx.Provider>;
}
