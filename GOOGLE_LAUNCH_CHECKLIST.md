# The Drain Team — Google Launch Checklist

Complete this checklist after `https://thedrainteam.ie` is live on the production deployment.

## 1. Google Search Console

- [ ] Add `https://thedrainteam.ie` to Google Search Console.
- [ ] Prefer a Domain Property when DNS verification access is available.
- [ ] Otherwise, add a URL Prefix property for `https://thedrainteam.ie`.
- [ ] Verify ownership using the real verification method supplied by Google.
- [ ] Confirm the production site is accessible over HTTPS and is not blocked from indexing.
- [ ] Submit the sitemap: `https://thedrainteam.ie/sitemap.xml`.
- [ ] Request indexing for `https://thedrainteam.ie/`.
- [ ] Request indexing for `https://thedrainteam.ie/pages/services.html`.
- [ ] Request indexing for `https://thedrainteam.ie/pages/contact.html`.
- [ ] Request indexing for `https://thedrainteam.ie/pages/about.html`.
- [ ] Recheck indexing and sitemap status after Google has had time to crawl the site.

## 2. Google Analytics 4

Required before implementation:

- [ ] Obtain the real GA4 Measurement ID in the format `G-XXXXXXXXXX`.
- [ ] Confirm who owns and administers the Google Analytics account.
- [ ] Confirm whether NEEX Creative should receive account or property access.
- [ ] Agree on consent/privacy requirements before analytics is enabled.

Do not add Google Analytics, Google Tag Manager, or `gtag.js` until the real Measurement ID and ownership details are confirmed.

### Google Analytics 4 implementation

- GA4 Measurement ID: `G-M5CYLFQ51L`
- Installed directly using the Google tag / `gtag.js`
- Added to all public pages
- No Google Tag Manager installed
- No conversion events configured yet
- Next optional step: configure conversion tracking for successful form submissions and WhatsApp clicks

## 3. Google Business Profile

Current status: verification pending; Google may require video verification.

- [ ] Complete Google Business Profile verification using genuine business evidence.
- [ ] Once verified and live, set the website URL to `https://thedrainteam.ie`.
- [ ] Add genuine, current business photographs.
- [ ] Add the verified drainage and plumbing services offered by The Drain Team.
- [ ] Confirm business contact details and service area are accurate.
- [ ] Request genuine reviews from real customers.
- [ ] Do not use AI-generated images as business-verification evidence.
- [ ] Later, collect the verified Google Place ID for a Google Reviews integration.

## 4. Google Reviews API Implementation

The frontend calls the server-side `/api/google-reviews` endpoint. The endpoint requires these Vercel Environment Variables:

- [ ] `GOOGLE_PLACES_API_KEY` — a restricted Google Places API key.
- [ ] `GOOGLE_PLACE_ID` — the verified Google Business Profile Place ID.
- [ ] `GOOGLE_REVIEWS_CACHE_SECONDS` — optional cache duration; defaults to 3600 seconds.
- [ ] Add the variables for the required Vercel environments and redeploy after saving them.
- [ ] Confirm the Google Business Profile is public and verified before expecting reliable review data.
- [ ] Confirm no API key appears in frontend HTML or JavaScript.
- [ ] Keep the honest empty state visible; never enable the section with fake reviews, ratings, or counts.

## 5. Post-launch Checks

- [ ] Confirm `https://thedrainteam.ie` loads with a valid HTTPS certificate.
- [ ] Confirm the `www` hostname redirects to the preferred non-`www` production domain.
- [ ] Send one controlled contact-form enquiry and confirm delivery to `info@thedrainteam.ie`.
- [ ] Confirm the contact form shows success only after FormSubmit confirms the response.
- [ ] Confirm the WhatsApp link opens `https://wa.me/353832001988`.
- [ ] Confirm `https://thedrainteam.ie/sitemap.xml` is publicly accessible.
- [ ] Confirm `https://thedrainteam.ie/robots.txt` is publicly accessible and does not block indexing.
- [ ] Confirm Home, About, Services, Contact, and 404 pages work on mobile and desktop.
- [ ] Confirm favicon and Apple touch icon requests return successfully.
- [ ] Run Lighthouse checks for performance, accessibility, best practices, and SEO.
- [ ] Resolve any production-only broken links, missing assets, or console errors.
- [ ] Submit the sitemap and priority URLs in Google Search Console.
- [ ] Record Search Console, Analytics, and Business Profile ownership/access details in the project handover.
