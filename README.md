# The Drain Team Website

Public website for **The Drain Team**, positioned as **Drainage & Groundworks Specialists** serving **Dublin and Surrounding Areas**.

The current public offer is focused on drainage and groundworks. The website does not advertise plumbing or round-the-clock/24-hour availability.

## Current website

The site is a responsive static website built with HTML, CSS and JavaScript. Its public pages are:

- Home: `index.html`
- About: `pages/about.html`
- Services: `pages/services.html`
- Contact: `pages/contact.html`
- Not found: `404.html`

The current Home layout and visual direction were retained after client review. The approved direction remains:

- dark hero treatment;
- red as the primary brand and action colour;
- white typography;
- blue used mainly through the drainage and vehicle visual language;
- the existing Home structure and layout.

Earlier experimental colour concepts are not planned design changes.

## Current statistics

The Home page currently displays:

- **50+** Years of Experience
- **500+** Jobs Completed
- **1000+** Homes Served
- **100%** Irish Family Business

## Current services

1. **High Pressure Jetting**
2. **CCTV Drain Surveys**
3. **Dig-Up & Patch Repairs**
4. **Rodent Investigation**
5. **Smoke Testing**
6. **Dye Testing / Drain Tracing**
7. **Gutter Cleaning**
8. **Power Washing**

### CCTV Drain Surveys

Camera inspections used to identify drainage problems, damage and defects, and highly recommended for new property purchases, new builds, extensions and renovations.

Key points:

- Damage and defects identified
- Rodent investigation
- Odour investigation
- Recommended for property purchases, new builds and renovations

### Dig-Up & Patch Repairs

Practical repair solutions for damaged drains, using excavation or localised patch repairs where needed to restore proper flow and fix the problem effectively.

Key points:

- Excavation repairs for damaged drain sections
- Localised patch repair solutions
- Restores drainage flow and performance
- Suitable for domestic and commercial properties

### Rodent Investigation

Professional rodent investigations to identify signs of activity, locate entry points and assess how rats or mice may be accessing the property.

Key points:

- Identifies signs of rodent activity
- Locates possible entry points
- Assesses infestation risks
- Helps prevent recurring rodent problems

## Photography and image implementation

The professional team photo session has been completed, and real photography is being integrated throughout the website. The inventory below includes only image files that currently exist and are referenced by the public pages or their CSS/metadata.

### Home

- `assets/images/hero/Branded Drain Team Vans Overlooking Cityscape.png` — Home hero background
- `assets/images/hero/Logo_hero.webp` — logo displayed in the Home hero
- `assets/images/sections/home-why-us.webp` — Home “Why Us” photograph
- `assets/images/services/service-high-pressure-jetting.webp` — service card 01
- `assets/images/services/service-cctv-drain-surveys.webp` — service card 02
- `assets/images/services/service-dig-up-repairs-new-pipework.webp` — service card 03; the filename is retained while the visible service is Dig-Up & Patch Repairs
- `assets/images/services/service-patch-repairs.webp` — service card 04; the filename is retained while the visible service is Rodent Investigation
- `assets/images/services/service-smoke-testing.webp` — service card 05

### About

- `assets/images/hero/Hero_family0.webp` — About hero background
- `assets/images/about/Family.png` — team photograph in the story section
- `assets/images/about/ALAN.png` — Alan Byrne team portrait
- `assets/images/about/SEAN.png` — Sean Woods team portrait

### Services

- `assets/images/hero/hero-services.JPG` — Services hero photograph
- `assets/images/services/service-high-pressure-jetting.webp`
- `assets/images/services/service-cctv-drain-surveys.webp`
- `assets/images/services/service-dig-up-repairs-new-pipework.webp`
- `assets/images/services/service-patch-repairs.webp`
- `assets/images/services/service-smoke-testing.webp`
- `assets/images/services/service-dye-testing-drain-tracing.webp`
- `assets/images/services/service-gutter-cleaning.webp`
- `assets/images/services/service-power-washing.webp`

### Shared, Contact and metadata imagery

- `assets/images/logos/Logo_ White.png` — shared navigation/footer logo
- `assets/images/hero/hero-contact.svg` — current Contact hero artwork
- `assets/images/hero/dd.jpg` — current Open Graph and Twitter sharing image on the main public pages

Other image files may remain in the repository as sources, older assets or unused alternatives. They are not documented here as active or prepared assets unless the current code references them.

## Contact form

The Contact page submits enquiries through FormSubmit. Its current service dropdown contains:

- High Pressure Jetting
- CCTV Drain Surveys
- Dig-Up & Patch Repairs
- Rodent Investigation
- Smoke Testing
- Dye Testing / Drain Tracing
- Gutter Cleaning
- Power Washing

The underlying option values for services 03 and 04 retain their existing identifiers for compatibility; their visible labels use the current service names.

## Google Reviews

Google Reviews / Places API integration is **pending**.

The repository contains the front-end review section, an honest empty state, the server-side route at `api/google-reviews.js`, setup guidance in `GOOGLE_REVIEWS_SETUP.md`, and environment-variable examples. The public code still reports that reviews are being connected, so the integration must not be described as complete.

## Google Business Profile

Current confirmed status:

- verified;
- live;
- appeal approved;
- receiving reviews.

This status is project information confirmed by the client; it is not independently verifiable from the website source code.

## SEO implementation

The current public pages include:

- page titles and meta descriptions;
- canonical URLs;
- Open Graph metadata;
- Twitter metadata;
- JSON-LD structured data;
- Dublin-focused location targeting.

The repository also includes:

- `sitemap.xml`
- `robots.txt`
- `llms.txt`

The current service names are the eight names documented above. The visible service content, footer labels and Contact dropdown use the updated names.

Known synchronization note: the JSON-LD service lists in `index.html` and `pages/services.html`, plus some auxiliary machine-readable copy, still contain legacy service labels. Those files were not changed as part of this README-only documentation update and should be aligned in a separate SEO/content task.

## Current status and verification boundaries

- The service list, service descriptions, statistics, contact dropdown and image references above were verified against the current public code.
- The completed photo session, retained Home visual direction and Google Business Profile status are client-confirmed project information.
- Google Reviews remains pending because the current code exposes setup/fallback behaviour rather than a completed live integration.
- No physical address, opening hours or round-the-clock availability is documented here because those details are not established by the current public code.
