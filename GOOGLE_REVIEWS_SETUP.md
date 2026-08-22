# Google Reviews Integration Setup

This integration uses the server-side API route at `api/google-reviews.js`. The browser requests only the normalized public review data from `/api/google-reviews`; it never receives the Google API key.

## Environment variables

Configure these variables on the server or hosting platform:

- `GOOGLE_PLACES_API_KEY`: Google Cloud API key with Places API access.
- `GOOGLE_PLACE_ID`: verified Place ID for The Drain Team.

Never put the API key in HTML, browser JavaScript, CSS, public configuration, or source-control secrets. Restrict the key appropriately in Google Cloud.

## Google Cloud requirement

Enable Places API for the Google Cloud project associated with the server-side API key.

## Client data required

- Google Business Profile URL
- Google Place ID
- Google Cloud project and server-side API key
- Confirmation that Google reviews may be displayed on the website

## Deployment

The current repository is otherwise a static site. Its hosting platform must support Vercel-compatible serverless API routes, or `api/google-reviews.js` must be adapted to an equivalent backend/proxy. Without backend support or configured environment variables, the homepage section stays hidden.

## Caching and attribution

The API response uses a six-hour shared cache with stale revalidation to avoid excessive requests. Keep visible Google attribution, author attribution, and the Google Maps review link where Google supplies them.

Never fabricate review text, author names, ratings, or review counts.
