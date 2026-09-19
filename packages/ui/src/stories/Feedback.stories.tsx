import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@heroui/react";
import { Alert } from "../components/Alert";
import { Badge } from "../components/Badge";
import { EmptyState } from "../components/EmptyState";
import { toast } from "../components/Toast";

const meta: Meta = { title: "Feedback/Stati" };
export default meta;

export const TuttiGliStati: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex gap-2"><Badge status="success" dot>Attivo</Badge><Badge status="warning" dot>In scadenza</Badge><Badge status="danger" dot>Sospeso</Badge><Badge status="info">Bozza</Badge><Badge status="neutral">Archiviato</Badge><Badge status="accent">Nuovo</Badge></div>
      <Alert status="success" title="Master pubblicato">È visibile nel catalogo da adesso.</Alert>
      <Alert status="warning" title="Pagamento in ritardo di 12 giorni" action={{ label: "Invia promemoria", onPress: () => {} }} />
      <Alert status="danger" title="Importazione fallita" action={{ label: "Riprova", onPress: () => {} }}>Il file ha 3 righe senza email. Correggile e ricarica.</Alert>
      <Alert status="info" onClose={() => {}}>Da ottobre le fatture partono da Qonto.</Alert>
      <div className="flex gap-2">
        <Button size="sm" onPress={() => toast("success", "Pubblicato")}>Toast success</Button>
        <Button size="sm" onPress={() => toast("danger", "Salvataggio fallito", "Riprova tra qualche secondo.")}>Toast danger</Button>
      </div>
      <div className="border border-line rounded-lg"><EmptyState title="Nessun corso ancora" description="Crea il primo o importa da Studio." action={{ label: "Crea corso", onPress: () => {} }} secondary={{ label: "Importa", onPress: () => {} }} /></div>
    </div>
  ),
};
