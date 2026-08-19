// RADCON site interactions
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.navlinks');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); toggle.textContent = '☰'; });
    });
  }

  // Scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  // Animated counters
  var co = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, end = parseInt(el.dataset.n, 10), suffix = el.dataset.suffix || '';
      var t0 = performance.now();
      (function tick(t) {
        var p = Math.min((t - t0) / 1400, 1);
        el.textContent = Math.floor(end * (1 - Math.pow(1 - p, 3))).toLocaleString() + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      co.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.num[data-n]').forEach(function (el) { co.observe(el); });

  // Active nav highlighting
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a[href]').forEach(function (a) {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });
});

// GA4 engagement events
document.addEventListener('DOMContentLoaded', function () {
  function track(ev, params) { if (typeof gtag === 'function') gtag('event', ev, params || {}); }
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener('click', function () { track('phone_call', { link_text: a.textContent.trim() }); });
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.addEventListener('click', function () { track('email_click', {}); });
  });
  document.querySelectorAll('form[name="quote"]').forEach(function (f) {
    f.addEventListener('submit', function () { track('form_submit_attempt', { form: 'quote' }); });
  });
});
