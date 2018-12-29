var
	$data = $('.js-select-bind-data'), // Все элементы с данными
	$setters = $('.js-select-bind-setter'), // Элементы-переключатели (сеттеры)
	$getters = $('.js-select-bind-getter'); // Все элементы, реагирующие на переключение (геттеры)

$setters.each(function() {
	var
		$setter = $(this), // Текущий сеттер
		$setterNative = $setter.find('select'); // Нативный селект сеттера

	/* Обработка переключения */
	$setterNative.on('change', function() {
		var valueSetter = $setterNative.find('option:selected:not(:disabled)').val(); // Выбранное значение

		if (!valueSetter) return;

		var $thisData = $data.filter('[data-setter="' + valueSetter + '"]'); // Элементы с данными для текущего выбранного значения

		/* Прохождение по каждому элементу с данными */
		$thisData.each(function() {
			var
				$thisOneData = $(this), // Текущий элемент с данными
				thisData = JSON.parse($thisOneData.attr('data-items')),
				valueGetter = $thisOneData.attr('data-getter'), // Значение геттера
				$thisGetters = $getters.filter('[data-getter="' + valueGetter + '"]'); // Нужные геттеры

			/* Прохождение по каждому геттеру */
			$thisGetters.each(function() {
				var
					$thisGetter = $(this), // Текущий геттер
					$thisGetterNative = $thisGetter.find('select'); // Нативный селект текущего геттера

				$thisGetterNative
					.find('option:not(:disabled)')
					.remove()
					.end()
					.find('option:disabled')
					.prop('selected', true);

				$.each(thisData, function(key, value) {
					$thisGetterNative.append('<option value="' + key + '">' + value + '</option>');
				});

				$thisGetterNative.selectmenu('refresh');
				$thisGetter.removeClass('select_light-selected');
			});
			/* ===== */

		});
		/* ===== */

	});
	/* ===== */

});