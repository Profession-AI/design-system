import { Drawer as HDrawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@heroui/react";
import type { ReactNode } from "react";
/** Scheda laterale da 480px (archetipo A, regola 5). Se la scheda ha tab o più di 3 sezioni, è una pagina, non un drawer. */
export function Drawer({ isOpen, onClose, title, subtitle, children, footer }: {
  isOpen: boolean; onClose: () => void; title: string; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <HDrawer isOpen={isOpen} onClose={onClose} placement="right" radius="none" classNames={{ base: "w-[480px] max-w-full shadow-xl" }}>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-0.5 border-b border-line">
          <span className="text-md font-semibold">{title}</span>
          {subtitle && <span className="text-xs font-normal text-ink-muted">{subtitle}</span>}
        </DrawerHeader>
        <DrawerBody className="text-sm">{children}</DrawerBody>
        {footer && <DrawerFooter className="border-t border-line">{footer}</DrawerFooter>}
      </DrawerContent>
    </HDrawer>
  );
}
