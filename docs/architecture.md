# Catphy — Architecture

## Overview

Catphy is a single-page React application that browses cat images from The Cat API (thecatapi.com).
Users authenticate with a personal API key, then browse a randomised cat gallery, explore breeds, and save favorites to their account.

---

## System Architecture

The project uses a simplified Feature-Sliced Design (FSD) — four layers, each only importing from layers below:

```
app/      — router, providers, route guards
pages/    — page assemblies (one folder per route)
entities/ — domain objects (cat, breed): repository + query factory + reused UI
shared/   — generic UI kit, HTTP client, localStorage utils, API types
```

**Dependency rule:** `app → pages → entities → shared`. No cross-layer sibling imports.

**Public API rule:** each entity and component exposes only what is declared in its `index.ts`. Internal files (`api/`, `model/`, `ui/` subfolders) are private to the slice.

### Layer responsibilities

| Layer | Responsibility |
|---|---|
| `shared/ui` | Generic, domain-free components (Button, Card, Input, Spinner, Layout) |
| `shared/types` | Reusable API types (ApiResponse, ApiError, LimitParams) |
| `shared/lib` | localStorage wrapper, useApiKey hook |
| `shared/api` | Axios instance with API key + 401 interceptors |
| `entities/cat` | CatImage domain: repository, query factory, reused UI components |
| `entities/breed` | Breed domain: repository, query factory, types |
| `pages/*` | Assemble entities + local components into full pages |
| `app/guards` | RequireApiKey: redirects unauthenticated users to /auth |

---

## Key Design Decisions

**Repository pattern** — `catRepository` and `breedRepository` are the only places that call the HTTP client. This isolates network logic and makes testing straightforward: tests `vi.mock` the httpClient, not axios.

**Query factory pattern** — factories return complete TanStack Query option objects that callers spread into `useQuery`/`useInfiniteQuery`. Callers can add `enabled`, `select`, etc. without touching the factory.

```ts
const { data } = useInfiniteQuery(catQueries.all({ breed_ids: id }))
```

**Two-tier design tokens** — CSS vars split into a primitive palette (`:root { --pink-400: ... }`) and semantic tokens (`[data-theme="dark"] { --color-accent: var(--pink-400) }`). Components only use semantic tokens. Light theme requires only a `[data-theme="light"]` block.

---

## Data Flow

1. App mounts → `data-theme="dark"` set on `<html>`
2. Router renders → `RequireApiKey` guard checks `localStorage`
3. No key → redirect to `/auth`; valid key present → render requested route

---

## Error Handling

| Scenario | Handling |
|---|---|
| HTTP 401 | Axios interceptor clears key, redirects to `/auth` |
| Other HTTP error | TanStack Query `isError` state → `ErrorMessage` with retry |
| Empty data | `CatGrid` shows "No cats here yet" illustration |
| Invalid key on auth | Inline error below input, key cleared from storage |
| Unhandled render error / unmatched route | Root `errorElement` → `ErrorPage` (404 "Cat run somewhere" view vs. generic crash view with reload/gallery actions) |

---

## Testing Strategy

| Type | Tool | Coverage |
|---|---|---|
| Unit | Vitest | `storage`, `useApiKey`, `catRepository`, `breedRepository` |
| Component | Vitest + Testing Library | `CatCard`, `Text`, `AuthPage` form |
| E2E | Playwright | Auth flow, gallery load more, favorites round-trip |

Repositories are tested by mocking `httpClient` (not axios), so tests exercise the repository logic without real HTTP calls.

---

## Tooling

- **Biome** — lint + format, replaces ESLint + Prettier (`biome.json`)
- **Knip** — finds unused files, exports, and dependencies project-wide (`knip.json`), run via `npm run knip` and checked in CI
- **Lefthook** — pre-commit: runs `tsc --noEmit` + `biome check` in parallel (`lefthook.yml`)
- **Vite** — dev server + build; test runner via Vitest plugin. `base` is set via `VITE_BASE_PATH` for GitHub Pages subpath deploys; `import.meta.env.BASE_URL` is passed to `createBrowserRouter` as `basename` so routes resolve under that subpath
- A build plugin (`scripts/copy404.ts`) copies `dist/index.html` to `dist/404.html` so GitHub Pages serves the SPA (which then resolves the route via `basename`) on hard refresh/direct navigation to deep routes

---

## Future Work (not in MVP)

- Voting — upvote/downvote via `POST /votes`
- Light theme — `[data-theme="light"]` 
- Image upload — `POST /images/upload`
