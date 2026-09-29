import { useEffect, useState } from 'react'
import { useMotionAllowed } from '../hooks'
import { list } from '../data/content'

// Types and deletes each phrase in turn. When the device asks for reduced motion, shows all phrases statically.
export default function Typing({ phrases }) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const animate = useMotionAllowed()

  useEffect(() => {
    if (!animate) return
    const full = phrases[i]
    let delay = deleting ? 45 : 85
    if (!deleting && text === full) delay = 1600
    if (deleting && text === '') delay = 350
    const t = setTimeout(() => {
      if (!deleting && text === full) return setDeleting(true)
      if (deleting && text === '') { setDeleting(false); return setI((i + 1) % phrases.length) }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, i, phrases, animate])

  if (!animate) return <span>{list(phrases)}</span>

  return (
    <>
      <span className="sr-only">{list(phrases)}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block w-[2px] bg-accent align-middle" style={{ height: '1em' }} />
      </span>
    </>
  )
}
