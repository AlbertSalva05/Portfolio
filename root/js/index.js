'use strict';

/* =========================================================
   APP CONFIG
========================================================= */

const CONFIG = {
    visibleSkills: 5,
    animationDelay: 80,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};

/* =========================================================
   APP INIT
========================================================= */


document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    initNavigation();
    initHero();
    initRevealAnimations();
    initCounters();
    initFaq();
    initProcessSection();
    initSkillsSection();
    initExpertiseSection();
    initTechStack();
    initPerformanceSection();
    initContactForm();
    initScrollTop();
    initCvDownload();

    /* ✅ Slick MUST be deferred */
    initDeferredProjects();
    initDeferredTestimonials();
}


/* =========================================================
   SHARED OBSERVER
========================================================= */

function createObserver(callback, options = {}) {
    return new IntersectionObserver(callback, options);
}


/* =========================================================
   SLICK ASSET LOADER (ONCE)
========================================================= */

let slickLoaded = false;

function loadCSS(href) {
    return new Promise(resolve => {
        if (document.querySelector(`link[href="${href}"]`)) return resolve();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        document.head.appendChild(link);
    });
}

function loadScript(src) {
    return new Promise(resolve => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = resolve;
        document.body.appendChild(script);
    });
}

function loadSlickAssets() {
    if (slickLoaded) return Promise.resolve();

    return Promise.all([
        loadCSS('/css/slick/slick.css'),
        loadCSS('/css/slick/slick-theme.css'),
        loadScript('/js/slick/slick.min.js')
    ]).then(() => slickLoaded = true);
}

/* =========================================================
   DEFER PROJECTS SLIDER
========================================================= */

function initDeferredProjects() {

    const slider = document.querySelector('.js-project-slider');
    if (!slider) return;

    let triggered = false;

    const observer = createObserver((entries, obs) => {
        if (!entries[0].isIntersecting || triggered) return;

        triggered = true;

        loadSlickAssets().then(initProjects);
        obs.disconnect();

    }, {
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.1
    });

    observer.observe(slider);
}

/* =========================================================
   DEFER TESTIMONIALS SLIDER
========================================================= */

function initDeferredTestimonials() {

    const slider = document.getElementById('js-testimonials-slider');
    if (!slider) return;

    let triggered = false;

    const observer = createObserver((entries, obs) => {
        if (!entries[0].isIntersecting || triggered) return;

        triggered = true;

        loadSlickAssets().then(initTestimonials);
        obs.disconnect();

    }, {
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.1
    });

    observer.observe(slider);
}


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    const nav = document.getElementById('js-nav');
    const menu = document.getElementById('js-menu');
    const toggle = document.getElementById('js-toggle');
    const links = document.querySelectorAll('.c-nav__link');

    if (!nav || !menu || !toggle) return;

    function setMenuState(isOpen) {
        menu.classList.toggle('is-active', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.classList.toggle('is-menu-open', isOpen);
    }

    toggle.addEventListener('click', () => {
        setMenuState(!menu.classList.contains('is-active'));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setMenuState(false);
        }
    });

    links.forEach(link => {

        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);

        if (!target) return;

        link.addEventListener('click', (e) => {
            e.preventDefault();

            const navHeight = nav.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: CONFIG.reducedMotion ? 'auto' : 'smooth'
            });

            setMenuState(false);
        });
    });

    const sections = [...links]
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const observer = createObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const id = entry.target.id;

            links.forEach(link => {
                link.classList.toggle(
                    'is-active',
                    link.getAttribute('href') === `#${id}`
                );
            });
        });

    }, {
        rootMargin: `-${nav.offsetHeight}px 0px -60% 0px`,
        threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
}

/* =========================================================
   HERO
========================================================= */

function initHero() {

    const hero = document.querySelector('.c-hero');
    const typingTarget = document.getElementById('typing-text');

    if (!hero) return;

    const observer = createObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            hero.classList.add('is-visible');

            obs.disconnect();
        });

    }, {
        threshold: 0.1
    });

    observer.observe(hero);

    if (!typingTarget || CONFIG.reducedMotion) return;

    const text = `A Senior Lead Developer\nand an aspiring Web Designer`;

    let index = 0;

    function type() {

        if (index >= text.length) return;

        typingTarget.textContent += text.charAt(index);
        index++;

        setTimeout(type, 35);
    }

    type();
}

/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const revealElements = document.querySelectorAll(
        '.c-about, .c-process, .c-performance, .c-testimonials, .c-projects'
    );

    const observer = createObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');

            obs.unobserve(entry.target);
        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));
}

/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters = document.querySelectorAll('[data-target]');

    if (!counters.length) return;

    const observer = createObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            animateCounter(entry.target);

            obs.unobserve(entry.target);
        });

    }, {
        threshold: 0.3
    });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {

    const target = Number(counter.dataset.target);
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {

        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);

        counter.textContent = `${value}+`;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* =========================================================
   FAQ
========================================================= */

async function initFaq() {

    const accordion = document.getElementById('js-faq-accordion');

    if (!accordion) return;

    try {

        const data = await fetchJSON('./js/faq.json');
        injectFaqSchema(data);

        const fragment = document.createDocumentFragment();

        data.forEach((item, index) => {

            const div = document.createElement('div');
            div.className = 'c-faq__item';
            div.style.setProperty('--delay', `${index * 70}ms`);

            div.innerHTML = `
                <button
                    class="c-faq__question"
                    aria-expanded="false"
                >
                    ${item.question}
                    <span class="c-faq__icon"></span>
                </button>

                <div class="c-faq__answer">
                    <div class="c-faq__answer-inner">
                        ${item.answer}
                    </div>
                </div>
            `;

            fragment.appendChild(div);
        });

        accordion.replaceChildren(fragment);

        accordion.addEventListener('click', (e) => {

            const button = e.target.closest('.c-faq__question');

            if (!button) return;

            const item = button.closest('.c-faq__item');
            const isOpen = item.classList.contains('is-open');

            accordion.querySelectorAll('.c-faq__item').forEach(el => {
                el.classList.remove('is-open');
                el.querySelector('.c-faq__question')
                    .setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
            }
        });

    } catch (err) {
        console.error('[FAQ ERROR]', err);
    }
}

/* =========================================================
   PROCESS
========================================================= */

async function initProcessSection() {

    const grid = document.getElementById('js-process-grid');

    if (!grid) return;

    try {

        const data = await fetchJSON('./js/process.json');

        const fragment = document.createDocumentFragment();

        data.forEach((item, index) => {

            const card = document.createElement('div');

            card.className = 'c-process__card';
            card.style.setProperty('--delay', `${index * 80}ms`);

            card.innerHTML = `
                <span class="c-process__step">${item.step}</span>
                <h3 class="c-process__card-title">${item.title}</h3>
                <p class="c-process__text">${item.description}</p>
            `;

            requestAnimationFrame(() => {
                card.classList.add('is-visible');
            });

            fragment.appendChild(card);
        });

        grid.replaceChildren(fragment);

    } catch (err) {
        console.error('[PROCESS ERROR]', err);
    }
}

/* =========================================================
   SKILLS
========================================================= */

async function initSkillsSection() {

    const grid = document.getElementById('js-skills-grid');

    if (!grid) return;

    try {

        const data = await fetchJSON('./js/skills.json');

        const fragment = document.createDocumentFragment();

        data.forEach((item, index) => {

            const li = document.createElement('li');

            li.className = 'c-about__skill-card';
            li.style.setProperty('--delay', `${index * 80}ms`);

            li.innerHTML = `
                <div class="c-about__icon">
                    <img
                        src="${item.icon}"
                        alt="${item.label}"
                        width="40"
                        height="40"
                        loading="lazy"
                        decoding="async"
                    >
                </div>

                <span>${item.label}</span>
            `;

            fragment.appendChild(li);
        });

        grid.replaceChildren(fragment);

    } catch (err) {
        console.error('[SKILLS ERROR]', err);
    }
}

/* =========================================================
   EXPERTISE
========================================================= */

async function initExpertiseSection() {

    const grid = document.getElementById('js-expertise-grid');
    const modal = document.getElementById('js-expertise-modal');

    if (!grid || !modal) return;

    const modalTitle = document.getElementById('js-modal-title');
    const modalText = document.getElementById('js-modal-text');
    const modalIcon = document.getElementById('js-modal-icon');
    const modalClose = document.getElementById('js-modal-close');

    try {

        const data = await fetchJSON('./js/expertise9.json');

        const fragment = document.createDocumentFragment();

        data.forEach((item, index) => {

            const card = document.createElement('button');

            card.type = 'button';
            card.className = 'c-expertise__card';
            card.style.setProperty('--delay', `${index * 80}ms`);

            card.innerHTML = `
                <div class="c-expertise__icon">
                    <img
                        src="${item.icon}"
                        alt="${item.title}"
                        width="48"
                        height="48"
                        loading="lazy"
                    >
                </div>

                <h3 class="c-expertise__card-title">
                    ${item.title}
                </h3>
            `;

            requestAnimationFrame(() => {
                card.classList.add('is-visible');
            });

            card.addEventListener('click', () => {

                modalIcon.innerHTML = `
                    <img
                        src="${item.icon}"
                        alt="${item.title}"
                        width="56"
                        height="56"
                        loading="lazy"
                        decoding="async"
                    >
                `;

                modalTitle.textContent = item.title;
                modalText.innerHTML = item.description.replace(/\n/g, '<br>');

                modal.classList.add('is-active');
                trapFocus(modal);
                document.body.classList.add('is-modal-open');
            });

            fragment.appendChild(card);
        });

        grid.replaceChildren(fragment);

        function closeModal() {
            modal.classList.remove('is-active');
            document.body.classList.remove('is-modal-open');
        }

        modalClose?.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

    } catch (err) {
        console.error('[EXPERTISE ERROR]', err);
    }
}

/* =========================================================
   TECH STACK
========================================================= */

async function initTechStack() {

    const grid = document.getElementById('js-tech-stack-grid');
    const button = document.querySelector('.c--btn--my-skills');

    if (!grid || !button) return;

    try {

        const data = await fetchJSON('./js/tech_stack.json');

        let expanded = false;

        const fragment = document.createDocumentFragment();

        data.forEach((item, index) => {

            const card = document.createElement('div');

            card.className = `c-skill ${item.class || ''}`;

            if (index >= CONFIG.visibleSkills) {
                card.hidden = true;
            }

            card.innerHTML = `
                <div class="c-skill__header">
                    <div class="c-skill__icon">
                        <img
                            src="${item.icon}"
                            alt="${item.name}"
                            loading="lazy"
                            decoding="async"
                        >
                    </div>

                    <div class="c-skill__info">
                        <span class="c-skill__name">${item.name}</span>
                        <span class="c-skill__percent">${item.percent}%</span>
                    </div>
                </div>

                <div class="c-skill__bar">
                    <span
                        class="c-skill__progress"
                        style="width:${item.percent}%"
                    ></span>
                </div>
            `;

            fragment.appendChild(card);
        });

        grid.replaceChildren(fragment);

        button.addEventListener('click', () => {

            expanded = !expanded;

            grid.querySelectorAll('.c-skill').forEach((card, index) => {

                if (index < CONFIG.visibleSkills) return;

                card.hidden = !expanded;
            });

            button.textContent = expanded
                ? 'Show Less'
                : 'View More';
        });

    } catch (err) {
        console.error('[TECH STACK ERROR]', err);
    }
}

/* =========================================================
   PROJECTS SECTION
========================================================= */

async function initProjects() {

    const slider = document.querySelector('.js-project-slider');

    if (!slider) {
        console.error('[Projects] Slider not found');
        return;
    }

    try {

        const data = await fetchJSON('./js/projects.json');

        const fragment = document.createDocumentFragment();

        data.forEach((item, index) => {

            const tags = (item.tags || [])
                .map(tag => `<span>${tag}</span>`)
                .join('');

            const metrics = (item.metrics || [])
                .map(metric => `<span>${metric}</span>`)
                .join('');

            const card = document.createElement('div');

            card.className = 'c-projects__item';

            card.innerHTML = `
                <div class="c-projects__card">

                    <img
                        src="${item.image}"
                        alt="${item.title}"
                        class="c-projects__image"
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="450"
                    >

                    <div class="c-projects__content">

                        <h3 class="c-projects__name">
                            ${item.title}
                        </h3>

                        <p class="c-projects__desc">
                            ${item.description || ''}
                        </p>

                        <div class="c-projects__tags">
                            ${tags}
                        </div>

                        <div class="c-projects__metrics">
                            ${metrics}
                        </div>

                        <div class="c-projects__actions">

                            <a
                                href="${item.case || '#'}"
                                class="c-btn c-btn--primary c-btn--view"
                            >
                                View Case
                            </a>

                            <a
                                href="${item.live || '#'}"
                                class="c-btn c-btn--ghost c-btn--play"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Live
                            </a>

                        </div>

                    </div>

                </div>
            `;

            requestAnimationFrame(() => {
                card.classList.add('is-visible');
            });

            fragment.appendChild(card);
        });

        // =====================================
        // DESTROY EXISTING SLICK
        // =====================================

        const $slider = $('.js-project-slider');

        if ($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
        }

        // =====================================
        // INJECT CONTENT
        // =====================================

        slider.innerHTML = '';
        slider.appendChild(fragment);

        // =====================================
        // WAIT FOR DOM PAINT
        // =====================================

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                $slider.slick({

                    slidesToShow: 3,
                    slidesToScroll: 1,

                    arrows: true,
                    dots: true,

                    infinite: true,

                    autoplay: true,
                    autoplaySpeed: 5000,

                    speed: 600,

                    cssEase: 'cubic-bezier(.22,.61,.36,1)',

                    adaptiveHeight: false,

                    pauseOnHover: true,
                    pauseOnFocus: true,

                    lazyLoad: 'ondemand',

                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });

            });

        });

    } catch (err) {

        console.error('[Projects ERROR]', err);
    }
}

async function initTestimonials() {

    const slider = document.getElementById('js-testimonials-slider');

    if (!slider) {
        console.error('[Testimonials] Slider not found');
        return;
    }

    try {

        const data = await fetchJSON('./js/testimonials.json');

        const fragment = document.createDocumentFragment();

        data.forEach(item => {

            const card = document.createElement('div'); // ✅ Slick requires direct child divs

            card.className = 'c-testimonials__item';

            const stars = Array.from(
                { length: 5 },
                (_, i) => (i < item.rating ? '★' : '☆')
            ).join('');

            card.innerHTML = `
                <figure
                    class="c-testimonials__card"
                    itemscope
                    itemtype="https://schema.org/Review"
                >

                    <blockquote
                        class="c-testimonials__quote"
                        itemprop="reviewBody"
                    >
                        ${item.review}
                    </blockquote>

                    <figcaption
                        class="c-testimonials__author"
                        itemprop="author"
                        itemscope
                        itemtype="https://schema.org/Person"
                    >

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            width="80"
                            height="80"
                            loading="lazy"
                            decoding="async"
                        >

                        <div>
                            <strong itemprop="name">
                                ${item.name}
                            </strong>

                            <span itemprop="jobTitle">
                                ${item.role}
                            </span>
                        </div>

                    </figcaption>

                    <div class="c-testimonials__rating">
                        ${stars}
                    </div>

                </figure>
            `;

            fragment.appendChild(card);
        });

        // =====================================
        // DESTROY EXISTING SLICK INSTANCE
        // =====================================

        const $slider = $('#js-testimonials-slider');

        if ($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
        }

        // =====================================
        // INJECT CONTENT
        // =====================================

        slider.innerHTML = '';
        slider.appendChild(fragment);

        // =====================================
        // WAIT FOR DOM PAINT (CRITICAL)
        // =====================================

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {

                $slider.slick({

                    slidesToShow: 1,
                    slidesToScroll: 1,

                    arrows: true,
                    dots: true,

                    infinite: true,

                    autoplay: true,
                    autoplaySpeed: 6000,

                    speed: 550,
                    cssEase: 'cubic-bezier(.22,.61,.36,1)',

                    adaptiveHeight: true,

                    pauseOnHover: true,
                    pauseOnFocus: true,

                    lazyLoad: 'ondemand',

                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });

            });
        });

    } catch (err) {
        console.error('[TESTIMONIALS ERROR]', err);
    }
}

/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form = document.getElementById('js-contact-form');

    if (!form) return;

    const button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const requiredFields = form.querySelectorAll('[required]');

        let valid = true;

        requiredFields.forEach(field => {

            field.classList.remove('is-error');

            if (!field.value.trim()) {
                field.classList.add('is-error');
                valid = false;
            }
        });

        if (!valid) return;

        const originalText = button.textContent;

        button.disabled = true;
        button.textContent = 'Sending...';

        try {

            const formData = new FormData(form);

            await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formData).toString()
            });

            form.reset();

            openSuccessModal();

        } catch (err) {
            console.error('[FORM ERROR]', err);
            alert('Failed to send message.');
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    });
}

/* =========================================================
   SUCCESS MODAL
========================================================= */

function openSuccessModal() {

    const modal = document.getElementById('js-success-modal');
    const close = document.getElementById('js-close-modal');

    if (!modal || !close) return;

    modal.classList.add('is-active');

    function closeModal() {
        modal.classList.remove('is-active');
    }

    close.addEventListener('click', closeModal, { once: true });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    }, { once: true });
}

/* =========================================================
   SCROLL TOP
========================================================= */

function initScrollTop() {

    const button = document.getElementById('js-scroll-top');
    const hero = document.querySelector('.c-hero');

    if (!button || !hero) return;

    const observer = createObserver((entries) => {

        entries.forEach(entry => {

            button.classList.toggle(
                'is-visible',
                !entry.isIntersecting
            );
        });

    }, {
        threshold: 0.1
    });

    observer.observe(hero);

    button.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: CONFIG.reducedMotion ? 'auto' : 'smooth'
        });
    });
}

/* =========================================================
   HELPERS
========================================================= */

async function fetchJSON(url) {

    const response = await fetch(url, {
        cache: 'force-cache'
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    return response.json();
}



/* =========================================================
   PERFORMANCE SECTION
========================================================= */

function initPerformanceSection() {

    const section = document.querySelector('.c-performance');

    if (!section) return;

    const metrics = section.querySelectorAll(
        '.c-performance__metric'
    );

    const counters = section.querySelectorAll(
        '.c-performance__number'
    );

    const bars = section.querySelectorAll(
        '.c-performance__bar'
    );

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            // =====================================
            // METRICS
            // =====================================

            metrics.forEach((metric, index) => {

                metric.style.setProperty(
                    '--delay',
                    `${index * 120}ms`
                );

                setTimeout(() => {

                    requestAnimationFrame(() => {
                        metric.classList.add('is-visible');
                    });

                }, index * 120);

            });

            // =====================================
            // COUNTERS
            // =====================================

            counters.forEach((counter, index) => {

                setTimeout(() => {
                    animateCounter(counter);
                }, index * 180);

            });

            // =====================================
            // BARS
            // =====================================

            bars.forEach((bar, index) => {

                bar.style.setProperty(
                    '--delay',
                    `${index * 150}ms`
                );

                setTimeout(() => {

                    requestAnimationFrame(() => {

                        // reveal wrapper
                        bar.classList.add('is-visible');

                        // animate fill
                        const fill = bar.querySelector(
                            '.c-performance__bar-fill'
                        );

                        if (fill) {

                            const width =
                                fill.dataset.width || '0%';

                            fill.style.width = width;
                        }

                    });

                }, index * 150);

            });

            obs.unobserve(section);

        });

    }, {
        threshold: 0.25,
        rootMargin: '0px 0px -10% 0px'
    });

    observer.observe(section);

    if (CONFIG.reducedMotion) {
        metrics.forEach(m => m.classList.add('is-visible'));
        bars.forEach(bar => {
            bar.classList.add('is-visible');
            const fill = bar.querySelector('.c-performance__bar-fill');
            if (fill) fill.style.width = fill.dataset.width || '0%';
        });
    return;
    }

}

/* =========================================================
   CV DOWNLOAD TRACKING
========================================================= */

function initCvDownload() {

    const button = document.querySelector('.c-btn--download');

    if (!button) return;

    button.addEventListener('click', () => {

        if (typeof gtag === 'function') {

            gtag('event', 'download_cv', {
                event_category: 'engagement',
                event_label: 'CV Download',
                value: 1
            });
        }
    });
}

/* =========================================================
   ACCESSIBILITY IMPROVEMENTS
========================================================= */

function trapFocus(modal) {

    const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea',
        'input',
        'select'
    ];

    const focusable = modal.querySelectorAll(
        focusableSelectors.join(',')
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    modal.addEventListener('keydown', (e) => {

        if (e.key !== 'Tab') return;

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }

        else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
}

/* =========================================================
   FAQ JSON-LD SEO
========================================================= */

function injectFaqSchema(data) {

    if (!Array.isArray(data) || !data.length) return;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
            }
        }))
    };

    const script = document.createElement('script');

    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);

    document.head.appendChild(script);
}