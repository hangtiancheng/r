# Resume Monorepo Rules

This document is the single authoritative rule source for the resume monorepo. All agents and contributors must follow these standards without exception.

## Project Overview

This repository is a pnpm workspace monorepo containing multiple independent versions of a personal resume application. Each version is a Vite, React 19, TypeScript package, and the root resume data file is the canonical content source.

Core stack requirements:

- Package manager: pnpm with workspace protocol.
- Framework: React 19.
- Language: TypeScript in strict mode.
- Build tool: Vite.
- Styling: Tailwind CSS.
- Runtime validation: Zod.
- Linting and formatting: ESLint flat config and the root Prettier configuration.

## Language Convention

English is required by default. All code, comments, commit messages, documentation, variable names, component names, file names, utility functions, type definitions, configuration keys, and general content text must use professional English.

Chinese is allowed only for literal, user-facing resume section headings rendered in resume templates or resume content. Examples include:

- 基本信息
- 教育经历
- 实习经历
- 职业经历
- 项目经历
- 证书
- 开发技能
- 科研经历
- 自我评价

Chinese text must not appear in source code identifiers, file or directory names, code comments, documentation, commit messages, or configuration keys. If it is unclear whether a string qualifies as a resume section heading, use English.

## TypeScript And Validation

Strict TypeScript is mandatory. Do not weaken strict compiler settings in any package.

Type safety requirements:

- All function parameters and return types must have explicit type annotations.
- Exported interfaces, types, functions, hooks, components, and utilities must have explicit public typing.
- Use schema-first design with Zod and derive TypeScript types through `z.infer<typeof schema>`.
- Validate every trust boundary with Zod, including imported JSON, form data, API responses, environment variables, and route parameters.
- Use `.parse()` for fail-fast validation at trust boundaries.
- Use `.safeParse()` only when graceful user-facing error handling is required.

Forbidden type escape hatches:

- Do not use `any`.
- Do not use `as` type assertions.
- Do not use `// @ts-ignore` or `// @ts-expect-error`.
- Do not use type-related `eslint-disable` comments.
- Do not use non-null assertions.
- Do not use `Object`, `Function`, or `{}` as types.

Preferred modeling patterns:

- Use `unknown` with type guards or Zod parsing for untrusted values.
- Use discriminated unions for variants.
- Use constrained generics instead of overload-heavy APIs.
- Use exhaustive checks for discriminated unions when appropriate.

## File And Directory Naming

All file and directory names must use strict kebab-case: lowercase words separated by hyphens.

Allowed examples:

- `resume-doc.ts`
- `education-section.tsx`
- `use-resume-data.ts`
- `pdf-export`

Forbidden examples:

- `ResumeDoc.ts`
- `resumeDoc.ts`
- `resume_doc.ts`
- `PDFExport`

Responsibility suffixes are prohibited when they duplicate the directory responsibility. A file inside `schema/` must not include `.schema` in its name. A file inside `utils/` must not include utility-role suffixes such as `.default`, `.factory`, `.format`, or `.storage`.

Required examples:

- Use `src/schema/resume-doc.ts`, not `src/schema/resume-doc.schema.ts`.
- Use focused utility names such as `resume-doc.ts`, `resume-doc-id.ts`, `resume-doc-date.ts`, `resume-doc-link.ts`, or `resume-doc-persistence.ts`, not `resume-doc.default.ts`, `resume-doc.factory.ts`, `resume-doc.format.ts`, or `resume-doc.storage.ts`.

Internal code identifiers should still follow standard TypeScript conventions: camelCase for variables and functions, PascalCase for types and components.

## Source Organization

Every package must organize source files by responsibility under `src/`.

Canonical directories:

- `components/` for reusable UI components.
- `hooks/` for custom React hooks.
- `pages/` for route-level page components when routing is used.
- `schema/` for Zod schemas and validation logic.
- `utils/` for pure utility and helper functions.
- `types/` for shared type definitions that are not derived from schemas.
- `constants/` for static constants and configuration maps.
- `services/` for external API calls and data-fetching logic.
- `assets/` for package-scoped static assets.
- `index.ts` for package entry-point exports.

Organization rules:

- Do not place source files directly in `src/`, except top-level entry files such as `main.tsx` and `index.ts`.
- Do not mix concerns across directories.
- Create only directories that the package actually uses.
- Each source directory should include an `index.ts` barrel file exporting its public API.
- Feature grouping inside a canonical directory is allowed when a domain has multiple related files.
- New top-level source directories are allowed only for a clear distinct responsibility and should be documented.

## File Size And Cohesion

Source files should target approximately 120 lines and must not exceed 150 lines.

Splitting requirements:

- Keep one clear responsibility per file.
- Extract child components from large components.
- Extract pure computations from complex hooks.
- Keep schemas separate from transformations.
- Move shared constants into `constants/`.
- Move shared domain types into `types/` only when they cannot be derived from Zod schemas.

Barrel files are exempt from the 120-line guideline but should remain concise and contain re-exports only.

## React Requirements

All React packages must use React 19-compatible patterns and dependencies.

Version requirements:

- `react` and `react-dom` should use `^19.2.6` or newer compatible versions.
- `antd` should use `^6.3.7` or newer compatible versions.
- `tailwindcss` should use `^4.3.0` or newer compatible versions.

React rules:

- Use React 19 APIs and patterns where appropriate.
- Do not use deprecated patterns such as `forwardRef`, legacy context, or `defaultProps` on function components.
- Pass `ref` as a normal prop instead of using `forwardRef`.
- Verify React 19 compatibility before adding or upgrading third-party dependencies.

## Routing

Route-level code splitting is mandatory.

Routing requirements:

- All route components must be loaded lazily.
- Use `React.lazy` with `Suspense`, router-native lazy route APIs, or an equivalent framework-supported lazy loading mechanism.
- Do not eagerly import route-level pages into the main application bundle.
- Keep shared layout components separate from route modules when doing so improves bundle boundaries.
- Provide a lightweight loading state for lazy routes.

## Icons And SVG

Do not hand-write SVG markup in source files.

Icon requirements:

- Use a professional, actively maintained icon library when icons are needed.
- Prefer widely adopted libraries with strong React and TypeScript support.
- Do not inline custom `<svg>` markup in components.
- Do not create manually authored SVG icon components.
- Static SVG assets are allowed only when they are externally supplied brand assets or product assets and are stored under `assets/`.

## Dependencies

Dependencies should stay current, actively maintained, and broadly adopted.

Dependency rules:

- Keep `package.json` dependencies as close to the latest stable compatible versions as practical.
- Before adding a dependency, verify that it is actively maintained and compatible with the project stack.
- Do not introduce an external npm package that has not received a release or meaningful maintenance activity within the last year.
- If an existing dependency appears unmaintained for more than one year, look for a more active and widely used community alternative.
- Prefer mature community packages over custom implementations when the problem is common and the dependency is healthy.
- Avoid unnecessary dependencies for simple logic that can be implemented clearly and safely in a few lines.
- Hoist shared dependencies to the workspace root where appropriate.
- Keep package-specific dependencies inside the package only when versions or usage are genuinely version-specific.

## Imports And Exports

Import conventions:

- Use configured path aliases such as `@/` for source imports.
- Prefer public barrel imports from directory `index.ts` files.
- Avoid deep imports into another feature's private implementation files.
- Keep import ordering compatible with the configured formatter and linter.

Export conventions:

- Export public APIs from directory-level barrels.
- Keep private implementation details unexported.
- Avoid default exports unless the surrounding package convention requires them.

## Commit And Formatting Standards

Commit messages must use Conventional Commits in professional English, such as `feat:`, `fix:`, `refactor:`, `test:`, or `chore:`.

Formatting requirements:

- Use the root Prettier configuration.
- Do not add package-specific formatting overrides.
- Do not disable lint rules without explicit project-level justification.
- Fix the underlying problem instead of suppressing type, lint, or validation errors.

## Enforcement Checklist

Before completing any code change, verify:

- All new and modified code uses professional English except allowed resume section headings.
- All touched files follow strict TypeScript and Zod validation rules.
- No forbidden type escape hatches were introduced.
- All file and directory names use strict kebab-case and avoid prohibited responsibility suffixes.
- No source file exceeds 150 lines.
- Source files remain in the correct responsibility directories.
- Route-level components are lazily loaded.
- No hand-written SVG markup was added.
- Dependencies are current, maintained, compatible, and justified.
- Formatting, linting, and relevant validation commands pass.
