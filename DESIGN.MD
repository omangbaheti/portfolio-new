# Omang Baheti — Portfolio Design Aesthetic Guide

Retro Japanese arcade / fightstick poster style. Inspired by 80s-90s product packaging and street fighter game manuals. Theme hero name and identity: **Omang Baheti**.

## Color Palette

- Background: warm cream / off-white beige `#EFE3D0`
- Primary dark: near-black charcoal `#1C1B19`
- Accent orange: burnt orange `#D96E3A`
- Text neutral: cream on dark panels `#EFE3D0`

Keep palette to 3-4 colors max. No gradients, no shadows beyond flat drop shadows (`6px 6px 0`).

## Typography

- Headlines: bold condensed sans-serif (Anton), all caps, tight letter spacing
- Subheadings: thin sans-serif (Inter), wide letter spacing, small size, all caps (e.g. "LEVERLESS EDITION", "Software/XR Developer -- UX Researcher -- Game Designer")
- Body/label text: monospace or grotesque sans, small size, uppercase for labels (Space Mono)
- Price/callout text: bold sans, boxed or set inside a starburst/shape

> Note: Japanese katakana/kanji pairing is **removed** from the current implementation. No Asian-script type faces are loaded.

## Layout Structure

### Hero section (topic)
- **Title block** (top of page, horizontally centered, outside/above the dark panels): the name **"OMANG BAHETI" is set top-center in near-black charcoal font on the cream background**, with the subheading line beneath it in the "LEVERLESS EDITION" style.
- Two-panel icon row beneath the title: dark boxed panels containing simple line-icon diagrams (directional inputs cross / prohibition symbols)
- Large hero panel (dark background) containing the main product illustration (isometric fightstick deck line art). The hero text column retains the "LEVERLESS EDITION" eyebrow and tagline but **no longer contains the name** — the name lives in the top-center title block only.
- Callout tag: small starburst flag shape in accent orange, top-right of hero panel, containing key stat ("EST 2024+")
- Footer row: brand logos/marks in a horizontal strip, left-aligned primary logo ("OMANG BAHETI STUDIO"), right-aligned small identifier tag

### Standard section headers
Each content section (Work / Publications / Posts / About / Contact) uses a two-part header: a small subheading (eyebrow style) + large condensed display title. No paired secondary script line.

## Iconography & Illustration

- Line-art illustration style, monochrome (cream lines on dark panel)
- Isometric/technical product rendering with minimal shading, halftone texture used sparingly for emphasis (small dot pattern bursts near edges)
- Simple pictograms for UI/controls (arrows, buttons, prohibition slashes)
- Small corner watermark/handle text (e.g. "@_HANDLE") in tiny caps near illustration

## Panels & Framing

- Rectangular panels with **rounded corners** (default `14px` radius, larger panels `16px`; see the rounded-corner utility in `src/app.css`)
- High contrast: dark panel on light page background
- Thin hairline borders or none; rely on solid fill contrast for separation
- Consistent margin/gutter spacing between panels

## Texture & Effects

- Grain/halftone texture overlay on dark panels for print aesthetic
- Flat design overall, no soft shadows or gradients
- Occasional small motion/impact lines near illustration (comic-style accents)

## Brand Marks

- Multiple small logo lockups in footer, monochrome, simple geometric marks
- Consistent small badge/stamp element (square mark with initials **OB**) as a signature mark, shown in the header top-left and footer