# Catphy — Claude Code Instructions

## Architecture

Simplified Feature-Sliced Design (FSD). Import direction: `app → pages → entities → shared`. Never import upward or sideways between layers.

Each slice exposes its public API through `index.ts` only. Do not import from internal subfolders (`api/`, `model/`, `ui/`) from outside the slice.

## Layer Rules

- `shared/` — zero domain knowledge. Generic utilities, types, UI primitives only.
- `entities/` — domain logic (cat, breed). Repos, query factories, reused UI (CatCard, CatGrid).
- `pages/` — page assemblies. Page-specific components (BreedCard, BreedSelect) live here.
- `app/` — routing, providers, guards only. No business logic.

## Code Style

- TypeScript strict mode. No `any`. No enums — use `const` objects + `typeof` types.
- CSS Modules for all component styles. Use `clsx` for conditional classes.
- Design tokens only in components — use `var(--color-*)`, `var(--spacing-*)`, `var(--duration-*)` etc. Never hardcode colour or spacing values.
- Animation durations/easings from tokens: `var(--duration-base)`, `var(--ease-spring)`.
- All env vars via `src/shared/config/env.ts`. Never `import.meta.env` directly.
- All localStorage access via `src/shared/lib/storage.ts` functions.

## Naming Conventions

- Files: PascalCase for components (`CatCard.tsx`), camelCase for utilities (`catQueries.ts`).
- Branches: `feat/<name>`, `fix/<name>`, `chore/<name>`, `docs/<name>`.
- Commits: Conventional Commits — `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`.

## Testing

- Unit/component tests: Vitest + Testing Library. Mock `httpClient`, not `axios`.
- E2E: Playwright. Tests that require a real API key check `process.env.CAT_API_KEY` and skip if absent.
- Run before committing: `npx tsc --noEmit && npx biome check .`

## Query Pattern

```ts
// Factory returns full options object; caller spreads extras
useQuery(catQueries.byId(id, { enabled: !!id }))
useInfiniteQuery(catQueries.all({ breed_ids: breedId }))
```

## Accessibility

- All interactive elements need `aria-label` when they lack visible text.
- Use semantic HTML — `<button>` not `<div onClick>`, `<nav>` for navigation.
- Maintain `:focus-visible` styles (defined in tokens.css reset).
