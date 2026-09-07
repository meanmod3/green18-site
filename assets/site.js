// GREEN18 site — the only script on the site. No analytics, no third parties.
// Reveals the mobile sticky CTA once the visitor leaves the hero viewport (§20).
(function () {
  var bar = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero');
  if (!bar || !hero || !('IntersectionObserver' in window)) return;
  var link = bar.querySelector('a');
  new IntersectionObserver(function (entries) {
    var on = !entries[0].isIntersecting;
    bar.classList.toggle('on', on);
    bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    link.tabIndex = on ? 0 : -1;
  }, { threshold: 0 }).observe(hero);
})();
