import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import Section from '@/components/site/Section'
import SectionHeading from '@/components/site/SectionHeading'
import { cn } from '@/lib/utils'

const galleryItems: Array<{ label: string; image: string; mutedTone?: boolean }> = [
  { label: 'Echipa CESS', image: '/about-team.jpg' },
  { label: 'Sediul nostru', image: '/contact-office.jpg' },
  { label: 'Training SSM', image: '/service-ssm.jpg' },
  { label: 'Consultare fiscală', image: '/service-contabilitate.jpg' },
  { label: 'Audit GDPR', image: '/service-gdpr.jpg', mutedTone: true },
  { label: 'Evenimente', image: '/blog-contabilitate.jpg' },
]

export default function Galerie() {
  return (
    <Section tone="alabaster">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            title="În spatele cortinei"
            description="O privire asupra echipei, sediului și modului nostru de lucru."
            className="mb-14"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <figure key={item.label} className="overflow-hidden border border-rule bg-vellum">
                <div className="aspect-[16/10] overflow-hidden bg-stone">
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                    className={cn(
                      'h-full w-full object-cover',
                      item.mutedTone && 'saturate-[0.55] contrast-[0.95]',
                    )}
                  />
                </div>
                <figcaption className="border-t border-rule px-5 py-3.5 font-body text-sm font-medium text-ink">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
