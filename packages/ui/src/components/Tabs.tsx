import { Tabs as HTabs, Tab } from "@heroui/react";
import type { ReactNode } from "react";
export interface TabItem { key: string; label: string; count?: number; content?: ReactNode }
/** Tab sottolineate, mai a pillola nel prodotto. Verticali per le impostazioni (archetipo D). */
export function Tabs({ items, selected, onChange, orientation = "horizontal" }: { items: TabItem[]; selected?: string; onChange?: (k: string) => void; orientation?: "horizontal" | "vertical" }) {
  return (
    <HTabs variant="underlined" color="primary" isVertical={orientation === "vertical"} selectedKey={selected} onSelectionChange={(k) => onChange?.(String(k))}
      classNames={{ tabList: orientation === "vertical" ? "w-56 items-stretch" : "gap-6 border-b border-line w-full", tab: orientation === "vertical" ? "justify-start h-control" : "px-0 h-control", cursor: "bg-accent" }}>
      {items.map((t) => (
        <Tab key={t.key} title={<span className="flex items-center gap-2">{t.label}{t.count !== undefined && <span className="text-xs text-ink-faint tabular-nums">{t.count}</span>}</span>}>{t.content}</Tab>
      ))}
    </HTabs>
  );
}
