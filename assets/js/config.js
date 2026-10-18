/* ==========================================================================
   HYDRAYD SYSTEMS — Site configuration
   --------------------------------------------------------------------------
   Single source of truth for verified contact details.
   main.js reads this file and renders the contact call to action, so the
   contact information is NEVER duplicated across the three language shells.
   ========================================================================== */
(function (global) {
  "use strict";

  global.HYDRAYD_CONFIG = {
    contact: {
      /* Verified official contact email — renders a real "mailto:" button. */
      email: "hydraydsystems@gmail.com",

      /* Verified official LinkedIn profile of the founder. */
      linkedin: "https://www.linkedin.com/in/tecnicoalessandro/",

      /* Location. No street address is published on purpose. */
      city: "Bilbao",
      region: "Bizkaia",
      country: "ES",

      /* Optional future fields — leave null until verified:
      phone: null,
      whatsapp: null,
      address: null */
    }
  };
})(window);
