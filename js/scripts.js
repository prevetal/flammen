// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]
OVERLAY = document.querySelector('.overlay')


document.addEventListener('DOMContentLoaded', function () {
	// Основной слайдер на главной
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						let totalSlides = swiper.slides.length - 2

						if(totalSlides < 10) { totalSlides = '0' + totalSlides }

						$(swiper.$el).find('.count .total').text(totalSlides)
					})
				},
				activeIndexChange: swiper => {
					setTimeout(() => {
						let currentSlide = swiper.realIndex + 1

						if(currentSlide < 10) { currentSlide = '0' + currentSlide }

						$(swiper.$el).find('.count .current').text(currentSlide)
					})
				}
			}
		})
	}


	// Карусель брендов
	const brandsSliders = [],
		brands = document.querySelectorAll('.brands .swiper')

	brands.forEach(function (el, i) {
		el.classList.add('brands_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 4
				},
				1280: {
					spaceBetween: 24,
					slidesPerView: 5
				}
			}
		}

		brandsSliders.push(new Swiper('.brands_s' + i, options))
	})


	// Карусель видео из ютуба
	const videosSliders = [],
		videos = document.querySelectorAll('.videos .swiper')

	videos.forEach(function (el, i) {
		el.classList.add('videos_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			spaceBetween: 24,
			slidesPerView: 'auto',
			on: {
				activeIndexChange: swiper => {
					$(swiper.$el).find('iframe').each(function () {
						this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
				 	})
				}
			}
		}

		videosSliders.push(new Swiper('.videos_s' + i, options))
	})


	// Карусель товаров
	const productsSliders = [],
		products = document.querySelectorAll('.products_swiper'),
		productsSale = document.querySelectorAll('.products.sale .swiper')

	products.forEach(function (el, i) {
		el.classList.add('products_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 12,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 32,
					slidesPerView: el.classList.contains('big') ? 3 : 4
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.product')),
				resize: swiper => {
					let products = swiper.el.querySelectorAll('.product')

					products.forEach(el => el.style.height = 'auto')

					setHeight(products)
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})

	productsSale.forEach(function (el, i) {
		el.classList.add('products_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			slidesPerView: 'auto',
			breakpoints: {
				0: {
					spaceBetween: 12
				},
				1024: {
					spaceBetween: 24
				},
				1280: {
					spaceBetween: 32
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.product')),
				resize: swiper => {
					let products = swiper.el.querySelectorAll('.product')

					products.forEach(el => el.style.height = 'auto')

					setHeight(products)
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})


	// Основной слайдер на странице бренда
	let brandSlider = document.querySelector('.brand_slider .swiper')

	if (brandSlider) {
		new Swiper('.brand_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						let totalSlides = swiper.slides.length - 2

						if(totalSlides < 10) { totalSlides = '0' + totalSlides }

						$(swiper.$el).find('.count .total').text(totalSlides)
					})
				},
				activeIndexChange: swiper => {
					setTimeout(() => {
						let currentSlide = swiper.realIndex + 1

						if(currentSlide < 10) { currentSlide = '0' + currentSlide }

						$(swiper.$el).find('.count .current').text(currentSlide)
					})
				}
			}
		})
	}


	// Карусель коллекций
	const collectionsSliders = [],
		collections = document.querySelectorAll('.collections .swiper')

	collections.forEach(function (el, i) {
		el.classList.add('collections_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 12,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 32,
					slidesPerView: 3
				}
			}
		}

		collectionsSliders.push(new Swiper('.collections_s' + i, options))
	})


	// Статьи
	const articlesSliders = [],
		articles = document.querySelectorAll('.articles .swiper')

	articles.forEach(function (el, i) {
		el.classList.add('articles_s' + i)

		let options = {
			loop: false,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			spaceBetween: 24,
			slidesPerView: 1
		}

		articlesSliders.push(new Swiper('.articles_s' + i, options))
	})


	// Рецепты
	const recipesSliders = [],
		recipes = document.querySelectorAll('.recipes .swiper')

	recipes.forEach(function (el, i) {
		el.classList.add('recipes_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 12,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 32,
					slidesPerView: 3
				}
			}
		}

		recipesSliders.push(new Swiper('.recipes_s' + i, options))
	})


	// Карусель в тексте
	const textSliders = [],
		textS = document.querySelectorAll('.text_block .slider .swiper')

	textS.forEach(function (el, i) {
		el.classList.add('text_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					spaceBetween: 24,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 32,
					slidesPerView: 4
				}
			}
		}

		textSliders.push(new Swiper('.text_s' + i, options))
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_modal_close"></use></svg>',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}


	// Всплывающие окна
	const modalBtns = document.querySelectorAll('.modal_btn')

	if (modalBtns) {
		modalBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				Fancybox.close()

				Fancybox.show([{
					src: document.getElementById(el.getAttribute('data-modal')),
					type: 'inline'
				}])
			})
		})
	}


	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Мини всплывающие окна
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})

	// Закрываем всплывашку при клике на крестик во всплывашке
	$('.mini_modal .close_btn').click(e => {
		e.preventDefault()

		$('.mini_modal, .mini_modal_btn').removeClass('active')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})


	// Фильтр
	$('.mob_filter_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	$priceRange = $('.filter #price_range').ionRangeSlider({
		type: 'double',
		min: 0,
		max: 60000,
		from: 150,
		to: 13000,
		step: 100,
		onChange: data => {
			$('.filter .price_range input.from').val(data.from.toLocaleString())
			$('.filter .price_range input.to').val(data.to.toLocaleString())
		},
		onUpdate: data => {
			$('.filter .price_range input.from').val(data.from.toLocaleString())
			$('.filter .price_range input.to').val(data.to.toLocaleString())
		}
	}).data('ionRangeSlider')

	$('.filter .price_range .input').keyup(function () {
		$priceRange.update({
			from: parseInt($('.filter .price_range input.from').val().replace(/\s/g, '')),
			to: parseInt($('.filter .price_range input.to').val().replace(/\s/g, ''))
		})
	})


	// Фильтр - спойлер
	$('.filter .spoler_btn').click(function(e) {
		e.preventDefault()

		let data = $(this).closest('.data')

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? data.find('.hide').slideDown(300)
			: data.find('.hide').slideUp(200)
	})


	// Страница товара
	if ($('.product_info .images').length) {
		const productThumbs = new Swiper('.product_info .thumbs .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			direction: 'vertical',
			spaceBetween: 20,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})

		const productSlider = new Swiper('.product_info .big .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			thumbs: {
				swiper: productThumbs
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			}
		})
	}


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent           = $(this).closest('.tabs_container'),
				  activeTab         = $(this).data('content'),
				  $activeTabContent = $(activeTab),
				  level             = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab        = $(`.tabs button[data-content="${locationHash}"]`),
			  $activeTabContent = $(locationHash),
			  $parent           = $activeTab.closest('.tabs_container'),
			  level             = $activeTab.data('level')

		$parent.find('.tabs:first button').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Изменение количества товара
	const amountMinusBtns = document.querySelectorAll('.amount .minus'),
		amountPlusBtns = document.querySelectorAll('.amount .plus'),
		amountInputs = document.querySelectorAll('.amount .input')

	if (amountMinusBtns) {
		amountMinusBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				let parent = el.closest('.amount'),
					input = parent.querySelector('.input'),
					inputVal = parseFloat(input.value),
					minimum = parseFloat(input.getAttribute('data-minimum')),
					step = parseFloat(input.getAttribute('data-step')),
					unit = input.getAttribute('data-unit')

				if (inputVal > minimum) input.value = inputVal - step + unit
			})
		})
	}

	if (amountPlusBtns) {
		amountPlusBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				let parent = el.closest('.amount'),
					input = parent.querySelector('.input'),
					inputVal = parseFloat(input.value),
					maximum = parseFloat(input.getAttribute('data-maximum')),
					step = parseFloat(input.getAttribute('data-step')),
					unit = input.getAttribute('data-unit')

				if (inputVal < maximum) input.value = inputVal + step + unit
			})
		})
	}

	if (amountInputs) {
		amountInputs.forEach(el => {
			el.addEventListener('keydown', e => {
				let maximum = parseInt(el.getAttribute('data-maximum'))

				setTimeout(() => {
					if (el.value == '' || el.value == 0) el.maximum = parseInt(el.getAttribute('data-minimum'))
					if (el.value > maximum) el.value = maximum
				})
			})
		})
	}


	// Оформление заказа
	$('.checkout_info .entity_check label').click(function(e) {
		let _self = $(this)

		setTimeout(() => {
			_self.find('input').prop('checked')
				? $('.checkout_info .entity_info').addClass('show')
				: $('.checkout_info .entity_info').removeClass('show')
		})
	})

	$('.checkout_info .payment_methods label, .checkout_info .delivery_methods label').click(function(e) {
		let _self = $(this)

		if(_self.closest('.delivery_methods').length) {
			$('.checkout_info .delivery_methods .info').removeClass('show')
		}

		if(_self.closest('.payment_methods').length) {
			$('.checkout_info .payment_methods .info').removeClass('show')
		}

		setTimeout(() => _self.next('.info').addClass('show'))
	})


	// Моб. меню
	const mobMenuBtn = document.querySelector('.mob_header .mob_menu_btn'),
		mobMenu = document.querySelector('header'),
		mobMenuCloseBtn = document.querySelector('header .close_btn')

	if (mobMenuBtn) {
		mobMenuBtn.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')
			$('.overlay').fadeIn(300)
		})
	}

	if (mobMenuCloseBtn) {
		mobMenuCloseBtn.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')
			$('.overlay').fadeOut(200)
		})
	}

	if (OVERLAY) {
		OVERLAY.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')
			$('.overlay').fadeOut(200)
		})
	}


	// Маска ввода
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Кастомный select
	const selects = document.querySelectorAll('select')

	if (selects) {
		selects.forEach(el => NiceSelect.bind(el))
	}


	// Выбор файла
	const fileInputs = document.querySelectorAll('form input[type=file]')

	if (fileInputs) {
		fileInputs.forEach(el => {
			el.addEventListener('change', () => el.closest('.file').querySelector('label .label').innerText = el.value)
		})
	}


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Подменю на тач скрине
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const $dropdown = $(this).next()

			if ($dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				$dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Закрываем под. меню при клике за её пределами
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})