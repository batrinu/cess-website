import { Quote } from 'lucide-react'
import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import Section from '@/components/site/Section'
import SectionHeading from '@/components/site/SectionHeading'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    quote:
      'Echipa CESS ne-a transformat complet modul în care gestionăm conformarea. De la SSM la GDPR, totul este acum organizat și digitalizat.',
    name: 'Maria I.',
    role: 'Manager HR, Constanța',
  },
  {
    quote:
      'De când colaborăm cu CESS, nu mai avem grija amenzilor. Contabilitatea și fiscalitatea sunt perfect gestionate.',
    name: 'Andrei P.',
    role: 'Director General, București',
  },
  {
    quote:
      'Aplicația CESS este un game-changer. Pot vedea tot ce se întâmplă în timp real, iar alertele mă ajută să nu ratez niciodată un termen.',
    name: 'Elena D.',
    role: 'Administrator, Mangalia',
  },
]

export default function Testimoniale() {
  return (
    <Section tone="navy">
      <Container>
        <Reveal>
          <SectionHeading
            tone="dark"
            align="left"
            title="Părerile clienților noștri."
            className="mb-14"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-0">
            {testimonials.map((item, i) => (
              <figure
                key={item.name}
                className={cn(
                  'flex flex-col justify-between gap-6',
                  i > 0 && 'border-t border-rule-dark pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8',
                  i < 2 && 'lg:pr-8',
                )}
              >
                <div className="space-y-4">
                  <Quote size={24} strokeWidth={1.4} aria-hidden="true" className="text-copper-light opacity-70" />
                  <blockquote className="font-display text-xl leading-relaxed text-on-dark md:text-[1.375rem]">
                    „{item.quote}”
                  </blockquote>
                </div>
                <figcaption className="border-t border-rule-dark/70 pt-4">
                  <div className="font-body text-sm font-semibold text-copper-light">{item.name}</div>
                  <div className="mt-0.5 font-body text-sm text-on-dark-muted">{item.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
