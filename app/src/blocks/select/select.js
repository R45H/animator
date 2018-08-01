var
	classBlock = 'select',
	classSimple = classBlock + '_simple',
	$select = $('.' + classBlock + '__origin');

$select.each(function() {
	var
		$this = $(this),
		classList = classBlock + '__list';

	if ($this.closest('.' + classBlock).hasClass(classSimple)) {
		classList += ' ' + classList + '_simple';
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
		}
	});
});

$(window).on('resize', function() {
	$select.selectmenu('close');
});