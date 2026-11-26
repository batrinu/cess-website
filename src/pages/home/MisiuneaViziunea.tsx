import Section from '@/components/site/Section'
import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import ActionLink from '@/components/site/ActionLink'

export default function MisiuneaViziunea() {
  return (
    <Section tone="navy">
      <Container>
        <h2 className="editorial-eyebrow mb-10 text-copper-light">Misiune și viziune</h2>

        <Reveal className="grid gap-4 border-t border-rule-dark py-10 md:grid-cols-12 md:gap-8">
          <span
            aria-hidden="true"
            className="font-display text-2xl italic tabular-nums text-copper-light md:col-span-2"
          >
            01
          </span>
          <p className="font-display text-[clamp(1.6rem,2.9vw,2.5rem)] leading-[1.22] text-on-dark md:col-span-10">
            Să sprijinim companiile să rămână conforme și eficiente, prin servicii digitale de
            suport adaptate fiecărei etape de dezvoltare. Nu oferim doar servicii, ci întreaga
            logică din spatele lor.
          </p>
        </Reveal>

        <Reveal
          delay={80}
          className="grid gap-4 border-t border-rule-dark py-10 md:grid-cols-12 md:gap-8"
        >
          <span
            aria-hidden="true"
            className="font-display text-2xl italic tabular-nums text-copper-light md:col-span-2"
          >
            02
          </span>
          <p className="font-display text-[clamp(1.6rem,2.9vw,2.5rem)] leading-[1.22] text-on-dark md:col-span-10">
            Să devenim principalul centru externalizat pentru servicii suport, recunoscut național
            pentru inovație, seriozitate și eficiență operațională.
          </p>
        </Reveal>

        <Reveal
          delay={160}
          className="flex flex-col gap-6 border-t border-rule-dark pt-10 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-[60ch] text-lg leading-7 text-on-dark-muted">
            Împreună, construim un mediu de afaceri sigur, predictibil și sustenabil pentru
            fiecare client din portofoliu.
          </p>
          <ActionLink
            to="/contact"
            variant="light-outline"
            className="shrink-0 self-start md:self-auto"
          >
            Contactează-ne
          </ActionLink>
        </Reveal>
      </Container>
    </Section>
  )
}
