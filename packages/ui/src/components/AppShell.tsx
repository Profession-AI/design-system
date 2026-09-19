import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Shell del registro operativo (regola 1): sidebar scura con traccia del gradiente brand,
 * contenuto su pannello bianco a filo. Senza `sidebar`, diventa topbar-only (Radar).
 */
export function AppShell({ sidebar, topbar, children, collapsed }: { sidebar?: ReactNode; topbar?: ReactNode; children: ReactNode; collapsed?: boolean }) {
  return (
    <div className="flex min-h-screen bg-surface-panel">
      {sidebar && (
        <aside className={cn("shrink-0 flex flex-col text-neutral-50 transition-[width] duration-standard ease-sidebar", collapsed ? "w-sidebar-sm" : "w-sidebar")}
          style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--pai-color-app-shell-start) 35%, var(--pai-color-neutral-950)) 0%, var(--pai-color-neutral-950) 40%)" }}>
          {sidebar}
        </aside>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        {topbar && <div className="sticky top-0 z-10 flex h-topbar items-center border-b border-line bg-surface-panel px-6">{topbar}</div>}
        <main className="mx-auto w-full max-w-content px-6 pb-16">{children}</main>
      </div>
    </div>
  );
}

export interface NavItem { key: string; label: string; icon?: ReactNode; href?: string; active?: boolean; badge?: number }
export function SidebarNav({ items, collapsed, onSelect }: { items: NavItem[]; collapsed?: boolean; onSelect?: (k: string) => void }) {
  return (
    <nav className="flex flex-col gap-0.5 p-3" aria-label="Principale">
      {items.map((i) => (
        <a key={i.key} href={i.href} onClick={(e) => { if (onSelect) { e.preventDefault(); onSelect(i.key); } }} aria-current={i.active ? "page" : undefined}
          title={collapsed ? i.label : undefined}
          className={cn("flex h-control items-center gap-3 rounded-sm px-3 text-sm transition-colors duration-fast",
            i.active ? "bg-white/10 text-white font-medium" : "text-neutral-400 hover:text-white hover:bg-white/5")}>
          {i.icon && <span className="[&>svg]:size-4 shrink-0">{i.icon}</span>}
          {!collapsed && <span className="truncate">{i.label}</span>}
          {!collapsed && i.badge !== undefined && <span className="ml-auto text-xs tabular-nums text-neutral-400">{i.badge}</span>}
          {i.active && <span aria-hidden className="ml-auto size-1.5 rounded-pill bg-accent" />}
        </a>
      ))}
    </nav>
  );
}
