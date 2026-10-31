# FairPay design system

Calm, confident and a bit warm: a trusted local co-op, not a bank and not a crypto app. Small alone. Big together.

## Source of truth
**FairPay Brand Guide v1.0 ("The pool, forest and mint", October 2026).** Where this file and the guide disagree, the guide wins.

## Principles
1. **Show the product, not icons.** Every feature section carries a realistic UI mockup built in JSX from `kit.tsx` primitives.
2. **One family, set tight and bold.** Bricolage Grotesque: ExtraBold (800) headlines with tight tracking, Regular (400) body. Two-tone headlines via `<Headline lead rest>`: lead in forest, payoff in raised forest on light or mint on forest. Eyebrows are the only capitals (13px, bold, +0.12em). Sentence case everywhere else. Tabular figures for money.
3. **Forest ground, one mint accent.** Forest `#0E3B2E` for grounds, primary buttons and text on light; mint `#9FE3C0` for the one thing to see on forest. Never mint text on white. Red only for errors.
4. **The pool.** Logo is three small dots joining one big dot. Graphic devices: one large mint pool circle bleeding off a corner (`.fp-mesh`), the mint dot grid (`.fp-dots`), dots growing, progress as dots.
5. **Generous, round and flat.** Pill buttons (48px, bold), cards 20px, panels 28px, inputs 12px. 1px line borders; only hero mock-ups get a soft shadow.
6. **Rhythm.** Content in `Container` (1200px). Sections alternate white and paper, with forest sections for contrast. Footer is forest-950.
7. **Motion is quiet.** `Reveal` fade-rise on view; respect reduced motion.
8. **Honest data.** Mockup data is illustrative. Never show a fake community total, fake customer logos, testimonials or savings figures. Rates only from `src/content/site.ts`.

## Tokens (Tailwind classes)
- Palette: `forest-950/900/700/500`, `mint-300/100`, `paper`, `sage`, `moss`.
- Semantic: `text-ink` (forest) headings, `text-body` (moss) paragraphs, `bg-canvas` (paper), `bg-ink` (forest sections), `bg-ink-soft` (raised forest), `text-brand-deep` (accent text on light), `brand-bright` (mint), `brand-tint` (mint tint).
- Lines: `ring-line` / `border-line`, `border-line-dark` on forest.

## Kit (`src/components/kit.tsx`)
Container, GuideLines, Section(tone), Eyebrow, Headline, ButtonLink(primary|secondary|light|ghostDark), Reveal, Tile, BrowserFrame, PhoneFrame, Pill(success|pending|info|neutral), MethodMark.
