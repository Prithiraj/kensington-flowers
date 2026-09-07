/* Progressive enhancement only. Content, contact links, FAQs and image links
   remain available without this file. There are no analytics or form submissions. */
(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  const mobileBar = document.querySelector('.mobile-actions');
  const setMenu = (open, returnFocus = false) => {
    if (!menu || !nav) return;
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    nav.classList.toggle('is-open', open);
    if (returnFocus) menu.focus();
  };
  if (menu && nav) {
    menu.hidden = false;
    menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });
    const desktop = window.matchMedia('(min-width: 701px)');
    desktop.addEventListener('change', () => setMenu(false));
    document.documentElement.classList.add('enhanced');
  }

  const filters = document.querySelector('.gallery-filters');
  const cards = Array.from(document.querySelectorAll('.gallery-card'));
  const live = document.querySelector('#gallery-status');
  if (filters && cards.length) {
    filters.hidden = false;
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-filter]');
      if (!button) return;
      filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let count = 0;
      cards.forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
        if (!card.hidden) count += 1;
      });
      if (live) live.textContent = `${count} illustrative ${count === 1 ? 'photograph' : 'photographs'} shown.`;
    });
  }

  const dialog = document.querySelector('#photo-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('.lightbox-image');
    const heading = dialog.querySelector('#photo-title');
    const caption = dialog.querySelector('.lightbox-caption');
    const close = dialog.querySelector('[data-close]');
    let active = null;
    const visibleLinks = () => Array.from(document.querySelectorAll('[data-gallery]')).filter(link => !link.closest('[hidden]'));
    const show = (link) => {
      active = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      heading.textContent = link.dataset.title;
      caption.textContent = `${link.dataset.credit}. Licensed illustrative photography, not Kensington's work. Full licence details are on the Photo credits page.`;
    };
    document.querySelectorAll('[data-gallery]').forEach(link => {
      link.addEventListener('click', (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        show(link);
        dialog.showModal();
        close.focus();
      });
    });
    const step = (direction) => {
      const links = visibleLinks();
      if (!links.length) return;
      show(links[(links.indexOf(active) + direction + links.length) % links.length]);
    };
    close.addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-previous]').addEventListener('click', () => step(-1));
    dialog.querySelector('[data-next]').addEventListener('click', () => step(1));
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    dialog.addEventListener('close', () => { if (active) active.focus(); });
  }

  const mapButton = document.querySelector('[data-load-map]');
  if (mapButton) {
    mapButton.hidden = false;
    mapButton.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.title = 'Map showing Kensington Dairy and Flowers, 708 Dominion Road, Mount Eden';
      frame.src = 'https://maps.google.com/maps?q=Kensington%20Dairy%20%26%20Flowers%20708%20Dominion%20Road%20Auckland&z=15&output=embed';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.allowFullscreen = true;
      mapButton.replaceWith(frame);
      frame.focus();
    }, { once: true });
  }

  // Avoid covering controls when a keyboard is open or an unusually short viewport is used.
  if (mobileBar && window.visualViewport) {
    const resize = () => mobileBar.classList.toggle('is-suppressed', window.visualViewport.height < 350);
    window.visualViewport.addEventListener('resize', resize);
    resize();
  }
})();
