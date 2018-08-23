// Для ссылок с href='#' и наличием только атрибутов class, href и style отключается стандартное поведение ссылки
$(document).on('click', 'a', function(event) {
	var $this = $(this);

	if ($this.attr('href') != '#') return;

	if (
		(this.attributes.length < 4 && $this.attr('class') && $this.attr('href') && $this.attr('style')) ||
		(this.attributes.length < 3 && $this.attr('class') && $this.attr('href')) ||
		(this.attributes.length < 2 && !$this.attr('class') && $this.attr('href'))
	) {
		event.preventDefault();
	}
});

svg4everybody();
``
/* Сброс кастомных селектов при нажатии на reset формы */
$('input[type=reset]').on('click', function() {
	var $selectBlocks = $(this).closest('form').find('.select');

	$selectBlocks.each(function() {
		$(this)
			.attr('data-values', null)
			.removeClass('select_multiply-ready select_light-selected');
	});
});
/* ===== */
