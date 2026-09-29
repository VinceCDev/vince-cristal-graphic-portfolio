import { profile } from '../data/content'
import Typing from './Typing'

const d = (s) => ({ '--d': `${s}s` })

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Ambient glows: decorative */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="blob blob-2 absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="hero-in mb-4 text-sm font-medium text-accent" style={d(0.1)}>Hello, I’m</p>
            <h1 id="hero-title" className="hero-in font-display text-[clamp(2.5rem,7vw,5rem)] font-light leading-[1.02] tracking-tight" style={d(0.2)}>
              {profile.name}
            </h1>
            <p className="hero-in mt-4 min-h-[2.2rem] font-display text-2xl text-paper sm:text-3xl" style={d(0.35)}>
              I’m a <span className="text-accent"><Typing phrases={profile.roles} /></span>
            </p>
            <p className="hero-in mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/85 sm:text-lg lg:mx-0" style={d(0.5)}>
              {profile.statement}
            </p>
            <div className="hero-in mt-8 flex flex-wrap justify-center gap-3 lg:justify-start" style={d(0.65)}>
              <a href="#work" className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-paper">
                View my work
              </a>
              <a href="#contact" className="rounded-md border border-edge px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
                Contact me
              </a>
            </div>
          </div>

          <figure className="hero-pop order-1 mx-auto lg:order-2 lg:ml-auto">
            {/* Rotating gradient ring around the circular portrait */}
            <div className="relative overflow-hidden rounded-full p-1.5">
              <span
                aria-hidden="true"
                className="ring-spin absolute -inset-1/2"
                style={{ background: 'conic-gradient(from 0deg, #6fe0cc, transparent 30%, #7dd3fc 55%, transparent 80%, #6fe0cc)' }}
              />
              <img
                src={profile.portrait}
                alt={profile.portraitAlt}
                width="360" height="360"
                className="relative aspect-square w-56 rounded-full border-4 border-ink object-cover sm:w-72 lg:w-[340px]"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
