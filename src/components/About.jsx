import { profile, asset } from '../data/content'
import { useReveal } from '../hooks'

// Web-sized copy of images/grad_pic/grad_pic.jpg (regenerate with `npm run images`).
const photo = asset('brand/grad_pic.webp')

export default function About() {
  const ref = useReveal()
  return (
    <section id="about" aria-labelledby="about-title" className="overflow-hidden border-y border-line bg-ink-2">
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <figure className="slide-l mx-auto w-full max-w-sm lg:mx-0">
          <img
            src={photo}
            alt="Vince Allen Cristal smiling in a black graduation gown with a gold sash and a university medal"
            width="1000" height="1502" loading="lazy"
            className="aspect-[2/3] w-full rounded-lg object-cover object-top ring-1 ring-edge"
          />
        </figure>
        <div className="slide-r">
          <p className="text-sm font-medium text-accent">About me</p>
          <h2 id="about-title" className="mt-2 font-display text-4xl font-light sm:text-5xl">Designing with clarity</h2>
          {profile.about.map((p) => (
            <p key={p} className="mt-6 max-w-xl text-base leading-relaxed text-paper/85 sm:text-lg">{p}</p>
          ))}
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Areas of work">
            {profile.skills.map((s) => (
              <li key={s} className="rounded-md border border-line px-3 py-1.5 text-sm text-mute">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
