import { Fragment } from "react";
import { Breadcrumb as UIBreadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

/** Max 3 livelli. L'ultimo è la pagina corrente (non cliccabile). */
export const Breadcrumb = ({ items }: { items: { label: string; href?: string }[] }) => (
  <UIBreadcrumb>
    <BreadcrumbList className="text-sm text-ink-muted">
      {items.map((i, n) => {
        const last = n === items.length - 1;
        return (
          <Fragment key={n}>
            <BreadcrumbItem>{last ? <BreadcrumbPage>{i.label}</BreadcrumbPage> : <BreadcrumbLink href={i.href}>{i.label}</BreadcrumbLink>}</BreadcrumbItem>
            {!last && <BreadcrumbSeparator />}
          </Fragment>
        );
      })}
    </BreadcrumbList>
  </UIBreadcrumb>
);
