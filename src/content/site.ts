// Single source for figures and links used across the page.

// Sign-ups go to this Monday.com form, which adds each one to the "Waitlist Submissions" board.
const signupForm = "https://forms.monday.com/forms/f0983dc8fc193913bbc6a34a60df7d5b?r=apse2";

/**
 * Sign-up link tagged with the button it came from. The form saves its `waitlist`
 * URL parameter into the board's hidden "waitlist" column, e.g. "Home page - Pricing - Connected".
 */
export const joinLink = (source: string) =>
  `${signupForm}&waitlist=${encodeURIComponent(`Home page - ${source}`)}`;

export const links = {
  bookChat: "https://calendly.com/thomas-fairpay-ai/30min",
  linkedin: "https://www.linkedin.com/company/fairpay-ai/",
};

// Community volume shown on the progress bar. Must be the real processed total.
// While `processedAud` is null the bar shows the goal only; set it and `updatedOn`
// (e.g. "26 September 2026") to show real progress.
export const community = {
  processedAud: null as number | null,
  updatedOn: null as string | null,
  firstGoalAud: 2_000_000,
};

// Stripe public AU pricing, checked 26 Sep 2026 at stripe.com/au/pricing.
export const rates = {
  fairpayMarginPct: 0.2,
  cards: { stripePct: 1.7, fixedCents: 30 },
  payto: { stripePct: 1.0, fixedCents: 30, stripeCapAud: 3.5 },
};

export const founding = {
  marginFreeYears: 2,
  freePlanMonths: 12,
  freePlanValueAud: 264,
};

export const plans = [
  {
    name: "Pay as you go",
    priceAud: 0,
    blurb: "No sign-up fee. Pay only when you get paid.",
    features: ["Cards and digital wallets", "PayTo", "Invoicing", "Email support"],
  },
  {
    name: "Connected",
    priceAud: 22,
    blurb: "For businesses that want payments in their books automatically.",
    features: [
      "Everything in Pay as you go",
      "Accounting integration, including Xero",
      "Onshore support, business hours",
    ],
    highlight: true,
  },
  {
    name: "Connected Plus",
    priceAud: 65,
    blurb: "For teams that need help any day of the week.",
    features: ["Everything in Connected", "Onshore support, 7 days a week"],
  },
];

export const formatAud = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
