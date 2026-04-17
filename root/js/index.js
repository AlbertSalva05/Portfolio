// script starts here

$(function () {



	// Get navigation element
	const nav = $('.c-nav');

	$('.c-nav__menu-list a[href^="#"]').on('click', function (e) {

		// Get target section from clicked link
		const target = $($(this).attr('href'));

		// Stop if target does not exist
		if (!target.length) return;

		// Prevent default anchor jump
		e.preventDefault();

		// Get current navigation height
		const navHeight = nav.outerHeight();

		// Calculate scroll position adjusted for nav height only
		const position = target.offset().top - navHeight;

		// Smooth scroll to target section
		$('html, body').animate({
			scrollTop: position
		}, 300);

	});

});

// Mobile Toggle
const toggle = document.getElementById('js-toggle');
const menu = document.getElementById('js-menu');

toggle.addEventListener('click', () => {
	menu.classList.toggle('is-active');
});

	// Smooth Scroll
document.querySelectorAll('.c-nav__link').forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));

		target.scrollIntoView({
			behavior: 'smooth'
		});

			menu.classList.remove('is-active');
		});
	});

	// Sticky Shrink Effect
	const nav = document.getElementById('js-nav');

	window.addEventListener('scroll', () => {
	if (window.scrollY > 50) {
		nav.style.padding = '5px 0';
	} else {
		nav.style.padding = '0';
	}
});


document.addEventListener("DOMContentLoaded", () => {
	const hero = document.querySelector(".c-hero");

	if (!hero) return;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					requestAnimationFrame(() => {
						hero.classList.add("is-visible");
					});
					observer.disconnect();
				}
			});
		},
		{
			threshold: 0.25,
			rootMargin: "0px 0px -10% 0px"
		}
	);

	observer.observe(hero);
});


document.addEventListener("DOMContentLoaded", () => {

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {

				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target); // per-section trigger (better UX)
				}

			});
		},
		{
			threshold: 0.2,
			rootMargin: "0px 0px -10% 0px"
		}
	);

	// Observe sections
	document.querySelectorAll(".c-hero, .c-about").forEach((el) => {
		observer.observe(el);
	});

});

const aboutSection = document.querySelector('.c-about');

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-visible');
		}
	});
});

observer.observe(aboutSection);

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



// const track = document.querySelector('.c-projects__track');
// const items = document.querySelectorAll('.c-projects__item');
// const next = document.getElementById('js-next');
// const prev = document.getElementById('js-prev');

// let current = 0;

// function updateSlider() {
//   track.style.transform = `translateX(-${current * 100}%)`;
// }

// next.addEventListener('click', () => {
// 	current = (current + 1) % items.length;
// 	updateSlider();
// });

// prev.addEventListener('click', () => {
// 	current = (current - 1 + items.length) % items.length;
// 	updateSlider();
// });

// setInterval(() => {
// 	current = (current + 1) % items.length;
// 	updateSlider();
// }, 5000);


$(document).ready(function () {

	const $slider = $('.js-project-slider');

	/* =========================
		EQUAL HEIGHT FUNCTION
	========================= */
	function equalizeProjectDescriptions() {
		let maxHeight = 0;
		const $descs = $slider.find('.c-projects__desc');

		// reset heights first
		$descs.css('height', 'auto');

		// get tallest
		$descs.each(function () {
			const h = $(this).outerHeight();
			if (h > maxHeight) maxHeight = h;
		});

		// apply height
		$descs.css('height', maxHeight + 'px');
	}

	/* =========================
		SLICK INIT
	========================= */
	$slider.on('init', function () {
		equalizeProjectDescriptions();
	});

	$slider.on('setPosition', function () {
		equalizeProjectDescriptions();
	});

	$slider.slick({
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 3,
		arrows: true,
		dots: true,
		speed: 700,
		cssEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
		pauseOnHover: true,
		adaptiveHeight: false, // IMPORTANT: keep disabled
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '50px',
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '50px',
					slidesToShow: 1
				}
			}
		]
	});

	/* =========================
		RESIZE HANDLER (DEBOUNCED)
	========================= */
	let resizeTimer;

	$(window).on('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			equalizeProjectDescriptions();
		}, 200);
	});

});
// Modal trigger (hook only)
document.querySelectorAll('.js-open-modal').forEach(btn => {
	btn.addEventListener('click', () => {
		document.getElementById('modal').style.display = 'flex';
	});
});


// const steps = document.querySelectorAll('.c-process__step');

// const processObserver = new IntersectionObserver(entries => {
// 	entries.forEach(entry => {
// 		if (entry.isIntersecting) {
// 			entry.target.classList.add('is-visible');
// 		}
// 	});
// });

// steps.forEach(step => {
// 	step.style.opacity = 0;
// 	step.style.transform = 'translateY(30px)';
// 	step.style.transition = 'all 1s ease';
// 	processObserver.observe(step);
// });


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


// const testiTrack = document.querySelector('.c-testimonials__track');
// const testiItems = document.querySelectorAll('.c-testimonials__item');
// const testiNext = document.getElementById('js-testi-next');
// const testiPrev = document.getElementById('js-testi-prev');

// let testiIndex = 0;

// function updateTesti() {
//   testiTrack.style.transform = `translateX(-${testiIndex * 100}%)`;
// }

// testiNext.addEventListener('click', () => {
// 	testiIndex = (testiIndex + 1) % testiItems.length;
// 	updateTesti();
// });

// testiPrev.addEventListener('click', () => {
// 	testiIndex = (testiIndex - 1 + testiItems.length) % testiItems.length;
// 	updateTesti();
// });

// setInterval(() => {
// 	testiIndex = (testiIndex + 1) % testiItems.length;
// 	updateTesti();
// }, 6000);


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


const form = document.getElementById('js-contact-form');
const modal = document.getElementById('js-success-modal');
const closeModal = document.getElementById('js-close-modal');

form.addEventListener('submit', function (e) {
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

document.getElementById('js-scroll-top').addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
})



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

	// Load JSON
	fetch('./js/expertise.json')
		.then(res => {
			if (!res.ok) throw new Error('Failed to load JSON');
			return res.json();
		})
		.then(data => {

			grid.innerHTML = '';

			data.forEach((item, index) => {

				const card = document.createElement('div');
				card.className = 'c-expertise__card';

				card.innerHTML = `
					<div class="c-expertise__icon">${item.icon}</div>
					<h3 class="c-expertise__card-title">${item.title}</h3>
				`;

				card.addEventListener('click', () => {

					// Inject modal content
					modalIcon.textContent = item.icon;
					modalTitle.textContent = item.title;
					modalText.textContent = item.description;

					// Open modal
					modalExpertise.classList.add('is-active');
					document.body.style.overflow = 'hidden';
				});

				grid.appendChild(card);

				requestAnimationFrame(() => {
					setTimeout(() => {
						card.classList.add('is-visible');
					}, index * 90);
				});
			});
		})
		.catch(err => {
			console.error('[Expertise JSON Error]', err);
		});

	// Close modal
	function closeModal() {
		modalExpertise.classList.remove('is-active');
		document.body.style.overflow = '';
	}

	modalClose.addEventListener('click', closeModal);

	modalExpertise.addEventListener('click', (e) => {
		if (e.target === modalExpertise) closeModal();
	});

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeModal();
	});
});



document.addEventListener('DOMContentLoaded', function () {

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
				const stars = Array.from({ length: 5 }, (_, i) =>
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

			adaptiveHeight: false, // 🔥 CRITICAL FIX

			lazyLoad: 'ondemand',

			responsive: [
				{
					breakpoint: 768,
					settings: {
						arrows: false
					}
				}
			]
		});
	}

	$('.js-testimonials-slider').on('setPosition', function () {
		let maxHeight = 0;

		$('.c-testimonials__card').each(function () {
			const h = $(this).outerHeight();
			if (h > maxHeight) maxHeight = h;
		});

		$('.c-testimonials__card').css('min-height', maxHeight);
	});

});