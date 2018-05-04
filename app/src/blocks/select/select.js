var
	classBlock = 'select',
	$select = $('.' + classBlock + '__origin');

$select.selectmenu({
	classes: {
		'ui-selectmenu-button': classBlock + '__current', // Кнопка селекта
		'ui-selectmenu-button-open': classBlock + '__current_active', // Состояние кнопки при открытом селекте
		'ui-selectmenu-text': classBlock + '__text', // Текст внутри кнопки
		'ui-selectmenu-menu': classBlock + '__list' // Выпадающий список
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

$(window).on('resize', function() {
	$select.selectmenu('close');
});