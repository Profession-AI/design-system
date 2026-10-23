import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../ui/button";
import { Alert } from "../components/Alert";
import { Badge } from "../components/Badge";
import { EmptyState } from "../components/EmptyState";
import { toast } from "../components/Toast";
import { Tooltip, Popover } from "../components/Tooltip";

const meta: Meta = { title: "Feedback/Stati" };
export default meta;

export const TuttiGliStati: StoryObj = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex gap-2"><Badge status="success" dot>Attivo</Badge><Badge status="warning" dot>In scadenza</Badge><Badge status="danger" dot>Sospeso</Badge><Badge status="info">Bozza</Badge><Badge status="neutral">Archiviato</Badge><Badge status="brand">Nuovo</Badge></div>
      <Alert status="success" title="Master pubblicato">È visibile nel catalogo da adesso.</Alert>
      <Alert status="warning" title="Pagamento in ritardo di 12 giorni" action={{ label: "Invia promemoria", onClick: () => {} }} />
      <Alert status="danger" title="Importazione fallita" action={{ label: "Riprova", onClick: () => {} }}>Il file ha 3 righe senza email. Correggile e ricarica.</Alert>
      <Alert status="info" onClose={() => {}}>Da ottobre le fatture partono da Qonto.</Alert>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => toast("success", "Pubblicato")}>Toast success</Button>
        <Button size="sm" variant="outline" onClick={() => toast("warning", "Pagamento in ritardo", "Il promemoria parte domani.")}>Toast warning</Button>
        <Button size="sm" variant="outline" onClick={() => toast("danger", "Salvataggio fallito", "Riprova tra qualche secondo.", { label: "Riprova", onClick: () => {} })}>Toast danger</Button>
        <Tooltip content="Spiegazione breve di un'icona"><Button size="sm" variant="ghost">Tooltip</Button></Tooltip>
        <Popover trigger={<Button size="sm" variant="ghost">Popover</Button>}>Contenuto interattivo ancorato: un filtro, un mini-form.</Popover>
      </div>
      <div className="rounded-lg border border-line"><EmptyState title="Nessun corso ancora" description="Crea il primo o importa da Studio." action={{ label: "Crea corso", onClick: () => {} }} secondary={{ label: "Importa", onClick: () => {} }} /></div>
    </div>
  ),
};
