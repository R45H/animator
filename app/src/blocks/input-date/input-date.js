var
	classBlock = 'input-date',
	$blocks = $('.' + classBlock);

$blocks.each(function() {
	var
		$this = $(this),
		$input = $this.find('.' + classBlock + '__input'),
		$btn = $this.find('.' + classBlock + '__btn');

	$input.datepicker({
		dateFormat: 'dd.mm.yy',
		dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		monthNames: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
		monthNamesShort: [ 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
		firstDay: 1,
		prevText: '',
		nextText: '',
		showOtherMonths: true,
		defaultDate: null,
		showOn: 'button',
		beforeShow: function() {
			$('#ui-datepicker-div').addClass(classBlock + '__widget');
		}
	});

	$btn.on('click', function() {
		$input.datepicker('show');
	});
});