import { profile } from '../data/content'
import { useReveal } from '../hooks'
import { MailIcon, PinIcon, FacebookIcon, LinkedInIcon } from './Icons'

const socialIcon = { Facebook: FacebookIcon, LinkedIn: LinkedInIcon }

function Row({ icon: Icon, label, value, href, external }) {
  const inner = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-ink">
        <Icon />
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-[0.14em] text-mute">{label}</span>
        <span className="block break-words text-paper">
          {value}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </span>
      </span>
    </>
  )
  const cls = 'group flex items-center gap-4 rounded-lg border border-line bg-ink-2 p-4 transition duration-300'
  return href ? (
    <a href={href} {...(external && { target: '_blank', rel: 'noreferrer' })} className={`${cls} hover:-translate-y-1 hover:border-accent`}>{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

export default function Contact() {
  const left = useReveal()
  const right = useReveal()
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div ref={left} className="stagger">
          <p className="text-sm font-medium text-accent">Contact</p>
          <h2 id="contact-title" className="mt-2 font-display text-4xl font-light leading-tight sm:text-5xl">
            Let’s work together
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-paper/85">
            Have a project in mind? Send me a message and I’ll get back to you.
          </p>
          <div>
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent('Design inquiry')}`}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-paper"
            >
              <MailIcon width={18} height={18} /> Send an email
            </a>
          </div>
        </div>

        <div ref={right} className="stagger grid gap-3 sm:grid-cols-2">
          <Row icon={MailIcon} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
          <Row icon={PinIcon} label="Location" value={profile.location} />
          {profile.socials.map((s) => (
            <Row key={s.href} icon={socialIcon[s.label] ?? MailIcon} label={s.label} value="View profile" href={s.href} external />
          ))}
        </div>
      </div>
    </section>
  )
}
