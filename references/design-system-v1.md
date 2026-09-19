# ProfessionAI — Design System v1 (riferimento storico)

> Documento originale su cui è costruita la v2. Resta la fonte per il registro marketing e per la descrizione della dashboard studente v1. Dove contraddice `DECISIONS.md`, vale `DECISIONS.md`.

ProfessionAI is an Italian online academy for Data Science, Machine Learning and Artificial Intelligence, operated by ProAI SRL in Bari. It sells vertical, professionalising paths — masters and bootcamps — to three audiences: students starting from zero, working professionals, and companies. Its promise pairs recognised certification with practice on real projects and a dedicated Career Advisor.

| Surface | What it is | Typography | Default theme |
|---|---|---|---|
| Marketing site (`profession.ai`) | Acquisition site | General Sans | Dark canvas `#091314`, glass panels, radial glows |
| Student dashboard (`learn.profession.ai`) | Logged-in product | Figtree (Inter fallback) | Light product UI inside a dark teal shell; dark mode exists |

Both share the same palette anchor (teal `#00CCB2`) and the rule that black or white is present in every composition.

## Sources
- Figma *ProfessionAI _ Principal Website*, page `Sito-web-v.1.3` (21 desktop + mobile frames).
- GitHub `Profession-AI/student-dashboard` — Next.js 15 / React 19 / HeroUI 2.7 / Tailwind 3. Source of truth for the product half.
- ProfessionAI Branding Guidelines v1.1.

## Brand house
- Purpose — "Creeremo una generazione di esperti di dati e intelligenza artificiale."
- Process — "Offriamo un'esperienza di apprendimento accessibile da qualsiasi parte del mondo."
- Proof — "Creiamo percorsi formativi verticali su Dati e Intelligenza Artificiale."

## Content fundamentals
Italian, always; English only for adopted nouns (Data Science, Career Advisor, Bootcamp, Live session, Workshop, Coaching space). Second person singular *tu*; *noi* only when the school takes responsibility. Voice: inclusive, positive, aspirational; informal but not over-friendly; witty, never silly; specific and technical where it earns trust. Headlines 6–12 words as promises; subheads explain the mechanism; FAQ in the student's voice; buttons verb-first (Iscriviti · Scopri di più · Inizia subito · Contattaci · Vai al master · Riprendi); destructive actions name the object; errors say what happened and how to fix it; empty states invite an action. Sentence case everywhere; product nouns keep capitals. Concrete, verifiable numbers. No emoji.

## Visual foundations
- **Type.** Site: General Sans (600 headings, 500 body, 700 card titles). Product: Figtree, Inter fallback. Guidelines pair General Sans with Atkinson Hyperlegible for body. Never General Sans below 14px. Heading tracking −1.6px canonical (site ships −2px at 48–64px; −0.033em fluid). Site headings line-height 1.1052; site body line-height 100% with 24–48px gaps.
- **Colour.** Black and white primary. Secondaries: dark green `#00CCB2`, light green `#84FFBE`, purple `#8980F5`, orange `#F18F01`. Functional red `#F0454B` only for errors/destructive. Product blue `#1F99CD` only for master/course names in headers.
- **Backgrounds.** Site canvas `#091314`; sections in 40px-radius panels with radial gradient `#081112` → `#1A2223` and 15%-white inset ring; footer `#001310`. Dashboard: dark teal radial shell `#00443B` → `#010303` with spider-web motif ~6%, content on white (or `#18181B`) panel, 24px corners.
- **Depth.** No drop shadows on the site: 25%-opacity blurred orbs (`#4EB1B2`, `#9C95F6`, `#C87700`, 270–560px), 5%-white glass with 20–250px backdrop blur and 1–2px 15%-white rings, low-opacity wireframe geometry (max two figures, never with 3D icons). Product: `shadow-sm` on buttons, `shadow-2xl` under main panel, hero CTA bloom `0 0 50px #B0AAF8`.
- **Gradients.** Linear 500→100 single family at 135°; radial preferred on dark to focus one element (Prof AI `#2F897C` → `#00231E`, certificate `#369989` → `#00231E`, Discord `#131161` → `#5462EA`). Logomark gradient `52.7° #00CCB2 → #84FFBE`, never recoloured.
- **Radii.** Brand 8/12/16/24/999. Site: pills 999, glass/FAQ 20, course cards 22.43, panels/footer 40. Product: inputs/buttons 10/12, banners/shell 24.
- **Cards.** Site: glass + ring + no shadow, cover flush top, teal pill overlapping. Product: `content1`, 1px `default-200`, no shadow, 24px padding, inset dividers.
- **Borders.** Dark: `rgba(255,255,255,.15)`; footer `.5`. Light: `#E4E4E7`. No vertical rules in tables.
- **Motion.** 150–500ms (`entering` 225, `leaving` 195, `standard` 300); easings `(.215,.61,.355,1)`, `(.455,.03,.515,.955)` sidebar, `(.65,0,.35,1)` certificate. Hovers change colour/opacity only. No bounce, scale, or logo animation. `prefers-reduced-motion` respected.
- **Focus.** 2px ring, 2px offset — `light-green-500` on dark, `dark-green-700` on light, `#19E8CA` in product.
- **Imagery.** Candid, about learning; vibrant, not futuristic; flat-tint backgrounds; never full-bleed without a transparency layer; AI imagery allowed if checked and text-free.
- **Layout.** 12/8/4 columns (24/16/16 gutters, 64/32/20 margins). Site 1440 with 1110 content. Reading measure 68–76 chars. Social safe area 250px; slides 64px sides, 120px bottom.
- **Logo.** Lockup external, mark alone internal. Min 126px, clearance 1× mark height, no alteration.

## Iconography
165 hand-built 24×24 line SVGs (`currentColor`, ~1.5–2px stroke), with `-filled` twins for active states and `-detailed` variants at 32px. Sizes 14/16/20/24/32/40. `Icon` wrapper renders as CSS mask. Site 3D glass icons in `IconChip` are a separate language. Third-party social marks missing.

## Component inventory v1
Foundations: `Icon`, `Alert`, `LogoLockup`. Site: `SiteNav`, `SiteButton`, `SiteIconButton`, `Pill`, `CourseCard`, `GlassPanel`, `IconChip`, `BackgroundGlow`, `FaqAccordion`, `TestimonialCard`, `SocialIconLink`, `SiteFooter`. App: `AppButton`, `AppCard`, `AppDivider`, `PageHeader`, `SidebarNav`, `MasterSelect`, `ProfAIFab`, `Avatar`, `UserMenu`, `CircularProgress`, `ProgressBar`, `CourseRowCard`, `VideoCard`, `PromoBanner`, `TextField`. Figma symbol sets were mockup scaffolding and intentionally not built.

## Caveats v1
No font binaries (Fontshare/Google Fonts). Proxima Nova absent. Scale steps 25–400/600–999 derived. `light-green-800` darkened to `#42805F`. Mobile UI kit not built.
