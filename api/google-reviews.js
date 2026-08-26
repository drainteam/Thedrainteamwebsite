'use strict';

module.exports = async function handler(request, response) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  var requestedCacheSeconds = Number.parseInt(process.env.GOOGLE_REVIEWS_CACHE_SECONDS, 10);
  var cacheSeconds = Number.isFinite(requestedCacheSeconds)
    ? Math.max(60, Math.min(requestedCacheSeconds, 86400))
    : 3600;
  response.setHeader('Cache-Control', 's-maxage=' + cacheSeconds + ', stale-while-revalidate=86400');

  if (request.method && request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  var apiKey = process.env.GOOGLE_PLACES_API_KEY;
  var placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return response.status(200).json({
      ok: false,
      configured: false,
      message: 'Google Reviews are not connected yet.'
    });
  }

  try {
    var endpoint = 'https://places.googleapis.com/v1/places/' + encodeURIComponent(placeId);
    var googleResponse = await fetch(endpoint, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,googleMapsUri,reviews'
      }
    });

    if (!googleResponse.ok) {
      return response.status(502).json({
        ok: false,
        configured: true,
        message: 'Google Reviews could not be loaded right now.'
      });
    }

    var place = await googleResponse.json();
    var reviews = Array.isArray(place.reviews) ? place.reviews.slice(0, 3).map(function (review) {
      var author = review.authorAttribution || {};
      return {
        authorName: author.displayName || '',
        rating: typeof review.rating === 'number' ? review.rating : null,
        text: review.text && review.text.text ? review.text.text : '',
        relativeTimeDescription: review.relativePublishTimeDescription || ''
      };
    }) : [];

    return response.status(200).json({
      ok: true,
      configured: true,
      businessName: place.displayName && place.displayName.text ? place.displayName.text : '',
      rating: typeof place.rating === 'number' ? place.rating : null,
      reviewCount: Number.isFinite(place.userRatingCount) ? place.userRatingCount : null,
      googleMapsUrl: place.googleMapsUri || '',
      reviews: reviews
    });
  } catch (error) {
    return response.status(502).json({
      ok: false,
      configured: true,
      message: 'Google Reviews could not be loaded right now.'
    });
  }
};
