'use strict';

const iconPaths = {
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  'arrow-down-right': '<path d="m5 5 14 14M7 19h12V7"/>',
  'arrow-up': '<path d="M12 20V4m-7 7 7-7 7 7"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  sparkles: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4"/>',
  'heart-handshake': '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  'calendar-heart': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-6 4-3 3-3-3"/>',
  'calendar-plus': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-9 3v5m-2.5-2.5h5"/>',
  'map-pin': '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  navigation: '<path d="m21 3-6 18-4-8-8-4Z"/>',
  luggage: '<rect x="5" y="6" width="14" height="14" rx="2"/><path d="M9 6V3h6v3M9 10v6m6-6v6M8 20v2m8-2v2"/>',
  camera: '<path d="m14 4 2 3h4a1 1 0 0 1 1 1v11H3V8a1 1 0 0 1 1-1h4l2-3Z"/><circle cx="12" cy="13" r="3"/>'
};

// Render the original HTML's icons without an external script.
document.querySelectorAll('[data-lucide]').forEach(placeholder => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const attributes = {
    viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': '1.5', 'stroke-linecap': 'round',
    'stroke-linejoin': 'round', 'aria-hidden': 'true', class: placeholder.className
  };
  Object.entries(attributes).forEach(([name, value]) => svg.setAttribute(name, value));
  svg.innerHTML = iconPaths[placeholder.dataset.lucide] || iconPaths.heart;
  placeholder.replaceWith(svg);
});

const menu = document.querySelector('#mobileMenu');
const menuButton = document.querySelector('#mobileMenuBtn');
const photoDialog = document.querySelector('#photo-dialog');
const siteNav = document.querySelector('.site-nav');

let navScrollFrame = 0;
function updateNavGlass() {
  navScrollFrame = 0;
  const amount = Math.min(Math.max(window.scrollY, 0) / 120, 1);
  siteNav.style.setProperty('--scroll-glass', amount.toFixed(3));
  siteNav.classList.toggle('is-scrolled', amount > 0);
}
window.addEventListener('scroll', () => {
  if (!navScrollFrame) navScrollFrame = requestAnimationFrame(updateNavGlass);
}, { passive: true });
updateNavGlass();

function syncModalState() {
  document.documentElement.classList.toggle('modal-open', Boolean(document.querySelector('dialog[open]')));
  menuButton.setAttribute('aria-expanded', String(menu.open));
}
menuButton.addEventListener('click', () => {
  menu.showModal();
  syncModalState();
});
document.querySelector('#closeMobileMenu').addEventListener('click', () => menu.close());
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));
[menu, photoDialog].forEach(dialog => {
  dialog.addEventListener('close', syncModalState);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', event => {
  if (event.matches && menu.open) menu.close();
});

// Use calendar days in São Paulo while the event time is still pending.
function updateDayCount() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: 'numeric', day: 'numeric'
  }).formatToParts(new Date());
  const date = Object.fromEntries(parts.map(part => [part.type, part.value]));
  const today = Date.UTC(Number(date.year), Number(date.month) - 1, Number(date.day));
  const days = Math.round((Date.UTC(2026, 11, 5) - today) / 86400000);
  const label = document.querySelector('#countdown-label');
  const number = document.querySelector('#countdown-days');
  const unit = document.querySelector('#countdown-unit');
  if (days > 0) {
    label.textContent = days === 1 ? 'Falta' : 'Faltam';
    number.textContent = days;
    unit.textContent = days === 1 ? 'dia para o nosso encontro' : 'dias para o nosso encontro';
  } else {
    label.textContent = days === 0 ? 'É hoje! Vamos celebrar juntos.' : 'Um encontro para guardar no coração.';
    number.textContent = '';
    unit.textContent = '';
  }
}
updateDayCount();
setInterval(updateDayCount, 60000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateDayCount();
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-enabled');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal-up:not(.active)').forEach(element => observer.observe(element));
}

const photos = Array.from(document.querySelectorAll('.album-photo')).map(button => ({
  id: button.dataset.photo,
  src: button.querySelector('img').getAttribute('src'),
  alt: button.querySelector('img').alt,
  caption: button.querySelector('span').textContent.trim()
}));
let activePhoto = 0;

function renderPhoto() {
  const photo = photos[activePhoto];
  const image = document.querySelector('#lightbox-photo');
  image.src = photo.src;
  image.alt = photo.alt;
  document.querySelector('#lightbox-caption').textContent = photo.caption;
  document.querySelector('#lightbox-position').textContent = (activePhoto + 1) + ' de ' + photos.length;
}
function changePhoto(step) {
  activePhoto = (activePhoto + step + photos.length) % photos.length;
  renderPhoto();
}
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    activePhoto = photos.findIndex(photo => photo.id === button.dataset.photo);
    renderPhoto();
    photoDialog.showModal();
    syncModalState();
  });
});
document.querySelector('.lightbox-close').addEventListener('click', () => photoDialog.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => changePhoto(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => changePhoto(1));
photoDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    changePhoto(event.key === 'ArrowLeft' ? -1 : 1);
  }
});

let notificationTimer;
const pixCode = '00020126330014br.gov.bcb.pix0111283252088055204000053039865802BR5909ALELAVISH6009Sao Paulo610901227-20062220518daqr468658179644346304B9AB';
function notify(message) {
  const notification = document.querySelector('#notification');
  clearTimeout(notificationTimer);
  notification.textContent = message;
  notification.classList.add('visible');
  notificationTimer = setTimeout(() => notification.classList.remove('visible'), 6000);
}
function copyWithSelection(key) {
  const field = document.createElement('textarea');
  field.value = key;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;top:0;left:-9999px';
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand('copy');
  field.remove();
  document.querySelector('#copy-pix').focus({ preventScroll: true });
  return copied;
}
document.querySelector('#copy-pix').addEventListener('click', async () => {
  let copied = false;
  try {
    await navigator.clipboard.writeText(pixCode);
    copied = true;
  } catch {
    try {
      copied = copyWithSelection(pixCode);
    } catch {
      copied = false;
    }
  }
  if (copied) {
    notify('Código Pix copiado. Agora é só colar no aplicativo do seu banco.');
  } else {
    notify('Não foi possível copiar o código Pix. Tente novamente ou escaneie o QR Code.');
  }
});
