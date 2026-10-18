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
  (110 keys per language, verified identical across ES/EN/PT).
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
assets/js/config.js            Contact configuration (PENDING owner input)
assets/js/main.js              i18n runtime, menu, scroll, contact rendering
assets/images/company/
  hydrayd-systems-logo-original.jpg          Official logo, unmodified
assets/images/ay-dron-3000/
  ay-dron-3000-concept-reference.jpg         Owner-supplied concept reference
```

## 4. Contact channel — action needed

No verified contact details were supplied, so the site **does not display any
contact button, email, phone or form**. The contact section shows the
call-to-action text and the company location only.

To activate the contact button, set a verified email in `assets/js/config.js`:

```js
contact: { email: "contact@yourdomain.com" }
```

A real `mailto:` button is then rendered automatically in all three languages.

## 5. Deployment checklist (before going live)

- [ ] Configure the contact email (see §4).
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

## 6. Content policy applied

- The official logo is used **unmodified** (spelling, colours, proportions).
- The AY-DRON 3000 image is the **owner-supplied concept reference**, captioned
  as such. No fictional product imagery is used.
- The institutional presentation photograph (person with microphone) is
  **deliberately not published** — permission has not been confirmed. It was
  used only as a visual reference for the maritime navy/blue atmosphere. If
  publication is approved, copy it to `assets/images/company/` and add a
  `<figure>` in the `#vision` section.
- No founding date, registration data, certifications, patents, clients,
  partners, contracts, awards or performance figures are stated anywhere.
- AY-DRON 3000 technical characteristics are labelled as **project design
  lines**, explicitly not as capabilities validated in testing.
- Applications are labelled as **intended/foreseen**, not as completed
  operations.

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

- Lighthouse: Accessibility **100**, Best Practices **100**, SEO **100**.
- Zero console errors; zero contrast failures (custom WCAG scan).
- All 110 translation keys present in ES/EN/PT; no mixed-language text on any
  page; Spanish is the default.
- Language switch preserves the current section; mobile menu opens/closes
  (including Escape); navigation anchors work under the sticky header.
- Layout verified at desktop (1400px) and tablet/mobile (912px) widths, plus
  breakpoints at 1080/960/720/520px in CSS.
