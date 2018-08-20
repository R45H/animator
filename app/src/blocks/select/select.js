var
	classBlock = 'select',
	classSimple = classBlock + '_simple',
	classLight = classBlock + '_light',
	classLightSelected = classBlock + '_light-selected',
	$select = $('.' + classBlock + '__origin');

$select.each(function() {
	var
		$this = $(this),
		$thisBlock = $this.closest('.' + classBlock),
		classList = classBlock + '__list';

	if ($this.closest('.' + classBlock).hasClass(classSimple)) {
		classList += ' ' + classList + '_simple';
	}

	if ($this.closest('.' + classBlock).hasClass(classLight)) {
		classList += ' ' + classList + '_light';
	}

	$this.selectmenu({
		classes: {
			'ui-selectmenu-button': classBlock + '__current', // Кнопка селекта
			'ui-selectmenu-button-open': classBlock + '__current_active', // Состояние кнопки при открытом селекте
			'ui-selectmenu-text': classBlock + '__text', // Текст внутри кнопки
			'ui-selectmenu-menu': classList // Выпадающий список
		},
		create: function() {
			$(this)
				.next()
				.append('' +
					'<svg class="' + classBlock + '__icon">' +
						'<use xlink:href="img/sprite.svg#svg-arrow-down"></use>' +
					'</svg>'
				);

			if (!$thisBlock.hasClass(classLight)) return;
			if ($this.find('option').first().attr('disabled')) return;
			$thisBlock.addClass(classLightSelected);
		},
		change: function() {
			if (!$thisBlock.hasClass(classLight)) return;
			if ($thisBlock.hasClass(classLightSelected)) return;
			$thisBlock.addClass(classLightSelected);
		}
	});
});

$(window).on('resize', function() {
	$select.selectmenu('close');
});