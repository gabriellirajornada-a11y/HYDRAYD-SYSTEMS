# HYDRAYD SYSTEMS — Corporate Website

**Innovative Mechanical Systems** · Bilbao / Bizkaia, Spain
Engineering the future of intelligent maritime operations.

Multilingual corporate website for HYDRAYD SYSTEMS. Static HTML/CSS/JS, no
dependencies, no build step, no backend.

---

## 1. How to view the site

**Option A — open directly:** double-click `index.html` (works offline; fonts
fall back to the system UI font when offline).

**Option B — serve locally (recommended):** any static server, e.g.

```
npx serve .          # if Node is available
python -m http.server
```

Then open `http://localhost:8000/` — the root page routes to the default
Spanish version.

## 2. Languages

| Language | URL          | Status |
|----------|--------------|--------|
| Spanish (default) | `/es/index.html` | Complete |
| English           | `/en/index.html` | Complete |
| Portuguese        | `/pt/index.html` | Complete |

The **ES | EN | PT** switcher is in the header and the footer. Switching
languages keeps the visitor on the same section of the page.

### How translations are maintained

- `assets/js/i18n.js` is the **single source of truth** for all visible text
  (152 keys per language, verified identical across ES/EN/PT).
- The Spanish text embedded in the three HTML shells is only a no-JavaScript
  fallback; with JavaScript active the dictionary always wins.
- To change any sentence: edit it in `i18n.js` (all three languages), never
  in the HTML files.
- Page `<title>`, meta description, Open Graph and `hreflang` tags are
  localized per shell in the `<head>` of each `index.html`.

## 3. File structure

```
index.html                     Root redirect → /es/ (default language)
es/index.html                  Spanish page shell (structure + metadata)
en/index.html                  English page shell
pt/index.html                  Portuguese page shell
assets/css/styles.css          Design tokens + all styles
assets/js/i18n.js              Centralised ES/EN/PT translation dictionary
assets/js/config.js            Verified contact configuration (email + LinkedIn)
assets/js/main.js              i18n runtime, menu, scroll, contact rendering
assets/images/company/
  hydrayd-systems-logo-original.jpg          Official logo, unmodified
assets/images/founder/
  alessandro-alves.jpg                      Founder photo, owner-supplied original
  alessandro-alves-960.jpg                  Web-optimised derivative (960×540, 55 KB)
assets/images/ay-dron-3000/
  ay-dron-3000-concept-reference.jpg         Owner-supplied concept reference (main image)
  ay-dron-3000-prototype-operations.jpg      Dock photo, owner-supplied original
  ay-dron-3000-prototype-operations-960.jpg  Web-optimised derivative (960×720, 157 KB)
  ay-dron-3000-configurations.png            Modular configurations composite (1178×279)
  ay-dron-3000-official-infographic.jpg      Official project infographic (480×720)
```

Every gallery and founder image is served with `loading="lazy"` and
`decoding="async"`, and declares its intrinsic `width`/`height` so the browser
reserves layout space and nothing shifts while loading.

## 4. Contact channel — configured

The verified contact details live **only** in `assets/js/config.js`, so they are
never duplicated across the three HTML shells:

```js
contact: {
  email:     "hydraydsystems@gmail.com",
  linkedin:  "https://www.linkedin.com/in/tecnicoalessandro/",
  city: "Bilbao", region: "Bizkaia", country: "ES"
}
```

From this single file `main.js` renders, in all three languages:

- a real **`mailto:`** button in the contact section;
- a **LinkedIn** button (`target="_blank"`, `rel="noopener noreferrer"`).

The founder section carries a second LinkedIn link filled from the same config
value. No phone number, WhatsApp or web form is published, because none was
supplied — a non-functional form would be worse than none.

If `email` is ever set back to `null`, the contact section automatically shows a
placeholder notice instead of a broken button.

To change any contact detail, edit `assets/js/config.js` once and all three
languages update together.

## 5. Deployment checklist (before going live)

- [x] Configure the contact email and LinkedIn (done — see §4).
- [ ] Set the production domain: replace the relative `hreflang`/canonical
      URLs and the `og:image` URL in the `<head>` of each shell
      (marked with `TODO(deploy)` comments).
- [ ] Optional: add a favicon. None is included, because cropping or
      re-scaling the official logo was explicitly out of scope.
- [ ] Optional: legal notice / privacy policy pages, once the owner provides
      the legally required information.
- [ ] Optional: a transparent-background logo or SVG, if the company provides
      an official version (the current JPG keeps its cream background, which
      is blended into a matching cream field in the header and footer).

## 5b. Video not integrated — what is needed to add it later

A short clip (`IMG_5672.MOV`, 40 MB) was supplied but is **not** published. It
cannot be embedded as-is:

| Problem | Detail |
|---------|--------|
| Codec | `hvc1` = HEVC / H.265, which **Chrome, Firefox and Edge on Windows do not decode**. Safari only. |
| Faststart | The `moov` atom sits at the **end** of the file, so the browser must download the whole 40 MB before playback starts. |
| Size | 40 MB would dominate the page weight. |

To publish it, transcode to **H.264/MP4** (broadest support), move the `moov`
atom to the front (**faststart**), target roughly 5–10 MB, and add a `poster`
image plus `<track kind="captions">` if it contains speech:

```
ffmpeg -i IMG_5672.MOV -c:v libx264 -profile:v main -crf 23 \
       -movflags +faststart -an ay-dron-3000-demo.mp4
```

Drop the result in `assets/videos/` and add a `<video>` inside the AY-DRON 3000
section, using the same honest framing as the existing gallery note.

## 6. Content policy applied

- The official logo is used **unmodified** (spelling, colours, proportions).
- The AY-DRON 3000 main image is the **owner-supplied concept reference**,
  captioned as such. No fictional product imagery is used.
- The **founder photograph** (the owner speaking at an event, "EMS" backdrop)
  is now published, in the founder section, with a neutral caption. The owner
  supplied it directly for this purpose; the earlier hold on publishing it is
  therefore resolved. It is **not** cropped, filtered or retouched — only
  resized for the web (`960×540`), with the original kept in the repository.
- The founder profile states **no** academic degree, professional licence,
  certification or executive title. It reports only the owner-supplied
  background: 20+ years following production chains, a structured competency
  list, and the brands *Ateliê do Engenheiro* and *2CENTIMETER DESIGN*.
- **AY-DRON 3000 gallery.** Three owner-supplied images are shown: the real
  dock photo, the modular-configurations composite and the official project
  infographic. The dock photo shows a hull marked *HYDRON-3000 / Smart Surface
  Recovery Platform* and a boat marked *HYDRAU SYSTEMS*; it is captioned
  neutrally as a platform prototype in a surface operation and is **not**
  claimed to be the AY-DRON 3000. The infographic is presented as the
  company's own official infographic rather than re-stating its figures as
  site copy.
- No founding date, registration data, certifications, patents, clients,
  partners, contracts, awards or performance figures are stated anywhere on the
  site itself.
- AY-DRON 3000 technical characteristics are labelled as **project design
  lines**, explicitly not as capabilities validated in testing or as a
  commercial product.
- Applications are labelled as **intended/foreseen**, not as completed
  operations.
- The gallery carries its own disclaimer that the imagery shows the
  development stage and does not evidence validated capabilities,
  certifications or commercial availability.

## 7. Design system

Tokens live at the top of `assets/css/styles.css`:

- Corporate palette: navy `#0B1726`, industrial blue `#173B5E`, white,
  technical gray `#5B6B7F` (WCAG-AA-adjusted variant of brand gray `#64748B`),
  light neutral `#F3F5F7`, brand red `#E3262E` / accessible red text
  `#C81F26`, near-black `#111318`.
- AY-DRON 3000 product palette (used only inside the product section): deep
  ocean `#06121E`, maritime blue `#0F4C81`, marine cyan `#00A3C4`, light
  marine `#E2F1F8`.
- Typography: Inter (Google Fonts) with a system-font fallback; 8px-based
  spacing scale; content width 1200px.

## 8. QA status (verified)

Tested against a local static server on 2026-10-18, in all three languages.

- **Lighthouse: Accessibility 100, Best Practices 100, SEO 100 — zero
  audit failures**, on `/es/`, `/en/` and `/pt/`.
- Zero console errors; zero failed network requests (all local assets and the
  Google Fonts stylesheet return 200).
- **Contrast:** every new element scanned against its real background —
  founder intro and body 5.45:1, `+20` badge 18.03:1, gallery captions and note
  16.03:1, contact location 15.32:1, contact buttons 6.32:1 (email) and
  18.03:1 (LinkedIn). All pass WCAG AA.
  - *Fix made during QA:* the contact LinkedIn button was first rendered with
    `btn--outline-dark`, whose navy text is invisible on the dark contact card
    (1.0:1). It now uses `btn--outline-light` (18.03:1).
- **Structure:** one `h1`, 31 headings, **no heading-level jumps**; all 7
  images have meaningful `alt`; no interactive element lacks an accessible
  name.
- **i18n:** 152 keys present in ES/EN/PT; an automated scan found no Spanish
  text leaking into the EN or PT pages. Switching language keeps the visitor
  on the same section (verified ES→EN→PT on `#fundador`).
- **Navigation:** all 9 anchors scroll correctly beneath the sticky header;
  the mobile menu opens and closes with correct `aria-expanded`/`aria-label`,
  and highlights the active section.
- **Motion:** the scroll-reveal degrades safely — `.no-js .reveal` and
  `prefers-reduced-motion` both force full visibility, so no content is ever
  hidden without JavaScript or for users who opt out of animation.
- **Layout:** verified live at the tablet breakpoint (founder and gallery stack
  correctly); desktop two-column rules for the founder grid and the gallery
  spans are in place, with further breakpoints at 1080/960/720/520px.
