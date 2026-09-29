import { useEffect, useRef } from 'react'
import { profile, asset } from '../data/content'
import { MenuIcon, CloseIcon } from './Icons'

const links = [
  ['Home', '#top'],
  ['About', '#about'],
  ['Work', '#work'],
  ['Contact', '#contact'],
]

export default function Header() {
  const bar = useRef(null)
  const drawer = useRef(null)
  const toggle = useRef(null)

  // Decorative reading-progress bar (transform only, no layout work)
  useEffect(() => {
    let raf = 0
    const draw = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.current.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(draw) }
    draw()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [])

  // Close the sidebar if the window grows to the desktop layout
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const on = () => { if (mq.matches) drawer.current?.close() }
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const openMenu = () => { drawer.current.showModal(); toggle.current.setAttribute('aria-expanded', 'true') }
  const closeMenu = () => drawer.current.close()

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/85 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-display text-lg tracking-tight">
          <img src={asset('brand/logo-96.png')} alt="" width="32" height="32" className="h-8 w-8 rounded-md" />
          <span>Vince<span className="text-accent"> Cristal</span></span>
        </a>

        {/* Tablet / desktop */}
        <ul className="hidden items-center gap-8 text-sm sm:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="inline-block py-2 text-mute transition-colors hover:text-accent">{label}</a>
            </li>
          ))}
        </ul>

        {/* Phone: hamburger */}
        <button
          ref={toggle}
          type="button"
          onClick={openMenu}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-controls="mobile-menu"
          aria-expanded="false"
          className="grid h-11 w-11 place-items-center rounded-md border border-edge transition hover:border-accent hover:text-accent sm:hidden"
        >
          <MenuIcon />
        </button>
      </nav>

      {/* Sidebar (native <dialog>: focus trap, Esc to close, focus returns to the button) */}
      <dialog
        ref={drawer}
        id="mobile-menu"
        aria-label="Menu"
        onClose={() => toggle.current?.setAttribute('aria-expanded', 'false')}
        onClick={(e) => { if (e.target === e.currentTarget) closeMenu() }}
        className="drawer m-0 mr-auto h-full max-h-none w-[min(20rem,85vw)] max-w-none border-r border-edge bg-ink-2 p-0 text-paper"
      >
        <div className="flex h-full flex-col px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5 font-display text-lg">
              <img src={asset('brand/logo-96.png')} alt="" width="32" height="32" className="h-8 w-8 rounded-md" />
              Menu
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-md border border-edge transition hover:border-accent hover:text-accent"
            >
              <CloseIcon />
            </button>
          </div>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-4 font-display text-2xl transition-colors hover:text-accent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-auto text-sm text-mute">{profile.email}</p>
        </div>
      </dialog>

      <div aria-hidden="true" ref={bar} className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent" />
    </header>
  )
}
