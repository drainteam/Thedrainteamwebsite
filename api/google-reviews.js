'use strict';

module.exports = async function handler(request, response) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');

  if (request.method && request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  var apiKey = process.env.GOOGLE_PLACES_API_KEY;
  var placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return response.status(503).json({ error: 'Google reviews are not configured.' });
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
      return response.status(502).json({ error: 'Google reviews are temporarily unavailable.' });
    }

    var place = await googleResponse.json();
    var reviews = Array.isArray(place.reviews) ? place.reviews.slice(0, 3).map(function (review) {
      var author = review.authorAttribution || {};
      return {
        authorName: author.displayName || '',
        authorUri: author.uri || '',
        rating: typeof review.rating === 'number' ? review.rating : null,
        text: review.text && review.text.text ? review.text.text : '',
        relativePublishTimeDescription: review.relativePublishTimeDescription || '',
        publishTime: review.publishTime || ''
      };
    }) : [];

    return response.status(200).json({
      businessName: place.displayName && place.displayName.text ? place.displayName.text : '',
      rating: typeof place.rating === 'number' ? place.rating : null,
      reviewCount: Number.isFinite(place.userRatingCount) ? place.userRatingCount : null,
      googleMapsUri: place.googleMapsUri || '',
      reviews: reviews
    });
  } catch (error) {
    return response.status(502).json({ error: 'Google reviews are temporarily unavailable.' });
  }
};
