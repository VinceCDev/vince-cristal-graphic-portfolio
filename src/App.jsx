import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import { collections } from './data/content'

export default function App() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Work onOpen={(set, index) => setOpen({ set, index })} />
        <Contact />
      </main>
      <Footer />
      <Lightbox
        items={open ? collections[open.set] : []}
        index={open ? open.index : null}
        onClose={() => setOpen(null)}
        onChange={(index) => setOpen({ ...open, index })}
      />
    </>
  )
}
