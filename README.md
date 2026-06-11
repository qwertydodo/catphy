# Catphy

A Nyan Cat-themed browser for [The Cat API](https://thecatapi.com) — explore a randomised gallery of cat images, browse breeds, and save your favorites.

**[Live app](https://qwertydodo.github.io/catphy/)**

## Features

- **Gallery** — infinite-load cat image grid with breed filter
- **Breeds** — browse all cat breeds with origin, temperament, and photos
- **Favorites** — API-backed favorites synced to your Cat API account
- **Auth** — API key entry with validation, persisted to localStorage
- **Logout** — clears stored key and returns to the auth screen

## Tech Stack

React 19 · TypeScript · Vite · TanStack Query v5 · Axios · React Router v6 · CSS Modules · Vitest · Playwright · Biome

## Getting Started

**Prerequisites:** Node.js 18+, a free API key from [thecatapi.com](https://thecatapi.com)

```bash
# Install dependencies
npm install

# Copy env template and add your API base URL
cp .env.example .env

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), enter your Cat API key when prompted, and start browsing.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run test` | Run unit and component tests |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run typecheck` | TypeScript type check only |
| `npm run lint` | Run Biome linter |
| `npm run lint:fix` | Run Biome linter and auto-fix |
| `npm run knip` | Find unused files, exports, and dependencies |

## Project Structure

```
src/
  shared/     # Generic UI kit, HTTP client, types, utils
  entities/   # Domain: cat (gallery, favorites) and breed
  pages/      # Page assemblies (one folder per route)
  app/        # Router, providers, route guards
```

See [docs/architecture.md](docs/architecture.md) for architecture and design decisions, and [docs/features.md](docs/features.md) for a feature-by-feature breakdown.

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_CAT_API_BASE_URL` | Cat API base URL (default: `https://api.thecatapi.com/v1`) |
| `VITE_CAT_CDN_BASE_URL` | Cat CDN base URL for image assets (default: `https://cdn2.thecatapi.com`) |
