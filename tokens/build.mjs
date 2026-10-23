// Genera da tokens.json:  dist/tokens.css  dist/tailwind.css  dist/tokens.flat.json
// Uso: node tokens/build.mjs
//
//   tokens.css    variabili CSS --pai-* (framework-agnostiche) + variabili semantiche shadcn
//                 (--background, --primary, …) derivate dai token, per registro e dark mode.
//   tailwind.css  tema Tailwind 4 (@theme) che espone i token come utility; importa tokens.css.
//                 Da importare dopo "tailwindcss" e "shadcn/tailwind.css" (vedi packages/ui/src/styles.css).
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = JSON.parse(readFileSync(join(here, "tokens.json"), "utf8"));
const out = join(here, "dist");
mkdirSync(out, { recursive: true });
for (const legacy of ["tailwind.preset.cjs", "heroui.theme.cjs"]) if (existsSync(join(out, legacy))) rmSync(join(out, legacy));

// ---------- 1. Espansione scale 50–900 ----------
const hex2rgb = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const rgb2hex = (r) => "#" + r.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("").toUpperCase();
const mix = (a, b, t) => rgb2hex(hex2rgb(a).map((v, i) => v + (hex2rgb(b)[i] - v) * t));
const STEPS = { 50: ["#FFFFFF", .92], 100: ["#FFFFFF", .84], 200: ["#FFFFFF", .68], 300: ["#FFFFFF", .48], 400: ["#FFFFFF", .24],
                600: ["#000000", .18], 700: ["#000000", .36], 800: ["#000000", .54], 900: ["#000000", .72] };

for (const [name, tok] of Object.entries(src.color)) {
  if (tok?.$extensions?.pai?.scale) {
    const base = tok.$value, ov = tok.$extensions.pai.overrides ?? {};
    const scale = { $type: "color", DEFAULT: { $value: base }, 500: { $value: base } };
    for (const [s, [to, t]] of Object.entries(STEPS)) scale[s] = { $value: ov[s] ?? mix(base, to, t) };
    src.color[name] = scale;
  }
}

// ---------- 2. Flatten + risoluzione alias ----------
const flat = {};
const walk = (node, path = []) => {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object" && "$value" in v) flat[[...path, k].join(".")] = v.$value;
    else if (v && typeof v === "object") walk(v, [...path, k]);
  }
};
walk(src);
const resolve = (v) => {
  if (Array.isArray(v)) return v.map(resolve);
  if (typeof v === "string") return v.replace(/\{([^}]+)\}/g, (_, ref) => {
    const val = flat[ref] ?? flat[ref + ".DEFAULT"];
    if (val === undefined) throw new Error(`Alias non risolto: ${ref}`);
    return resolve(val);
  });
  return v;
};
for (const k of Object.keys(flat)) flat[k] = resolve(flat[k]);
// anche gli extensions di status (bg/border)
const statusExt = {};
for (const [s, tok] of Object.entries(src.semantic.status)) {
  if (s.startsWith("$")) continue;
  statusExt[s] = { fg: resolve(tok.$value), bg: resolve(tok.$extensions.pai.bg), border: resolve(tok.$extensions.pai.border) };
  flat[`semantic.status.${s}.bg`] = statusExt[s].bg;
  flat[`semantic.status.${s}.border`] = statusExt[s].border;
}
writeFileSync(join(out, "tokens.flat.json"), JSON.stringify(flat, null, 2));

// ---------- 3. Variabili semantiche shadcn (decisione 18) ----------
// Ogni valore è un token: mai un hex nuovo qui. "accent" è il grigio di hover di shadcn, non il teal:
// l'accento brand si chiama `brand` nelle utility (bg-brand, text-brand-strong, bg-brand-soft).
const c = (k) => flat[k];
const N = (s) => c(`color.neutral.${s}`);
const WHITE = c("color.white"), BLACK = c("color.black"), TEAL = c("color.teal.DEFAULT");
const charts = Object.fromEntries(c("chart.categorical").slice(0, 5).map((v, i) => [`chart-${i + 1}`, v]));
const sidebar = {
  sidebar: N(950), "sidebar-foreground": N(50), "sidebar-primary": TEAL, "sidebar-primary-foreground": BLACK,
  "sidebar-accent": "rgba(255,255,255,0.10)", "sidebar-accent-foreground": WHITE, "sidebar-border": "rgba(255,255,255,0.10)", "sidebar-ring": c("focus.on-dark"),
};
const SEM = {
  light: {
    background: WHITE, foreground: N(900), card: WHITE, "card-foreground": N(900), popover: WHITE, "popover-foreground": N(900),
    primary: TEAL, "primary-foreground": BLACK, secondary: N(100), "secondary-foreground": N(900),
    muted: N(100), "muted-foreground": N(600), accent: N(100), "accent-foreground": N(900),
    destructive: statusExt.danger.fg, "destructive-foreground": WHITE,
    border: N(200), input: N(200), ring: c("focus.product"), ...charts, ...sidebar,
  },
  dark: {
    background: N(900), foreground: N(50), card: N(800), "card-foreground": N(50), popover: N(800), "popover-foreground": N(50),
    primary: TEAL, "primary-foreground": BLACK, secondary: N(800), "secondary-foreground": N(50),
    muted: N(800), "muted-foreground": N(400), accent: N(800), "accent-foreground": N(50),
    destructive: c("color.red.400"), "destructive-foreground": BLACK,
    border: N(800), input: N(700), ring: c("focus.on-dark"), ...charts, ...sidebar,
  },
  marketing: {
    background: c("color.site.canvas"), foreground: WHITE, card: c("color.site.panel-end"), "card-foreground": WHITE, popover: c("color.site.panel-end"), "popover-foreground": WHITE,
    primary: TEAL, "primary-foreground": BLACK, secondary: c("color.site.glass"), "secondary-foreground": WHITE,
    muted: c("color.site.glass"), "muted-foreground": "rgba(255,255,255,0.7)", accent: c("color.site.ring"), "accent-foreground": WHITE,
    destructive: c("color.red.400"), "destructive-foreground": BLACK,
    border: c("color.site.ring"), input: c("color.site.ring"), ring: c("focus.on-dark"), ...charts, ...sidebar,
  },
};
const semBlock = (vars, indent = "  ") => Object.entries(vars).map(([k, v]) => `${indent}--${k}: ${v};`).join("\n");

// ---------- 4. tokens.css ----------
const cssName = (k) => "--pai-" + k.replace(/\./g, "-").replace(/-DEFAULT$/, "");
const cssVal = (v) => {
  if (Array.isArray(v)) return typeof v[0] === "number" ? `cubic-bezier(${v.join(",")})` : v.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(", ");
  if (v && typeof v === "object" && "offsetX" in v) return `${v.offsetX} ${v.offsetY} ${v.blur} ${v.spread} ${v.color}`;
  return String(v);
};
let css = `/* Generato da tokens/build.mjs — non modificare a mano */\n:root {\n`;
for (const [k, v] of Object.entries(flat)) css += `  ${cssName(k)}: ${cssVal(v)};\n`;
css += `}\n
/* Superfici per registro (decisione 16). Le stesse variabili valgono su :root così i portali
   (dialog, select, tooltip: montati su <body>) ereditano il registro operativo chiaro;
   RegisterRoot copia le classi di registro e .dark anche su <html>. */
:root, .pai-operational, .pai-learner {
  --pai-surface-shell: radial-gradient(120% 120% at 20% 0%, var(--pai-color-app-shell-start), var(--pai-color-app-shell-end));
  --pai-surface-panel: var(--pai-color-white);
  --pai-surface-raised: var(--pai-color-white);
  --pai-surface-sunken: var(--pai-color-neutral-50);
  --pai-border: var(--pai-color-neutral-200);
  --pai-border-strong: var(--pai-color-neutral-300);
  --pai-text: var(--pai-color-neutral-900);
  --pai-text-muted: var(--pai-color-neutral-600);
  --pai-text-faint: var(--pai-color-neutral-400);
  --pai-brand: var(--pai-color-teal);
  --pai-brand-strong: var(--pai-color-teal-700);
  --pai-brand-soft: var(--pai-color-teal-50);
  --pai-focus: var(--pai-focus-product);
  /* shadcn (decisione 18) */
${semBlock(SEM.light)}
}
.pai-operational, .pai-learner {
  color: var(--pai-text); font-family: var(--pai-font-family-product); font-size: var(--pai-font-size-base); line-height: var(--pai-font-lineHeight-body);
}
.dark, .pai-operational.dark, .pai-learner.dark {
  --pai-surface-panel: var(--pai-color-neutral-900);
  --pai-surface-raised: var(--pai-color-neutral-800);
  --pai-surface-sunken: var(--pai-color-neutral-950);
  --pai-border: var(--pai-color-neutral-800);
  --pai-border-strong: var(--pai-color-neutral-700);
  --pai-text: var(--pai-color-neutral-50);
  --pai-text-muted: var(--pai-color-neutral-400);
  --pai-text-faint: var(--pai-color-neutral-600);
  --pai-brand-soft: rgba(0,204,178,0.12);
  --pai-focus: var(--pai-focus-on-dark);
${semBlock(SEM.dark)}
  color-scheme: dark;
}
.pai-marketing {
  --pai-surface-panel: var(--pai-color-site-canvas);
  --pai-surface-raised: var(--pai-color-site-panel-end);
  --pai-surface-sunken: var(--pai-color-site-footer);
  --pai-border: var(--pai-color-site-ring);
  --pai-border-strong: var(--pai-color-site-ring-strong);
  --pai-text: var(--pai-color-white);
  --pai-text-muted: rgba(255,255,255,0.7);
  --pai-text-faint: rgba(255,255,255,0.45);
  --pai-brand-soft: rgba(0,204,178,0.12);
  --pai-focus: var(--pai-focus-on-dark);
${semBlock(SEM.marketing)}
  color: var(--pai-text); font-family: var(--pai-font-family-display); background: var(--pai-color-site-canvas); color-scheme: dark;
}

/* Densità (decisione 12) */
:root, .pai-density-comfortable, .pai-operational, .pai-learner {
  --pai-row: var(--pai-density-comfortable-row); --pai-control: var(--pai-density-comfortable-control);
  --pai-cell-x: var(--pai-density-comfortable-cell-x); --pai-font-ui: var(--pai-density-comfortable-font);
}
.pai-density-compact {
  --pai-row: var(--pai-density-compact-row); --pai-control: var(--pai-density-compact-control);
  --pai-cell-x: var(--pai-density-compact-cell-x); --pai-font-ui: var(--pai-density-compact-font);
}
/* I controlli shadcn di taglia default seguono la densità (40px comfortable, 32px compact).
   Regola non stratificata: vince sulle utility; per un'altezza diversa usa size="sm" | "lg" | "icon". */
[data-slot="button"][data-size="default"], [data-slot="input"], [data-slot="select-trigger"][data-size="default"] { height: var(--pai-control); }

/* Focus ring unico */
.pai-operational :focus-visible, .pai-learner :focus-visible, .pai-marketing :focus-visible {
  outline: var(--pai-focus-width) solid var(--pai-focus); outline-offset: var(--pai-focus-offset);
}
@media (prefers-reduced-motion: reduce) { .pai-operational *, .pai-learner *, .pai-marketing * { transition-duration: 0.01ms !important; animation: none !important; } }
`;
writeFileSync(join(out, "tokens.css"), css);

// ---------- 5. tailwind.css (tema Tailwind 4) ----------
const scaleOf = (name) => Object.entries(flat).filter(([k]) => k.startsWith(`color.${name}.`)).map(([k, v]) => [k.split(".").pop(), v]);
const fontList = (arr) => arr.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(", ");
let tw = `/* Generato da tokens/build.mjs — non modificare a mano.
   Tema Tailwind 4 del design system. Ordine di import in un'app:
     @import "tailwindcss"; @import "tw-animate-css"; @import "shadcn/tailwind.css"; @import "@professionai/ui/styles.css";
   (styles.css del pacchetto importa questo file). */
@import "./tokens.css";

@theme inline {
  /* Famiglie brand (scale derivate, decisione 3/8) */
`;
for (const name of ["teal", "light-green", "purple", "orange", "blue", "red", "neutral"])
  for (const [k, v] of scaleOf(name)) tw += `  ${k === "DEFAULT" ? `--color-${name}` : `--color-${name}-${k}`}: ${v};\n`;
tw += `  --color-black: ${BLACK};\n  --color-white: ${WHITE};\n`;
tw += `\n  /* Stati (decisione 8): solo Badge, Alert, validazione, bordi */\n`;
for (const s of ["success", "warning", "danger", "info"]) tw += `  --color-${s}: ${statusExt[s].fg};\n  --color-${s}-soft: ${statusExt[s].bg};\n  --color-${s}-line: ${statusExt[s].border};\n`;
tw += `
  /* Superfici e testo per registro (cambiano con .pai-* e .dark) */
  --color-surface-panel: var(--pai-surface-panel);
  --color-surface-raised: var(--pai-surface-raised);
  --color-surface-sunken: var(--pai-surface-sunken);
  --color-line: var(--pai-border);
  --color-line-strong: var(--pai-border-strong);
  --color-ink: var(--pai-text);
  --color-ink-muted: var(--pai-text-muted);
  --color-ink-faint: var(--pai-text-faint);
  --color-brand: var(--pai-brand);
  --color-brand-strong: var(--pai-brand-strong);
  --color-brand-soft: var(--pai-brand-soft);

  /* Variabili semantiche shadcn (decisione 18) */
`;
for (const k of Object.keys(SEM.light)) tw += `  --color-${k}: var(--${k});\n`;
tw += `
  /* Raggi (decisione 3): scala fissa, non derivata da --radius */
`;
for (const k of ["xs", "sm", "md", "lg", "xl", "pill"]) tw += `  --radius-${k}: ${flat[`radius.${k}`]};\n`;
tw += `  --radius-2xl: ${flat["radius.xl"]};\n`;
tw += `
  /* Tipografia (decisione 11) */
  --font-sans: ${fontList(flat["font.family.product"])};
  --font-display: ${fontList(flat["font.family.display"])};
  --font-product: ${fontList(flat["font.family.product"])};
  --font-reading: ${fontList(flat["font.family.reading"])};
  --font-mono: ${fontList(flat["font.family.mono"])};
`;
for (const [k, v] of Object.entries(flat).filter(([k]) => k.startsWith("font.size."))) tw += `  --text-${k.split(".").pop()}: ${v};\n`;
tw += `  --tracking-heading: ${flat["font.tracking.heading"]};\n  --leading-heading: ${flat["font.lineHeight.heading"]};\n  --leading-body: ${flat["font.lineHeight.body"]};\n  --leading-dense: ${flat["font.lineHeight.dense"]};\n`;
tw += `
  /* Ombre (decisione 2) */
  --shadow-sm: ${cssVal(flat["shadow.sm"])};
  --shadow-xl: ${cssVal(flat["shadow.xl"])};

  /* Densità e layout */
  --spacing-row: var(--pai-row);
  --spacing-control: var(--pai-control);
  --spacing-cell-x: var(--pai-cell-x);
  --spacing-sidebar: ${flat["layout.sidebar-expanded"]};
  --spacing-sidebar-sm: ${flat["layout.sidebar-collapsed"]};
  --spacing-topbar: ${flat["layout.topbar"]};
  --container-content: ${flat["layout.content-max"]};
  --container-reading: ${flat["layout.reading-max"]};

  /* Motion */
  --ease-enter: ${cssVal(flat["motion.easing.enter"])};
  --ease-sidebar: ${cssVal(flat["motion.easing.sidebar"])};
  --ease-reveal: ${cssVal(flat["motion.easing.reveal"])};
}

`;
for (const [k, v] of Object.entries(flat).filter(([k]) => k.startsWith("motion.duration."))) tw += `@utility duration-${k.split(".").pop()} { transition-duration: ${v}; }\n`;
writeFileSync(join(out, "tailwind.css"), tw);

console.log(`✓ ${Object.keys(flat).length} token → dist/tokens.css, tailwind.css, tokens.flat.json`);
