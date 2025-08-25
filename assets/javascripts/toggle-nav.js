(function () {
  function toggleNav() {
    document.documentElement.classList.toggle('nav-hidden');
    // Persist preference in this browser
    try {
      const hidden = document.documentElement.classList.contains('nav-hidden');
      localStorage.setItem('navHidden', hidden ? '1' : '0');
    } catch (e) {}
  }

  function restoreState() {
    try {
      if (localStorage.getItem('navHidden') === '1') {
        document.documentElement.classList.add('nav-hidden');
      }
    } catch (e) {}
  }

  // Wait for DOM (Material loads fast, but just to be safe)
  document.addEventListener('DOMContentLoaded', function () {
    restoreState();
    var btn = document.getElementById('toggle-nav');
    if (btn) btn.addEventListener('click', toggleNav);
  });
})();
