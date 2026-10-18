/* ==========================================================================
   HYDRAYD SYSTEMS — Runtime behaviour
   - Applies the centralised translations (i18n.js) for the active language
   - Responsive menu, sticky-header state, active section highlighting
   - Language switching that preserves the visitor's position on the page
   - Contact call to action, rendered only when configured (config.js)
   - Restrained scroll reveal, respecting prefers-reduced-motion
   No dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var html = doc.documentElement;
  var body = doc.body;

  body.classList.remove("no-js");
  body.classList.add("js");

  var lang =
    (doc.documentElement.lang || "").slice(0, 2).toLowerCase() ||
    window.HYDRAYD_DEFAULT_LANG;
  if (window.HYDRAYD_LANGS.indexOf(lang) === -1) {
    lang = window.HYDRAYD_DEFAULT_LANG;
  }

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------------------
     1. Translations
     --------------------------------------------------------------------- */
  function applyTranslations() {
    var nodes = doc.querySelectorAll("[data-i18n]");
    var i;
    for (i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      var value = window.hydraydT(lang, key);
      if (value) nodes[i].textContent = value;
    }

    var aria = doc.querySelectorAll("[data-i18n-aria]");
    for (i = 0; i < aria.length; i++) {
      var akey = aria[i].getAttribute("data-i18n-aria");
      var avalue = window.hydraydT(lang, akey);
      if (avalue) aria[i].setAttribute("aria-label", avalue);
    }

    var alts = doc.querySelectorAll("[data-i18n-alt]");
    for (i = 0; i < alts.length; i++) {
      var ekey = alts[i].getAttribute("data-i18n-alt");
      var evalue = window.hydraydT(lang, ekey);
      if (evalue) alts[i].setAttribute("alt", evalue);
    }

    var langs = doc.querySelectorAll("[data-lang-label]");
    for (i = 0; i < langs.length; i++) {
      langs[i].setAttribute(
        "aria-label",
        window.hydraydT(lang, "a11y.lang.select")
      );
    }
  }

  /* ---------------------------------------------------------------------
     2. Language switching — keeps the visitor on the same section
     Before navigating, the current section is appended to the target
     language URL, so the browser restores the position natively.
     --------------------------------------------------------------------- */
  function currentSectionId() {
    var hash = window.location.hash;
    if (hash && hash.length > 1) return hash.slice(1);

    var marker = window.innerHeight * 0.35;
    var sections = doc.querySelectorAll("main section[id]");
    var best = null;
    for (var i = 0; i < sections.length; i++) {
      var rect = sections[i].getBoundingClientRect();
      if (rect.top <= marker) best = sections[i].id;
    }
    return best;
  }

  function initLanguageSwitch() {
    var links = doc.querySelectorAll("[data-lang-switch]");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () {
        var sectionId = currentSectionId();
        if (!sectionId || !doc.getElementById(sectionId)) return;
        var base = this.href.split("#")[0];
        this.setAttribute("href", base + "#" + sectionId);
      });
    }
  }

  /* ---------------------------------------------------------------------
     3. Mobile menu
     --------------------------------------------------------------------- */
  function initMenu() {
    var toggle = doc.querySelector("[data-menu-toggle]");
    var nav = doc.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        window.hydraydT(lang, open ? "a11y.menu.close" : "a11y.menu.open")
      );
      nav.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    doc.addEventListener("click", function (event) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (event.target.closest("#site-nav") || event.target.closest("[data-menu-toggle]")) return;
      setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) setOpen(false);
    });
  }

  /* ---------------------------------------------------------------------
     4. Sticky header state + active section highlighting
     --------------------------------------------------------------------- */
  function initHeader() {
    var header = doc.querySelector(".header");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initActiveNav() {
    var navLinks = doc.querySelectorAll(".nav__link[href^='#']");
    if (!navLinks.length || !("IntersectionObserver" in window)) return;

    var map = {};
    var sections = [];
    for (var i = 0; i < navLinks.length; i++) {
      var id = navLinks[i].getAttribute("href").slice(1);
      var section = id ? doc.getElementById(id) : null;
      if (id && section) {
        map[id] = navLinks[i];
        sections.push(section);
      }
    }
    if (!sections.length) return;

    function highlight() {
      var activeId = null;
      var bestTop = -Infinity;
      for (var j = 0; j < sections.length; j++) {
        var top = sections[j].getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.4 && top > bestTop) {
          bestTop = top;
          activeId = sections[j].id;
        }
      }
      for (var id2 in map) {
        if (id2 === activeId) map[id2].setAttribute("aria-current", "true");
        else map[id2].removeAttribute("aria-current");
      }
    }

    highlight();
    window.addEventListener("scroll", highlight, { passive: true });
    window.addEventListener("resize", highlight);
  }

  /* ---------------------------------------------------------------------
     5. Restrained reveal on scroll
     --------------------------------------------------------------------- */
  function initReveal() {
    var items = doc.querySelectorAll(".reveal");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        for (var j = 0; j < entries.length; j++) {
          if (entries[j].isIntersecting) {
            entries[j].target.classList.add("is-visible");
            obs.unobserve(entries[j].target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    for (var k = 0; k < items.length; k++) observer.observe(items[k]);
  }

  /* ---------------------------------------------------------------------
     6. Contact call to action — only rendered with a verified destination
     --------------------------------------------------------------------- */
  function initContact() {
    var mount = doc.querySelector("[data-contact-mount]");
    if (!mount) return;

    var config = window.HYDRAYD_CONFIG || {};
    var email = config.contact && config.contact.email;

    if (email) {
      var link = doc.createElement("a");
      link.className = "btn btn--cyan";
      link.href =
        "mailto:" +
        email +
        "?subject=" +
        encodeURIComponent(window.hydraydT(lang, "contact.title"));
      var text = doc.createElement("span");
      text.setAttribute("data-i18n", "contact.cta");
      text.textContent = window.hydraydT(lang, "contact.cta");
      var arrow = doc.createElement("span");
      arrow.className = "btn__arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "\u2192";
      link.appendChild(text);
      link.appendChild(arrow);
      mount.appendChild(link);
    } else {
      var pending = doc.createElement("p");
      pending.className = "contact__pending";
      pending.setAttribute("data-i18n", "contact.pending");
      pending.textContent = window.hydraydT(lang, "contact.pending");
      pending.setAttribute("role", "note");
      mount.appendChild(pending);
    }
  }

  /* ---------------------------------------------------------------------
     7. Footer year
     --------------------------------------------------------------------- */
  function initYear() {
    var nodes = doc.querySelectorAll("[data-current-year]");
    var year = String(new Date().getFullYear());
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = year;
  }

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */
  function boot() {
    applyTranslations();
    initLanguageSwitch();
    initMenu();
    initHeader();
    initActiveNav();
    initReveal();
    initContact();
    initYear();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
