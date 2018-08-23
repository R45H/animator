var
	classBlock = 'select', // Класс блока
	classSimple = classBlock + '_simple', // Класс маленького селекта
	classLight = classBlock + '_light', // Класс светлого селекта, повторяющего стили инпутов
	classLightSelected = classBlock + '_light-selected', // Доп. класс для светлого селекта с выбранным пунктом
	classMultiply = classBlock + '_multiply', // Класс для селекта с множественным выбором
	classMultiplyOpened = classBlock + '_multiply-opened', // Класс для селекта с открытой модалкой
	classMultiplyReady = classBlock + '_multiply-ready', // Класс для заполненного селекта с множественным выбором
	$selects = $('.' + classBlock + '__origin'), // Нативные селекты

	modalId = 'modalSelect', // Класс модалки для селектов
	$modal = $('#' + modalId), // Модалка
	$modalTitle = $modal.find('.modal__title'), // Заголовок модалки
	$modalBtn = $modal.find('.modal__btn'), // Кнопка модалки
	$modalValuesWrap = $modal.find('.modal__form-col'); // Контейнер для вставки элементов в модалку

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

			if ($thisBlock.hasClass(classMultiply)) {
				var
					modalTitleText = $thisBlock.attr('data-modal-title'), // Текст для вставки в заголовок модалки
					modalBtnText = $thisBlock.attr('data-modal-btn'); // Текст для вставки в кнопку модалки

				/* Привязка селекта к модалке */
				$thisBlock.attr('data-modal', modalId);
				/* ===== */

				/* Обработка селекта с модалкой */
				$this
					.selectmenu('disable')
					.next()
					.append('' +
						'<svg class="' + classBlock + '__icon ' + classBlock + '__icon_multiply-empty">' +
							'<use xlink:href="img/sprite.svg#svg-plus"></use>' +
						'</svg>' +
						'<svg class="' + classBlock + '__icon ' + classBlock + '__icon_multiply-ready">' +
							'<use xlink:href="img/sprite.svg#svg-check-sm"></use>' +
						'</svg>'
					)
					.on('click', function() {
						var
							count = 1, // Счётчик для установки ID чекбоксам
							currentValues = []; // Выбранные ранее значения для этого селекта

						$thisBlock.addClass(classMultiplyOpened);

						/* Сбор ранее выбранных значений в массив */
						$this
							.find('option:selected')
							.filter(':not(:disabled)')
							.each(function() {
								currentValues.push($(this).text());
							});
						/* ===== */

						/* Установка текста заголовка и кнопки. Удаление старых чекбоксов */
						$modalTitle.text(modalTitleText);
						$modalBtn.val(modalBtnText);
						$modalValuesWrap.html('');
						/* ===== */

						$this.find('option').each(function() {
							var
								$thisOption = $(this), // Текущий option
								isChecked = false; // Флаг активного чекбокса

							/* Пропуск тайтла */
							if ($thisOption.attr('disabled')) return;
							/* ===== */

							/* Установка чекбокса в активное состояние */
							if (currentValues.length) {

								for (var i = 0; i < currentValues.length; i++) {
									if (currentValues[i] == $thisOption.text()) {
										isChecked = true;
									}
								}
							}
							/* ===== */

							/* Запись чекбокса в модалку */
							$modalValuesWrap.append('' +
								'<div class="col-sm-6 main__space-bot-half">' +
									'<div class="check">' +
									'<input class="check__input" id="modalSelectItem-' + count + '" type="checkbox" ' + (isChecked ? 'checked' : '') + '>' +
									'<label class="check__label" for="modalSelectItem-' + count++ + '">' + $thisOption.text() + '</label>' +
								'</div>'
							);
							/* ===== */
						});
					});
				/* ===== */
			} else {

				/* Обработка обычного селекта */
				$this
					.next()
					.append('' +
						'<svg class="' + classBlock + '__icon">' +
							'<use xlink:href="img/sprite.svg#svg-arrow-down"></use>' +
						'</svg>'
					);
				/* ===== */
			}

			/* Установка нужных стилей для светлого селекта без тайтла */
			if (!$thisBlock.hasClass(classLight)) return;
			if ($thisNative.find('option').first().attr('disabled')) return;
			$thisBlock.addClass(classLightSelected);
			/* ===== */
		},

		// Действия при смене значения
		change: function() {

			/* Установка нужных стилей для светлого селекта */
			if (!$thisBlock.hasClass(classLight)) return;
			if ($thisBlock.hasClass(classLightSelected)) return;
			$thisBlock.addClass(classLightSelected);
			/* ===== */
		}
	});
	/* ===== */
});

/* Обработка селекта при нажатии на "Применить" в модалке */
$modalBtn.on('click', function(e) {

	e.preventDefault();

	var
		$currentSelect = $('.' + classMultiplyOpened), // Селект, который открыл модалку (текущий селект)
		$selectedItems = $modalValuesWrap.find('.check__input').filter(':checked'), // Выборка активных чекбоксов
		values = []; // Значения активных чекбоксов

	/* Заполнение массива значениями */
	$selectedItems.each(function() {
		values.push($(this).next().text());
	});
	/* ===== */

	/* Обновление значений текущего селекта */
	$currentSelect.attr('data-values', JSON.stringify(values));
	/* ===== */

	/* Обработка селекта в зависимости от того, заполнен он значениями или нет */
	if (values.length) {
		$currentSelect
			.addClass(classMultiplyReady)
			.find('.select__text')
			.text(values.join(', '))
			.end()
			.find('.select__origin option')
			.each(function() {
				var
					$thisOption = $(this),
					thisText = $thisOption.text();

				$thisOption.prop('selected', false);

				$.each(values, function(i, val) {
					if (thisText == val) {
						$thisOption.prop('selected', true);
					}
				});
			});
		
		if ($currentSelect.hasClass(classLight)) {
			$currentSelect.addClass(classLightSelected);
		}
	} else {
		$currentSelect
			.removeClass(classMultiplyReady)
			.find('.select__text')
			.text(
				$currentSelect
					.find('.select__origin')
					.find('option')
					.first()
					.text()
			)
			.end()
			.find('.select__origin option')
			.prop('selected', false)
			.first()
			.prop('selected', true);

		if ($currentSelect.hasClass(classLightSelected)) {
			$currentSelect.removeClass(classLightSelected);
		}
	}
	/* ===== */

	/* Закрытие модалки */
	toggleModal('close', modalId);
	/* ===== */
});
/* ===== */

/* Удаление класса селекта с открытой модалкой при её закрытии */
$modal.on('hide.modal', function() {
	$('.' + classMultiplyOpened).removeClass(classMultiplyOpened);
});
/* ===== */

/* Закрытие селекта при ресайзе */
$(window).on('resize', function() {
	$selects.selectmenu('close');
});
/* ===== */