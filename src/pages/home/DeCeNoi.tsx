import { Check } from 'lucide-react'
import ActionLink from '@/components/site/ActionLink'
import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import Section from '@/components/site/Section'

const checkmarks = [
  'Servicii complete, conectate între ele și gândite pentru tine',
  'Punct unic de contact, zero pierderi de informație',
  'Lucrăm 100% digitalizat, cu trasabilitate și control',
  'Aplicăm soluții clare, nu doar regulamente',
  'Aplicația CESS te ajută să automatizezi și să eviți greșelile frecvente',
]

const stats = [
  { value: '7+', label: 'Servicii integrate' },
  { value: '100%', label: 'Digitalizat' },
  { value: '24/7', label: 'Suport disponibil' },
]

export default function DeCeNoi() {
  return (
    <Section tone="vellum">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display-2 text-ink">Partenerul tău de conformare</h2>

              <div className="mt-6 max-w-[62ch] space-y-4 text-lg leading-8 text-ink-muted">
                <p>
                  Când vrei mai puțină birocrație, dar conformare 100%, ai nevoie de o echipă care înțelege nu doar ce spune legea, ci și ce înseamnă să o aplici în practică.
                </p>
                <p>
                  La CESS, gândim toate serviciile în jurul nevoilor reale ale antreprenorilor. Nu venim cu soluții "din cărți", ci cu un sistem integrat, logic și ușor de folosit – chiar și pentru firmele care pornesc de la zero.
                </p>
              </div>

              <ul className="mt-7 space-y-3">
                {checkmarks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={18} strokeWidth={2.5} aria-hidden="true" className="mt-1 shrink-0 text-success-ink" />
                    <span className="text-base leading-7 text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 max-w-[62ch] text-base font-medium leading-7 text-ink">
                CESS înseamnă eficiență, prevenție și parteneriat pe termen lung. Suntem alături de tine la fiecare pas, cu soluții reale, aplicabile și rezultate vizibile.
              </p>

              <div className="mt-9">
                <ActionLink to="/contact">Contactează-ne</ActionLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <div className="border-b border-rule">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-t border-rule py-7">
                    <p className="font-display text-5xl leading-none text-navy tabular-nums md:text-6xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm font-medium text-ink-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
