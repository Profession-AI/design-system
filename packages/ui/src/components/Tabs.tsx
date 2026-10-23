import type { ReactNode } from "react";
import { Tabs as UITabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../lib/cn";

export interface TabItem { key: string; label: string; count?: number; content?: ReactNode }

/** Tab sottolineate, mai a pillola nel prodotto. Verticali per le impostazioni (archetipo D). */
export function Tabs({ items, selected, defaultSelected, onChange, orientation = "horizontal", className }: {
  items: TabItem[]; selected?: string; defaultSelected?: string; onChange?: (k: string) => void; orientation?: "horizontal" | "vertical"; className?: string;
}) {
  const vertical = orientation === "vertical";
  return (
    <UITabs value={selected} defaultValue={defaultSelected ?? (selected === undefined ? items[0]?.key : undefined)} onValueChange={onChange}
      orientation={orientation} className={cn(vertical ? "flex-row items-start gap-8" : "gap-6", className)}>
      <TabsList variant="line" className={cn("h-auto p-0", vertical ? "w-56 shrink-0 items-stretch gap-0.5" : "w-full justify-start gap-6 rounded-none border-b border-line")}>
        {items.map((t) => (
          <TabsTrigger key={t.key} value={t.key}
            className={cn("h-control flex-none text-ink-muted hover:text-ink data-[state=active]:text-ink",
              vertical ? "justify-start rounded-sm px-3 after:hidden data-[state=active]:bg-accent" : "rounded-none px-0 after:-bottom-px after:bg-brand")}>
            {t.label}{t.count !== undefined && <span className="text-xs tabular-nums text-ink-faint">{t.count}</span>}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.filter((t) => t.content !== undefined).map((t) => <TabsContent key={t.key} value={t.key}>{t.content}</TabsContent>)}
    </UITabs>
  );
}
