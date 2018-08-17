/**
 * События:
 * checked.custom.radio - Выбрали вариант
 * unchecked.custom.radio - Отмена выбора
 */

var
	classBlock = 'radio',
	classInputChecked = 'radio__input_checked',
	$block = $('.' + classBlock).filter('.' + classBlock + '_can-uncheck');

$block.each(function() {
	var
		$this = $(this),
		$inputs = $(this).find('.' + classBlock + '__input');

	$inputs.on('click', function() {
		var $input = $(this);

		if ($input.hasClass(classInputChecked)) {
			$input
				.removeClass(classInputChecked)
				.prop('checked', false);
			$this.trigger('unchecked.custom.radio', [$input]);
			return;
		}

		$inputs.removeClass(classInputChecked);
		$input.addClass(classInputChecked);
		$this.trigger('checked.custom.radio', [$input]);
	});
});