# Graphic Design Portfolio Build Prompt

Copy the prompt below into your coding assistant when you are ready to build the portfolio.

---

## Prompt

Act as a senior/principal-level frontend engineer and an experienced UI/UX designer. Build a complete, polished, responsive portfolio website that presents my graphic design work with clarity, confidence, and strong visual judgment.

### First, inspect the workspace

- Review the existing project files and preserve any established framework, conventions, or working setup.
- My graphic design assets are in `images/graphic_design/`. Inspect the available files and use the real artwork in the portfolio. Do not replace it with stock images, generated substitutes, or generic placeholders.
- Available artwork currently includes `2.png`, `DISTORTED PERSONALITY (POSTER).png`, `GLOBAL CITIZEN.png`, `Global City (1).png`, `Protect and conserve our Mother Nature as we show love and care for ourselves. We must communicate better and more effectively with one another to preserve and sustain our environment against the .png`, and `THE FIRST WEEK OF ECQ (1).png`. Verify the current filenames before referencing them; do not rename or modify the originals.
- If the workspace has no app scaffold, create a practical React app using Vite and configure Tailwind CSS. Keep the setup minimal and make sure the project can be run locally.

### Design direction

- Use a sophisticated dark color scheme with deliberate contrast, restrained accent colors, and clear text hierarchy. Avoid a generic template or a wall of identical cards.
- Place my brand image prominently in the hero section so it is visible in the first viewport; do not relegate it to a small logo in the navigation or a later section. Use the brand image asset I provide, preserve its proportions, and make its placement feel intentional alongside my name and positioning statement.
- Make the artwork the visual focus. Give each piece enough space and an appropriate image treatment so its composition, color, and details remain visible. Preserve image proportions; do not crop artwork in ways that hide meaningful content.
- Create a distinctive, editorial-feeling portfolio with thoughtful typography, considered spacing, and a cohesive visual system. The result should feel art-directed and professionally engineered, not like a default SaaS dashboard or a generic AI-generated portfolio.
- Build a clear first viewport with the designer’s name, a concise positioning statement, and an immediate view of selected work. Use editable placeholders for personal details that are not in the workspace.
- Include a project/work section that uses the supplied assets, with concise titles and descriptions only when they can be inferred responsibly. Where the intent or project context is unclear, use a neutral label or editable placeholder rather than inventing a client, brief, outcome, award, or biography.
- Include a short about section and a contact call to action. Keep unknown personal information, social links, and contact details as obvious editable placeholders; never fabricate them.

### Engineering and interaction requirements

- Use React and Tailwind CSS, following the existing project’s conventions if a scaffold is already present.
- Build reusable components where they make the implementation clearer, and keep content and asset references easy to update.
- Make the layout work cleanly on mobile, tablet, and desktop. Check that navigation, artwork, text, and controls do not overlap or overflow at narrow widths.
- Provide useful keyboard navigation, semantic HTML, visible focus states, descriptive image alt text, and accessible color contrast.
- Add restrained, purposeful transitions or reveals that respect `prefers-reduced-motion`. Do not let animation delay access to the work.
- Make every visible navigation item and call to action functional. Do not include dead links or controls that only look interactive.
- Optimize image loading appropriately without degrading the supplied artwork. Handle asset paths with the project’s actual build setup.
- Do not add unnecessary dependencies, unrelated features, fake testimonials, fabricated metrics, or filler copy.

### Finish and verify

- Implement the working site, not just a mockup or design description.
- Run the available build or validation commands and fix errors introduced by the implementation.
- Start the local development server and report the URL, plus any personal placeholders I need to replace.

Before coding, briefly state the visual direction you chose based on the actual artwork. Then implement the site and verify it in the browser if browser tools are available.

---