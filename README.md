# Interactive Travel Itinerary Generator

## Objective
Web application that composes and publishes visually rich, interactive travel itineraries through unique shareable links.

## Core Feature Set
- Parameter-driven itinerary synthesis (dates, destinations, preferences)
- Dynamic route maps, embedded media, live widgets (weather, events)
- Responsive UX, graphic-oriented layouts
- Public URL export per itinerary

## Technical Scope (initial)
- Front-end: framework pending (React / Svelte / Next.js)
- Back-end: API layer (Node / Python / Go)
- Third-party data sources: mapping, location, media
- Containerized deployment, cloud-agnostic

## Milestone 1
Initial static server with simple web page.

## Milestone 2
Client-side form for adding itinerary items dynamically.

## Milestone 3
Development preview server with automatic reloads. Run `npm run dev` to
start a server that restarts whenever files in `public/` or `server.js`
change. The server opens `http://localhost:3000` for quick preview.

## Contribution Guidelines
1. Fork → branch → pull request.
2. Lint + unit tests mandatory.
3. Reference issue numbers in commits.

## Running Tests
Use `npm test` to run both the standard server test and the development
server test. The tests automatically start the servers, make a request to
`http://localhost:3000`, and verify a successful response.

## License
MIT
