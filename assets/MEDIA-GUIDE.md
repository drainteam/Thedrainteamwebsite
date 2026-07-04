# The Drain Team — Media Asset Guide

All website media files live inside this `assets/` folder.
Drop your final files into the correct subfolder — the website is already wired up to these paths.

---

## Folder Structure

```
assets/
├── images/
│   ├── hero/           ← Homepage full-screen background
│   ├── sections/       ← Reusable section images (homepage body)
│   ├── about/          ← About page visuals (van, office, crew)
│   ├── team/           ← Individual team member portraits
│   ├── services/       ← One image per service
│   ├── gallery/        ← Portfolio / work gallery photos
│   ├── logos/          ← Company logo files (SVG, PNG, dark/light variants)
│   └── icons/          ← Custom icons, favicons, app icons
└── videos/             ← Background or promo video files
```

---

## File Map — Drop Files Here

### HERO SECTION (index.html)
| File to place | Used in | Notes |
|---|---|---|
| `images/hero/hero-bg.jpg` | Homepage hero background | Landscape, min 1600×1000px. Dark subject preferred — text overlays the left side. |

### SECTIONS (index.html)
| File to place | Used in | Notes |
|---|---|---|
| `images/sections/team-at-work.jpg` | "Why Us" section (right column) | Portrait crop (4:5 ratio). Show a plumber/engineer actively working. |

### ABOUT PAGE (pages/about.html)
| File to place | Used in | Notes |
|---|---|---|
| `images/about/van-branding.jpg` | About — Our Story section | Portrait crop (4:5 ratio). Branded company van, ideally outdoors in Dublin. |

### TEAM (pages/about.html)
| File to place | Person | Notes |
|---|---|---|
| `images/team/team-brian-connolly.jpg` | Brian Connolly — Founder & Lead Engineer | Portrait (3:4 ratio), professional headshot or on-site photo |
| `images/team/team-padraic-walsh.jpg` | Pádraic Walsh — Co-Founder & Senior Engineer | Portrait (3:4 ratio) |
| `images/team/team-aoife-byrne.jpg` | Aoife Byrne — Operations Manager | Portrait (3:4 ratio) |
| `images/team/team-ciaran-murphy.jpg` | Ciarán Murphy — Drainage Engineer | Portrait (3:4 ratio) |

### SERVICES (pages/services.html)
| File to place | Service | Notes |
|---|---|---|
| `images/services/service-drain-unblocking.jpg` | 01 — Drain Unblocking | Landscape (16:10). Jetting equipment or drain work. |
| `images/services/service-leak-detection.jpg` | 02 — Leak Detection | Landscape (16:10). Thermal camera or detection equipment. |
| `images/services/service-cctv-survey.jpg` | 03 — CCTV Drain Survey | Landscape (16:10). CCTV camera being fed into drain. |
| `images/services/service-pipe-repair.jpg` | 04 — Pipe Repair & Relining | Landscape (16:10). Pipe work, trench, or relining equipment. |
| `images/services/service-water-systems.jpg` | 05 — Water Systems | Landscape (16:10). Boiler, cylinder, or pipework install. |
| `images/services/service-emergency-callout.jpg` | 06 — Emergency Callout | Landscape (16:10). Van at night or urgent callout scene. |

### GALLERY (optional)
| File to place | Notes |
|---|---|
| `images/gallery/gallery-01.jpg` | Completed job photo |
| `images/gallery/gallery-02.jpg` | Add as many as needed (gallery-03, gallery-04…) |

### LOGOS
| File to place | Notes |
|---|---|
| `images/logos/logo-light.svg` | White version — for dark backgrounds (navbar, footer) |
| `images/logos/logo-dark.svg` | Dark version — for light backgrounds |
| `images/logos/logo-favicon.png` | 32×32 or 64×64px favicon |

### VIDEOS (optional)
| File to place | Notes |
|---|---|
| `videos/hero-video.mp4` | If adding a hero video background — MP4, H.264, max 10MB |
| `videos/promo-reel.mp4` | Company promo video for an About or Services section |

---

## Image Size Recommendations
- **Hero background**: 1600×1000px minimum, JPG at 80% quality (~300–500KB)
- **Portrait (3:4)**: 600×800px minimum, JPG at 85% quality
- **Portrait (4:5)**: 800×1000px minimum, JPG at 85% quality
- **Landscape (16:10)**: 900×563px minimum, JPG at 85% quality
- **Gallery**: 1200×900px, JPG at 80% quality
- **Logo SVG**: Vector preferred; PNG fallback at 2× resolution

---

*All paths in index.html, pages/about.html, pages/services.html and css/style.css are already pointing to these locations.*
