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

## 4. Google Reviews API — Later Phase

Do not implement this integration during launch preparation.

It will require:

- [ ] A verified Google Business Profile.
- [ ] The correct Google Place ID.
- [ ] A restricted Google Places API key.
- [ ] A server-side endpoint that keeps the API key private.
- [ ] Confirmation that no API key is included in frontend HTML or JavaScript.

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
