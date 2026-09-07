/* Theme toggle: remembers the choice in localStorage. Button: #theme-toggle. */

(function () {
  var KEY = 'jgm-theme';
  var mode = 'dark';
  try { var s = localStorage.getItem(KEY); if (s === 'dark' || s === 'light') mode = s; } catch (e) {}
  function apply() {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    var b = document.getElementById('theme-toggle');
    if (b) {
      b.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }
  apply();
  document.addEventListener('click', function (ev) {
    var t = ev.target && ev.target.closest ? ev.target.closest('#theme-toggle') : null;
    if (!t) return;
    mode = mode === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    apply();
  });
  var n = 0;
  (function poll() {
    if (document.getElementById('theme-toggle')) { apply(); return; }
    if (n++ < 80) setTimeout(poll, 100);
  })();
})();
