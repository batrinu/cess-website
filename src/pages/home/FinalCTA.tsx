import ActionLink from '@/components/site/ActionLink'
import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import Section from '@/components/site/Section'

export default function FinalCTA() {
  return (
    <Section tone="alabaster">
      <Container>
        <Reveal>
          <div className="border-y border-rule py-14 text-center md:py-20">
            <h2 className="display-2 mx-auto max-w-3xl text-ink">
              Vrei să știi ce ți se potrivește?
            </h2>

            <p className="mx-auto mt-6 max-w-[54ch] text-lg leading-8 text-ink-muted">
              Alege CESS pentru servicii complete, clare și livrate corect. Contactează-ne acum pentru o consultație gratuită
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ActionLink to="/contact">Contactează-ne</ActionLink>
              <a
                href="tel:+40723926446"
                className="inline-flex min-h-[48px] items-center px-3 font-body text-base font-medium text-navy underline underline-offset-4 transition-colors hover:text-copper-ink tabular-nums"
              >
                +40 723 926 446
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
