import { Link } from 'react-router'
import { Building2, Calculator, FileCheck, Flame, HardHat, Phone, Shield, Users } from 'lucide-react'
import ActionLink from '@/components/site/ActionLink'
import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import Section from '@/components/site/Section'
import SectionHeading from '@/components/site/SectionHeading'

const services = [
  {
    icon: Calculator,
    title: 'Contabilitate financiară și de gestiune',
    subtitle: 'Control complet, fără griji contabile',
    link: '/servicii#contabilitate',
  },
  {
    icon: FileCheck,
    title: 'Consultanță fiscală și depunerea declarațiilor',
    subtitle: 'Siguranță fiscală, zero surprize',
    link: '/servicii#fiscalitate',
  },
  {
    icon: Shield,
    title: 'Protecția Datelor cu Caracter Personal (GDPR)',
    subtitle: 'Siguranță, Conformare, Liniște',
    link: '/servicii#gdpr',
  },
  {
    icon: HardHat,
    title: 'Securitate și Sănătate în Muncă (SSM)',
    subtitle: 'Legal, organizat, fără hârtii inutile',
    link: '/servicii#ssm',
  },
  {
    icon: Users,
    title: 'Servicii de Salarizare și Operare REGES',
    subtitle: 'HR organizat și corect',
    link: '/servicii#salarizare',
  },
  {
    icon: Building2,
    title: 'Evaluare de Risc la Securitate Fizică',
    subtitle: 'Prevenție reală, nu doar formală',
    link: '/servicii#securitate-fizica',
  },
  {
    icon: Flame,
    title: 'Prevenirea și Stingerea Incendiilor (PSI)',
    subtitle: 'Siguranță reală, nu doar pe hârtie',
    link: '/servicii#psi',
  },
]

export default function ServiciiGrid() {
  return (
    <Section tone="alabaster">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            title="Servicii complete pentru conformarea afacerii tale."
            description="Serviciile noastre acoperă toate ariile esențiale pentru conformare și funcționare eficientă:"
            className="mb-14"
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="border-b border-rule">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.link}
                  to={service.link}
                  className="group grid gap-3 border-t border-rule px-2 py-6 transition-colors hover:bg-vellum md:grid-cols-12 md:items-center md:gap-6 md:px-4 md:py-7"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-xl italic text-copper-ink tabular-nums md:col-span-1"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-4 md:col-span-5">
                    <Icon size={24} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-navy" />
                    <h3 className="font-display text-2xl leading-snug text-ink">{service.title}</h3>
                  </div>
                  <span className="text-sm leading-6 text-ink-muted md:col-span-4">{service.subtitle}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-copper-ink transition-colors group-hover:text-navy md:col-span-2 md:justify-end">
                    Află mai mult <span aria-hidden="true">→</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div
            data-surface="dark"
            className="mt-10 flex flex-col justify-between gap-6 border border-rule-dark bg-navy p-8 text-on-dark md:flex-row md:items-center md:p-10"
          >
            <div className="flex items-start gap-4">
              <Phone size={28} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-copper-light" />
              <div>
                <h3 className="font-display text-2xl leading-snug text-on-dark">
                  Ai nevoie de mai multe servicii?
                </h3>
                <p className="mt-2 max-w-[54ch] text-sm leading-6 text-on-dark-muted">
                  Contactează-ne pentru o soluție personalizată adaptată nevoilor tale.
                </p>
              </div>
            </div>
            <ActionLink to="/contact" variant="light" className="shrink-0">
              Contactează-ne
            </ActionLink>
          </div>
        </Reveal>

        <div className="mt-12 text-center">
          <ActionLink to="/servicii">Vezi toate serviciile</ActionLink>
        </div>
      </Container>
    </Section>
  )
}
