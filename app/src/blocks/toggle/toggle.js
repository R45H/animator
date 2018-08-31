var
	classBlock = 'toggle',
	classActive = classBlock + '_opened',
	classInactive = classBlock + '_closed',
	$blocks = $('.' + classBlock);

$blocks.each(function() {
	var $block = $(this);

	/* Анимация гамбургера при клике */
	$block.on('click', function() {

		if (!$block.hasClass(classActive) && !$block.hasClass(classInactive)) {
			$block.addClass(classActive);
		} else {
			$block.toggleClass(classActive);
			$block.toggleClass(classInactive);
		}
	});
	/* ===== */
});