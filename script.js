const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');
const allLinks = document.querySelectorAll('.nav-links a, .mobile-drawer a');
const sections = document.querySelectorAll('section[id]');

// Scroll: toggle navbar style
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Active section highlight
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      allLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Click handlers
allLinks.forEach(link => {
  link.addEventListener('click', () => {
    allLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    mobileDrawer.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const open = mobileDrawer.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

// Close drawer when clicking outside
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    mobileDrawer.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});