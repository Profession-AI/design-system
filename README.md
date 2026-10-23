# ProfessionAI Design System v2

Sistema **generativo** per costruire nuove app e dashboard ProfessionAI. Parti da `SKILL.md`.

```
node tokens/build.mjs             # tokens.json → tokens.css (variabili) + tailwind.css (tema Tailwind 4)
cd packages/ui && npm install     # componenti React su shadcn/ui (Radix) + Tailwind 4
npm run storybook                 # stories con i 4 stati, toolbar densità e tema
npm run typecheck
npx shadcn@latest add <nome>      # nuova primitiva in src/ui/ (poi il wrapper in src/components/)
```

In un'app: `@import "@professionai/ui/styles.css"` nel CSS, `<RegisterRoot>` alla radice, componenti da `@professionai/ui`.

| Cartella | Contenuto |
|---|---|
| `SKILL.md` | Procedura in 5 passi: registro → archetipo → componenti → copy → checklist |
| `DECISIONS.md` | 20 decisioni canoniche, con i valori v1 scartati |
| `tokens/` | `tokens.json` (W3C DTCG, sorgente unica) + `build.mjs` + `dist/` generato (`tokens.css`, `tailwind.css`, `tokens.flat.json`) |
| `registers/` | `operational.md` (nuovo, per tool interni e B2B), `marketing.md`, `learner.md` |
| `archetypes/` | Lista+dettaglio · Overview KPI · Form multi-step · Impostazioni |
| `packages/ui/` | `@professionai/ui`: 22 primitive shadcn in `src/ui/`, 30 componenti del DS in `src/components/`, palette grafici, formattazione it-IT, Storybook 10 |
| `references/` | `content.md` (copy operativo) · `design-system-v1.md` |
| `resources/` | Asset binari del brand: `logos/` (lockup scuro/chiaro, monocromi, marchio solo, versione social), `favicon/` (svg, ico, PNG 16–512, apple-touch, maskable) + `README.md` con quale file usare dove |

## Cosa manca ancora (in ordine di priorità)
1. **Icone**: 20 glifi elencati in `packages/ui/src/icons-gap.md` da disegnare nel set proprietario; oggi placeholder testuali.
2. **Font binari**: General Sans licenziato da self-hostare; Figtree resta su Google Fonts.
3. **Kit mobile** per il registro operativo: i componenti sono responsive ma non esiste un archetipo mobile-first.
4. **Migrazione di learn.profession.ai** (oggi Tailwind 3 + HeroUI 2.7): passare a Tailwind 4 con `@import "@professionai/ui/styles.css"` al posto di `tailwind.config.ts`, e sostituire i componenti HeroUI con quelli di `@professionai/ui` (vedi `registers/learner.md`).
5. **Componenti site** (`components/site/*` v1) non portati in questo repo: restano nel repo del sito.
6. **Loghi in SVG per fondo chiaro e marchio da solo**: oggi solo PNG (`resources/logos/logo_light.png`, `logo-icon.png`); vanno esportati da Figma.
