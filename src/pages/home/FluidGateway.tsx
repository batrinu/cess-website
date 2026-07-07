import { useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float f = 0.0;
    float w = 0.5;
    for (int i = 0; i < 5; i++) {
      f += w * snoise(p);
      p *= 2.0;
      w *= 0.5;
    }
    return f;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

    // Slow fluid movement
    float t = uTime * 0.15;

    // Create flowing fluid pattern
    vec2 p = uv * aspect;
    vec2 flow = vec2(
      fbm(p * 1.5 + t + vec2(0.0, 1.3)),
      fbm(p * 1.5 + t + vec2(2.2, 3.7))
    );

    // Second layer
    vec2 q = vec2(
      fbm(p + flow + t * 0.5),
      fbm(p + flow - t * 0.3)
    );

    // Mouse influence
    vec2 mouseInfluence = vec2(0.0);
    if (uMouse.x > 0.0) {
      vec2 mPos = uMouse * aspect;
      float dist = length(p - mPos);
      mouseInfluence = vec2(
        exp(-dist * 2.0) * sin(t + dist * 5.0),
        exp(-dist * 2.0) * cos(t + dist * 5.0)
      );
    }

    float f = fbm(p + q + flow * 0.4 + mouseInfluence);

    // Monochrome warm-grey palette
    vec3 col1 = vec3(0.05, 0.05, 0.05);   // near black
    vec3 col2 = vec3(0.12, 0.10, 0.08);   // dark warm grey
    vec3 col3 = vec3(0.25, 0.22, 0.18);   // medium warm grey
    vec3 col4 = vec3(0.35, 0.30, 0.25);   // light warm grey

    float nf = f * 0.5 + 0.5;

    vec3 color = mix(col1, col2, smoothstep(0.0, 0.3, nf));
    color = mix(color, col3, smoothstep(0.3, 0.6, nf));
    color = mix(color, col4, smoothstep(0.6, 0.9, nf));

    // Subtle vignette
    float vignette = 1.0 - 0.5 * length((uv - 0.5) * 1.5);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function FluidGateway() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX / window.innerWidth
    mouseRef.current.y = 1.0 - e.clientY / window.innerHeight
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const startTime = performance.now()

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      uniforms.uTime.value = (performance.now() - startTime) / 1000
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [handleMouseMove])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center"
      style={{ backgroundColor: '#000000' }}
    >
      {/* WebGL Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Content Overlay */}
      <div
        className="relative z-10 w-full content-max-width pt-24 pb-16"
        style={{ pointerEvents: 'none' }}
      >
        {/* Label */}
        <p
          className="font-body text-xs font-semibold uppercase tracking-[0.08em] mb-6"
          style={{ color: '#c9a87c', pointerEvents: 'auto' }}
        >
          CENTRUL EXTERNALIZAT PENTRU SERVICII SUPORT
        </p>

        {/* Title */}
        <h1
          className="font-display font-normal max-w-[800px] mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            color: '#f5f0eb',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Creativitate.
          <br />
          Eficiență.
          <br />
          Tehnologie.
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-xl font-light mb-8"
          style={{ color: '#94a3b8' }}
        >
          Conformare fără bătăi de cap.
        </p>

        {/* Body */}
        <div className="max-w-[560px] mb-10 space-y-4">
          <p className="font-body text-base" style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Digitalizăm procesele administrative ca să-ți oferim conformare legală simplificată, rapidă și 100% adaptată nevoilor tale.
          </p>
          <p className="font-body text-base" style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Ești susținut de specialiști cu expertiză reală și de aplicații inteligente care țin pasul cu legislația și îți oferă control complet, oriunde ai fi.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4" style={{ pointerEvents: 'auto' }}>
          <a
            href="tel:+40723926446"
            className="inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: '#c9a87c',
              color: '#000000',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4b896'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,124,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#c9a87c'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            SUNĂ ACUM PENTRU CONSULTANȚĂ GRATUITĂ
          </a>
          <Link
            to="/servicii"
            className="inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-3.5 border transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: '#c9a87c',
              color: '#c9a87c',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c9a87c'
              e.currentTarget.style.color = '#000000'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#c9a87c'
            }}
          >
            Descoperă serviciile
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce-gentle"
      >
        <div
          className="w-[1px] h-10"
          style={{ backgroundColor: 'rgba(201,168,124,0.5)' }}
        />
      </div>
    </section>
  )
}
