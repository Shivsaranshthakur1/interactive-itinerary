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

## Development Server
Run `node dev.js` to start the development environment. It automatically reloads on changes.

## API Usage
Use the example commands below to interact with the itinerary API.
```bash
curl http://localhost:3000/api/itinerary
curl -X POST http://localhost:3000/api/itinerary -d '{"days":3}'
```


## Contribution Guidelines
1. Fork → branch → pull request.
2. Lint + unit tests mandatory.
3. Reference issue numbers in commits.
## Running Tests
Install Node and run `npm test` to execute the test suite.


## License
MIT
