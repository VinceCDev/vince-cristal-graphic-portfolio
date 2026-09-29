import { profile, list } from '../data/content'
import { useReveal } from '../hooks'
import { MailIcon, PinIcon, FacebookIcon, LinkedInIcon, ArrowUpIcon } from './Icons'

const socialIcon = { Facebook: FacebookIcon, LinkedIn: LinkedInIcon }
const links = [
  ['Home', '#top'],
  ['About', '#about'],
  ['Work', '#work'],
  ['Contact', '#contact'],
]

export default function Footer() {
  const ref = useReveal()
  const h = 'text-sm font-semibold uppercase tracking-[0.14em] text-paper'
  return (
    <footer className="border-t border-line bg-ink-2">
      <div ref={ref} className="stagger mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <a href="#top" className="font-display text-2xl">
            {profile.name}
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-mute">
            {list(profile.roles)} creating clear, engaging visual communication.
          </p>
          <ul className="mt-5 flex gap-3" aria-label="Social links">
            {profile.socials.map((s) => {
              const Icon = socialIcon[s.label]
              return (
                <li key={s.href}>
                  <a
                    href={s.href} target="_blank" rel="noreferrer" aria-label={`${s.label} (opens in a new tab)`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-edge text-mute transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    {Icon && <Icon />}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className={h}>Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map(([label, href]) => (
              <li key={href}><a href={href} className="text-mute transition hover:text-accent">{label}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={h}>Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm text-mute">
            <li>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 transition hover:text-accent">
                <MailIcon width={18} height={18} className="shrink-0 text-accent" /> {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <PinIcon width={18} height={18} className="shrink-0 text-accent" /> {profile.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-sm text-mute sm:px-8">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <a href="#top" className="inline-flex items-center gap-2 transition hover:text-accent">
            Back to top <ArrowUpIcon width={16} height={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
