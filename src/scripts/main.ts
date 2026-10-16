/**
 * Interacciones del sitio (sin dependencias). Todo es mejora progresiva:
 * sin JavaScript el contenido y los enlaces siguen funcionando.
 */
import { buildMessage, cleanName } from './message';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Header: sombra al desplazarse ---------- */
function initHeader() {
  const header = $('[data-header]');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Menú móvil accesible ---------- */
function initMenu() {
  const toggle = $<HTMLButtonElement>('[data-menu-toggle]');
  const menu = $('[data-menu]');
  const label = $('[data-menu-label]');
  if (!toggle || !menu) return;

  const setOpen = (open: boolean, returnFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    if (label) label.textContent = open ? 'Cerrar menú' : 'Abrir menú';
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('a', menu)?.focus();
    else if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('[data-menu-link]', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  // Mantiene el foco entre el botón y el menú abierto (Tab / Shift+Tab).
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || toggle.getAttribute('aria-expanded') !== 'true') return;
    const items = $$<HTMLElement>('a, button', menu);
    const last = items[items.length - 1];
    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      toggle.focus();
    } else if (e.shiftKey && document.activeElement === toggle) {
      e.preventDefault();
      last?.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (m) => m.matches && setOpen(false));
}

/* ---------- Filtros de servicios ---------- */
function initFilters() {
  const bar = $('[data-filters]');
  const grid = $('.services__grid');
  const status = $('[data-filter-status]');
  if (!bar || !grid) return;
  bar.hidden = false;
  const buttons = $$<HTMLButtonElement>('[data-filter]', bar);
  const cards = $$<HTMLElement>('[data-category]', grid);

  const apply = (filter: string, announce = true) => {
    let shown = 0;
    cards.forEach((c) => {
      const match = filter === 'all' || c.dataset.category === filter;
      c.hidden = !match;
      if (match) {
        shown++;
        c.classList.add('is-visible');
      }
    });
    grid.classList.toggle('is-filtered', filter !== 'all');
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
    if (status && announce) status.textContent = `Mostrando ${shown} ${shown === 1 ? 'servicio' : 'servicios'}.`;
  };

  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter ?? 'all')));
  // Accesos rápidos que preseleccionan una categoría.
  $$<HTMLAnchorElement>('[data-filter-link]').forEach((a) =>
    a.addEventListener('click', () => apply(a.dataset.filterLink ?? 'all', false)),
  );
}

/* ---------- Aparición suave al entrar en pantalla ---------- */
function initReveal() {
  const els = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  const vh = window.innerHeight;
  els.forEach((el) => {
    // Solo se ocultan los elementos fuera de pantalla: nada parpadea al cargar.
    if (el.getBoundingClientRect().top > vh) {
      el.classList.add('will-reveal');
      io.observe(el);
    }
  });
}

/* ---------- Mapa bajo demanda (privacidad y rendimiento) ---------- */
function initMap() {
  const wrap = $('[data-map]');
  const btn = $<HTMLButtonElement>('[data-map-load]');
  if (!wrap || !btn) return;
  btn.hidden = false;
  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = wrap.dataset.src ?? '';
    iframe.title = 'Mapa con la ubicación de CESDMA';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.setAttribute('allowfullscreen', '');
    wrap.append(iframe);
    $('.loc__map-facade', wrap)?.remove();
    iframe.focus();
  });
}

/* ---------- Asistente de mensaje de WhatsApp ---------- */
function initBuilder() {
  const form = $<HTMLFormElement>('[data-wa-builder]');
  if (!form) return;
  form.hidden = false;
  const select = $<HTMLSelectElement>('select[name="service"]', form)!;
  const nameInput = $<HTMLInputElement>('input[name="name"]', form)!;
  const preview = $('[data-preview]', form)!;
  const error = $('[data-error]', form)!;
  const number = form.dataset.number ?? '';

  const current = () => {
    const opt = select.selectedOptions[0];
    const time = (form.elements.namedItem('time') as RadioNodeList | null)?.value ?? '';
    return buildMessage({
      service: select.value ? (opt?.dataset.label ?? '') : '',
      name: cleanName(nameInput.value),
      time,
    });
  };
  const update = () => {
    preview.textContent = current();
    if (select.value) {
      error.hidden = true;
      select.removeAttribute('aria-invalid');
    }
  };
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!select.value) {
      error.hidden = false;
      select.setAttribute('aria-invalid', 'true');
      select.focus();
      return;
    }
    const url = `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(current())}`;
    track('asistente', select.value);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
  update();
}

/* ---------- Botón flotante ---------- */
function initFab() {
  const fab = $<HTMLAnchorElement>('[data-fab]');
  if (!fab) return;
  const hero = $('.hero');
  const threshold = () => (hero ? hero.offsetTop + hero.offsetHeight * 0.6 : 320);
  const onScroll = () => {
    const show = window.scrollY > threshold();
    fab.dataset.state = show ? 'visible' : 'hidden';
    fab.tabIndex = show ? 0 : -1;
    fab.toggleAttribute('aria-hidden', !show);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Sección activa en la navegación ---------- */
function initActiveNav() {
  const links = $$<HTMLAnchorElement>('.header__nav a[href^="/#"]');
  if (!links.length || location.pathname !== '/') return;
  const map = new Map(links.map((a) => [a.getAttribute('href')!.slice(2), a]));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const link = map.get(e.target.id);
        if (link) link.classList.toggle('is-active', e.isIntersecting);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  map.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

/* ---------- Carrusel del inicio ----------
 * Banner del inicio: cambia de imagen cada 3 segundos. Patrón de
 * carrusel de WAI-ARIA: se detiene al enfocar un elemento dentro, tiene
 * botón de pausa y no avanza solo si la persona pidió reducir el
 * movimiento.
 */
function initCarousel() {
  const root = $('[data-carousel]');
  if (!root) return;
  const slides = $$('[data-slide]', root);
  const track = $('[data-carousel-track]', root);
  const controls = $('[data-carousel-controls]', root);
  const play = $<HTMLButtonElement>('[data-carousel-play]', root);
  const dots = $$<HTMLButtonElement>('[data-carousel-dot]', root);
  if (slides.length < 2 || !track || !controls || !play) return;

  const INTERVAL = 3000;
  let current = 0;
  let playing = !reduceMotion;
  let focused = false;
  let timer = 0;

  const rotating = () => playing && !focused && !document.hidden;

  const show = (n: number) => {
    current = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      const active = i === current;
      s.classList.toggle('is-active', active);
      if (active) s.removeAttribute('aria-hidden');
      else s.setAttribute('aria-hidden', 'true');
    });
    dots.forEach((d, i) => d.setAttribute('aria-current', String(i === current)));
  };

  const sync = () => {
    window.clearInterval(timer);
    track.setAttribute('aria-live', rotating() ? 'off' : 'polite');
    if (rotating()) timer = window.setInterval(() => show(current + 1), INTERVAL);
  };

  const setPlaying = (value: boolean) => {
    playing = value;
    play.dataset.state = value ? 'playing' : 'paused';
    play.setAttribute('aria-label', value ? 'Pausar el carrusel' : 'Reproducir el carrusel');
    sync();
  };

  $('[data-carousel-prev]', root)?.addEventListener('click', () => {
    show(current - 1);
    sync();
  });
  $('[data-carousel-next]', root)?.addEventListener('click', () => {
    show(current + 1);
    sync();
  });
  dots.forEach((d, i) =>
    d.addEventListener('click', () => {
      show(i);
      sync();
    }),
  );
  play.addEventListener('click', () => setPlaying(!playing));

  root.addEventListener('focusin', () => {
    focused = true;
    sync();
  });
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget as Node | null)) {
      focused = false;
      sync();
    }
  });
  document.addEventListener('visibilitychange', sync);

  // Deslizar con el dedo en pantallas táctiles.
  let startX = 0;
  let startY = 0;
  root.addEventListener(
    'touchstart',
    (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true },
  );
  root.addEventListener(
    'touchend',
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        show(current + (dx < 0 ? 1 : -1));
        sync();
      }
    },
    { passive: true },
  );

  controls.hidden = false;
  setPlaying(playing);
}

/* ---------- Medición opcional de contactos ----------
 * No se envía nada a terceros. Emite un evento del navegador que una
 * herramienta de analítica respetuosa con la privacidad puede escuchar:
 *   window.addEventListener('cesdma:contact', (e) => ...e.detail)
 * Nunca incluye el texto del mensaje.
 */
function track(channel: string, context: string) {
  window.dispatchEvent(new CustomEvent('cesdma:contact', { detail: { channel, context } }));
}
function initTracking() {
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[data-wa], a[href^="tel:"]');
    if (!a) return;
    if (a.dataset.wa) track('whatsapp', a.dataset.wa);
    else track('telefono', 'tel');
  });
}

initHeader();
initMenu();
initCarousel();
initFilters();
initReveal();
initMap();
initBuilder();
initFab();
initActiveNav();
initTracking();
