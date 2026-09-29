import { useEffect, useRef } from 'react'
import { src, ytEmbed, ytWatch } from '../data/content'

// Native <dialog>: focus trap, Esc to close and focus return come for free.
// Handles both images and videos; `items` is the active collection.
export default function Lightbox({ items, index, onClose, onChange }) {
  const ref = useRef(null)
  const open = index !== null
  const n = items.length

  useEffect(() => {
    const d = ref.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % n)
      if (e.key === 'ArrowLeft') onChange((index - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, n, onChange])

  const w = open ? items[index] : null
  const btn = 'rounded-full border border-edge bg-ink/80 px-4 py-2 text-sm transition hover:border-accent hover:text-accent'
  const backdropClose = (e) => { if (e.target === e.currentTarget) onClose() }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={w ? `${w.title}, ${w.kind === 'video' ? 'video player' : 'full size'}` : 'Viewer'}
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent text-paper"
    >
      {w && (
        <div className="flex h-full flex-col items-center gap-4 p-4 sm:p-8" onClick={backdropClose}>
          <div className="flex w-full max-w-6xl items-center justify-between gap-4">
            <p className="text-sm"><span className="font-display text-lg">{w.title}</span> <span className="text-mute">· {w.type}</span></p>
            <div className="flex items-center gap-3">
              {w.kind === 'video' && (
                <a href={ytWatch(w.youtube)} target="_blank" rel="noreferrer" className={btn}>
                  Watch on YouTube<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              <button type="button" onClick={onClose} className={btn}>Close</button>
            </div>
          </div>
          <div className="flex min-h-0 w-full flex-1 items-center justify-center" onClick={backdropClose}>
            {w.kind === 'video' ? (
              <div
                key={w.id}
                className="viewer-img aspect-video w-full overflow-hidden rounded-md bg-black"
                style={{ maxWidth: 'min(72rem, calc((100vh - 11rem) * 16 / 9))' }}
              >
                <iframe
                  src={ytEmbed(w.youtube)}
                  title={w.alt}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <img key={w.id} src={src(w.id, 'lg')} alt={w.alt} className="viewer-img max-h-full max-w-full object-contain" />
            )}
          </div>
          {n > 1 && (
            <div className="flex items-center gap-3">
              <button type="button" className={btn} onClick={() => onChange((index - 1 + n) % n)}>← Previous</button>
              <span className="text-sm text-mute" aria-live="polite">{index + 1} / {n}</span>
              <button type="button" className={btn} onClick={() => onChange((index + 1) % n)}>Next →</button>
            </div>
          )}
        </div>
      )}
    </dialog>
  )
}
