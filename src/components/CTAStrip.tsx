import { ButtonLink, Container, Headline, Reveal, Section } from "./kit";
import { community, founding, formatAud, joinLink, links } from "../content/site";

/** The pool circle: one large mint circle bleeding off the top-right corner of the panel. */
const POOL: React.CSSProperties = {
  background: "radial-gradient(circle at 100% 0%, rgba(159,227,192,0.18) 0 30%, transparent 30.2%)",
};

export function CTAStrip() {
  return (
    <Section tone="white" className="pb-24 pt-4 md:pb-32 md:pt-8">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-ink px-6 py-20 text-center ring-1 ring-white/10 sm:px-10 md:px-16 md:py-28">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={POOL} />

            <Headline
              dark
              lead="The more of us,"
              rest="the better the deal."
              className="mx-auto max-w-[760px] text-[36px] leading-[1.05] sm:text-[44px] md:text-[56px]"
            />
            <p className="mx-auto mt-6 max-w-[540px] text-[17px] leading-[1.6] text-white/75">
              Join the FairPay community as a founding member, or book a chat to see if FairPay is right for you.
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={joinLink("Bottom banner")} external variant="light" className="focus-visible:outline-white">
                Become a founding member
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
              <ButtonLink href={links.bookChat} external variant="ghostDark" className="focus-visible:outline-white">
                Book a chat
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
            </div>

            <p className="mx-auto mt-8 max-w-[640px] text-[14px] leading-[1.6] text-white/60 text-balance">
              Join before the community reaches{" "}
              <span className="text-white/85 tabular">{formatAud(community.firstGoalAud)}</span> and pay no FairPay margin
              for your first <span className="text-white/85 tabular">{founding.marginFreeYears}</span> years.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
