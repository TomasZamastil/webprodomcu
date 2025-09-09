const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const body = document.body;
const headerEl = document.querySelector('header');
const navList = nav ? nav.querySelector('ul') : null;

hamburger.addEventListener('click', () => {
    // compute header height first to avoid flicker/gap
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
    if (navList) {
        navList.style.top = `${headerHeight}px`;
        navList.style.maxHeight = `calc(100vh - ${headerHeight}px)`;
    }

    nav.classList.toggle('active');

    const isOpen = nav.classList.contains('active');
    if (isOpen) {
        body.classList.add('menu-open');
    } else {
        body.classList.remove('menu-open');
        if (navList) { navList.style.top = ''; navList.style.maxHeight = ''; }
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('active');
        body.classList.remove('menu-open');
        if (navList) { navList.style.top = ''; navList.style.maxHeight = ''; }
    }
});

// Close menu on link click (useful on mobile)
nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        body.classList.remove('menu-open');
        if (navList) { navList.style.top = ''; navList.style.maxHeight = ''; }
    });
});

// Recompute on resize (orientation change)
window.addEventListener('resize', () => {
    if (!nav.classList.contains('active')) return;
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
    if (navList) {
    	navList.style.top = `${headerHeight}px`;
    	navList.style.maxHeight = `calc(100vh - ${headerHeight}px)`;
    }
});

// === Quote generator (slova.html) ===
(() => {
    const quotes = [
        { text: "Pamatuj, že i ta nejtěžší hodina ve tvém životě, má jen 60 minut.", author: "Sofokles" },
        { text: "Věř, že to dokážeš, a už jen tím máš způli hotovo.", author: "Theodore Roosevelt" },
        { text: "Člověk není poražen, je-li sražen k zemi. Poražený bude jen když na té zemi zůstane.", author: "Zig Ziglar" },
        { text: "Dovolit si cítit je projevem síly, nikoli slabosti.", author: "Anna Taylor" },
        { text: "Naděje existuje, i když ti tvůj mozek říká, že ne.", author: "John Green" },
        { text: "Nejsi svou nemocí. Máš svůj vlastní příběh. Máš jméno, historii, osobnost. Zůstat sám sebou je součástí boje.", author: "Julian Seifter" },
        { text: "Sebepéče je způsob, jak získat svou sílu zpět.", author: "Lalah Delia" },
        { text: "Když dokážeme mluvit o svých pocitech, stanou se méně ohromujícími, méně znepokojivými a méně děsivými.", author: "Fred Rogers" },
        { text: "Štěstí lze nalézt i v těch nejtemnějších dobách, pokud si jen vzpomeneme rozsvítit světlo.", author: "J.K. Rowling" },
        { text: "Co si myslíš o sobě ty, je mnohem důležitější než to, co si o tobě myslí ostatní.", author: "Seneca" },
        { text: "Člověk pozná opravdové štěstí jen tehdy, pokud zažil velkou bolest.", author: "Liz Taylor" },
        { text: "Je jen jediný způsob, jak dosáhnout nemožného: věřit, že to možné je.", author: "Lewis Carroll" },
        { text: "Nezáleží na tom, jak pomalu jdeš, dokud se nezastavíš.", author: "Konfucius" },
        { text: "Kéž nám květiny připomenou, proč je déšť tak nezbytný.", author: "Xan Oku" },
        { text: "Vše, co mě stahovalo ke dnu, mě naučilo plavat.", author: "Jenim Dibie" },
        { text: "Možná bychom se měli naučit milovat sami sebe tak hlasitě, že to umlčí všechny naše nejistoty.", author: "Louise Kaufmann" },
        { text: "Nakonec vydržíme mnohem více, než si myslíme, že dokážeme.", author: "Frida Kahlo" },
        { text: "Existují dva způsoby, jak žít život. Ten první je myslet si, že nic není zázrak. Ten druhý je myslet si, že všechno je zázrak.", author: "Albert Einstein" },
        { text: "Z tvé zranitelnosti vzejde tvá síla.", author: "Sigmund Freud" },
        { text: "Proste, a bude vám dáno; hledejte, a naleznete; tlučte, a otevře se vám. Neboť každý, kdo prosí, dostává; kdo hledá, nalezne; a kdo tluče, tomu se otevře.", author: "Matouš 7:7–8" }
    ];

    function pickRandomQuote() {
        const idx = Math.floor(Math.random() * quotes.length);
        return quotes[idx];
    }

    function initQuoteGenerator() {
        const textEl = document.getElementById('quoteText');
        const btnEl = document.getElementById('generateQuote');
        const authorEl = document.getElementById('quoteAuthor');
        if (!textEl || !btnEl) return; // not on this page

        // placeholder on load; render real quote on click
        textEl.textContent = 'Vygeneruj si slovo na cestu';
        if (authorEl) authorEl.textContent = '';

        const spinnerEl = document.getElementById('quoteSpinner');
        const areaEl = document.getElementById('quoteArea');

        const reveal = (q) => {
            textEl.style.opacity = '0';
            if (authorEl) authorEl.style.opacity = '0';
            requestAnimationFrame(() => {
                textEl.textContent = `"${q.text}"`;
                if (authorEl) authorEl.textContent = q.author || 'neznámý autor';
                textEl.style.transition = 'opacity .25s ease';
                if (authorEl) authorEl.style.transition = 'opacity .25s ease';
                textEl.style.opacity = '1';
                if (authorEl) authorEl.style.opacity = '1';
            });
        };

        const render = () => {
            if (spinnerEl) spinnerEl.style.display = 'block';
            // brief dramatic delay
            setTimeout(() => {
                const q = pickRandomQuote();
                if (spinnerEl) spinnerEl.style.display = 'none';
                reveal(q);
            }, 650);
        };

        btnEl.addEventListener('click', render);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuoteGenerator);
    } else {
        initQuoteGenerator();
    }
})();
