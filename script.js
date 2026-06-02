// Navigation scroll effect
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// Stagger hero reveals on load
window.addEventListener('load', () => {
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
  });
});

// Dynamic speed lines
function createSpeedLine() {
  const container = document.querySelector('.speed-lines');
  if (!container) return;

  const line = document.createElement('div');
  line.style.cssText = `
    position: absolute;
    height: 1px;
    width: ${100 + Math.random() * 200}px;
    background: linear-gradient(90deg, transparent, rgba(255, 209, 0, ${0.1 + Math.random() * 0.2}), transparent);
    top: ${Math.random() * 100}%;
    left: -300px;
    animation: speedLineMove ${1.5 + Math.random() * 2}s linear forwards;
  `;
  container.appendChild(line);

  setTimeout(() => line.remove(), 4000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes speedLineMove {
    to { transform: translateX(calc(100vw + 600px)); }
  }
`;
document.head.appendChild(style);

setInterval(createSpeedLine, 800);

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = navLinks.querySelectorAll('a:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.style.color = item.getAttribute('href') === `#${current}` ? 'var(--yellow)' : '';
  });
});

// Instagram — open app on mobile, web on desktop
const INSTAGRAM_USER = 'dheeraj_skillsusa';
const INSTAGRAM_WEB = `https://instagram.com/${INSTAGRAM_USER}`;
const INSTAGRAM_APP = `instagram://user?username=${INSTAGRAM_USER}`;

const instagramLink = document.getElementById('instagramLink');
if (instagramLink) {
  instagramLink.addEventListener('click', (e) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      e.preventDefault();
      window.location.href = INSTAGRAM_APP;
      setTimeout(() => { window.location.href = INSTAGRAM_WEB; }, 500);
    }
  });
}
