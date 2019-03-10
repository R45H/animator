var
	classBlock = 'select-modal', // Класс блока
	classOpened = classBlock + '_opened', // Класс для селекта с открытой модалкой
	classReady = classBlock + '_ready', // Класс для заполненного селекта
	classLight = classBlock + '_light', // Класс светлого селекта, повторяющего стили инпутов
	classLightSelected = classBlock + '_light-selected', // Доп. класс для светлого селекта с выбранным пунктом
	classInputs = classBlock + '_inputs', // Класс селекта в виде скрытых инпутов
	$selects = $('.' + classBlock + '__origin'), // Нативные селекты

	idModal = 'modalSelect', // Идентификатор модалки для селектов
	$modal = $('#' + idModal), // Модалка
	$modalTitle = $modal.find('.modal__title'), // Заголовок модалки
	$modalBtn = $modal.find('.modal__btn'), // Кнопка модалки
	$modalValuesWrap = $modal.find('.modal__form-col'); // Контейнер для вставки элементов в модалку

$selects.each(function() {
	var
		$thisNative = $(this), // Нативный селект
		values = [], // Значения option селекта
		$thisBlock = $thisNative.closest('.' + classBlock), // Контейнер селекта
		$thisWrap = $thisBlock.find('.' + classBlock + '__current'), // Внутренний контейнер селекта
		modalTitleText = $thisBlock.attr('data-modal-title'), // Текст для вставки в заголовок модалки
		modalBtnText = $thisBlock.attr('data-modal-btn'), // Текст для вставки в кнопку модалки
		selectedCount; // Количество выбранных элементов селекта

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
	updateValues();

	selectedCount = values.filter(function(item) {
		return item.selected;
	}).length;

	if (selectedCount) {
		$thisBlock
			.attr('data-values', JSON.stringify(values))
			.addClass(classReady)
			.find('.' + classBlock + '__text')
			.text(
				values
					.filter(function(item) {
						return item.selected;
					})
					.map(function(item) {
						return item.text;
					})
					.join(', ')
			);

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
		var count = 1; // Счётчик для установки ID чекбоксам

		$thisBlock.addClass(classOpened);

		updateValues();

		/* Установка текста заголовка и кнопки. Удаление старых чекбоксов */
		$modalTitle.text(modalTitleText);
		$modalBtn.val(modalBtnText);
		$modalValuesWrap.html('');
		/* ===== */

		$.each(values, function(i, item) {

			/* Запись чекбокса в модалку */
			$modalValuesWrap.append('' +
				'<div class="col-12">' +
					'<div class="check check_fat">' +
						'<input class="check__input" id="modalSelectItem-' + count + '" type="checkbox" ' + (item.selected ? 'checked' : '') + '>' +
						'<label class="check__label" for="modalSelectItem-' + count++ + '" data-value="' + item.value + '">' + item.text + '</label>' +
					'</div>' +
				'</div>'
			);
			/* ===== */
		});
	});
	/* ===== */

	/* Функция обновления values */
	function updateValues() {

		values = [];

		if ($thisBlock.hasClass(classInputs)) {
			$thisNative
				.find('input[type="hidden"]:not(:disabled)')
				.each(function() {
					values.push({
						text: $(this).attr('data-title'),
						value: $(this).val(),
						selected: $(this).val() === 'Y'
					});
				});
		} else {
			$thisNative
				.find('option:not(:disabled)')
				.each(function() {
					values.push({
						text: $(this).text(),
						value: $(this).val(),
						selected: $(this).prop('selected')
					});
				});
		}
	}
	/* ===== */
});

/* Обработка селекта при нажатии на "Применить" в модалке */
$modalBtn.on('click', function(e) {

	e.preventDefault();

	var
		$currentSelect = $('.' + classOpened), // Селект, который открыл модалку (текущий селект)
		$options, // Элементы селекта
		$optionsSelected, // Выбранные элементы селекта
		$selectTitle, // Элемент, содержащий заголовок селекта
		selectTitle, // Заголовок селекта
		$items = $modalValuesWrap.find('.check__input'), // Выборка чекбоксов
		values = [], // Значения чекбоксов
		selectedCount;

	/* Выборка элементов текущего селекта */
	if ($currentSelect.hasClass(classInputs)) {
		$options = $currentSelect.find('.' + classBlock + '__origin').find('input[type="hidden"]:not(:disabled)');
		$optionsSelected = $options.filter('[value="Y"]');
		$selectTitle = $currentSelect.find('.' + classBlock + '__origin').find('input[type="hidden"]:disabled');
		selectTitle = $selectTitle.attr('data-title');
	} else {
		$options = $currentSelect.find('.' + classBlock + '__origin').find('option:not(:disabled)');
		$optionsSelected = $options.filter(':selected');
		$selectTitle = $currentSelect.find('.' + classBlock + '__origin').find('option:disabled');
		selectTitle = $selectTitle.text();
	}
	/* ===== */

	/* Заполнение массива значениями */
	if ($currentSelect.hasClass(classInputs)) {
		$items.each(function() {
			values.push({
				text: $(this).next().text(),
				value: $(this).prop('checked') ? 'Y' : '',
				selected: $(this).prop('checked')
			});
		});
	} else {
		$items.each(function() {
			values.push({
				text: $(this).next().text(),
				value: $(this).next().attr('data-value'),
				selected: $(this).prop('checked')
			});
		});
	}
	/* ===== */

	selectedCount = values.filter(function(item) {
		return item.selected;
	}).length;

	/* Обновление значений текущего селекта */
	$currentSelect.attr('data-values', JSON.stringify(values));
	/* ===== */

	/* Обработка селекта в зависимости от того, заполнен он значениями или нет */
	if (selectedCount) {
		$currentSelect
			.addClass(classReady)
			.find('.' + classBlock + '__text')
			.text(
				values
					.filter(function(item) {
						return item.selected;
					})
					.map(function(item) {
						return item.text;
					})
					.join(', ')
			);

		$options.each(function() {
			var
				$thisOption = $(this),
				thisValue;

			if ($currentSelect.hasClass(classInputs)) {
				thisValue = $thisOption.attr('data-title');
				$thisOption.attr('value', null);

				$.each(values, function(i, item) {
					if (thisValue === item.text && item.selected) {
						$thisOption.val('Y');
					}
				});

			} else {
				thisValue = $thisOption.val();
				$thisOption.prop('selected', false);

				$.each(values, function(i, item) {
					if (thisValue === item.value && item.selected) {
						$thisOption.prop('selected', true);
					}
				});
			}
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
			.text(selectTitle);

		if ($currentSelect.hasClass(classInputs)) {
			$optionsSelected.attr('value', null);
			$selectTitle.val('Y');
		} else {
			$optionsSelected.prop('selected', false);
			$selectTitle.prop('selected', true);
		}

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