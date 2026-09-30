# Tiancheng Hang

Phone: 15395377789 | Email: 161043261@qq.com | GitHub: hangtiancheng

Male, 24, Master's degree, AI Agent Engineer

## Education

- Bachelor's: 2019-2023 · Xidian University · Microelectronic Science and Engineering
- Master's: 2024-2027 · Nanjing University of Posts and Telecommunications · Computer Technology

## Development Skills

- Familiar with Agent development: SSE streaming output, ReAct and Agent Loop, System Prompt, tool calling, permissions, session persistence, context compression, instruction files, Auto-Dream automatic memory, MCP, Slash Commands, Skills, Hooks, Worktrees, Subagents, Agent Teams
- Proficient in CSS, CSS preprocessors, modularization, atomic CSS, PostCSS, CSS-in-JS
- Proficient in JS/TS/Go
- Proficient in data structures and computer networks
- Proficient in Node.js and Express/Koa; experienced in BFF layer and Node.js/Go backend development
- Proficient in Go, MySQL, Redis; familiar with ClickHouse
- Proficient in JSX/TSX, React, Zustand, React-Router; familiar with React Fiber architecture; proficient in React performance optimization hooks, virtual scrolling, SWR
- Proficient in Vite; familiar with Webpack
- Familiar with SSR, Next.js, open-graph, sitemap.xml, robots.txt, llms.txt
- Familiar with web performance optimization, frontend monitoring and event tracking
- Proficient in Vue3, Pinia, Vue-Router; familiar with Vue3 reactivity principles

## Work Experience

### ByteDance

Jun 2025 ~ Sep 2025, Product R&D and Engineering Architecture, TikTok Performance team; performance data collected by Perfetto is forwarded via Kafka to Hive, ClickHouse, MySQL, Redis; backend built with Golang and Kitex, BFF layer cleans the data, frontend renders the visualization; the BFF layer calls RPC methods provided by the backend and exposes HTTP APIs to the frontend; used performance optimization hooks and built virtual scrolling lists; fixed open-source coze-dev/coze-js: TypeError caused by missing User-Agent in Android environments (pull/257)

### Tencent

Oct 2025 ~ Feb 2026, IEG Interactive Entertainment Group, Infrastructure Technology Product Department; responsible for the Tencent TcaplusDB NoSQL database management console; on the frontend, migrated React class components to function components, used performance optimization hooks to avoid duplicate requests, optimized rendering performance, and diagnosed data races caused by unstable API response times; on the backend, used a general-purpose pool to pool multiple scenarios simultaneously: TCP connection pool for NoSQL database connections; ffi-napi calls C++ .so dynamic libraries for encryption/decryption, and a process pool for parsing table files; used Valgrind to diagnose memory leaks when ffi-napi calls .so dynamic libraries, leveraged V8 hidden classes and maintained object pools to reduce GC pressure on the Node.js side

### ByteDance

Feb 2026 ~ May 2026, Data-Architecture Department; development of the search & recommendation algorithm platform and the Douyin Debug platform; for the search & recommendation algorithm platform: the frontend Slardar monitoring SDK reports JSErrors carrying error details to restore the fault scene; built the project's Harness engineering, feeding error information to an LLM for automated fixes and MR submission, automatically triggering E2E tests; the vector library module integrates SWR for frontend performance optimization to improve the page instant-open rate; for the Douyin Debug platform: migrated capabilities from the legacy platform, supporting long video/livestream room IDs, calling downstream RPC methods for slicing and tagging to generate clustering labels, with Redis caching

### Alibaba

To reduce operating costs for Taobao merchants, built a Merchant Agent on top of LangChain/LangGraph/LangFuse; the architecture combines a deterministic workflow with a merchant operations hosting Agent, supporting coreference resolution, query expansion, intent recognition and routing, dual-path recall via RAG + BM25 hybrid retrieval, tool calling, context compression, and continuous iteration via a data flywheel; already deployed on the Taobao merchant side

- To increase user penetration of the merchant operations hosting Agent, owned the integration of A2UI capabilities, improving the generation speed and accuracy of the LLM's A2UI JSON in certain scenarios, with server-side failure retry and client-side failure fallback
- Participated in building the deterministic workflow, LLM hallucination mitigation, and the confidence gate before RAG + BM25 hybrid retrieval; measured false-admission rate of 0% and false-blocking rate of 17%
- Participated in building the data flywheel for continuous iteration, improving system availability
- Participated in frontend Webpack/Vite Module Federation integration; fixed open-source module-federation/vite: crash when workspace packages provide both CJS/ESM entries via exports (pull/860)
- Built an AI chat full-stack website builder platform, with backend hot deployment via edge functions

## Project Experience

### CLI Coding Agent

Repository: [hangtiancheng/yukino-code](https://github.com/hangtiancheng/yukino-code)

- 5-layer architecture, supporting multiple LLM protocols (OpenAI Chat Completions/OpenAI Response/Anthropic Messages), multiple LLM providers, and switching providers within a session
- Supports Slash Commands, Skills, Hooks
- Supports lazy loading of MCP tools and reconciliation on MCP reload
- Through dynamic instruction injection and other means, maximizes prompt cache prefix hits; measured cache hit rate >90% (varies by scenario)
- Permission system: permission modes, permission rule configuration files, path sandbox, OS-level sandbox, Human-in-the-Loop
- Two-tier context compression; Goal mode for long-running loops implemented on top of automatic context compression and subagents
- Supports Auto-Dream automatic memory extraction and periodic memory consolidation
- Supports worktree file isolation
- Supports predefined (Definition-based) and forked (Fork-based) subagents; subagents run synchronously in the foreground or asynchronously in the background
- Supports Agent Teams, with the main agent orchestrating and teammates communicating and collaborating via file mailboxes and point-to-point/broadcast messaging
- Supports multimodal messages (e.g. images); for images, supports binary format sniffing and sharp compression
- Automated evaluation using the SWE-bench-Live dataset; continuously optimizing prompts, descriptions, etc. through real-world usage and automated evaluation

### Frontend Monitoring / Event Tracking

Repository: [hangtiancheng/yukino-sentry](https://github.com/hangtiancheng/yukino-sentry)

A framework-agnostic frontend monitoring SDK with publish-subscribe architecture; core module (event bus, lifecycle, data reporting) decoupled from plugin submodules (performance collection, screen recording); supports error capture, blank screen detection, performance metrics collection, and fault scene replay; error capture covers: resource loading errors, JSErrors, uncaught Promise errors, XHR and fetch request errors, with error deduplication and LRU queue support; supports declarative attribute-based click event tracing, hashchange and history navigation listening; blank screen detection via keypoint sampling; performance collection plugin computes metrics such as LCP/FCP/CLS/INP/TTFB, uses MutationObserver + rAF to calculate FSP first-screen render time and detect longtasks; screen recording with rrweb + gzip for fault scene replay; data reporting uses 3-tier fallback: navigator.sendBeacon -> Image beacon (optional) -> fetch keepalive; offline storage via localStorage with automatic flush of the reporting queue on network recovery; provides React16+/Vue3+ framework integrations

## Research Experience

- Research focus: computer network congestion control, multi-core parallelized network simulation
- Patent: Heuristic network congestion control method and system based on multi-signal fusion
