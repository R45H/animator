// TODO: Надо отрефакторить, уменьшить количество кода, вынести повторяющиеся куски в функции

/* ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ */

var
	/* Классы */
	classBlock = 'greet', // Основной класс

	classSlider = classBlock + '__slider', // Класс слайдера
	classSliderHome = classSlider + '_home', // Класс слайдера с домашним слайдом

	classSlide = classBlock + '__slider-item', // Класс слайда
	classSlideVisible = classSlide + '_visible', // Класс видимого слайда

	classTitle = classBlock + '__slider-title',  // Класс заголовка по центру
	classTitleVisible = classTitle + '_visible',  // Класс видимого заголовка по центру

	classBtn = classBlock + '__slider-btn', // Класс кнопок
	classBtnLeft = classBtn + '_left', // Класс левой кнопки
	classBtnRight = classBtn + '_right', // Класс правой кнопки
	classBtnInner = 'link-arrow__text', // Класс внутреннего контейнера кнопки
	/* ====== */

	/* Элементы */
	$block = $('.' + classBlock), // Блок
	$slider = $block.find('.' + classSlider), // Слайдер
	$slides = $slider.find('.' + classSlide), // Слайды
	$title = $slider.find('.' + classTitle), // Заголовок
	$btnLeft = $slider.find('.' + classBtnLeft), // Левая кнопка
	$btnRight = $slider.find('.' + classBtnRight), // Правая кнопка
	$btnLeftInner = $btnLeft.find('.' + classBtnInner), // Внутренний контейнер левой кнопки
	$btnRightInner = $btnRight.find('.' + classBtnInner); // Внутренний контейнер правой кнопки
	/* ====== */

/* ===================== */

greetInit();

$btnRight.on('click', function() {
	var
		$currentSlide = $slides.filter('.' + classSlideVisible), // Текущий слайд
		$prevSlide, // Слайд перед текущим
		$nextSlide; // Слайд после текущего

	/* Если на домашнем слайде */
	if (!$currentSlide.length) {
		$prevSlide = $slides.last();
		$nextSlide = $slides.first();

		$slider.removeClass(classSliderHome);
		$nextSlide.addClass(classSlideVisible);
		$title
			.text($nextSlide.attr('data-title'))
			.addClass(classTitleVisible);

		$btnLeftInner.text('Главная');
		$btnRightInner.text($nextSlide.next().attr('data-title'));

		return;
	}

	$nextSlide = $currentSlide.next();

	/* Если на последнем слайде */
	if (!$nextSlide.length) {
		$prevSlide = $slides.last();
		$nextSlide = $slides.first();

		$currentSlide.removeClass(classSlideVisible);
		$slider.addClass(classSliderHome);
		$title
			.text('')
			.removeClass(classTitleVisible);

		$btnLeftInner.text($prevSlide.attr('data-title'));
		$btnRightInner.text($nextSlide.attr('data-title'));

		return;
	}

	$currentSlide.removeClass(classSlideVisible);

	$nextSlide.addClass(classSlideVisible);
	$title.text($nextSlide.attr('data-title'));

	$btnLeftInner.text($currentSlide.attr('data-title'));

	/* Если есть следующий слайд */
	if ($nextSlide.next().length) {
		$btnRightInner.text($nextSlide.next().attr('data-title'));
	} else {
		$btnRightInner.text('Главная');
	}
});

$btnLeft.on('click', function() {
	var
		$currentSlide = $slides.filter('.' + classSlideVisible), // Текущий слайд
		$nextSlide; // Слайд после текущего

	/* Если на домашнем слайде */
	if (!$currentSlide.length) {
		$nextSlide = $slides.last();

		$slider.removeClass(classSliderHome);
		$nextSlide.addClass(classSlideVisible);
		$title
			.text($nextSlide.attr('data-title'))
			.addClass(classTitleVisible);

		$btnRightInner.text('Главная');
		$btnLeftInner.text($nextSlide.prev().attr('data-title'));

		return;
	}

	$nextSlide = $currentSlide.prev();

	/* Если на первом слайде */
	if (!$nextSlide.length) {
		$nextSlide = $slides.last();

		$currentSlide.removeClass(classSlideVisible);
		$slider.addClass(classSliderHome);
		$title
			.text('')
			.removeClass(classTitleVisible);

		$btnLeftInner.text($slides.first().attr('data-title'));
		$btnRightInner.text($nextSlide.attr('data-title'));

		return;
	}

	$currentSlide.removeClass(classSlideVisible);

	$nextSlide.addClass(classSlideVisible);
	$title.text($nextSlide.attr('data-title'));

	$btnRightInner.text($currentSlide.attr('data-title'));

	/* Если есть следующий слайд */
	if ($nextSlide.prev().length) {
		$btnLeftInner.text($nextSlide.prev().attr('data-title'));
	} else {
		$btnLeftInner.text('Главная');
	}
});

function greetInit() {

	$btnLeftInner
		.text(
			$slides
				.last()
				.attr('data-title')
		);

	$btnRightInner
		.text(
			$slides
				.first()
				.attr('data-title')
		);
}