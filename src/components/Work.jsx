import { useEffect, useRef, useState } from 'react'
import { collections, categories, src, ytThumb } from '../data/content'
import { useReveal } from '../hooks'
import { ArrowLeftIcon, ArrowRightIcon, ExpandIcon, PlayIcon } from './Icons'

function Card({ work, index, set, onOpen }) {
  const ref = useReveal()
  const video = work.kind === 'video'
  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${(index % 3) * 0.12}s` }}
      className="reveal w-full shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
    >
      <button
        type="button"
        onClick={() => onOpen(set, index)}
        aria-label={`${video ? 'Play' : 'View'} ${work.title}${video ? '' : ' full size'}`}
        className="group block w-full text-left"
      >
        <span className={`relative flex ${video ? 'aspect-video' : 'aspect-[4/5]'} items-center justify-center overflow-hidden rounded-lg bg-ink-2 ${video ? '' : 'p-3'} ring-1 ring-line transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_40px_-18px_rgba(111,224,204,.45)] group-hover:ring-accent group-focus-visible:ring-accent`}>
          {video ? (
            <img
              src={ytThumb(work.youtube)} alt="" loading="lazy" decoding="async"
              onError={(e) => { if (!e.target.dataset.fb) { e.target.dataset.fb = '1'; e.target.src = ytThumb(work.youtube, 'hqdefault') } }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <img
              src={src(work.id)} alt={work.alt} width={work.w} height={work.h}
              loading={index < 3 ? 'eager' : 'lazy'} decoding="async"
              className="max-h-full max-w-full rounded-sm object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            />
          )}
          {video ? (
            <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-ink/30">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-ink shadow-lg transition group-hover:scale-110">
                <PlayIcon width={24} height={24} className="translate-x-0.5" />
              </span>
            </span>
          ) : (
            <span aria-hidden="true" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/85 text-paper opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              <ExpandIcon width={16} height={16} />
            </span>
          )}
        </span>
        <span className="mt-4 block text-xs uppercase tracking-[0.16em] text-accent">{work.type}</span>
        <span className="mt-1 block font-display text-lg leading-snug transition-colors group-hover:text-accent">{work.title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-mute">{work.note}</span>
      </button>
    </li>
  )
}

export default function Work({ onOpen }) {
  const track = useRef(null)
  const head = useReveal()
  const [set, setSet] = useState('graphic')
  const [edge, setEdge] = useState({ start: true, end: false })
  const items = collections[set]

  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Scroll one "page" (3 cards on desktop, 2 on tablet, 1 on phones) at a time.
  const scroll = (dir) => {
    const el = track.current
    const card = el.querySelector('li')
    const gap = 24
    const perPage = Math.max(1, Math.round((el.clientWidth - 8 + gap) / (card.offsetWidth + gap)))
    el.scrollBy({ left: dir * perPage * (card.offsetWidth + gap), behavior: reduced() ? 'auto' : 'smooth' })
  }

  const update = () => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }
  useEffect(() => {
    track.current.scrollTo({ left: 0, behavior: 'auto' })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [set])

  // Accessible tabs: arrow keys move between tabs (roving tabindex)
  const onTabKey = (e) => {
    const i = categories.findIndex((c) => c.key === set)
    const next = e.key === 'ArrowRight' ? (i + 1) % categories.length
      : e.key === 'ArrowLeft' ? (i - 1 + categories.length) % categories.length
      : e.key === 'Home' ? 0 : e.key === 'End' ? categories.length - 1 : null
    if (next === null) return
    e.preventDefault()
    setSet(categories[next].key)
    document.getElementById(`tab-${categories[next].key}`).focus()
  }

  const nav = 'grid h-11 w-11 place-items-center rounded-full border border-edge transition hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-40'

  return (
    <section id="work" aria-labelledby="work-title" className="py-20">
      <div ref={head} className="stagger mx-auto mb-10 flex max-w-6xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <div>
          <p className="text-sm font-medium text-accent">Portfolio</p>
          <h2 id="work-title" className="mt-2 font-display text-4xl font-light sm:text-5xl">Selected work</h2>
          <p className="mt-2 text-sm text-mute">
            {set === 'video' ? 'Click a video to play it.' : 'Click any piece to view it full size.'}
          </p>
        </div>
        <div className="hidden gap-3 sm:flex">
          <button type="button" onClick={() => scroll(-1)} disabled={edge.start} aria-label="Previous works" className={nav}><ArrowLeftIcon /></button>
          <button type="button" onClick={() => scroll(1)} disabled={edge.end} aria-label="Next works" className={nav}><ArrowRightIcon /></button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div role="tablist" aria-label="Work category" onKeyDown={onTabKey} className="mb-8 inline-flex rounded-lg border border-edge p-1">
          {categories.map((c) => {
            const active = c.key === set
            return (
              <button
                key={c.key}
                id={`tab-${c.key}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="work-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setSet(c.key)}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition sm:px-6 ${active ? 'bg-accent text-ink' : 'text-mute hover:text-accent'}`}
              >
                {c.label}
                <span className={`ml-2 text-xs font-normal ${active ? 'text-ink/80' : 'text-mute'}`}>{collections[c.key].length}</span>
              </button>
            )
          })}
        </div>

        <div id="work-panel" role="tabpanel" aria-labelledby={`tab-${set}`}>
          <ul
            ref={track}
            onScroll={update}
            role="list"
            aria-label={`${categories.find((c) => c.key === set).label} carousel`}
            className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-4"
          >
            {items.map((w, i) => <Card key={`${set}-${w.id}`} work={w} index={i} set={set} onOpen={onOpen} />)}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-3 sm:hidden">
        <button type="button" onClick={() => scroll(-1)} disabled={edge.start} aria-label="Previous works" className={nav}><ArrowLeftIcon /></button>
        <button type="button" onClick={() => scroll(1)} disabled={edge.end} aria-label="Next works" className={nav}><ArrowRightIcon /></button>
      </div>
    </section>
  )
}
