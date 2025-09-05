const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const body = document.body;
const headerEl = document.querySelector('header');
const navList = nav ? nav.querySelector('ul') : null;

hamburger.addEventListener('click', () => {
    // compute header height first to avoid flicker/gap
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
    if (navList) navList.style.top = `${headerHeight}px`;

    nav.classList.toggle('active');

    const isOpen = nav.classList.contains('active');
    if (isOpen) {
        body.classList.add('menu-open');
    } else {
        body.classList.remove('menu-open');
        if (navList) navList.style.top = '';
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('active');
        body.classList.remove('menu-open');
        if (navList) navList.style.top = '';
    }
});

// Close menu on link click (useful on mobile)
nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        body.classList.remove('menu-open');
        if (navList) navList.style.top = '';
    });
});
