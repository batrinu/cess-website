import Container from '@/components/site/Container'
import ActionLink from '@/components/site/ActionLink'

export default function FluidGateway() {
  return (
    <section className="relative border-b border-rule bg-alabaster pt-28 pb-14 md:pt-36 md:pb-20">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="editorial-eyebrow mb-5 text-copper-ink">
            CENTRUL EXTERNALIZAT PENTRU SERVICII SUPORT
          </p>

          <h1 className="display-1 text-ink">
            Creativitate.
            <br />
            Eficiență.
            <br />
            Tehnologie.
          </h1>

          <p className="mt-7 font-display text-2xl italic text-navy md:text-[1.75rem]">
            Conformare fără bătăi de cap.
          </p>

          <div className="mt-5 max-w-[58ch] space-y-4 text-base leading-7 text-ink-muted md:text-lg md:leading-8">
            <p>
              Digitalizăm procesele administrative ca să-ți oferim conformare legală simplificată,
              rapidă și <span className="tabular-nums">100%</span> adaptată nevoilor tale.
            </p>
            <p>
              Ești susținut de specialiști cu expertiză reală și de aplicații inteligente care țin
              pasul cu legislația și îți oferă control complet, oriunde ai fi.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ActionLink href="tel:+40723926446">
              SUNĂ ACUM PENTRU CONSULTANȚĂ GRATUITĂ
            </ActionLink>
            <ActionLink to="/servicii" variant="secondary">
              Descoperă serviciile
            </ActionLink>
          </div>
        </div>

        <div className="relative isolate lg:col-span-5">
          <div className="aspect-[16/10] overflow-hidden border border-rule bg-stone shadow-[0_20px_50px_rgba(16,35,52,0.08)]">
            <img
              src="/about-team-960.webp"
              srcSet="/about-team-480.webp 480w, /about-team-760.webp 760w, /about-team-960.webp 960w"
              sizes="(max-width: 1023px) calc(100vw - 40px), 480px"
              width={960}
              height={536}
              alt="Echipa CESS"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 -z-10 hidden h-28 w-28 border-b-2 border-r-2 border-copper sm:block"
          />
        </div>
      </Container>

      <div aria-hidden="true" className="mt-12 hidden justify-center md:flex">
        <div className="h-9 w-px bg-copper animate-bounce-gentle" />
      </div>
    </section>
  )
}
