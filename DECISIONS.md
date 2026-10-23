# Decisioni canoniche — ProfessionAI Design System v2

Questo file chiude le ambiguità del sistema v1, che conservava entrambi i valori
quando linee guida e prodotto divergevano. Da v2 ogni token ha **un** valore
canonico; il valore scartato resta qui come nota storica, non nei token.

| # | Ambito | Decisione canonica | Scartato | Motivo |
|---|---|---|---|---|
| 1 | Canvas sito | `#091314` | `#00100E` (guideline) | È il valore effettivamente in produzione; il delta è impercettibile. |
| 2 | Ombre | **Sito:** nessuna. **Prodotto:** due livelli, `sm` (bottoni/input) e `xl` (pannello principale, overlay). | "vietate ma usate" | Una regola deve descrivere la realtà: il prodotto ha sempre avuto ombre. |
| 3 | Raggi | Scala `4 / 8 / 12 / 16 / 24 / 999`. | `20`, `22.43`, `40` | 20→24, 40→24 nel prodotto. `22.43` e `40` restano solo come alias `legacy.*` per il sito. |
| 4 | Tracking titoli | `-0.033em` (fluido). | `-1.6px`, `-2px` | Un valore in em funziona a ogni dimensione. |
| 5 | Line-height titoli | `1.1` | `1.1052` | Arrotondamento senza differenza visibile. |
| 6 | Line-height corpo | **Sito:** `1` con gap. **Prodotto:** `1.5`. | — | Il sito è display; una dashboard ha paragrafi e celle: serve interlinea reale. |
| 7 | Blu `#1F99CD` | Diventa il colore semantico `info`. L'uso "nome master negli header" è un alias `text.course-name` sullo stesso valore. | uso esclusivo | Una dashboard ha bisogno di uno stato info; duplicare il valore è meglio che inventare un colore. |
| 8 | Stati semantici | `success` = dark-green, `warning` = orange, `danger` = red `#F0454B`, `info` = blue. | solo `error` | Le quattro famiglie brand coprono tre stati su quattro senza colori nuovi. |
| 9 | Rosso | Solo `danger`: testo, bordi, bottoni distruttivi, badge. Mai sfondi pieni grandi, mai grafici. | — | Confermata la regola brand. |
| 10 | Grafici | Palette categoriale a 8 posizioni dalle 4 famiglie brand + tinte; sequenziale teal; divergente purple↔orange. Rosso escluso. | nessuna regola | Ogni chart reinventava. |
| 11 | Tipografia prodotto | Figtree, base `14px`, scala `12/13/14/16/20/24/32`. Sotto 12 mai. | base 16 | Registro operativo: densità. Il registro studente resta a 16. |
| 12 | Densità | Due modalità: `comfortable` (riga 44px) e `compact` (riga 36px). Default: comfortable; tabelle di lavoro default compact. | — | Unica leva per adattare la stessa UI a un operatore e a uno studente. |
| 13 | Font fallback | Figtree → Inter → system-ui. Proxima Nova rimossa. | Proxima Nova | Commerciale, non embeddabile. |
| 14 | Emoji | Mai, nemmeno nei toast. Stato = icona. | — | Confermata. |
| 15 | Icone | Set proprietario (165) + lacune dashboard aggiunte in `packages/ui/src/icons-gap.md`. | libreria terza | Coerenza; le mancanze vanno disegnate nello stesso stile. |
| 16 | Registri | Tre: `marketing` (sito), `learner` (dashboard studente), `operational` (tool interni e B2B: Studio, Radar, CoursAI, finance). | due | Le nuove app non sono né un sito né un'app per studenti. |
| 17 | Logo | File canonici in `resources/logos/`: `logo.svg` su scuro, `logo_light.png` su chiaro, `logo-icon.png` per favicon e sidebar compressa, monocromi solo per stampa/partner. Gradiente del marchio `52.7° #00CCB2 → #84FFBE` (= `dark-green` → `light-green`), mai ricolorato, mai animato, lockup mai sotto 126px. | `LogoLockup` v1 come componente che ridisegna il logo; wordmark come testo | Un logo ricostruito in codice diverge dal file brand alla prima modifica; gli asset esportati da Figma sono l'unica sorgente. |
| 18 | Libreria componenti | **shadcn/ui** con primitive **Radix** (`radix-ui`), copiate in `packages/ui/src/ui/` e mai modificate; i componenti del DS le avvolgono in `src/components/`. Icone `lucide-react` ammesse solo dentro `src/ui/` (chevron, check, x: glifi strutturali). | HeroUI 2.x (v1/v2.0); base `base-nova` (Base UI) e `aria` della CLI shadcn 4 | HeroUI 3 ha cambiato API e tema; shadcn è codice posseduto, senza runtime di libreria da aggiornare. Radix è la base più diffusa e documentata; Base UI è più recente, React Aria più vicino a HeroUI ma meno adottato. Le icone del prodotto restano quelle della decisione 15. |
| 19 | Tailwind | **Tailwind 4**: nessun `tailwind.config`, tema CSS-first generato in `tokens/dist/tailwind.css` (`@theme inline`) e importato da `@professionai/ui/styles.css`. Scala raggi fissa (4/8/12/16/24/999) al posto di `--radius` derivato. | Tailwind 3 + preset CJS (`tailwind.preset.cjs`) | shadcn 4 e l'ecosistema sono Tailwind‑4‑first; il preset JS non avrebbe più avuto consumatori. I controlli shadcn escono a 12px (`rounded-md`) invece degli 8px di HeroUI `radius="sm"`: entrambi in scala. |
| 20 | Mappa semantica shadcn | `primary` = teal (testo nero), `secondary`/`muted`/`accent` = neutral‑100 (hover e sfondi tenui), `destructive` = red‑600 (`danger`), `border` = `input` = neutral‑200, `ring` = focus prodotto; dark: superfici neutral‑800/900, stati al 400. L'accento brand nelle utility si chiama **`brand`** (`bg-brand`, `text-brand-strong`, `bg-brand-soft`), non `accent`. I controlli di taglia default seguono la densità (40/32px). Il badge "Nuovo" è `status="brand"`. | `accent` = teal; `secondary` = purple (tema HeroUI) | In shadcn `accent` è il grigio di hover di menu e bottoni ghost: se fosse teal, ogni hover sarebbe un'azione primaria. Il purple come secondario viola la regola 3 del registro operativo (teal solo su primaria e stato). |
