var
	classBlock = 'wrapper', // Класс блока
	classColorLayout = classBlock + '_color_', // Шаблон классов с цветами
	$block = $('.' + classBlock), // Блок
	$setters = $block.find('.js-' + classBlock + '__set-color'), // Элементы, при клике на которые должен меняться цвет
	$header = $block.find('.' + classBlock + '__header'), // Шапка сайта
	headerImages = $header.attr('data-images') ? JSON.parse($header.attr('data-images')) : null; // Картинки шапки, привязанные к цветам

/* Обработка клика (смена цвета) */
$setters.on('click', function(e) {
	var
		$this = $(this),
		color = $this.attr('data-color'), // Цвет, заданный у элемента
		classColorCurrent, // Класс текущего цвета
		classColorNew = classColorLayout + color, // Класс нового цвета
		blockClasses = $block.attr('class').split(/\s+/); // Список классов блока

	e.preventDefault();

	/* Поиск уже заданного класса цвета */
	$.each(blockClasses, function(i, item) {
		if (~item.indexOf(classColorLayout)) {
			classColorCurrent = item;
		}
	});
	/* ===== */

	/* Удаление уже существующего класса цвета */
	if (classColorCurrent) {

		// Если совпадает с текущим - ничего не делаем
		if (classColorCurrent === classColorNew) {
			return;
		}

		$block.removeClass(classColorCurrent);
	}
	/* ===== */

	/* Если новый цвет не задан, останавливаемся на сбросе */
	if (!color) {
		return;
	}
	/* ===== */

	/* Установка нового цвета */
	$block.addClass(classColorNew);
	/* ===== */

	/* Смена изображения шапки */
	if (headerImages && headerImages[color]) {
		$header.css('background-image', 'url(' + headerImages[color] + ')');
	}
	/* ===== */

	/* Генерация события */
	$block.trigger('changecolor.custom.wrapper', {
		color: color,
		target: $this
	});
	/* ===== */
});
/* ===== */

/* Табы */
var
	classTab = classBlock + '__tab', // Класс контейнера табов
	classTabBtn = classTab + '-btn', // Класс кнопок
	classTabBtnActive = classTabBtn + '_active', // Класс активной кнопки
	classTabPanel = classTab + '-panel', // Класс панели
	classVisible = classBlock + '__visible', // Класс видимой панели
	$tab = $block.find('.' + classBlock + '__tab'), // Контейнер табов
	$tabTargets = $('[data-wrapper-target]'), // Цели
	$tabBtns = $tab.find('.' + classTabBtn), // Кнопки
	$asideLinks = $('.aside__link'); // Кнопки бокового меню

/* Клик по кнопке таба */
$tabBtns.on('click', function() {
	var
		$this = $(this),
		link = $this.attr('data-wrapper-link'), // Ссылка на панель
		$targets = $('[data-wrapper-target=' + link + ']'); // Цели с нужной ссылкой

	if ($this.hasClass(classTabBtnActive)) {
		return;
	}

	window.location.hash = $this.attr('data-onload');

	$tabBtns.removeClass(classTabBtnActive);
	$this.addClass(classTabBtnActive);
	$tabTargets.removeClass(classVisible);
	$targets.addClass(classVisible);

	/* Обработка ссылок бокового меню */
	$asideLinks.each(function() {
		var
			$asideLink = $(this), // Кнопка бокового меню
			asideLink = $asideLink.attr('href'), // Ссылка в кнопке
			hash = asideLink.slice(asideLink.indexOf('#')); // Хеш ссылки

		if (hash[0] !== '#') return;

		hash = hash.slice(1);

		if ($this.attr('data-onload') == hash) {
			$asideLinks.removeClass('aside__link_active');
			$asideLink.addClass('aside__link_active');
		}
	});
	/* ===== */
});
/* ===== */

/* ===== */

/* Установка цвета при загрузке страницы по хешу */
var hash = window.location.hash;
hash = hash.slice(1); // Хеш в адресной строке без решётки

// Сработка первой кнопки в табе при отсутствии хеша
if (!hash && $tabBtns.length) {
	$tabBtns.first().trigger('click');
}

// Сработка клика на странице с хешем
$setters.each(function() {
	var
		$this = $(this),
		load = $this.attr('data-onload');

	if (!load) {
		return;
	}

	if (load == hash) {
		$this.trigger('click');
	}
});
/* ===== */