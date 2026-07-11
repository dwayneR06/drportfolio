// ============================================
// PORTFOLIO - LENA VOSS — main.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Active Nav Link ----
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Intersection Observer — fade-in ----
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ---- Stagger fade children ----
  document.querySelectorAll('.stagger').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 90}ms`;
    });
  });

  // ---- Contact form ----
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
      const status = document.getElementById('form-status');

      if (!name || !email || !message) {
        showStatus(status, 'Please fill in all fields.', false);
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus(status, 'Please enter a valid email address.', false);
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        showStatus(status, '✓ Message sent! I\'ll get back to you within 24 hours.', true);
      }, 1200);
    });
  }

});

function showStatus(el, msg, success) {
  if (!el) return;
  el.textContent = msg;
  el.style.marginTop = '1rem';
  el.style.padding = '0.75rem 1rem';
  el.style.borderRadius = '2px';
  el.style.fontSize = '0.875rem';
  el.style.background = success ? '#e6f4ea' : '#fdecea';
  el.style.color = success ? '#2a7f3f' : '#c8553d';
  el.style.border = success ? '1px solid #b6dfbf' : '1px solid #f5c6c0';
  el.style.display = 'block';
}