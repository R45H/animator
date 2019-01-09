var
	classBlock = 'select', // Класс блока
	classSimple = classBlock + '_simple', // Класс маленького селекта
	classLight = classBlock + '_light', // Класс светлого селекта, повторяющего стили инпутов
	classLightSelected = classBlock + '_light-selected', // Доп. класс для светлого селекта с выбранным пунктом
	$selects = $('.' + classBlock + '__origin'); // Нативные селекты

$selects.each(function() {
	var
		$thisNative = $(this), // Нативный селект
		$thisBlock = $thisNative.closest('.' + classBlock), // Контейнер селекта
		classList = classBlock + '__list'; // Класс всплывающего списка

	/* Установка дополнительных классов для всплывающего списка */
	if ($thisBlock.hasClass(classSimple)) {
		classList += ' ' + classList + '_simple';
	}

	if ($thisBlock.hasClass(classLight)) {
		classList += ' ' + classList + '_light';
	}
	/* ===== */

	/* Инициализация селекта */
	$thisNative.selectmenu({

		// Установка классов
		classes: {
			'ui-selectmenu-button': classBlock + '__current', // Кнопка селекта
			'ui-selectmenu-button-open': classBlock + '__current_active', // Состояние кнопки при открытом селекте
			'ui-selectmenu-text': classBlock + '__text', // Текст внутри кнопки
			'ui-selectmenu-menu': classList // Выпадающий список
		},

		// Действия после инициализации
		create: function() {
			var $this = $(this); // Текущий нативный селект

			/* Обработка обычного селекта */
			$this
				.next()
				.append('' +
					'<svg class="' + classBlock + '__icon">' +
						'<use xlink:href="img/sprite.svg#svg-arrow-down"></use>' +
					'</svg>'
				);
			/* ===== */

			/* Установка нужных стилей для светлого селекта без тайтла */
			if (!$thisBlock.hasClass(classLight)) return;
			if ($thisNative.find('option').first().attr('disabled')) return;
			$thisBlock.addClass(classLightSelected);
			/* ===== */
		},

		// Действия при смене значения
		change: function() {

			$thisNative.trigger('change');

			/* Установка нужных стилей для светлого селекта */
			if (!$thisBlock.hasClass(classLight)) return;
			if ($thisBlock.hasClass(classLightSelected)) return;
			$thisBlock.addClass(classLightSelected);
			/* ===== */
		},

		// Фикс селекта в шапке
		open: function() {
			var
				$thisPopup = $('#' + $thisNative.attr('id') + '-menu'), // Выпадающий список текущего селекта
				selectWidth = $thisBlock[0].getBoundingClientRect().width, // Ширина селекта
				popupWidth = $thisPopup[0].getBoundingClientRect().width, // Ширина выпадающего списка
				selectTop = $thisBlock.offset().top,
				selectHeight = $thisBlock.outerHeight();

			if (selectWidth !== popupWidth && selectWidth + 2 > popupWidth) {
				$thisPopup.outerWidth(selectWidth + 'px');
			}

			if (window.devicePixelRatio > 1) {
				$thisPopup
					.parent()
					.css('top', selectTop + selectHeight - .1 + 'px');
			}
		}
	});
	/* ===== */
});

/* Закрытие селекта при ресайзе */
$(window).on('resize', function() {
	$selects.selectmenu('close');
});
/* ===== */