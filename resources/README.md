# Resources — asset binari del brand

Asset pronti all'uso che il codice non genera: oggi i loghi, in futuro font self-hosted e immagini. Sono la **sorgente** per gli asset di ogni app: si copiano in `public/` (o si importano dal package), non si ridisegnano, non si ricolorano.

```
resources/
├── logos/
│   ├── logo.svg                  ← lockup su sfondo scuro (wordmark bianco + marchio gradiente) — usa questo
│   ├── logo.png                  ← stesso lockup, 692×112
│   ├── logo_light.png            ← lockup su sfondo chiaro (wordmark nero + marchio gradiente), 692×112
│   ├── logo_white.svg            ← lockup monocromo bianco
│   ├── logo_white.png            ← lockup monocromo bianco, 3163×512
│   ├── logo_black.png            ← lockup monocromo nero, 3163×512
│   ├── logo-icon.png             ← marchio "AI" da solo, 500×500 (gradiente)
│   └── logo_with_background.jpg  ← lockup su quadrato `#032B35`, 5805×5805 (avatar social)
└── favicon/                      ← set completo, generato dal marchio (vedi sotto)
    ├── favicon.svg               ← marchio vettoriale, viewBox 40×40, trasparente — prima scelta
    ├── favicon.ico               ← 16 + 32 + 48 in un file (browser legacy, Windows)
    ├── favicon-16.png · favicon-32.png · favicon-48.png
    ├── apple-touch-icon.png      ← 180×180 su `#032B35` (iOS ignora la trasparenza)
    ├── icon-192.png · icon-512.png   ← PWA, trasparenti
    └── icon-512-maskable.png     ← PWA `purpose: maskable`, marchio nel 60% centrale su `#032B35`
```

## Quale file usare

| Contesto | File | Note |
|---|---|---|
| Sito marketing, header/footer su canvas `#091314` | `logo.svg` | Lockup completo, wordmark bianco, marchio gradiente. |
| Shell learner (sidebar teal) e sidebar `operational` (`neutral-950`) | `logo.svg` | Sidebar espansa: lockup. Sidebar compressa (`w-sidebar-sm`): marchio solo. |
| Pannello bianco, email, PDF, documenti su fondo chiaro | `logo_light.png` | Wordmark nero, marchio gradiente. Non esiste ancora in SVG (vedi lacune). |
| Sidebar `collapsed`, avatar, loader | `logo-icon.png` | Il marchio da solo è l'unica forma ammessa sotto 126px di larghezza del lockup. |
| Favicon, app icon, PWA, iOS home screen | `favicon/` (set completo) | Non ricampionare `logo-icon.png` a mano: le taglie sono già tutte lì. |
| Stampa monocroma, watermark, partner che chiedono "one colour" | `logo_white.svg` / `logo_black.png` | Solo quando il gradiente non è riproducibile. Mai come scelta stilistica. |
| Profili social, Open Graph quadrato | `logo_with_background.jpg` | Non ritagliare: il margine è parte dell'asset. |

Il marchio "AI" nel lockup è nel gradiente brand `52.7° #00CCB2 → #84FFBE`, cioè `color.dark-green` → `color.light-green` dei token (`DECISIONS.md` #17). Sui monocromi il gradiente si perde di proposito: sono l'unico caso in cui il marchio non è in gradiente.

## Regole (dalle Branding Guidelines v1.1, confermate in v2)

1. **Lockup all'esterno, marchio all'interno.** Sul sito e nelle comunicazioni serve sempre "PROFESSION AI" per esteso; dentro un prodotto, dove l'utente sa già dov'è, basta il marchio.
2. **Larghezza minima del lockup 126px.** Sotto, passa al marchio solo.
3. **Area di rispetto = 1× l'altezza del marchio** su ogni lato. Niente testo, bordi o altri loghi dentro quest'area.
4. **Mai alterare**: niente ricolorazioni (nemmeno con i colori brand), rotazioni, ombre, contorni, effetti, scomposizione wordmark/marchio, sostituzione del font della wordmark.
5. **Mai animare il logo** (`design-system-v1.md`, Motion). Il loader usa `Spinner`, non il marchio che gira.
6. **Contrasto**: `logo.svg` solo su fondi con luminanza ≤ quella di `neutral-800`; `logo_light.png` solo su fondi ≥ `neutral-100`. Su foto o gradienti serve sempre un pannello o `logo_with_background.jpg`.
7. **Il wordmark non si scrive a mano.** "ProfessionAI" come testo va bene nei copy; come logo si usa solo il file.

## Come si usa nel codice

```tsx
// Next.js / Vite: copia il file in public/ dell'app e referenzialo. Niente <img> con src esterno.
<img src="/logo.svg" alt="ProfessionAI" width={173} height={28} />          // sidebar espansa (173×28 = 692×112 / 4)
<img src="/logo-icon.png" alt="ProfessionAI" width={32} height={32} />      // sidebar compressa, favicon
```

- L'`alt` è sempre `ProfessionAI` (senza spazio), mai vuoto nell'header: è il link alla home.
- Mantieni il rapporto 692:112 (≈ 6.18:1) del lockup; imposta sempre `width` e `height` per evitare layout shift.
- In `AppShell` il logo va nel primo slot della `sidebar`, sopra `SidebarNav`, con padding `p-4` e altezza pari a `h-topbar`, così l'allineamento con la topbar delle app senza sidebar è identico.

## Favicon

Copia l'intera cartella `favicon/` nella `public/` dell'app e dichiara:

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#032B35">
```

```json
{ "name": "ProfessionAI", "short_name": "ProfessionAI", "theme_color": "#032B35", "background_color": "#032B35",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ] }
```

Le app hanno tutte la stessa favicon: il prodotto si distingue dal titolo della tab, non da un marchio variato. In Next.js metti `favicon.ico`, `icon.svg` e `apple-icon.png` in `app/` e il framework genera i tag da solo.

Come sono stati generati (riproducibile con Pillow, nessun tool esterno):
- `favicon.svg`: il path del marchio estratto da `logos/logo.svg` con lo stesso gradiente, centrato in un viewBox quadrato 40×40.
- Raster: marchio ritagliato da `logos/logo-icon.png`, ridimensionato con Lanczos e centrato. Larghezza del marchio: 94% del lato per favicon e icone PWA, 70% per l'apple-touch-icon, 60% per la maskable (safe zone).
- Quando esisterà `logo-icon.svg` esportato da Figma, rigenerare i raster da quello invece che dal PNG.

## Lacune

- Manca l'SVG del lockup su fondo chiaro (`logo_light`) e del marchio da solo (`logo-icon`): oggi solo PNG. Vanno esportati da Figma *ProfessionAI _ Principal Website* nello stesso formato di `logo.svg`. Nel frattempo `favicon/favicon.svg` è l'unico marchio vettoriale isolato.
- I due SVG del lockup hanno il canvas Figma originale (`transform` con offset a quattro cifre): funzionano, ma un'ottimizzazione con SVGO ridurrebbe il file e semplificherebbe l'inlining.
