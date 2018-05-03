var
	cSelect = 'select',
	$select = $('.' + cSelect);

$select.selectmenu({
	classes: {
		'ui-selectmenu-button': cSelect + '__current', // Кнопка селекта
		'ui-selectmenu-button-open': cSelect + '__current_active', // Состояние кнопки при открытом селекте
		'ui-selectmenu-text': cSelect + '__text', // Текст внутри кнопки
		'ui-selectmenu-menu': cSelect + '__list' // Выпадающий список
	},
	create: function() {
		$(this)
			.next()
			.append('' +
				'<svg class="' + cSelect + '__icon">' +
					'<use xlink:href="img/sprite.svg#svg-arrow-down"></use>' +
				'</svg>'
			);
	}
});

$(window).on('resize', function() {
	$select.selectmenu('close');
});