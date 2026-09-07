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


// Demo video pause control — WCAG 2.2.2 (Pause, Stop, Hide), Level A.
// The clip loops for 32 seconds, well past the five-second threshold, so it
// must be stoppable. Also starts PAUSED for anyone who has asked for reduced
// motion: honouring that is the point of the setting, not an extra.
(function () {
  var btn = document.querySelector('[data-video-toggle]');
  var video = document.querySelector('.phone-screen video');
  if (!btn || !video) return;
  var label = btn.querySelector('[data-video-toggle-label]');

  function render() {
    var paused = video.paused;
    btn.classList.toggle('is-paused', paused);
    // The label IS the accessible name and states the next action. No
    // aria-pressed: pairing it with a changing label announces as a
    // contradiction ("Play demo, toggle button, pressed").
    label.textContent = paused ? 'Play demo' : 'Pause demo';
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce && reduce.matches) {
    video.autoplay = false;
    video.pause();
  }

  btn.addEventListener('click', function () {
    if (video.paused) { video.play().catch(function () {}); } else { video.pause(); }
    render();
  });
  video.addEventListener('play', render);
  video.addEventListener('pause', render);
  render();
})();
