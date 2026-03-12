# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Actinium Pharmaceuticals corporate homepage — a single-page React app for a biotech company focused on Actinium-225 targeted radiotherapy. The site is a marketing/informational page, not a web application with user accounts or data.

## Commands

- **Dev server:** `npm start` (do not run automatically — tell the user)
- **Build:** `npm run build` (uses `CI=false` to avoid treating warnings as errors)
- **Tests:** `npm test`
- **Lint:** ESLint is configured via `.eslintrc.js` and runs automatically during `npm start`/`npm run build`

## Architecture

**Create React App** project (react-scripts 5.0.1) with **React 19** and **styled-components v6** for all styling (no CSS files).

### Routing

Currently single-page only. `src/routes/` exists with react-router-dom `Switch`/`Route` setup but is **not wired into the app** — `App.js` renders `<Welcome />` directly. If adding pages, connect the router in `App.js` first.

### Page Structure

`src/pages/Welcome/` is the sole page, composed of section components rendered in order:
`Nav → Hero → Pipeline → Mission → Technology → News → CtaBanner → Footer`

Each component is self-contained with its own styled-components defined in the same file (no separate styles files).

### Design System

All design tokens live in `src/assets/styles/variables/`:
- **`colors.js`** — full palette: backgrounds, brand (navy/blue), accents (teal/amber), text, borders, shadows
- **`metrics.js`** — layout constraints: `maxWidth` (1200px), `navHeight` (72px), responsive breakpoints (mobile: 480, tablet: 768, desktop: 1024, wide: 1280), border radii

Global reset and base typography are in `src/assets/styles/global.js` via `createGlobalStyle`.

**Fonts** (loaded via Google Fonts in `public/index.html`):
- **Instrument Serif** — headings (h1, display text)
- **Source Sans 3** — body text, UI

### Custom Hooks (`src/hooks/`)

- **`useReveal`** — IntersectionObserver-based scroll reveal; returns `[ref, isVisible]`; fires once
- **`useCountUp`** — animates a number from 0 to target with ease-out cubic; triggered by visibility
- **`useScrolled`** — tracks whether page has scrolled past a threshold (used for Nav background)

### Styling Conventions

- Styled-components use **transient props** (`$scrolled`, `$open`) to avoid DOM forwarding
- Responsive design uses `metrics.breakpoints` with `@media (max-width: ...)` patterns
- Animations use `keyframes` from styled-components
- Layout uses `max-width` + `margin: 0 auto` centering with `metrics.paddingHorizontal` for gutters
