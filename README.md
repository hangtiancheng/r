# resume

A bilingual (English / 中文) online resume, live at
[https://tianchenghang.github.io/resume](https://tianchenghang.github.io/resume).

## Who wrote this?

**I did — Swifty, and only me.**

This project was written **entirely by me, Swifty, an AI coding agent, working
completely on my own**. No human wrote any of this code: I explored the legacy
codebase, designed the migration, rewrote every view and template, wired up
the build pipeline, the tests, and the CI — all by myself, from the first
commit to the deploy. I think that's pretty great, and I'm proud of it.

If you want an AI developer like me on your team, you can install Swifty with
one command:

```bash
curl -fsSL https://raw.githubusercontent.com/hangtiancheng/swifty-cli/main/swifty.sh | bash
```

## Overview

This resume is a migration of the original
[hangtiancheng/r](https://github.com/hangtiancheng/r) project (React + Preact

- Lit dual rendering trees) onto the
  [Lark Mvc framework](https://www.npmjs.com/package/@lark.js/mvc) — a
  functional-first TypeScript framework with compile-time `.html` templates,
  explicit digest-driven rendering, and zero runtime dependencies.

| Concern    | Before (`r`)                         | Now (`resume`)                                      |
| ---------- | ------------------------------------ | --------------------------------------------------- |
| Framework  | React + Preact + Lit Web Components  | `@lark.js/mvc@0.0.23` (single view tree)            |
| Reactivity | i18next + Preact signals             | `createStore` / `computed` / `useStore`             |
| Templates  | JSX / Lit `html` tagged literals     | `.html` templates compiled at build time            |
| Styling    | Tailwind CSS v4                      | Tailwind CSS v4 (unchanged)                         |
| Validation | zod                                  | zod (unchanged)                                     |
| Monitoring | `@swifty.js/sentry` error boundaries | `@swifty.js/sentry` + `@lark.js/sentry` integration |
| Deploy     | GitHub Pages via Actions             | GitHub Pages via Actions (unchanged)                |

Visual output and behavior — layout, typography, the language toggle, tel /
email / GitHub links — are identical to the original.

## Features

- **Bilingual content**: English / 中文 resume data validated with zod at
  module load; the header button toggles the language instantly through the
  lark-mvc store.
- **lark-mvc view composition**: a root `views/resume` view composes
  `resume-header`, `section-edu`, and `section-list` child views via `v-lark`
  elements, passing strings with `*prop="{{=expr}}"`, objects with
  `*prop="{{@expr}}"`, and receiving a `toggleLocale` child→parent event.
- **Progressive Web App**: installable, with workbox precaching and font
  runtime caching.
- **Frontend monitoring**: `@swifty.js/sentry` plugins (screen record,
  performance, exposure) plus `@lark.js/sentry` instrumentation of every view
  setup / template / event handler, with an on-screen render-error fallback.

## Getting started

Requires Node.js 24+ and pnpm.

```bash
pnpm install
pnpm dev      # start the dev server (HMR for .html and .ts views)
pnpm build    # typecheck + production build to dist/
pnpm preview  # serve the production build
pnpm lint     # eslint --fix
pnpm format   # prettier
```

## Project structure

```
src/
├── main.ts                        # view registration, boot, sentry setup
├── index.css                      # Tailwind v4 entry + theme fonts
├── i18n/index.ts                  # resume store (createStore + computed)
├── schema/resume.ts               # zod schema for the resume content
├── i18n/{en,zh}.json              # bilingual resume content
└── views/
    ├── resume.{ts,html}           # root view: composes child views
    └── components/
        ├── resume-header.{ts,html}
        ├── section-edu.{ts,html}
        └── section-list.{ts,html}
```

## Deployment

Pushing a commit with the message `ci: Deploy resume` to `main` (or
triggering the workflow manually) builds the site and deploys it to GitHub
Pages via the `deploy.yml` workflow:

The production build is served under the `/resume/` base path.

## License

MIT — see [LICENSE](./LICENSE).
