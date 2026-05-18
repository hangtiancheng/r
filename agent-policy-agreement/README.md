# Agent Policy Agreement React Demo

This workspace demonstrates the policy agreement flow with `react`, `antd`, `tailwindcss`, `vite`, and `storybook`.

## Contents

- `src/policy-agreement/api.ts`: API wrappers for querying and updating agreement state
- `src/policy-agreement/use-agent-policy-agreement.ts`: React hook for agreement status management
- `src/policy-agreement/policy-agreement-modal.tsx`: Agreement modal implemented with utility classes only
- `src/policy-agreement/policy-agreement-blocked.tsx`: Restricted-state card shown after a decline
- `src/policy-agreement/policy-agreement.stories.tsx`: Storybook scenarios with deterministic mock responses

## Development

```bash
pnpm install --ignore-workspace --ignore-scripts
pnpm dev
pnpm storybook
```

## Verification

```bash
pnpm test
pnpm build
pnpm build:storybook
```
