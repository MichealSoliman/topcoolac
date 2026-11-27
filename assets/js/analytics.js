/*
 * Google Analytics 4 + conversion tracking for توب كوول.
 * To turn it on: put the GA4 Measurement ID (looks like G-XXXXXXXXXX) between the quotes below.
 * While GA_ID is empty this file does nothing.
 */
(function () {
  var GA_ID = '';
  if (!GA_ID) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  // Every click on a phone or WhatsApp link is recorded as an event (mark them as key events in GA4).
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var type = href.indexOf('tel:') === 0 ? 'phone_call_click'
      : (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) ? 'whatsapp_click'
      : null;
    if (!type) return;
    window.gtag('event', type, {
      link_url: href,
      page_path: location.pathname,
      link_text: (a.textContent || '').trim().slice(0, 60)
    });
  }, { capture: true });

  // The contact form opens WhatsApp; record the submission as a lead.
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'contactForm') {
      window.gtag('event', 'generate_lead', { form_id: 'contactForm', page_path: location.pathname });
    }
  }, { capture: true });
})();
