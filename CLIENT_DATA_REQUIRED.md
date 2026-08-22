# The Drain Team — Client Data Required

Pre-production build. Every item below is missing or unverified. Nothing on this
list may appear on the public site until the client confirms it. Placeholders in
the code use `[PLACEHOLDER: …]`, `[PHONE TBC]`, `[EMAIL TBC]` and `[WHATSAPP TBC]`
inside HTML comments or hidden `development-placeholder` elements only — none are
rendered publicly.

## Contact details

- [ ] Main telephone number
- [ ] WhatsApp number
- [ ] Business email address
- [ ] Preferred contact method

## Business identity

- [ ] Registered business name
- [ ] Trading name confirmation
- [ ] Business address, if publicly displayed
- [ ] Company registration number, if required
- [ ] VAT number, if required

## Opening and emergency availability

- [ ] Normal opening hours
- [ ] Weekend availability
- [ ] Emergency availability
- [ ] Whether 24/7 service can be claimed
- [ ] Typical response time, if publicly advertised

## Services

- [ ] Final approved service list
- [ ] Services to remove
- [ ] Services to prioritise
- [ ] Domestic services
- [ ] Commercial services
- [ ] Emergency services
- [ ] Whether leak detection, thermal imaging, acoustic detection, pipe relining,
      boiler work, water-system installation or insurance-report support are offered
      (all removed from the site pending confirmation)

## Service areas

- [ ] Dublin areas covered
- [ ] Whether Kildare is covered
- [ ] Whether Meath is covered
- [ ] Whether Wicklow is covered
- [ ] Travel or call-out limitations

## Statistics

- [ ] Years in business
- [ ] Jobs completed
- [ ] Number of vans
- [ ] Team size
- [ ] Any verified response statistics

## Qualifications and certifications

- [ ] Insurance confirmation
- [ ] Licences
- [ ] Safe Pass confirmation
- [ ] CIRI confirmation
- [ ] Plumbing or drainage certifications

## Guarantees and pricing claims

- [ ] Call-out fee policy
- [ ] Free quote policy
- [ ] Workmanship guarantee
- [ ] Product or repair guarantees
- [ ] Upfront pricing policy

## Reviews and testimonials

- [ ] Genuine customer reviews
- [ ] Customer permission to publish
- [ ] Google review profile
- [ ] Verified rating
- [ ] Review count

## Team information

- [ ] Team member names
- [ ] Roles
- [ ] Short biographies
- [ ] Real team photographs

## Photography and media

- [ ] Van photographs
- [ ] Team photographs
- [ ] Equipment photographs
- [ ] Drain-unblocking photographs
- [ ] CCTV-survey photographs
- [ ] Drain-repair photographs
- [ ] Before-and-after photographs
- [ ] Approved logo files
- [ ] Social-sharing image (1200×630 — see assets/images/README.md)

## Contact-form delivery

- [ ] Form delivery email
- [ ] Form endpoint (set `data-endpoint` on `#contactForm` in pages/contact.html)
- [ ] Hosting or serverless configuration
- [ ] Spam-protection method (honeypot in place; reCAPTCHA/Turnstile keys needed)
- [ ] Privacy notice wording

## Google Business Profile

- [ ] Profile URL
- [ ] Google Place ID
- [ ] Google Places API key stored server-side
- [ ] Confirmation that Google reviews may be displayed on the website
- [ ] Server-side Google Reviews endpoint
- [ ] Business category
- [ ] Service areas
- [ ] Opening hours
- [ ] Review link

## Social profiles

- [ ] Facebook URL
- [ ] Instagram URL
- [ ] LinkedIn URL
- [ ] YouTube URL

## Legal and privacy information

- [ ] Privacy policy
- [ ] Cookie requirements
- [ ] Terms and conditions
- [ ] Company details required in footer

---

## Technical placeholder map

| Placeholder | File | Section | Required information | Current public behaviour |
|---|---|---|---|---|
| `[PHONE TBC]` | index.html, pages/*.html | Header nav, mobile menu, footer | Verified telephone number | No phone shown; CTAs link to contact page |
| `[EMAIL TBC]` | index.html, pages/*.html, pages/contact.html | Footer, contact details | Verified email address | No email shown |
| `[WHATSAPP TBC]` | index.html, pages/*.html, pages/contact.html | Footer, contact details | Verified WhatsApp number | No WhatsApp link shown |
| `[PLACEHOLDER: verified years of experience]` | index.html | Hero stats, Why Us badge | Years in business | Non-numerical service statements shown instead |
| `[PLACEHOLDER: verified number of completed jobs]` | index.html, pages/about.html | Hero stats, About stat tiles | Completed jobs count | Stat tiles hidden / neutral statements shown |
| `[PLACEHOLDER: confirmed emergency-service availability]` | index.html, pages/services.html, all pages | Hero stats, emergency banners, emergency service section | Whether 24/7 / emergency claims can be made | Neutral "check availability" wording, links to contact page |
| `[PLACEHOLDER: verified licence/insurance…]` | index.html, pages/contact.html | Trust bars | Licence, insurance, call-out fee, rating, guarantee | Neutral defensible service statements shown |
| `[PLACEHOLDER: genuine customer reviews…]` | index.html | Testimonials section | Real reviews with permission | Entire section `hidden`, not rendered |
| `[PLACEHOLDER: real team member names…]` | pages/about.html | Team section | Names, roles, bios, photos | Entire section `hidden`, not rendered |
| `[PLACEHOLDER: verified founding story…]` | pages/about.html | Our Story | Founding year, history | Neutral company description shown |
| `[PLACEHOLDER: verified Google rating and review count]` | pages/about.html | About stat tiles | Rating + review count | Tiles hidden |
| `[PLACEHOLDER: verified opening hours…]` | pages/contact.html | Contact details | Opening hours, emergency hours | Hours item hidden |
| `[PLACEHOLDER: form delivery endpoint…]` | pages/contact.html | Contact form | Form endpoint + delivery email | Submission blocked with honest "not available yet" message |
| `[PLACEHOLDER: privacy notice wording…]` | pages/contact.html | Contact form | Privacy notice + policy link | Generic one-line data-use note shown |
| `[PLACEHOLDER: production spam protection…]` | pages/contact.html | Contact form | reCAPTCHA/Turnstile keys or equivalent | Honeypot only |
| `[PLACEHOLDER: confirmed coverage of Kildare, Meath and Wicklow…]` | all pages | Footer service areas | County coverage confirmation | Only Dublin areas listed as plain text |
| `[PLACEHOLDER: og:image / twitter:image…]` | index.html | Head metadata | Social-sharing image | No og:image tag emitted |
| `[PLACEHOLDER: real service photography…]` | pages/services.html, assets/images/README.md | Service rows | Real photos per service | Neutral SVG illustrations with empty alt |
| `[PLACEHOLDER: real photograph of The Drain Team at work…]` | index.html | Why Us image | Real team photo | Generic photo with neutral alt text |
| `[PLACEHOLDER: photograph of the client's actual branded van…]` | pages/about.html | Story image | Real van photo | Generic photo with neutral alt text |
| `[PLACEHOLDER: confirmation required before advertising pipe relining…]` | pages/services.html | Drain Repairs | Relining/no-dig/guarantee confirmation | Claims removed |
| `[PLACEHOLDER: telephone, email, address… JSON-LD]` | all pages (head) | Structured data | Verified NAP data | JSON-LD contains only name, url, description, areaServed, service catalogue |
