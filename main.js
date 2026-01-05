/* ================= DOM READY ================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ===== Anime.js Text Animation ===== */
  if (window.anime && anime.splitText) {
    const { animate, splitText, stagger } = anime;

    const text1 = document.querySelector('.home__profession-1');
    const text2 = document.querySelector('.home__profession-2');

    if (text1 && text2) {
      const { chars: chars1 } = splitText(text1, { chars: true });
      const { chars: chars2 } = splitText(text2, { chars: true });

      animate(chars1, {
        y: [
          { to: ['100%', '0%'] },
          { to: '-100%', delay: 750, ease: 'in(3)' }
        ],
        duration: 900,
        ease: 'out(3)',
        delay: stagger(80),
        loop: true
      });

      animate(chars2, {
        y: [
          { to: ['100%', '0%'] },
          { to: '-100%', delay: 750, ease: 'in(3)' }
        ],
        duration: 900,
        ease: 'out(3)',
        delay: stagger(80),
        loop: true
      });
    }
  }

  /* ===== Swiper Projects ===== */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.projects__swiper', {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 'auto',
      grabCursor: true,
      speed: 600,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      }
    });
  }

  /* ===== Work Tabs ===== */
  const tabs = document.querySelectorAll('[data-target]');
  const tabContents = document.querySelectorAll('[data-content]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.target);
      if (!target) return;

      tabContents.forEach(c => c.classList.remove('work-active'));
      tabs.forEach(t => t.classList.remove('work-active'));

      tab.classList.add('work-active');
      target.classList.add('work-active');
    });
  });

  /* ===== Services Accordion ===== */
  const serviceCards = document.querySelectorAll('.services__card');

  serviceCards.forEach(card => {
    const btn = card.querySelector('.services__button');
    const info = card.querySelector('.services__info');

    if (!btn || !info) return;

    info.style.height = '0px';
    card.classList.add('services-close');

    btn.addEventListener('click', () => {
      serviceCards.forEach(c => {
        c.classList.remove('services-open');
        c.classList.add('services-close');
        const i = c.querySelector('.services__info');
        if (i) i.style.height = '0px';
      });

      card.classList.toggle('services-open');
      card.classList.toggle('services-close');
      info.style.height = card.classList.contains('services-open')
        ? info.scrollHeight + 'px'
        : '0px';
    });
  });

});

/* ===== Testimonials Infinite Scroll ===== */
const tracks = document.querySelectorAll('.testimonials__content');
tracks.forEach(track => {
  const cards = [...track.children];
  cards.forEach(card => track.appendChild(card.cloneNode(true)));
});

/* ===== Copy Email ===== */
const copyBtn = document.getElementById('contact-btn');
const emailEl = document.getElementById('contact-email');

if (copyBtn && emailEl) {
  const email = emailEl.textContent;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
      copyBtn.innerHTML = 'Email Copied <i class="ri-check-line"></i>';

      setTimeout(() => {
        copyBtn.innerHTML = 'Copy Email <i class="ri-file-copy-line"></i>';
      }, 2000);
    });
  });
}

/* ===== Footer Year ===== */
const textYear = document.getElementById('footer-year');
if (textYear) {
  textYear.textContent = new Date().getFullYear();
}

/* ===== Active Nav Link on Scroll ===== */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const top = section.offsetTop - 60;
    const height = section.offsetHeight;
    const id = section.id;
    const link = document.querySelector(`.nav__menu a[href="#${id}"]`);

    if (!link) return;

    link.classList.toggle(
      'active-link',
      scrollY > top && scrollY <= top + height
    );
  });
};
window.addEventListener('scroll', scrollActive);

/* ===== Custom Cursor ===== */
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;

if (cursor) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const cursorMove = () => {
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    cursor.style.transform = 'translate(-50%, -50%)';
    requestAnimationFrame(cursorMove);
  };
  cursorMove();

  document.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseenter', () => cursor.classList.add('hide-cursor'));
    a.addEventListener('mouseleave', () => cursor.classList.remove('hide-cursor'));
  });
}

/* ===== Scroll Reveal ===== */
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 300
  });

  sr.reveal('.home__image, .projects__container, .work__container, .testimonials__container, .contact__container');
  sr.reveal('.home__data', { delay: 900, origin: 'bottom' });
  sr.reveal('.home__info', { delay: 1200, origin: 'bottom' });
  sr.reveal('.home__social, .home__cv', { delay: 1500 });
  sr.reveal('.about__data', { origin: 'left' });
  sr.reveal('.about__image', { origin: 'right' });
  sr.reveal('.services__card', { interval: 100 });
}
