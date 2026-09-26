# The Drain Team — Google Launch Checklist

Complete this checklist after `https://thedrainteam.ie` is live on the production deployment.

## 1. Google Search Console

- [x] Google Search Console is configured for `https://thedrainteam.ie`.
- [x] Search Console ownership is verified.
- [x] The production site is accessible over HTTPS and is not blocked from indexing.
- [x] Sitemap submitted successfully: `https://thedrainteam.ie/sitemap.xml`.
- [x] URL Inspection / indexing request completed for `https://thedrainteam.ie/`.
- [x] URL Inspection / indexing request completed for `https://thedrainteam.ie/pages/services.html`.
- [x] URL Inspection / indexing request completed for `https://thedrainteam.ie/pages/contact.html`.
- [x] URL Inspection / indexing request completed for `https://thedrainteam.ie/pages/about.html`.
- [ ] Recheck indexing and sitemap status after Google has had time to crawl the site.

## 2. Google Analytics 4

- [x] GA4 Measurement ID `G-M5CYLFQ51L` is configured on all public pages.
- [x] Google Analytics is installed directly using the Google tag / `gtag.js`.
- [x] GA4 realtime tracking has been confirmed.
- [ ] Confirm who owns and administers the Google Analytics account.
- [ ] Confirm whether NEEX Creative should receive account or property access.
- [ ] Confirm and implement the applicable consent/privacy requirements.

### Google Analytics 4 implementation

- No Google Tag Manager installed
- No conversion events configured yet
- Next optional step: configure conversion tracking for successful form submissions and WhatsApp clicks

## 3. Google Business Profile

Current status: the appeal was approved and Google's review process is complete.

- [x] Google Business Profile appeal approved and review completed.
- [ ] Confirm the Google Business Profile website URL is set to `https://thedrainteam.ie`.
- [ ] Add genuine, current business photographs.
- [ ] Add the verified drainage services offered by The Drain Team.
- [ ] Confirm business contact details and service area are accurate.
- [ ] Request genuine reviews from real customers.
- [ ] Do not use AI-generated images as business-verification evidence.
- [ ] Later, collect the verified Google Place ID for a Google Reviews integration.

## 4. Google Reviews API Implementation

Current status: pending. The Google Business Profile appeal is complete, but the API integration still requires its configuration values and deployment checks.

The frontend calls the server-side `/api/google-reviews` endpoint. The endpoint requires these Vercel Environment Variables:

- [ ] `GOOGLE_PLACES_API_KEY` — a restricted Google Places API key.
- [ ] `GOOGLE_PLACE_ID` — the verified Google Business Profile Place ID.
- [ ] `GOOGLE_REVIEWS_CACHE_SECONDS` — optional cache duration; defaults to 3600 seconds.
- [ ] Add the variables for the required Vercel environments and redeploy after saving them.
- [ ] Confirm no API key appears in frontend HTML or JavaScript.
- [ ] Keep the honest empty state visible; never enable the section with fake reviews, ratings, or counts.

## 5. Current Coming Soon State

- [x] The Coming Soon artwork is intentionally active as a production-only visual cover on `thedrainteam.ie` and `www.thedrainteam.ie` until launch.
- [x] The cover does not redirect page URLs or remove underlying page content, canonicals, or metadata.
- [x] `robots.txt` continues to allow crawling while the visual cover is active.
- [ ] Remove the production-only cover when the full website is approved for public viewing.

## 6. Post-launch Checks

- [ ] Confirm `https://thedrainteam.ie` loads with a valid HTTPS certificate.
- [ ] Reverse the current production redirect so `www.thedrainteam.ie` redirects to the preferred non-`www` domain. The current deployment redirects non-`www` URLs to `www`.
- [x] FormSubmit AJAX endpoint is configured as `https://formsubmit.co/ajax/info@thedrainteam.ie`.
- [x] FormSubmit has been activated and a real contact-form submission was delivered successfully to `info@thedrainteam.ie`.
- [x] Contact form code shows success only after FormSubmit returns an HTTP success response and `success: true`.
- [ ] Confirm the WhatsApp link opens `https://wa.me/353832001988`.
- [x] `https://thedrainteam.ie/sitemap.xml` is publicly accessible.
- [x] `https://thedrainteam.ie/robots.txt` is publicly accessible and does not block indexing.
- [ ] Confirm Home, About, Services, Contact, and 404 pages work on mobile and desktop.
- [ ] Confirm favicon and Apple touch icon requests return successfully.
- [ ] Run Lighthouse checks for performance, accessibility, best practices, and SEO.
- [ ] Resolve any production-only broken links, missing assets, or console errors.
- [x] Sitemap and priority URLs submitted in Google Search Console.
- [ ] Record Search Console, Analytics, and Business Profile ownership/access details in the project handover.
