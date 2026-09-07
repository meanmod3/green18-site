// GREEN18 calculators — DOM wiring only. The maths lives in calculators.js,
// which the build also imports so the server-rendered default and the
// interactive result are produced by the same code.
import { CALCS } from './calculators.js';

function wire(section) {
  var kind = section.getAttribute('data-calc');
  var fn = CALCS[kind];
  if (!fn) return;
  var form = section.querySelector('.calc-form');
  var vEl = section.querySelector('[data-verdict]');
  var wEl = section.querySelector('[data-why]');

  function values() {
    var out = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name) out[el.name] = el.value;
    });
    return out;
  }

  function run(pushUrl) {
    var v = values();
    var r;
    try { r = fn(v); } catch (e) { return; }
    vEl.textContent = r.verdict;
    wEl.textContent = r.why;
    if (pushUrl) {
      try {
        var q = new URLSearchParams(v).toString();
        history.replaceState(null, '', location.pathname + '?' + q + location.hash);
      } catch (e) { /* shareable state is a nicety, never a requirement */ }
    }
  }

  // Restore shared state from the query string.
  try {
    var params = new URLSearchParams(location.search);
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && params.has(el.name)) el.value = params.get(el.name);
    });
    if (params.toString()) run(false);
  } catch (e) { /* ignore */ }

  form.addEventListener('input', function () { run(true); });
  form.addEventListener('submit', function (e) { e.preventDefault(); run(true); });
}

Array.prototype.forEach.call(document.querySelectorAll('[data-calc]'), wire);
