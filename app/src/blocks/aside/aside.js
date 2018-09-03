var
	classAside = 'aside',
	classAsideOpened = classAside + '_opened',
	classAsideLink = classAside + '__link',
	classAsideLinkActive = classAsideLink + '_active',
	classToggle = 'toggle',
	classToggleActive = classToggle + '_opened',
	classToggleInactive = classToggle + '_closed',
	classFog = 'fog',
	classAsideToggle = 'js-' + classAside + '__' + classToggle,
	$body = $('body'),
	$aside = $('.' + classAside),
	$asideLinks = $aside.find('.' + classAsideLink),
	$toggle = $('.' + classAsideToggle),
	$closeBtn = $('.' + classAside + '__close'),
	delay = 300;

/* Скрытие / раскрытие бокового меню при клике на гамбургер */
$toggle.on('click', function() {

	if ($aside.hasClass(classAsideOpened)) {
		toggleAside('close');
	} else {
		toggleAside('open');
	}
});
/* ===== */

/* Клик по затемнению */
$(document).on('click', '.' + classFog, function() {
	if (!$aside.hasClass(classAsideOpened)) return;
	toggleAside('close');
});
/* ===== */

/* Клик по кнопке "закрыть" */
$closeBtn.on('click', function() {
	toggleAside('close');
});
/* ===== */

/* Клик по ссылке */
$asideLinks.on('click', function() {
	var
		$link = $(this),
		link = $link.attr('href'), // Ссылка в кнопке
		hash = link.slice(link.indexOf('#')); // Хеш ссылки

	/* Обработка активной кнопки */
	if ($link.hasClass(classAsideLinkActive)) {
		toggleAside('close');
		return false;
	}
	/* ===== */

	/* Обработка кнопки со ссылкой на калькулятор */
	if (hash[0] !== '#') return;
	hash = hash.slice(1);

	var $thisTab = $('.wrapper__tab-btn'); // Кнопки переключения табов

	if (!$thisTab.length) return;

	$thisTab
		.filter('[data-onload=' + hash + ']')
		.trigger('click');

	toggleAside('close');
	/* ===== */
});
/* ===== */

/* Закрытие бокового меню при нажатии ESC */
var closeAsideOnEsc = function(event) {
	if (event.keyCode !== 27) return;
	toggleAside('close');
};
/* ===== */

/* Показывает или скрывает боковое меню */
function toggleAside(action) {

	if (action === 'open') {
		$aside.addClass(classAsideOpened);
		$body.append('<div class="' + classFog + '"></div>');
		$('.' + classFog).fadeIn(delay);
		$(document).on('keydown', closeAsideOnEsc);
		toggleBodyScroll();
	}

	if (action === 'close') {
		$(document).off('keydown', closeAsideOnEsc);
		$aside.removeClass(classAsideOpened);
		$('.' + classFog).fadeOut(delay / 2);
		$toggle
			.removeClass(classToggleActive)
			.addClass(classToggleInactive);

		setTimeout(function() {
			$('.' + classFog).remove();
			toggleBodyScroll(false);
		}, delay / 2);
	}
}
/* ===== */