// script starts here

// NAVIGATION
$(function() {
    const nav = $('.c-nav');

    $('.c-nav__menu-list a[href^="#"]').on('click', function(e) {

        const target = $($(this).attr('href'));
        if (!target.length) return;
        e.preventDefault();

        const navHeight = nav.outerHeight();
        const position = target.offset().top - navHeight;

        // Smooth scroll to target section
        $('html, body').animate({
            scrollTop: position
        }, 300);
    });
});


// MOBILE MENU
const toggle = document.getElementById("js-toggle");
const menu = document.getElementById("js-menu");
const nav = document.getElementById("js-nav");

function setMenuState(isOpen) {
    menu.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

toggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("is-active");
    setMenuState(!isOpen);
});

/* Smooth scroll + close menu safely */
document.querySelectorAll(".c-nav__link").forEach((link) => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;
        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        setMenuState(false);
    });
});

/* ESC to close */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        setMenuState(false);
    }
});


// c-hero animation
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".c-hero");

    if (!hero) return;

    const observerHero = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        hero.classList.add("is-visible");
                    });
                    observerHero.disconnect();
                }
            });
        }, {
            threshold: 0,
            rootMargin: "0px 0px -99% 0px"
        }
    );

    observerHero.observe(hero);
});

document.addEventListener("DOMContentLoaded", function () {

    const text = `A Senior Lead Developer
and an aspiring Web Designer`;

    const target = document.getElementById("typing-text");

    let index = 0;

    function type() {
        if (index < text.length) {
            target.textContent += text.charAt(index);
            index++;
            setTimeout(type, 35);
        }
    }

    type();
});

// Observe sections
document.addEventListener("DOMContentLoaded", () => {

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }

            });
        }, {
            threshold: 0.2,
            rootMargin: "0px 0px -10% 0px"
        }
    );

    // Observe sections
    document.querySelectorAll(".c-hero, .c-about").forEach((el) => {
        observer.observe(el);
    });

});


// observerAbout
document.addEventListener("DOMContentLoaded", () => {

	const aboutSection = document.querySelector('.c-about');

	const observerAbout = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
			}
		});
	});

	observerAbout.observe(aboutSection);

});


// statObserver
const statNumbers = document.querySelectorAll('.c-about__number');

const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            statNumbers.forEach(num => {
                const target = +num.getAttribute('data-target');
                let count = 0;

                const updateCount = () => {
                    const increment = target / 40;

                    if (count < target) {
                        count += increment;
                        num.innerText = Math.floor(count) + '+';
                        requestAnimationFrame(updateCount);
                    } else {
                        num.innerText = target + '+';
                    }
                };

                updateCount();
            });

            statObserver.disconnect(); // run once only
        }
    });
});

statObserver.observe(document.querySelector('.c-about__stats'));



// Modal trigger
document.querySelectorAll('.js-open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('modal').style.display = 'flex';
    });
});


// fetch and render process
document.addEventListener('DOMContentLoaded', () => {

    const grid = document.getElementById('js-process-grid');

    if (!grid) {
        console.error('[Process] Grid not found');
        return;
    }

    fetch('./js/process.json')
        .then(res => {
            if (!res.ok) throw new Error('Failed to load process.json');
            return res.json();
        })
        .then(data => {

            if (!Array.isArray(data) || data.length === 0) {
                console.warn('[Process] No data found');
                return;
            }

            const fragment = document.createDocumentFragment();

            data.forEach((item, index) => {

                const card = document.createElement('div');
                card.className = 'c-process__card';

                card.innerHTML = `
					<span class="c-process__step">${item.step}</span>
					<h3 class="c-process__card-title">${item.title}</h3>
					<p class="c-process__text">${item.description}</p>
				`;

                fragment.appendChild(card);

                // stagger animation
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        card.classList.add('is-visible');
                    }, index * 90);
                });
            });

            grid.innerHTML = '';
            grid.appendChild(fragment);
        })
        .catch(err => {
            console.error('[Process JSON Error]', err);
        });

});


document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('js-skills-grid');

    if (!grid) {
        console.error('[Skills] Grid not found');
        return;
    }

    fetch('./js/skills.json', { cache: 'force-cache' })
        .then(res => {
            if (!res.ok) throw new Error('Failed to load skills.json');
            return res.json();
        })
        .then(data => {

            if (!Array.isArray(data) || data.length === 0) {
                console.warn('[Skills] No data found');
                return;
            }

            const fragment = document.createDocumentFragment();

            data.forEach((item, index) => {

                // Basic validation (prevents runtime issues)
                if (!item.icon || !item.label) return;

                const li = document.createElement('li');
                li.className = 'c-about__skill-card';

                li.innerHTML = `
                    <div class="c-about__icon">
                        <img 
                            src="${item.icon}" 
                            alt="${item.label}" 
                            loading="lazy" 
                            width="40" 
                            height="40"
                        >
                    </div>
                    <span>${item.label}</span>
                `;

                fragment.appendChild(li);

                // stagger animation (GPU-friendly)
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        li.classList.add('is-visible');
                    }, index * 80);
                });
            });

            // Avoid multiple reflows
            grid.innerHTML = '';
            grid.appendChild(fragment);
        })
        .catch(err => {
            console.error('[Skills JSON Error]', err);
        });
});


//processObserver
document.addEventListener("DOMContentLoaded", () => {

	const processCards = document.querySelectorAll('.c-process__card');

	const processObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				processCards.forEach((card, index) => {
					setTimeout(() => {
						card.classList.add('is-visible');
					}, index * 120);
				});
				processObserver.disconnect();
			}
		});
	});

	processObserver.observe(document.querySelector('.c-process'));
});


//observerPerf
document.addEventListener("DOMContentLoaded", () => {

	const section = document.querySelector('.c-performance');
	const counters = document.querySelectorAll('.c-performance__number');
	const metrics = document.querySelectorAll('.c-performance__metric');
	const bars = document.querySelectorAll('.c-performance__bar');

	const observerPerf = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return;

			// stagger metric reveal
			metrics.forEach((el, i) => {
				setTimeout(() => {
					el.style.opacity = 1;
					el.style.transform = 'translateY(0)';
				}, i * 150);
			});

			// counters stagger
			counters.forEach((counter, i) => {
				setTimeout(() => animateCounter(counter), i * 200);
			});

			// bars stagger
			bars.forEach((bar, i) => {
				setTimeout(() => {
					bar.style.opacity = 1;
					bar.style.transform = 'translateY(0)';

					const fill = bar.querySelector('.c-performance__bar-fill');
					fill.style.width = fill.dataset.width;
				}, i * 250);
			});

			obs.disconnect();
		});
	}, {
		threshold: 0.4
	});

	observerPerf.observe(section);

	function animateCounter(counter) {
		const target = +counter.dataset.target;
		let current = 0;
		const duration = 1200;
		const start = performance.now();

		function update(now) {
			const progress = Math.min((now - start) / duration, 1);
			current = Math.floor(progress * target);
			counter.textContent = current;

			if (progress < 1) requestAnimationFrame(update);
		}

		requestAnimationFrame(update);
	}

});


// FAQ accordion
document.addEventListener("DOMContentLoaded", () => {
	const faqItems = document.querySelectorAll('.c-faq__item');

	faqItems.forEach(item => {
		const btn = item.querySelector('.c-faq__question');

		btn.addEventListener('click', () => {
			const isOpen = item.classList.contains('is-open');

			// close all
			faqItems.forEach(i => {
				i.classList.remove('is-open');
				i.querySelector('.c-faq__question').setAttribute('aria-expanded', 'false');
			});

			// open current if closed
			if (!isOpen) {
				item.classList.add('is-open');
				btn.setAttribute('aria-expanded', 'true');
			}
		});
	});
});


// contact
document.addEventListener("DOMContentLoaded", () => {

	const form = document.getElementById('js-contact-form');
	const modal = document.getElementById('js-success-modal');
	const closeModal = document.getElementById('js-close-modal');

	form.addEventListener('submit', function(e) {
		e.preventDefault();

		// Basic validation check
		const inputs = form.querySelectorAll('[required]');
		let valid = true;

		inputs.forEach(input => {
			if (!input.value.trim()) {
				valid = false;
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}
		});

		if (valid) {
			modal.style.display = 'flex';
			form.reset();
		}
	});

	// Close modal
	closeModal.addEventListener('click', () => {
		modal.style.display = 'none';
	});

	// Close modal on outside click
	window.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.style.display = 'none';
		}
	});

});

$(function() {
    const $btn = $('#js-scroll-top');
    const $about = $('#about');
    const $hero = $('.c-hero');
    const $footer = $('.c-footer');

    let aboutStarted = false;
    let footerVisible = false;
    let heroVisible = true;

    /* =========================
		UPDATE BUTTON STATE
       ========================= */
    function updateButtonState() {

        // HERO OVERRIDE (ALWAYS HIDE)
        if (heroVisible) {
            $btn.removeClass('is-visible is-in-footer');
            return;
        }

        // ABOUT RULE
        if (aboutStarted) {
            $btn.addClass('is-visible');
        } else {
            $btn.removeClass('is-visible is-in-footer');
            return;
        }

        // FOOTER RULE
        if (footerVisible) {
            $btn.addClass('is-in-footer');
        } else {
            $btn.removeClass('is-in-footer');
        }
    }

    /* =========================
        HERO OBSERVER (NEW)
       ========================= */
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            heroVisible = entry.isIntersecting;
            updateButtonState();
        });
    }, {
        threshold: 0.1,
        rootMargin: "-500px 0px 0px 0px"
    });

    if ($hero.length) heroObserver.observe($hero[0]);

    /* =========================
        ABOUT START DETECTION
       ========================= */
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                aboutStarted = true;
                updateButtonState();
            }
        });
    }, {
        threshold: 0,
    });

    if ($about.length) aboutObserver.observe($about[0]);

    /* =========================
        FOOTER OBSERVER
       ========================= */
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            footerVisible = entry.isIntersecting;
            updateButtonState();
        });
    }, {
        threshold: 0
    });

    if ($footer.length) footerObserver.observe($footer[0]);

    /* =========================
        SCROLL TO TOP
       ========================= */
    $btn.on('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


//expertise
document.addEventListener('DOMContentLoaded', function () {

    const grid = document.getElementById('js-expertise-grid');
    const modalExpertise = document.getElementById('js-expertise-modal');

    const modalIcon = document.getElementById('js-modal-icon');
    const modalTitle = document.getElementById('js-modal-title');
    const modalText = document.getElementById('js-modal-text');
    const modalClose = document.getElementById('js-modal-close');

    if (!grid || !modalExpertise) {
        console.error('[Expertise] Missing elements');
        return;
    }

    fetch('./js/expertise3.json', { cache: 'force-cache' })
        .then(res => {
            if (!res.ok) throw new Error('Failed to load expertise.json');
            return res.json();
        })
        .then(data => {

            if (!Array.isArray(data) || data.length === 0) {
                console.warn('[Expertise] No data found');
                return;
            }

            const fragment = document.createDocumentFragment();

            data.forEach((item, index) => {

                if (!item.icon || !item.title || !item.description) return;

                const card = document.createElement('div');
                card.className = 'c-expertise__card';

                card.innerHTML = `
                    <div class="c-expertise__icon">
                        <img 
                            src="${item.icon}" 
                            alt="${item.title}" 
                            loading="lazy"
                            width="48"
                            height="48"
                        >
                    </div>
                    <h3 class="c-expertise__card-title">${item.title}</h3>
                `;

                // Modal click
                card.addEventListener('click', () => {

                    modalIcon.innerHTML = `
                        <img 
                            src="${item.icon}" 
                            alt="${item.title}" 
                            width="56" 
                            height="56"
                        >
                    `;

                    modalTitle.textContent = item.title;
                    modalText.textContent = item.description;

                    modalExpertise.classList.add('is-active');
                    document.body.style.overflow = 'hidden';
                });

                fragment.appendChild(card);

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        card.classList.add('is-visible');
                    }, index * 80);
                });
            });

            grid.innerHTML = '';
            grid.appendChild(fragment);
        })
        .catch(err => {
            console.error('[Expertise JSON Error]', err);
        });

    // CLOSE MODAL
    function closeModal() {
        modalExpertise.classList.remove('is-active');
        document.body.style.overflow = '';
    }

    modalClose?.addEventListener('click', closeModal);

    modalExpertise?.addEventListener('click', (e) => {
        if (e.target === modalExpertise) closeModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

});


//testimonials
document.addEventListener('DOMContentLoaded', function() {

    const slider = document.getElementById('js-testimonials-slider');

    if (!slider) {
        console.error('[Testimonials] Slider not found');
        return;
    }

    fetch('./js/testimonials.json')
        .then(res => {
            if (!res.ok) throw new Error('Failed to load testimonials.json');
            return res.json();
        })
        .then(data => {

            slider.innerHTML = '';

            data.forEach((item, index) => {

                // safer star rendering
                const stars = Array.from({
                        length: 5
                    }, (_, i) =>
                    i < item.rating ? '★' : '☆'
                ).join('');

                const card = document.createElement('div');
                card.className = 'c-testimonials__item';

                card.innerHTML = `
					<figure class="c-testimonials__card" itemscope itemtype="https://schema.org/Review">

						<blockquote class="c-testimonials__quote" itemprop="reviewBody">
							${item.review}
						</blockquote>

						<figcaption class="c-testimonials__author" itemprop="author" itemscope itemtype="https://schema.org/Person">
							<img src="${item.image}" alt="${item.name}" width="80" height="80" loading="lazy" decoding="async">
							<div>
								<strong itemprop="name">${item.name}</strong>
								<span itemprop="jobTitle">${item.role}</span>
							</div>
						</figcaption>

						<div class="c-testimonials__rating" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
							<meta itemprop="ratingValue" content="${item.rating}">
							<meta itemprop="bestRating" content="5">
							${stars}
						</div>

					</figure>
				`;

                slider.appendChild(card);

                // animation
                setTimeout(() => {
                    card.classList.add('is-visible');
                }, index * 90);
            });

            // ✅ INIT SLICK AFTER CONTENT IS READY
            initTestimonialsSlider();

        })
        .catch(err => {
            console.error('[Testimonials JSON Error]', err);
        });


    /**
     * Slick Init (Safe)
     */
    function initTestimonialsSlider() {
        const $slider = $('.js-testimonials-slider');

        if ($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
        }

        $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 600,
            cssEase: 'cubic-bezier(.22,.61,.36,1)',

            pauseOnHover: true,
            pauseOnFocus: true,

            adaptiveHeight: false,

            lazyLoad: 'ondemand',

            responsive: [{
                breakpoint: 768,
                settings: {
                    //arrows: false
                }
            }]
        });
    }

    $('.js-testimonials-slider').on('setPosition', function() {
        let maxHeight = 0;

        $('.c-testimonials__card').each(function() {
            const h = $(this).outerHeight();
            if (h > maxHeight) maxHeight = h;
        });

        $('.c-testimonials__card').css('min-height', maxHeight);
    });

});


const formWrap = document.querySelector('.c-contact__form-wrap');

window.addEventListener('scroll', () => {
    const rect = formWrap.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        formWrap.style.opacity = 1;
        formWrap.style.transform = 'translateY(0)';
    }
});



// projects
document.addEventListener('DOMContentLoaded', function () {

    const slider = document.querySelector('.js-project-slider');

    if (!slider) {
        console.error('[Projects] Slider not found');
        return;
    }

    console.log('[Projects] Script started');

    fetch('./js/projects.json')
        .then(res => {
            if (!res.ok) throw new Error('Failed to load projects.json');
            return res.json();
        })
        .then(data => {

            console.log('[Projects] Data loaded:', data.length);

            slider.innerHTML = '';

            data.forEach((item, index) => {

                const tags = (item.tags || []).map(t => `<span>${t}</span>`).join('');
                const metrics = (item.metrics || []).map(m => `<span>${m}</span>`).join('');

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
                        >

                        <div class="c-projects__content">

                            <h3 class="c-projects__name">${item.title}</h3>
                            <p class="c-projects__desc">${item.description || ''}</p>
                            <div class="c-projects__tags">${tags}</div>
                            <div class="c-projects__metrics">${metrics}</div>
                            <div class="c-projects__actions">
                                <a href="${item.case || '#'}" class="c-btn c-btn--primary c-btn--view">View Case</a>
                                <a href="${item.live || '#'}" class="c-btn c-btn--ghost c-btn--play" target="_blank">Live</a>
                            </div>

                        </div>

                    </div>
                `;

                slider.appendChild(card);

                setTimeout(() => {
                    card.classList.add('is-visible');
                }, index * 80);
            });

            console.log('[Projects] DOM injected');
            initProjectSlider();

        })
        .catch(err => {
            console.error('[Projects ERROR]', err);
        });


    function initProjectSlider() {

        const $slider = $('.js-project-slider');

        if (!$slider.length) {
            console.error('[Slick] Slider not found in jQuery');
            return;
        }

        if (typeof $.fn.slick !== 'function') {
            console.error('[Slick] Slick not loaded');
            return;
        }

        if ($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
        }

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

            responsive: [
                {
                    breakpoint: 1024,
                    settings: { slidesToShow: 2 }
                },
                {
                    breakpoint: 768,
                    settings: { slidesToShow: 1 }
                }
            ]
        });

        console.log('[Projects] Slick initialized successfully');
    }

});



document.addEventListener('DOMContentLoaded', () => {

    const accordion = document.getElementById('js-faq-accordion');

    if (!accordion) {
        console.error('[FAQ] Accordion not found');
        return;
    }

    fetch('./js/faq.json', { cache: 'force-cache' })
        .then(res => {
            if (!res.ok) throw new Error('Failed to load faq.json');
            return res.json();
        })
        .then(data => {

            if (!Array.isArray(data) || data.length === 0) {
                console.warn('[FAQ] No data found');
                return;
            }

            const fragment = document.createDocumentFragment();

            data.forEach((item, index) => {

                if (!item.question || !item.answer) return;

                const div = document.createElement('div');
                div.className = 'c-faq__item';

                div.innerHTML = `
                    <button class="c-faq__question" aria-expanded="false">
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

                // optional stagger animation
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        div.classList.add('is-visible');
                    }, index * 70);
                });
            });

            accordion.innerHTML = '';
            accordion.appendChild(fragment);

            console.log('[FAQ] Rendered successfully');

            initFaqAccordion();

        })
        .catch(err => {
            console.error('[FAQ JSON Error]', err);
        });


    // Accordion behavior (lightweight + accessible)
    function initFaqAccordion() {

        const items = document.querySelectorAll('.c-faq__item');

        items.forEach(item => {

            const button = item.querySelector('.c-faq__question');

            button.addEventListener('click', () => {

                const isOpen = item.classList.contains('is-open');

                // close all
                items.forEach(i => {
                    i.classList.remove('is-open');
                    i.querySelector('.c-faq__question')
                        .setAttribute('aria-expanded', 'false');
                });

                // open current if not already open
                if (!isOpen) {
                    item.classList.add('is-open');
                    button.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

});