# Vince Allen Cristal — Portfolio

Personal portfolio website of **Vince Allen Cristal**, a web designer, graphic designer and video editor. It showcases graphic design work and video edits in a filterable carousel with a full-size viewer.

Built with **React**, **Vite** and **Tailwind CSS v4**. No backend and no runtime dependencies beyond React.

## Features

- Hero with a typing effect, circular portrait and a rotating gradient ring
- About section with graduation photo and skills
- **Works carousel** with **Graphic Design** and **Video** tabs (3 cards per page on desktop, 2 on tablet, 1 on phones)
- Full-size viewer (native `<dialog>`) for artwork, with previous / next and keyboard arrows; videos play from YouTube
- Contact section and footer with email, location and social links
- Mobile sidebar menu opened from a hamburger button
- Scroll reveals, hover effects and a scroll-progress bar
- Favicon and header mark from the personal logo

## Accessibility

- Semantic landmarks, skip link and a labelled section for each block
- Visible focus states and full keyboard support (tabs, carousel, viewer, sidebar)
- Descriptive alt text on all artwork
- Color contrast checked against WCAG 2.2 AA (text and control borders)
- Animations are disabled when the visitor's device asks for reduced motion

## Getting started

Requires [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install     # first time only
npm run dev     # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run images` | Regenerate web-sized images in `public/` from the originals in `images/` |

## Editing content

Almost everything you would want to change lives in [`src/data/content.js`](src/data/content.js):

- **Profile:** name, roles (typing effect), statement, email, location, social links, About text and skills
- **Graphic design works:** title, type, description, alt text and display order (`order` list)
- **Videos:** add an entry with its YouTube video ID

### Adding a new graphic design piece

1. Put the original file in `images/graphic_design/`.
2. Add a `[filename prefix, 'slug']` line to the `map` in [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs).
3. Run `npm run images` — this creates `public/work/<slug>-sm.webp` and `<slug>-lg.webp`. The originals are never modified.
4. Add an entry (with the same `id` as the slug) to `works` in `content.js`.

## Project structure

```
images/            Original artwork, logo, portraits and video (source files)
public/            Web-ready assets served by the site (work/, brand/, favicon)
scripts/           optimize-images.mjs — builds the web-sized copies
src/
  components/      Header, Hero, About, Work, Contact, Footer, Lightbox, Typing, Icons
  data/content.js  All editable content
  hooks.js         Scroll-reveal and reduced-motion hooks
  index.css        Tailwind theme (colors, fonts) and animations
```

## Deployment

The site is fully static. Run `npm run build` and publish the `dist/` folder to any static host (GitHub Pages, Netlify, Vercel, etc.).

If it is served from a sub-path such as `https://username.github.io/repo-name/`, set `base: '/repo-name/'` in [`vite.config.js`](vite.config.js) and make sure asset paths respect it.

> The `images/video/` folder holds a very large source video and should not be committed to Git (GitHub rejects files over 100 MB). The site plays the video from YouTube instead.

## Credits

Designed and developed by Vince Allen Cristal. All artwork and video shown in the portfolio are the author's own work unless stated otherwise. © Vince Allen Cristal. All rights reserved.
