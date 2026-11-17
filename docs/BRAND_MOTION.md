# CIAOMIND green and white identity

Implemented from the user's visual direction on 2026-11-17.

- One lockup: left curved four-point symbol; CIAO above MIND on the right.
- Deep green `#1C4036` and white `#FFFFFF`.
- Text is outlined Nimbus Roman Regular geometry, so every language and device uses identical letterforms without downloading a font.
- Initial state: green outside, white inside.
- Scroll down: the white center expands through the symbol. The header turns green and the lettering turns white.
- Scroll up: a green center grows inside the white outer symbol. This reversed state remains when returning to the top.
- On entry, the symbol appears first, shifts left, and the two word rows form the complete mark. The opening lasts under two seconds; pointer, touch, wheel or keyboard input dismisses it immediately. It never captures input or locks scrolling.
- Reduced-motion preferences skip the opening and remove interpolated transitions.

`BrandLogo` is shared by the header, footer and opening animation. The root locale layout covers zh, it, en, fr, de, es, pt and ja, including inner pages. Both header and footer marks link to the current language's homepage.

Reusable vector, transparent PNG and two-state preview files are in `public/brand/`. The shared shape constants are in `lib/brand-paths.ts`. The old social image remains separate from this animated website lockup.

Validation: production build and TypeScript completed successfully. Initial CSS custom-property defaults are present before hydration. Verify live scroll direction, mobile navigation and the language-preserving logo links before marking publication complete.
