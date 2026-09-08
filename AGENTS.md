<!-- intent-skills:start -->

Swifty&Lark Intents - before editing files, run the matching guidance command.

swifty&larkIntents

- id: "@lark.js/mvc#lark-mvc"
- run: "npx @tanstack/intent load @lark.js/mvc#lark-mvc"
- for: "Authoritative reference for @lark.js/mvc (v0.0.32+, signals-only,
  react-router-aligned, factory router), the functional-first TypeScript
  frontend framework located at packages/lark-mvc — plain function
  components ((props) => JSX, body re-runs per render, hostless instances
  with NO wrapper elements), call-order-indexed hooks with NO deps arrays
  (useSignal, useRef, useComputed, useSignalEffect, useEffect is MOUNT-ONLY,
  onCleanup, useBlocker, useUrlState with stable setter), signals reactivity
  via @preact/signals-core (one render effect per instance, shallow
  reference comparison, NO event emitters, NO error-swallowing wrappers —
  errors bubble), per-key reactive props with plain callback props and
  props.children, React-DOM-style render(vnode, container) / unmount, direct
  VNode → DOM reconciliation (keyed diff, comment end-anchors), a
  FACTORY-based history-only router aligned with react-router's data model
  (createRouter(routes, {basename}) — no module singleton,
  location/match/params/searchParams signals, ranked "/users/:id" and "*"
  matching, navigate(to, {replace, state}), async block()/useBlocker,
  <RouterView/> outlet with per-route lazy() dedup, useRouter() active
  instance), anonymous zustand-aligned createStore(creator) with
  auto-tracked computed and selector subscribe, and Vite/Webpack
  plugins with auto-injected state-preserving component HMR
  (hotSwapByComponent, registered once at the index entry). Use this skill
  whenever the user reads, writes, debugs, reviews, or extends code that
  imports from "@lark.js/mvc" (or any sub-path like /vite, /webpack,
  /jsx-runtime, /client), works under packages/lark-mvc or
  packages/lark-storybook, or mentions any of these symbols and concepts —
  render, unmount, FC, useSignal, useComputed, useSignalEffect, useEffect,
  onCleanup, createRouter, RouterView, useRouter, useBlocker, useUrlState,
  matchRoutes, RouteObject, createStore, raw, larkMvcPlugin, LarkMvcPlugin,
  hotSwapByComponent, or "why doesn't my component re-render". Even if the
  user just says "add a page/view/component to the Lark app", consult this
  skill first."
- id: "@swifty.js/anti-copy#swifty-anti-copy"
- run: "npx @tanstack/intent load @swifty.js/anti-copy#swifty-anti-copy"
- for: 'Authoritative reference for @swifty.js/anti-copy (packages/anti-copy, MIT), a framework-agnostic browser copy/print/DevTools protection SDK plus per-framework docs-site integrations, shipped as an ESM+CJS dual build with four subpath entries — . (core), ./vitepress, ./swifty-docs, ./lark-docs. Use this skill whenever the user reads, writes, debugs, reviews, or extends code under packages/anti-copy/src/**, imports from @swifty.js/anti-copy or any subpath, or works with copy-protection concepts. Trigger eagerly on these symbols and tokens — createAntiCopy, AntiCopyInstance, AntiCopyOptions, AntiCopyMode, DevtoolsOptions, ViolationEvent, ViolationType, DEFAULT_REPLACE_TEXT, isBrowser, applyAntiCopy (VitePress + lark-docs), the renderless AntiCopy React component (swifty-docs), AntiCopyHandle, SwiftyDocsAntiCopyProps, LarkDocsAntiCopyOptions, isPathExcluded, excludePaths, excludeSelectors, VITEPRESS_DEFAULT_EXCLUDES, SWIFTY_DOCS_DEFAULT_EXCLUDES, LARK_DOCS_DEFAULT_EXCLUDES, options mode/replaceText/copy/keyboard/contextmenu/selectStyle/print/devtools/onViolation/target, mode: "block"/"replace", devtools intervalMs/threshold/freeze/redirectUrl, violation types copy/cut/drag/selection/keyboard/contextmenu/print/devtools'

- id: "@swifty.js/lit-jsx#swifty-lit-jsx"
- run: "npx @tanstack/intent load @swifty.js/lit-jsx#swifty-lit-jsx"
- for: "Authoritative reference for @swifty.js/lit-jsx (lit-jsx/ in this repo), a
  JSX runtime for Lit (lit@3.x only — no older-Lit compatibility). Write
  Lit/web-component applications with React-style JSX instead of html``
  string templates. Covers the automatic JSX runtime (jsx/jsxs/jsxDEV,
  Fragment/<>), createElement's JSX-prop → Lit-expression semantics (onXxx →
  @event listeners on primitives, class/className → .className property,
  style → styleMap, ref → lit ref directive, hyphenated props → attributes,
  booleans → ?boolean-attribute plus property, everything else → property
  assignment even when undefined, key stripped, false/null/undefined children
  skipped), createRoot/Root (render/unmount/duplicate-container warning),
  the element registry (assignElements/resetElements tag overrides accepting
  plain strings or Lit StaticValues, default div fallback), the local
  customElement decorator that registers tag names for class-component JSX,
  re-exported Lit decorators (property, state, query, queryAll, queryAsync,
  queryAssignedElements, queryAssignedNodes, eventOptions), the spread
  directive, the full JSX→DOM event-name map, and the JSX type layer
  (JSX.IntrinsicElements over HTMLElementTagNameMap). Testing setup:
  vitest + jsdom (tests/). Trigger tokens: @swifty.js/lit-jsx, lit-jsx,
  jsxImportSource "@swifty.js/lit-jsx", jsx-runtime, createRoot,
  assignElements, resetElements, customElementRegistry, jsx",
  Fragment, swifty-lit-jsx. Use whenever a file in this repo uses JSX with
  LitElement/web components, configures jsxImportSource, or when the user
  mentions lit-jsx, JSX props not applying, onXxx handlers not firing on
  custom elements, tag overrides, or lit-jsx tests."

<!-- intent-skills:end -->
