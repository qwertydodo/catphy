# Catphy — Software Design

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
| `shared/types` | Reusable API types (ApiResponse, PaginatedResponse, ApiError, LimitParams) |
| `shared/lib` | localStorage wrapper, useApiKey hook |
| `shared/api` | Axios instance with API key + 401 interceptors |
| `entities/cat` | CatImage domain: repository, query factory, CatCard, CatGrid |
| `entities/breed` | Breed domain: repository, query factory, types |
| `pages/*` | Assemble entities + local components into full pages |
| `app/guards` | RequireApiKey: redirects unauthenticated users to /auth |

---

## Domain Features

### Authentication (`pages/AuthPage`)
User enters a Cat API key. On submit, the key is saved to localStorage and a probe call (`GET /images/search?limit=1`) validates it. On 401 the key is cleared and an inline error is shown. On success, the user is redirected to the gallery. All protected routes are wrapped in `RequireApiKey` which reads localStorage on every render.

### Gallery (`pages/GalleryPage`)
Displays cat images in a 3-column grid using `useInfiniteQuery`. Each page loads 9 images. A breed dropdown (populated from `breedQueries.all()`) filters the feed. A "Load more" button appends the next page. `getNextPageParam` returns `undefined` when the last page has fewer than 9 items, hiding the button automatically.

### Breeds (`pages/BreedsPage`)
Grid of all cat breeds. Each card shows: breed image (from `reference_image_id`), name, origin, and first 3 temperament traits as tags. Clicking navigates to the breed detail page.

### Breed Detail (`pages/BreedDetailPage`)
Full breed profile: name, origin, life span, weight, description, Wikipedia link. Below the profile, a `CatGrid` shows photos of that breed filtered via `breed_ids` param.

### Favorites (`pages/FavoritesPage`)
Displays API-backed favorites fetched from `GET /favourites`. Maps each `Favorite` to a `CatImage` shape for use in `CatGrid`. CatCard heart buttons on every page call `POST /favourites` (add) or `DELETE /favourites/:id` (remove), then invalidate the `['cats', 'favorites']` query key.

---

## Key Design Decisions

**Repository pattern** — `catRepository` and `breedRepository` are the only places that call the HTTP client. This isolates network logic and makes testing straightforward: tests `vi.mock` the httpClient, not axios.

**Query factory pattern** — factories return complete TanStack Query option objects that callers spread into `useQuery`/`useInfiniteQuery`. Callers can add `enabled`, `select`, etc. without touching the factory.

```ts
const { data } = useInfiniteQuery(catQueries.all({ breed_ids: id }))
```

**CatGrid cross-references favorites** — CatGrid fetches `catQueries.favorites()` internally (cached, staleTime 0) and passes `isFavorited` + `favoriteId` to each CatCard. Avoids prop-drilling from pages.

**Two-tier design tokens** — CSS vars split into a primitive palette (`:root { --pink-400: ... }`) and semantic tokens (`[data-theme="dark"] { --color-accent: var(--pink-400) }`). Components only use semantic tokens. Light theme requires only a `[data-theme="light"]` block.

---

## Data Flow

1. App mounts → `data-theme="dark"` set on `<html>`
2. Router renders → `RequireApiKey` guard checks `localStorage`
3. No key → redirect `/auth` → user enters key → probe call → redirect `/`
4. `GalleryPage` → `useInfiniteQuery(catQueries.all(...))` → `catRepository.getAll()` → `GET /images/search` with `x-api-key` header
5. `CatGrid` receives images, fetches favorites, renders `CatCard` with heart state
6. Heart click → `addFavorite`/`removeFavorite` mutation → invalidate `['cats','favorites']` → CatGrid re-renders

---

## Error Handling

| Scenario | Handling |
|---|---|
| HTTP 401 | Axios interceptor clears key, redirects to `/auth` |
| Other HTTP error | TanStack Query `isError` state → `ErrorMessage` with retry |
| Empty data | `CatGrid` shows "No cats here yet" illustration |
| Invalid key on auth | Inline error below input, key cleared from storage |

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
- **Lefthook** — pre-commit: runs `tsc --noEmit` + `biome check` in parallel (`lefthook.yml`)
- **Vite** — dev server + build; test runner via Vitest plugin

---

## Future Work (not in MVP)

- Voting — upvote/downvote via `POST /votes`
- Light theme — `[data-theme="light"]` token block
- Image upload — `POST /images/upload`
