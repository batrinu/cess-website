import { Play } from 'lucide-react'
import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import Section from '@/components/site/Section'
import SectionHeading from '@/components/site/SectionHeading'

export default function VideoSection() {
  return (
    <Section tone="vellum">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            title="Experiența CESS."
            description="Descoperă cum simplificăm conformarea și oferim suport real companiilor din România."
            className="mb-12"
          />
        </Reveal>

        <Reveal delay={100}>
          <div
            data-surface="dark"
            className="mx-auto flex aspect-video max-w-4xl flex-col items-center justify-center border border-rule-dark bg-navy p-8 text-center text-on-dark"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-copper/40">
              <Play size={32} strokeWidth={1.5} aria-hidden="true" className="ml-1 text-copper-light" />
            </div>
            <p className="mt-6 font-body text-sm font-medium uppercase tracking-[0.12em] text-on-dark-muted">
              Video prezentare — în curând
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
