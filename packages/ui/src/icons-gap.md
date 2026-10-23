# Lacune del set icone per le dashboard

Il set proprietario (165 SVG) è stato disegnato per il sito e il learner. Per il registro operativo mancano
queste icone; vanno disegnate nello stesso stile (24×24, stroke 1.5–2, `currentColor`), non prese da librerie terze.

| Icona | Dove serve | Variante `-filled` |
|---|---|---|
| `filter` / `filter-off` | FilterBar | sì |
| `sort-asc` / `sort-desc` / `sort-none` | DataTable header | no |
| `columns` | DataTable, scelta colonne | no |
| `export` / `import` | PageHeader azioni | no |
| `dots-horizontal` | ContextMenu (oggi "⋯" testuale) | no |
| `check` / `check-circle` / `alert-triangle` / `info-circle` / `x-circle` | Alert, Toast, Badge, Stepper | sì |
| `calendar` | DateField, periodo | no |
| `upload-cloud` / `file` / `file-csv` | FileUpload | no |
| `drag-handle` | riordino righe (CoursAI, Studio) | no |
| `external-link` | integrazioni (archetipo D) | no |
| `sidebar-collapse` / `sidebar-expand` | AppShell | no |
| `kpi-up` / `kpi-down` / `kpi-flat` | KpiCard delta (oggi glifi testuali) | no |

Finché mancano, i componenti usano glifi testuali (▲ ▼ ↕ ⋯ ✓ !): sono placeholder, non la scelta finale.

## Nota (decisione 18)

I glifi di `lucide-react` usati dentro le primitive shadcn in `src/ui/` (chevron dei select, spunta delle checkbox, X dei dialog, calendario del DateField) sono strutturali e non fanno parte del set proprietario: restano lì e non vanno riprodotti nell'app. Tutto il resto segue questa lista.
