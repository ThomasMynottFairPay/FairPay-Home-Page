# FairPay design system

Reference feel: stripe.com/au and airwallex.com/en-au. Polished fintech, calm and confident, where the product does the talking. We borrow their *craft* (type scale, hairlines, real product UI, bento grids, restrained gradient accents), never their brand (no Stripe purple ribbon, no copied layouts or assets).

## Principles
1. **Show the product, not icons.** Every feature section carries a realistic UI mockup (dashboard rows, checkout sheet, bank-app approval, invoice, Xero sync) built in JSX from `kit.tsx` primitives. No "icon in a rounded square + title + blurb" card grids. Icons are allowed only at 16px inline, inside mockups or lists.
2. **Type does the hierarchy.** Geist, medium weight (500) headings, tight tracking (-0.035em), two-tone headlines via `<Headline lead rest>`: short ink lead, body-colour continuation. Body 17px/1.6 in `text-body`. No bold-everything, no ALL CAPS eyebrows (sentence case, 13px, brand colour).
3. **One accent.** Brand teal `brand` (#0A7A67) for buttons and links; `brand-bright` (#19D3AE) only on dark or as data fill. The sky/violet/coral gradient appears only in the hero mesh (`.fp-mesh`) and at most one accent panel (`.fp-panel-gradient`). No rainbow cards, no gradient text.
4. **Hairlines over shadows.** Cards are `ring-1 ring-line` with `shadow-card`; floating mockups use `shadow-float`. Radius: cards 16px (`rounded-2xl`), mockups 12px, buttons 6px (`rounded-md`), pills 4px.
5. **Rhythm.** Sections `py-24 md:py-32`. Alternate `white` → `canvas`; one `ink` (dark) section for contrast (More than payments), plus the community band. Content lives in `Container` (1200px) with `GuideLines` hairlines.
6. **Asymmetry.** Prefer 5/7 or 7/5 splits and bento grids with mixed spans over centred stacks of three equal cards. Centre-aligned text only for the closing CTA.
7. **Motion is quiet.** `Reveal` fade-rise on view; small looping motion only inside mockups (a payment row arriving, a progress fill). Respect reduced motion.
8. **Honest data.** Mockup data is illustrative (fictional clubs, cafés, charities, AUD amounts). Never show a fake community total, fake customer logos, testimonials or savings figures. Rates only from `src/content/site.ts`. Unconfirmed figures are left off the page rather than shown as placeholders.

## Tokens (Tailwind classes)
- Text: `text-ink` headings, `text-body` paragraphs, `text-subtle` captions.
- Surfaces: `bg-white`, `bg-canvas`, `bg-ink`, `bg-ink-soft` (raised on dark), `bg-brand-tint`.
- Lines: `ring-line` / `border-line`, `border-line-dark` on dark.
- Fonts: `font-sans` (Geist), `font-mono` + `tabular` for amounts.

## Kit (`src/components/kit.tsx`)
Container, GuideLines, Section(tone), Eyebrow, Headline, ButtonLink(primary|secondary|light|ghostDark), Reveal, Tile, BrowserFrame, PhoneFrame, Pill(success|pending|info|neutral), MethodMark.
