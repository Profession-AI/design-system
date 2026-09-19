# ProfessionAI Design System v2

Sistema **generativo** per costruire nuove app e dashboard ProfessionAI. Parti da `SKILL.md`.

```
node tokens/build.mjs             # tokens.json → CSS vars, preset Tailwind, tema HeroUI
cd packages/ui && npm install     # componenti React (wrapper HeroUI 2.7 / Tailwind 3)
npm run storybook                 # stories con i 4 stati, toolbar densità e tema
npm run typecheck
```

| Cartella | Contenuto |
|---|---|
| `SKILL.md` | Procedura in 5 passi: registro → archetipo → componenti → copy → checklist |
| `DECISIONS.md` | 17 decisioni canoniche, con i valori v1 scartati |
| `tokens/` | `tokens.json` (W3C DTCG, sorgente unica) + `build.mjs` + `dist/` generato |
| `registers/` | `operational.md` (nuovo, per tool interni e B2B), `marketing.md`, `learner.md` |
| `archetypes/` | Lista+dettaglio · Overview KPI · Form multi-step · Impostazioni |
| `packages/ui/` | `@professionai/ui`: 30 componenti, palette grafici, formattazione it-IT, Storybook |
| `references/` | `content.md` (copy operativo) · `design-system-v1.md` |
| `resources/` | Asset binari del brand: `logos/` (lockup scuro/chiaro, monocromi, marchio solo, versione social), `favicon/` (svg, ico, PNG 16–512, apple-touch, maskable) + `README.md` con quale file usare dove |

## Cosa manca ancora (in ordine di priorità)
1. **Icone**: 20 glifi elencati in `packages/ui/src/icons-gap.md` da disegnare nel set proprietario; oggi placeholder testuali.
2. **Font binari**: General Sans licenziato da self-hostare; Figtree resta su Google Fonts.
3. **Kit mobile** per il registro operativo: i componenti sono responsive ma non esiste un archetipo mobile-first.
4. **Migrazione di learn.profession.ai** al preset generato: `tailwind.config.ts` attuale va sostituito con `tokens/dist/heroui.theme.cjs` (vedi `registers/learner.md`).
5. **Componenti site** (`components/site/*` v1) non portati in questo repo: restano nel repo del sito.
6. **Loghi in SVG per fondo chiaro e marchio da solo**: oggi solo PNG (`resources/logos/logo_light.png`, `logo-icon.png`); vanno esportati da Figma.
