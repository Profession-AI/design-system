import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import { cn } from "../lib/cn";

/** Scheda laterale da 480px (archetipo A, regola 5). Se la scheda ha tab o più di 3 sezioni, è una pagina, non un drawer. */
export function Drawer({ open, onClose, title, subtitle, children, footer }: {
  open: boolean; onClose: () => void; title: string; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <SheetContent side="right" className="w-[480px] max-w-full gap-0 shadow-xl sm:max-w-[480px]">
        <SheetHeader className="border-b border-line px-6 py-4">
          <SheetTitle className="text-md font-semibold leading-heading">{title}</SheetTitle>
          <SheetDescription className={cn("text-xs", !subtitle && "sr-only")}>{subtitle ?? title}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4 text-sm">{children}</div>
        {footer && <SheetFooter className="flex-row justify-end border-t border-line px-6 py-3">{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}
