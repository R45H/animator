var
	classBlock = 'date',
	classWidget = classBlock + '__widget',
	$blocks = $('.' + classBlock);

$blocks.each(function() {
	var
		$this = $(this),
		$widget = $this.find('.' + classWidget);

	$widget.datepicker({
		dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		monthNames: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
		monthNamesShort: [ 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
		firstDay: 1,
		prevText: '',
		nextText: '',
		showOtherMonths: true,
		defaultDate: null
	});
});