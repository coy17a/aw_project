(function () {
  'use strict';

  // ── Scroll reveal via IntersectionObserver ──────────────────────────────────

  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  // Stagger siblings within the same parent section
  revealElements.forEach(function (el) {
    const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
    const index = siblings.indexOf(el);
    if (index > 0) {
      el.style.transitionDelay = (index * 180) + 'ms';
    }
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  // ── Hide scroll hint after first scroll ─────────────────────────────────────

  var hint = document.querySelector('.hero-scroll-hint');
  if (hint) {
    window.addEventListener('scroll', function onScroll() {
      if (window.scrollY > 80) {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 0.6s ease';
        window.removeEventListener('scroll', onScroll);
      }
    }, { passive: true });
  }

  // ── Spotify bar close button ─────────────────────────────────────────────────

  var spotifyClose = document.getElementById('spotify-close');
  var spotifyBar   = document.getElementById('spotify-bar');

  if (spotifyClose && spotifyBar) {
    spotifyClose.addEventListener('click', function () {
      spotifyBar.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      spotifyBar.style.opacity = '0';
      spotifyBar.style.transform = 'translateY(100%)';
      setTimeout(function () { spotifyBar.style.display = 'none'; }, 400);
    });
  }

})();
