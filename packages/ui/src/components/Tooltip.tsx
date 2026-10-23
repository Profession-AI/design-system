import { Fragment, type ReactNode } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Popover as UIPopover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "../lib/cn";

/** Tooltip = spiegazione breve di un'icona o abbreviazione. Mai contenuto essenziale. `children` deve accettare un ref (elemento o componente con asChild). */
export const Tooltip = ({ content, children, side }: { content: string; children: ReactNode; side?: "top" | "right" | "bottom" | "left" }) => (
  <UITooltip><TooltipTrigger asChild>{children}</TooltipTrigger><TooltipContent side={side}>{content}</TooltipContent></UITooltip>
);

/** Popover = contenuto interattivo ancorato (filtro, mini-form). */
export const Popover = ({ trigger, children, align = "start", side, className }: { trigger: ReactNode; children: ReactNode; align?: "start" | "center" | "end"; side?: "top" | "right" | "bottom" | "left"; className?: string }) => (
  <UIPopover>
    <PopoverTrigger asChild>{trigger}</PopoverTrigger>
    <PopoverContent align={align} side={side} className={cn("min-w-64 w-auto text-sm shadow-xl", className)}>{children}</PopoverContent>
  </UIPopover>
);

export interface MenuItem { key: string; label: string; onClick: () => void; danger?: boolean; disabled?: boolean; description?: string }
/** Menu ⋯ di riga. Le azioni distruttive vanno in fondo, separate, in danger, e aprono un ConfirmDialog. */
export function ContextMenu({ items, label = "Azioni", trigger }: { items: MenuItem[]; label?: string; trigger?: ReactNode }) {
  const safe = items.filter((i) => !i.danger), dangerous = items.filter((i) => i.danger);
  const render = (i: MenuItem) => (
    <DropdownMenuItem key={i.key} disabled={i.disabled} variant={i.danger ? "destructive" : "default"} onSelect={() => i.onClick()} className={cn(i.description && "flex-col items-start gap-0.5")}>
      {i.label}{i.description && <span className="text-xs text-ink-muted">{i.description}</span>}
    </DropdownMenuItem>
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger ?? <Button variant="ghost" size="icon-sm" aria-label={label}><MoreHorizontalIcon /></Button>}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label={label} className="min-w-44 shadow-xl">
        {safe.map(render)}
        {dangerous.length > 0 && <Fragment>{safe.length > 0 && <DropdownMenuSeparator />}{dangerous.map(render)}</Fragment>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
