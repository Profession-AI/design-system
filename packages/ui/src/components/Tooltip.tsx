import { Tooltip as HTooltip, Popover as HPopover, PopoverTrigger, PopoverContent, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import type { ReactNode } from "react";

/** Tooltip = spiegazione breve di un'icona o abbreviazione. Mai contenuto essenziale. */
export const Tooltip = ({ content, children }: { content: string; children: ReactNode }) => (
  <HTooltip content={content} delay={300} closeDelay={0} radius="sm" size="sm">{children as any}</HTooltip>
);

/** Popover = contenuto interattivo ancorato (filtro, mini-form). */
export const Popover = ({ trigger, children, placement = "bottom-start" }: { trigger: ReactNode; children: ReactNode; placement?: any }) => (
  <HPopover placement={placement} radius="md" shadow="lg">
    <PopoverTrigger>{trigger as any}</PopoverTrigger>
    <PopoverContent className="p-4 min-w-64 text-sm">{children}</PopoverContent>
  </HPopover>
);

export interface MenuItem { key: string; label: string; onPress: () => void; danger?: boolean; disabled?: boolean; description?: string }
/** Menu ⋯ di riga. Le azioni distruttive vanno in fondo, separate, in danger, e aprono un ConfirmDialog. */
export function ContextMenu({ items, label = "Azioni", trigger }: { items: MenuItem[]; label?: string; trigger?: ReactNode }) {
  const safe = items.filter((i) => !i.danger), dangerous = items.filter((i) => i.danger);
  return (
    <Dropdown radius="md" placement="bottom-end">
      <DropdownTrigger>{trigger ?? <Button size="sm" variant="light" isIconOnly aria-label={label}>⋯</Button>}</DropdownTrigger>
      <DropdownMenu aria-label={label} disabledKeys={items.filter((i) => i.disabled).map((i) => i.key)} onAction={(k) => items.find((i) => i.key === k)?.onPress()}>
        {[...safe.map((i) => <DropdownItem key={i.key} description={i.description}>{i.label}</DropdownItem>),
          ...dangerous.map((i, n) => <DropdownItem key={i.key} color="danger" className="text-danger" showDivider={n === 0 && safe.length > 0} description={i.description}>{i.label}</DropdownItem>)]}
      </DropdownMenu>
    </Dropdown>
  );
}
