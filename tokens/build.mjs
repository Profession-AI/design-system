// Genera da tokens.json:  dist/tokens.css  dist/tailwind.preset.cjs  dist/heroui.theme.cjs  dist/tokens.flat.json
// Uso: node tokens/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = JSON.parse(readFileSync(join(here, "tokens.json"), "utf8"));
const out = join(here, "dist");
mkdirSync(out, { recursive: true });

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

// ---------- 3. CSS ----------
const cssName = (k) => "--pai-" + k.replace(/\./g, "-").replace(/-DEFAULT$/, "");
const cssVal = (v) => {
  if (Array.isArray(v)) return typeof v[0] === "number" ? `cubic-bezier(${v.join(",")})` : v.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(", ");
  if (v && typeof v === "object" && "offsetX" in v) return `${v.offsetX} ${v.offsetY} ${v.blur} ${v.spread} ${v.color}`;
  return String(v);
};
let css = `/* Generato da tokens/build.mjs — non modificare a mano */\n:root {\n`;
for (const [k, v] of Object.entries(flat)) css += `  ${cssName(k)}: ${cssVal(v)};\n`;
css += `}\n\n/* Superfici per registro (decisione 16) */
.pai-operational, .pai-learner {
  --pai-surface-shell: radial-gradient(120% 120% at 20% 0%, var(--pai-color-app-shell-start), var(--pai-color-app-shell-end));
  --pai-surface-panel: var(--pai-color-white);
  --pai-surface-raised: var(--pai-color-white);
  --pai-surface-sunken: var(--pai-color-neutral-50);
  --pai-border: var(--pai-color-neutral-200);
  --pai-border-strong: var(--pai-color-neutral-300);
  --pai-text: var(--pai-color-neutral-900);
  --pai-text-muted: var(--pai-color-neutral-600);
  --pai-text-faint: var(--pai-color-neutral-400);
  --pai-accent: var(--pai-color-teal);
  --pai-accent-strong: var(--pai-color-teal-700);
  --pai-accent-soft: var(--pai-color-teal-50);
  --pai-focus: var(--pai-focus-product);
  color: var(--pai-text); font-family: var(--pai-font-family-product); font-size: var(--pai-font-size-base); line-height: var(--pai-font-lineHeight-body);
}
.pai-operational.dark, .pai-learner.dark {
  --pai-surface-panel: var(--pai-color-neutral-900);
  --pai-surface-raised: var(--pai-color-neutral-800);
  --pai-surface-sunken: var(--pai-color-neutral-950);
  --pai-border: var(--pai-color-neutral-800);
  --pai-border-strong: var(--pai-color-neutral-700);
  --pai-text: var(--pai-color-neutral-50);
  --pai-text-muted: var(--pai-color-neutral-400);
  --pai-text-faint: var(--pai-color-neutral-600);
  --pai-accent-soft: rgba(0,204,178,0.12);
  --pai-focus: var(--pai-focus-on-dark);
}
.pai-marketing {
  --pai-surface-panel: var(--pai-color-site-canvas);
  --pai-border: var(--pai-color-site-ring);
  --pai-text: var(--pai-color-white);
  --pai-text-muted: rgba(255,255,255,0.7);
  --pai-focus: var(--pai-focus-on-dark);
  color: var(--pai-text); font-family: var(--pai-font-family-display); background: var(--pai-color-site-canvas);
}

/* Densità (decisione 12) */
.pai-density-comfortable, .pai-operational, .pai-learner {
  --pai-row: var(--pai-density-comfortable-row); --pai-control: var(--pai-density-comfortable-control);
  --pai-cell-x: var(--pai-density-comfortable-cell-x); --pai-font-ui: var(--pai-density-comfortable-font);
}
.pai-density-compact {
  --pai-row: var(--pai-density-compact-row); --pai-control: var(--pai-density-compact-control);
  --pai-cell-x: var(--pai-density-compact-cell-x); --pai-font-ui: var(--pai-density-compact-font);
}

/* Focus ring unico */
.pai-operational :focus-visible, .pai-learner :focus-visible, .pai-marketing :focus-visible {
  outline: var(--pai-focus-width) solid var(--pai-focus); outline-offset: var(--pai-focus-offset);
}
@media (prefers-reduced-motion: reduce) { .pai-operational *, .pai-learner *, .pai-marketing * { transition-duration: 0.01ms !important; animation: none !important; } }
`;
writeFileSync(join(out, "tokens.css"), css);

// ---------- 4. Tailwind preset ----------
const scaleOf = (name) => Object.fromEntries(Object.entries(flat).filter(([k]) => k.startsWith(`color.${name}.`)).map(([k, v]) => [k.split(".").pop(), v]));
const tw = {
  theme: { extend: {
    colors: {
      teal: scaleOf("teal"), "light-green": scaleOf("light-green"), purple: scaleOf("purple"), orange: scaleOf("orange"),
      blue: scaleOf("blue"), red: scaleOf("red"), neutral: scaleOf("neutral"),
      success: statusExt.success.fg, warning: statusExt.warning.fg, danger: statusExt.danger.fg, info: statusExt.info.fg,
      surface: { panel: "var(--pai-surface-panel)", raised: "var(--pai-surface-raised)", sunken: "var(--pai-surface-sunken)" },
      line: { DEFAULT: "var(--pai-border)", strong: "var(--pai-border-strong)" },
      ink: { DEFAULT: "var(--pai-text)", muted: "var(--pai-text-muted)", faint: "var(--pai-text-faint)" },
      accent: { DEFAULT: "var(--pai-accent)", strong: "var(--pai-accent-strong)", soft: "var(--pai-accent-soft)" },
    },
    fontFamily: { display: flat["font.family.display"], product: flat["font.family.product"], reading: flat["font.family.reading"], mono: flat["font.family.mono"] },
    fontSize: Object.fromEntries(Object.entries(flat).filter(([k]) => k.startsWith("font.size.")).map(([k, v]) => [k.split(".").pop(), v])),
    borderRadius: { xs: "4px", sm: "8px", md: "12px", lg: "16px", xl: "24px", pill: "999px" },
    boxShadow: { sm: cssVal(flat["shadow.sm"]), xl: cssVal(flat["shadow.xl"]), none: "none" },
    spacing: { row: "var(--pai-row)", control: "var(--pai-control)", "cell-x": "var(--pai-cell-x)", sidebar: flat["layout.sidebar-expanded"], "sidebar-sm": flat["layout.sidebar-collapsed"], topbar: flat["layout.topbar"] },
    maxWidth: { content: flat["layout.content-max"], reading: flat["layout.reading-max"] },
    letterSpacing: { heading: flat["font.tracking.heading"] },
    transitionDuration: { fast: "150ms", enter: "225ms", leave: "195ms", standard: "300ms" },
    transitionTimingFunction: { enter: cssVal(flat["motion.easing.enter"]), sidebar: cssVal(flat["motion.easing.sidebar"]), reveal: cssVal(flat["motion.easing.reveal"]) },
  } },
};
writeFileSync(join(out, "tailwind.preset.cjs"), `// Generato — non modificare\nmodule.exports = ${JSON.stringify(tw, null, 2)};\n`);

// ---------- 5. HeroUI theme ----------
const hero = {
  layout: { radius: { small: "8px", medium: "12px", large: "16px" }, borderWidth: { small: "1px", medium: "1px", large: "2px" }, disabledOpacity: 0.5 },
  themes: {
    light: { colors: {
      background: "#FFFFFF", foreground: flat["color.neutral.900"], focus: flat["focus.product"],
      primary: { ...scaleOf("teal"), DEFAULT: flat["color.teal"], foreground: "#000000" },
      secondary: { ...scaleOf("purple"), DEFAULT: flat["color.purple"], foreground: "#FFFFFF" },
      success: { ...scaleOf("teal"), DEFAULT: statusExt.success.fg, foreground: "#FFFFFF" },
      warning: { ...scaleOf("orange"), DEFAULT: statusExt.warning.fg, foreground: "#000000" },
      danger:  { ...scaleOf("red"), DEFAULT: statusExt.danger.fg, foreground: "#FFFFFF" },
      default: { ...scaleOf("neutral"), DEFAULT: flat["color.neutral.200"], foreground: flat["color.neutral.900"] },
      content1: "#FFFFFF", content2: flat["color.neutral.50"], content3: flat["color.neutral.100"], content4: flat["color.neutral.200"],
    } },
    dark: { colors: {
      background: flat["color.neutral.900"], foreground: flat["color.neutral.50"], focus: flat["focus.on-dark"],
      primary: { ...scaleOf("teal"), DEFAULT: flat["color.teal"], foreground: "#000000" },
      secondary: { ...scaleOf("purple"), DEFAULT: flat["color.purple"], foreground: "#FFFFFF" },
      success: { ...scaleOf("teal"), DEFAULT: flat["color.teal.400"], foreground: "#000000" },
      warning: { ...scaleOf("orange"), DEFAULT: flat["color.orange.400"], foreground: "#000000" },
      danger:  { ...scaleOf("red"), DEFAULT: flat["color.red.400"], foreground: "#000000" },
      default: { ...scaleOf("neutral"), DEFAULT: flat["color.neutral.700"], foreground: flat["color.neutral.50"] },
      content1: flat["color.neutral.900"], content2: flat["color.neutral.800"], content3: flat["color.neutral.700"], content4: flat["color.neutral.600"],
    } },
  },
};
writeFileSync(join(out, "heroui.theme.cjs"), `// Generato — passare a heroui() in tailwind.config: plugins: [heroui(require('./tokens/dist/heroui.theme.cjs'))]\nmodule.exports = ${JSON.stringify(hero, null, 2)};\n`);

console.log(`✓ ${Object.keys(flat).length} token → dist/tokens.css, tailwind.preset.cjs, heroui.theme.cjs, tokens.flat.json`);
