# Images Required From The Client

The current site uses development illustrations (SVG) and generic preview photos.
None of them show the real team, vans or completed work, and they must be replaced
before launch. Do not present the current preview images as the client's own.

## Required photographs

| Filename (recommended) | Page / section | Ratio | Recommended size | Format | Max size | Alt-text direction |
|---|---|---|---|---|---|---|
| `the-drain-team-dublin-hero.webp` | Home — hero background | 16:9 | 1920×1080 | WebP (AVIF optional) | 250 KB | Team or equipment working on a Dublin drainage job |
| `the-drain-team-van-dublin.webp` | About — story section | 4:5 | 1200×1500 | WebP | 200 KB | The company's actual branded van |
| `the-drain-team-staff.webp` | Home — Why Us section | 4:5 | 1200×1500 | WebP | 200 KB | Real staff member(s) at work |
| `drain-unblocking-dublin.webp` | Services — Drain Unblocking | 16:10 | 1400×875 | WebP | 180 KB | Drain unblocking work in progress |
| `drain-cleaning-dublin.webp` | Services — Drain Cleaning | 16:10 | 1400×875 | WebP | 180 KB | Drain cleaning / jetting equipment in use |
| `cctv-drain-survey-dublin.webp` | Services — CCTV Surveys | 16:10 | 1400×875 | WebP | 180 KB | CCTV camera unit or monitor during a survey |
| `drain-repair-dublin.webp` | Services — Drain Repairs | 16:10 | 1400×875 | WebP | 180 KB | Repair work on a drain or pipe |
| `commercial-drainage-dublin.webp` | Services — Commercial | 16:10 | 1400×875 | WebP | 180 KB | Work at a commercial premises |
| `domestic-drainage-dublin.webp` | Services — Domestic | 16:10 | 1400×875 | WebP | 180 KB | Work at a residential property |
| `the-drain-team-og-image.jpg` | Social sharing (og:image) | 1.91:1 | 1200×630 | JPG | 150 KB | Logo + strapline over a brand-consistent photo |
| Team portraits (one per member) | About — team grid | 3:4 | 900×1200 | WebP | 150 KB | "[Name], [role] at The Drain Team" |

## Implementation notes

- When real images arrive, switch service/section images to `<picture>` with
  AVIF/WebP sources and a JPG fallback, and add explicit `width`/`height`.
- The homepage hero is currently a CSS background (`assets/images/hero/hero-bg.jpg`).
  When final photography is supplied it should become a semantic responsive
  `<img>` (or `<picture>`) so it can be the LCP element with `fetchpriority="high"`.
- Keep the main hero image out of `loading="lazy"`; lazy-load everything below the fold.
- Do not download or redistribute stock photography into this repo.
- Current placeholder illustrations live in `assets/images/services/` and
  `assets/images/team/` (SVG) — delete them once real photography is in place.
