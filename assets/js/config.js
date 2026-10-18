/* ==========================================================================
   HYDRAYD SYSTEMS — Site configuration
   --------------------------------------------------------------------------
   CONTACT CHANNEL — PENDING OWNER INPUT.
   No contact email, phone number or postal address has been supplied, so the
   website does NOT display a contact button or any invented contact details.
   To activate the contact call to action, set a verified email address below.
   Example (replace with the real, verified address):
       contact: { email: "contact@hydraydsystems.example" }
   Once configured, the contact section renders a real "mailto:" button.
   ========================================================================== */
(function (global) {
  "use strict";

  global.HYDRAYD_CONFIG = {
    contact: {
      /* Verified contact email. Keep null until the owner confirms one. */
      email: null
      /* Optional future fields — leave null until verified:
      phone: null,
      address: null,
      linkedin: null */
    }
  };
})(window);
