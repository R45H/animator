var
	classBlock = 'select-modal', // Класс блока
	classOpened = classBlock + '_opened', // Класс для селекта с открытой модалкой
	classReady = classBlock + '_ready', // Класс для заполненного селекта
	classLight = classBlock + '_light', // Класс светлого селекта, повторяющего стили инпутов
	classLightSelected = classBlock + '_light-selected', // Доп. класс для светлого селекта с выбранным пунктом
	$selects = $('.' + classBlock + '__origin'), // Нативные селекты

	idModal = 'modalSelect', // Идентификатор модалки для селектов
	$modal = $('#' + idModal), // Модалка
	$modalTitle = $modal.find('.modal__title'), // Заголовок модалки
	$modalBtn = $modal.find('.modal__btn'), // Кнопка модалки
	$modalValuesWrap = $modal.find('.modal__form-col'); // Контейнер для вставки элементов в модалку

$selects.each(function() {
	var
		$thisNative = $(this), // Нативный селект
		$thisSelectedOptions = $thisNative.find('option').filter(':selected:not(:disabled)'), // Уже выбранные option селекта
		values = [], // Значения активных option селекта
		$thisBlock = $thisNative.closest('.' + classBlock), // Контейнер селекта
		$thisWrap = $thisBlock.find('.' + classBlock + '__current'), // Внутренний контейнер селекта
		modalTitleText = $thisBlock.attr('data-modal-title'), // Текст для вставки в заголовок модалки
		modalBtnText = $thisBlock.attr('data-modal-btn'); // Текст для вставки в кнопку модалки

	/* Добавление иконок */
	$thisWrap.append('' +
		'<svg class="' + classBlock + '__icon ' + classBlock + '__icon_empty">' +
			'<use xlink:href="img/sprite.svg#svg-plus"></use>' +
		'</svg>' +
		'<svg class="' + classBlock + '__icon ' + classBlock + '__icon_ready">' +
			'<use xlink:href="img/sprite.svg#svg-check-sm"></use>' +
		'</svg>'
	);
	/* ===== */

	/* Начальное заполнение селекта */
	$thisSelectedOptions.each(function() {
		values.push($(this).text());
	});

	if (values.length) {
		$thisBlock
			.attr('data-values', JSON.stringify(values))
			.addClass(classReady)
			.find('.' + classBlock + '__text')
			.text(values.join(', '));

		/* Установка нужных стилей для светлого селекта без тайтла */
		if ($thisBlock.hasClass(classLight)) {
			$thisBlock.addClass(classLightSelected);
		}
		/* ===== */
	}
	/* ===== */

	/* Привязка селекта к модалке */
	$thisBlock.attr('data-modal', idModal);
	/* ===== */

	/* Обработка клика по селекту */
	$thisWrap.on('click', function() {
		var
			count = 1, // Счётчик для установки ID чекбоксам
			currentValues = []; // Выбранные ранее значения для этого селекта

		$thisBlock.addClass(classOpened);

		/* Сбор ранее выбранных значений в массив */
		$thisNative
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

		$thisNative.find('option').each(function() {
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
				'<div class="col-sm-6">' +
					'<div class="check check_fat">' +
						'<input class="check__input" id="modalSelectItem-' + count + '" type="checkbox" ' + (isChecked ? 'checked' : '') + '>' +
						'<label class="check__label" for="modalSelectItem-' + count++ + '">' + $thisOption.text() + '</label>' +
					'</div>' +
				'</div>'
			);
			/* ===== */
		});
	});
	/* ===== */
});

/* Обработка селекта при нажатии на "Применить" в модалке */
$modalBtn.on('click', function(e) {

	e.preventDefault();

	var
		$currentSelect = $('.' + classOpened), // Селект, который открыл модалку (текущий селект)
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
			.addClass(classReady)
			.find('.' + classBlock + '__text')
			.text(values.join(', '))
			.end()
			.find('.' + classBlock + '__origin option')
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

		/* Установка нужных стилей для светлого селекта */
		if (($currentSelect.hasClass(classLight)) && (!$currentSelect.hasClass(classLightSelected))) {
			$currentSelect.addClass(classLightSelected);
		}
		/* ===== */

	} else {
		$currentSelect
			.removeClass(classReady)
			.find('.' + classBlock + '__text')
			.text(
				$currentSelect
					.find('.' + classBlock + '__origin')
					.find('option')
					.first()
					.text()
			)
			.end()
			.find('.' + classBlock + '__origin option')
			.prop('selected', false)
			.first()
			.prop('selected', true);

		/* Установка нужных стилей для светлого селекта */
		if ($currentSelect.hasClass(classLight)) {
			$currentSelect.removeClass(classLightSelected);
		}
		/* ===== */
	}
	/* ===== */

	/* Закрытие модалки */
	toggleModal('close', idModal);
	/* ===== */
});
/* ===== */

/* Удаление класса селекта с открытой модалкой при её закрытии */
$modal.on('hide.custom.modal', function() {
	$('.' + classOpened).removeClass(classOpened);
});
/* ===== */