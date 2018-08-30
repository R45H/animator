var
	classBlock = 'file-group',
	$blocks = $('.' + classBlock),
	delay = 300;

$blocks.each(function() {
	var
		$block = $(this),
		$wraps = $block.find('.' + classBlock + '__item-wrap');

	$wraps.each(function() {
		var
			$wrap = $(this),
			$item = $wrap.find('.' + classBlock + '__item');

		/* Обработка добавления */
		$item.on('added.custom.fileimg', function() {

			$wrap.addClass(classBlock + '__item-wrap_fill');

			/* Если следующего элемента нет или он уже видимый, дальше ничего не делать */
			if (!$wrap.next().length || $wrap.next().hasClass(classBlock + '__item-wrap_visible')) return;
			/* ===== */

			$wrap
				.next()
				.fadeIn(delay, function() {
					$(this).addClass(classBlock + '__item-wrap_visible');
				});
		});
		/* ===== */

		/* Обработка удаления */
		$item.on('removed.custom.fileimg', function() {
			var $nextWrap = $wrap.next();

			$wrap.removeClass(classBlock + '__item-wrap_fill');

			if (!$nextWrap.length) return;

			if (!$nextWrap.hasClass(classBlock + '__item-wrap_fill')) {

				$wrap.fadeOut(delay, function() {
					$(this)
						.removeClass(classBlock + '__item-wrap_visible')
						.appendTo($block);
				});
			} else {

				if ($wrap.nextAll().last().hasClass(classBlock + '__item-wrap_fill')) {
					$wrap
						.fadeOut(delay, function() {
							$(this)
								.appendTo($block)
								.fadeIn(0);
						});
				} else {
					$wrap.fadeOut(delay, function() {
						$(this)
							.removeClass(classBlock + '__item-wrap_visible')
							.appendTo($block);
					});
				}
			}
		});
		/* ===== */
	});
});