---
name: professionai-design-system
description: Design system ProfessionAI v2 per costruire nuove applicazioni, dashboard, tool interni e B2B (Studio, AI Opportunity Radar, CoursAI, piattaforma finanziaria, pannelli admin di learn.profession.ai) e per estendere il sito marketing e la dashboard studente. Usa questa skill ogni volta che devi disegnare o implementare uno schermo, una pagina, un componente, un form, una tabella, un grafico o un'app per ProfessionAI/PROAI, anche se l'utente non dice "design system" — basta che il prodotto sia di ProfessionAI. Contiene token canonici, tre registri (marketing, learner, operational), quattro archetipi di pagina, il pacchetto React @professionai/ui e le regole di copy in italiano.
---

# ProfessionAI Design System v2

Questa skill non descrive cosa esiste: dice **come costruire cosa non esiste ancora**. Segui i passi in ordine.

## Passo 1 — Scegli il registro

| Se stai facendo… | Registro | Leggi |
|---|---|---|
| pagine di acquisizione, landing, blog, 404 | `marketing` | `registers/marketing.md` (v1: General Sans, canvas scuro, glass, glow) |
| schermi per lo studente iscritto | `learner` | `registers/learner.md` (v1: Figtree 16, shell teal, pannello bianco) |
| tool interni, admin, B2B, qualsiasi cosa in cui si lavora per ore | `operational` | **`registers/operational.md`** ← default per ogni nuova app |

In dubbio: `operational`. Non mischiare mai lessico marketing (orb, glass, icone 3D) in un tool.

## Passo 2 — Scegli l'archetipo di pagina

Ogni schermo è uno di questi quattro, o una composizione. Leggi il file **prima** di disegnare:

| Domanda a cui risponde lo schermo | Archetipo | File |
|---|---|---|
| "Quali oggetti ho e come li gestisco?" | A — Lista + dettaglio | `archetypes/list-detail.md` |
| "Come sta andando?" | B — Overview con KPI | `archetypes/overview-kpi.md` |
| "Come creo/configuro una cosa complessa?" | C — Form multi-step | `archetypes/form-multistep.md` |
| "Dove cambio le impostazioni?" | D — Impostazioni | `archetypes/settings.md` |

Se lo schermo non rientra in nessuno (es. un editor a canvas, un player), costruiscilo con i componenti del passo 3 e le regole del registro, e proponi l'archetipo mancante in `archetypes/`.

## Passo 3 — Componi con `@professionai/ui`

Radice obbligatoria, una per app:

```tsx
import { RegisterRoot, PaiToastProvider, AppShell, SidebarNav } from "@professionai/ui";
<HeroUIProvider locale="it-IT">
  <RegisterRoot register="operational" density="comfortable" dark={prefersDark}>
    <PaiToastProvider />
    <AppShell sidebar={<SidebarNav items={nav} />}>…</AppShell>
  </RegisterRoot>
</HeroUIProvider>
```

Mappa rapida (tutti in `packages/ui/src/index.ts`):

- **Struttura:** `AppShell`, `SidebarNav`, `PageHeader`, `AppCard` + `SettingRow` + `AppDivider`, `Tabs`, `Breadcrumb`, `Stepper` + `StepFooter`
- **Dati:** `DataTable` + `IdentityCell`, `FilterBar`, `Pagination`, `Badge`, `KpiCard`, `Skeleton`, `EmptyState`, `Alert`
- **Form:** `TextField`, `Textarea`, `Select` (4+ opzioni), `RadioGroup` (2–4), `CheckboxGroupField`, `Checkbox`, `Switch` (solo effetto immediato), `DateField`, `DateRangeField`, `FileUpload`
- **Overlay:** `Modal`, `ConfirmDialog`, `Drawer`, `toast()`/`toastSaved()`, `Tooltip`, `Popover`, `ContextMenu`
- **Grafici:** `ChartFrame` + `LegendItem`, `chartCategorical/Sequential/Diverging`, `rechartsTheme`, `chartJsDefaults`
- **Formattazione:** `fmtNumber`, `fmtCurrency`, `fmtPercent`, `fmtDate`, `fmtTime`, `fmtDateSmart` — mai `toLocaleString` a mano
- Da HeroUI, riesportati: `Button`, `Avatar`, `Chip`, `Spinner`, `Progress`, `Link`, `Divider`

**Logo.** Non si disegna e non si scrive come testo: si prende da `resources/logos/` (mappa e regole in `resources/README.md`). In breve: `logo.svg` su sfondi scuri (sito, sidebar), `logo_light.png` su fondo chiaro, `logo-icon.png` per la sidebar compressa, la cartella `resources/favicon/` intera in `public/` per favicon, PWA e iOS. Mai ricolorato, mai animato, mai sotto 126px se è il lockup.

Regole di composizione che il codice non impone da solo:
1. Una sola azione primaria (`color="primary"`) per schermo, in alto a destra o nel footer sticky del form.
2. Ogni contenitore di dati passa per i quattro stati: `loading`, `error`, `empty`, `noResults`. `DataTable` e `ChartFrame` li hanno come prop: usale.
3. Colore = stato. `Badge`/`Alert` sono l'unico posto dove compaiono success/warning/danger/info. Il rosso solo per `danger`.
4. Tabelle di lavoro `density="compact"` (default di `DataTable`); il resto eredita `comfortable` dalla radice.
5. Ogni azione distruttiva → `ConfirmDialog` che nomina l'oggetto e la conseguenza; irreversibile → `confirmText`.
6. Conferme → `toast`; errori di sistema → `Alert` danger inline con "Riprova".
7. Nessuna emoji, nessun ALL-CAPS, nessun gradiente tranne `ProfAIFab` (learner).

## Passo 4 — Scrivi i testi

Italiano, tu informale, sentence case, verbo per primo. Il bottone dice cosa fa e il toast lo echeggia ("Pubblica" → "Pubblicato"). Date `19 set 2026`, importi `1.250,00 €`. Obbligatorio è il default: marca gli **opzionali**. Errori: cosa è successo e come rimediare, senza scuse. Vuoti: un invito ad agire, diverso dal "nessun risultato per questi filtri". Riferimento completo in `references/content.md`.

## Passo 5 — Verifica prima di consegnare

- [ ] Registro dichiarato su `RegisterRoot`; nessun lessico di un altro registro
- [ ] Archetipo riconoscibile; se composto, ogni blocco rispetta il suo
- [ ] Quattro stati per ogni blocco dati
- [ ] Un'azione primaria; distruttive nel `ContextMenu` con `ConfirmDialog`
- [ ] Tastiera: Tab su tutto, Esc chiude, focus ring visibile
- [ ] Contrasto ≥ 4.5:1 sul testo (Storybook addon-a11y)
- [ ] Nessun hex nel codice dell'app: solo classi Tailwind del preset o `var(--pai-*)`
- [ ] Testi in italiano, formattazione via `fmt*`
- [ ] Logo preso da `resources/logos/`, variante giusta per lo sfondo, `alt="ProfessionAI"`

## Token e build

`tokens/tokens.json` è l'unica sorgente. `node tokens/build.mjs` genera `tokens/dist/{tokens.css, tailwind.preset.cjs, heroui.theme.cjs, tokens.flat.json}`. Un nuovo colore o raggio si aggiunge lì, mai in un componente. Le scale 50–900 sono derivate dal 500 (con override espliciti); `DECISIONS.md` spiega ogni scelta non ovvia.

Config Tailwind per una nuova app: copia `packages/ui/tailwind.config.cjs`.

## Cosa fare quando manca qualcosa

- **Manca un componente:** costruiscilo con HeroUI + token dentro `packages/ui/src/components/`, con story dei quattro stati, poi esportalo da `index.ts`. Non importare librerie UI terze nell'app.
- **Manca un'icona:** placeholder testuale + riga in `packages/ui/src/icons-gap.md`; va disegnata nel set proprietario.
- **Manca un colore:** non manca. Ricontrolla `semantic.status` e le scale.
- **Manca un formato del logo** (es. SVG su fondo chiaro): non generarlo da un PNG e non ridisegnarlo. Usa il formato più vicino tra quelli in `resources/logos/` e segnala la lacuna in `resources/README.md`.
- **Manca un archetipo:** scrivilo in `archetypes/` con wireframe ASCII, componenti, regole, anti-pattern, e proponilo.

## Struttura del repository

```
professionai-ds/
├── SKILL.md              ← questo file
├── DECISIONS.md          ← 17 decisioni canoniche con i valori scartati
├── tokens/               ← tokens.json + build.mjs → dist/
├── registers/            ← operational.md (nuovo) · marketing.md · learner.md (v1)
├── archetypes/           ← list-detail · overview-kpi · form-multistep · settings
├── packages/ui/          ← @professionai/ui: componenti React, stories, config Tailwind
├── references/           ← content.md (copy), v1 design system integrale
└── resources/            ← asset binari: logos/ (lockup, monocromi, marchio, social) · favicon/ (svg, ico, png, PWA) + README con le regole d'uso
```
