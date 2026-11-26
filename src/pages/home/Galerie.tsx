import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import Section from '@/components/site/Section'
import SectionHeading from '@/components/site/SectionHeading'
import { cn } from '@/lib/utils'

const galleryItems: Array<{ label: string; base: string; mutedTone?: boolean }> = [
  { label: 'Echipa CESS', base: 'about-team' },
  { label: 'Sediul nostru', base: 'contact-office' },
  { label: 'Training SSM', base: 'service-ssm' },
  { label: 'Consultare fiscală', base: 'service-contabilitate' },
  { label: 'Audit GDPR', base: 'service-gdpr', mutedTone: true },
  { label: 'Evenimente', base: 'blog-contabilitate' },
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
                    src={`/${item.base}-960.webp`}
                    srcSet={`/${item.base}-480.webp 480w, /${item.base}-760.webp 760w, /${item.base}-960.webp 960w`}
                    sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 44px), 390px"
                    width={960}
                    height={536}
                    alt={item.label}
                    loading="lazy"
                    decoding="async"
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
