import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Eye, X } from 'lucide-react'
import Container from '@/components/site/Container'
import Section from '@/components/site/Section'
import SectionHeading from '@/components/site/SectionHeading'
import ActionLink, { actionClasses } from '@/components/site/ActionLink'
import Reveal from '@/components/site/Reveal'
import { useModalDialog } from '@/hooks/useModalDialog'

interface CertificationDoc {
  id: number
  title: string
  detail: string
  statusTone: 'active' | 'year'
  description: string
  image: string
}

const certifications: CertificationDoc[] = [
  {
    id: 1,
    title: 'Autorizație de funcționare CECCAR',
    detail: '2025',
    statusTone: 'year',
    description:
      'Autorizație emisă de Corpul Experților Contabili și Contabililor Autorizați din România, care atestă dreptul de a practica activități de contabilitate și audit.',
    image: '/ceccar-2025.jpg',
  },
  {
    id: 2,
    title: 'Certificat de abilitare',
    detail: 'Valabil',
    statusTone: 'active',
    description:
      'Certificat care atestă abilitarea profesională în domeniul serviciilor de suport administrative și de conformare.',
    image: '/certificat-abilitare.jpg',
  },
]

export default function Certificari() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const lightboxRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  const closeLightbox = useCallback(() => {
    setLightboxImage(null)
  }, [])

  useModalDialog({
    isOpen: Boolean(lightboxImage),
    dialogRef: lightboxRef,
    initialFocusRef: closeBtnRef,
    returnFocusRef: triggerRef,
    onClose: closeLightbox,
  })

  const openLightbox = (image: string, trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? null
    setLightboxImage(image)
  }

  const activeCertification = certifications.find(
    (cert) => cert.image === lightboxImage,
  )

  return (
    <div>
      {/* Section 1: Compact Light Hero */}
      <section className="border-b border-rule bg-alabaster pt-28 pb-14 md:pt-36 md:pb-20">
        <Container>
          <p className="editorial-eyebrow mb-4 text-copper-ink">
            DOCUMENTE OFICIALE
          </p>
          <h1 className="display-2 text-ink">Certificări</h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-8 text-ink-muted">
            Documente oficiale care atestă calificarea și autorizarea CESS TRUST
            S.R.L. în domeniile de activitate.
          </p>
        </Container>
      </section>

      {/* Section 2: Documente */}
      <Section tone="vellum">
        <Container>
          <h2 className="sr-only">Documente și autorizări</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {certifications.map((cert, index) => (
              <Reveal
                key={cert.id}
                delay={index * 100}
                className="flex flex-col justify-between border border-rule bg-alabaster p-5 sm:p-7"
              >
                <div>
                  <button
                    type="button"
                    onClick={(e) => openLightbox(cert.image, e.currentTarget)}
                    aria-label={`Previzualizează ${cert.title}`}
                    className="group block w-full overflow-hidden border border-rule bg-vellum p-3 text-left transition-colors hover:border-navy"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-vellum">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  </button>

                  <h3 className="mt-6 font-display text-2xl text-ink">
                    {cert.title}
                  </h3>
                  <p
                    className={
                      cert.statusTone === 'active'
                        ? 'mt-2 text-sm font-medium text-success-ink'
                        : 'mt-2 text-sm font-medium tabular-nums text-ink-muted'
                    }
                  >
                    {cert.detail}
                  </p>
                  <p className="mt-3 text-base leading-7 text-ink-muted">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={(e) => openLightbox(cert.image, e.currentTarget)}
                    className={actionClasses('secondary', 'w-full sm:w-auto')}
                  >
                    <Eye size={16} aria-hidden="true" />
                    Vezi documentul
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 3: CTA Banner */}
      <Section tone="navy">
        <Container className="text-center">
          <Reveal>
            <SectionHeading
              tone="dark"
              align="center"
              title="Ai întrebări despre calificările noastre?"
            />
            <div className="mt-8">
              <ActionLink to="/contact" variant="light">
                Contactează-ne
              </ActionLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Lightbox Modal */}
      {lightboxImage &&
        createPortal(
          <div
            ref={lightboxRef}
            data-surface="dark"
            tabIndex={-1}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur-sm md:p-12"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Previzualizare document"
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center border border-rule bg-alabaster text-navy transition-colors hover:bg-vellum"
              aria-label="Închide previzualizarea"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <img
              src={lightboxImage}
              alt={activeCertification?.title ?? 'Document'}
              className="max-h-[90vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </div>
  )
}
