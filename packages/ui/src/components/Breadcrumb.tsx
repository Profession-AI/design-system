import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
/** Max 3 livelli. L'ultimo è la pagina corrente (non cliccabile). */
export const Breadcrumb = ({ items }: { items: { label: string; href?: string }[] }) => (
  <Breadcrumbs size="sm" classNames={{ list: "text-ink-muted" }}>
    {items.map((i, n) => <BreadcrumbItem key={n} href={i.href} isCurrent={n === items.length - 1}>{i.label}</BreadcrumbItem>)}
  </Breadcrumbs>
);
