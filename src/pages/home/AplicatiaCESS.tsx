import { ArrowUpRight } from 'lucide-react'
import ActionLink from '@/components/site/ActionLink'
import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import Section from '@/components/site/Section'
import { cn } from '@/lib/utils'

const features = [
  'SSM, PSI și GDPR – documente, evidențe, fișe, planuri, alerte automate',
  'Termene-limită și alerte automate – nu mai ratezi nimic important',
  'Acces securizat și control pe roluri – echipa ta poate colabora eficient',
  'Modele de documente actualizate – întotdeauna conforme cu legislația',
  'Audit intern pregătit automat – în caz de control, ești acoperit',
]

const sidebarItems = ['SSM', 'PSI', 'GDPR', 'Contabilitate', 'Fiscalitate', 'Rapoarte']

const statusPills = [
  { label: 'Conform', tone: 'success' },
  { label: 'În așteptare', tone: 'pending' },
  { label: 'Verificat', tone: 'success' },
] as const

const chartBars = [40, 65, 45, 80, 55, 70, 50, 90, 60, 75]

const documents = ['Documente SSM', 'Evidență PSI', 'Audit GDPR']

export default function AplicatiaCESS() {
  return (
    <Section tone="navy">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display-2 text-on-dark">
                Totul într-un singur loc, la un click distanță
              </h2>

              <p className="mt-6 text-lg leading-8 text-on-dark-muted">
                Aplicația CESS este soluția digitală care transformă obligațiile legale într-un proces simplu, organizat și automatizat.
              </p>

              <ul className="mt-7 space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-copper-light" />
                    <span className="text-base leading-7 text-on-dark-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-base leading-7 text-on-dark-muted">
                Totul se desfășoară integrat, printr-un punct unic de contact, cu suport uman sau digital, într-o manieră trasabilă și conformă.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <ActionLink href="https://app.cess.ro" target="_blank" variant="light">
                  Demo gratuit
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> (se deschide într-o filă nouă)</span>
                </ActionLink>
                <ActionLink to="/servicii" variant="light-outline">
                  Află mai multe
                </ActionLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <div
                aria-hidden="true"
                className="border border-rule-dark/60 bg-vellum text-ink shadow-[0_28px_70px_rgba(0,0,0,0.28)]"
              >
                <div className="flex items-center justify-between border-b border-rule-dark bg-navy px-5 py-3.5 text-on-dark">
                  <span className="font-body text-sm font-semibold tracking-[0.04em] text-on-dark">
                    CESS App
                  </span>
                  <span className="border border-rule-dark px-2.5 py-0.5 font-body text-xs font-medium text-copper-light">
                    Conformare
                  </span>
                </div>

                <div className="grid sm:grid-cols-[150px_1fr]">
                  <div className="hidden space-y-1 border-r border-rule bg-alabaster p-4 sm:block">
                    {sidebarItems.map((item, i) => (
                      <div
                        key={item}
                        className={cn(
                          'px-3 py-2 font-body text-xs',
                          i === 0
                            ? 'border border-rule bg-vellum font-semibold text-ink'
                            : 'text-ink-muted',
                        )}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 bg-vellum p-5">
                    <div className="flex flex-wrap gap-2">
                      {statusPills.map((status) => (
                        <span
                          key={status.label}
                          className={cn(
                            'border border-rule bg-alabaster px-2.5 py-1 text-xs font-medium',
                            status.tone === 'pending' ? 'text-copper-ink' : 'text-success-ink',
                          )}
                        >
                          {status.label}
                        </span>
                      ))}
                    </div>

                    <div className="flex h-36 items-end gap-1.5 border-b border-rule px-2 pb-3">
                      {chartBars.map((height, i) => (
                        <div
                          key={i}
                          className={cn('flex-1', i === 7 ? 'bg-copper' : 'bg-navy/75')}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>

                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div
                          key={doc}
                          className="flex items-center justify-between gap-3 border border-rule bg-alabaster px-3.5 py-2.5"
                        >
                          <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
                            <span className="h-2 w-2 shrink-0 bg-success-ink" />
                            {doc}
                          </span>
                          <span className="text-xs font-medium text-ink-muted">Actualizat</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
