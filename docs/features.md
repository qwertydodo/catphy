# Catphy — Features

## Authentication

User enters a Cat API key on first visit. The key is validated against the API — an invalid key shows an inline error. On success the user is redirected to the gallery. The key is persisted so subsequent visits skip the auth screen.

## Logout

A logout button in the header ends the session and returns the user to the auth screen.

## Gallery

Infinite-scroll grid of cat images. A breed dropdown filters the feed. A "Load more" button appends the next page; it disappears when there are no more results.

## Breeds

Browse all cat breeds. Each card shows the breed's image, name, origin, and temperament tags. Clicking a card opens the breed detail page.

## Breed Detail

Full breed profile — name, origin, life span, weight, description, and a Wikipedia link. Below the profile, a photo grid shows cats of that breed.

## Favorites

Any cat image can be hearted to save it to the account. Hearts are synced with the Cat API, so favorites persist across sessions and devices. A dedicated favorites page shows all saved cats; unhearting removes them.
