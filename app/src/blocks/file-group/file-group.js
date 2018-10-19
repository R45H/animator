var
	classBlock = 'file-group',
	delay = 300;

/* Обработка добавления */
$(document).on('added.custom.fileimg', '.' + classBlock + '__item', function() {
	var
		$thisItem = $(this),
		$thisBlock = $thisItem.closest('.' + classBlock),
		$thisWrap = $thisItem.closest('.' + classBlock + '__item-wrap'),
		$wrapLayout,
		maxCount = $thisBlock.attr('data-count'), // Доступное количество элементов
		currentCount = $thisBlock.find('.' + classBlock + '__item').length; // Текущее количество

	$thisWrap.addClass(classBlock + '__item-wrap_fill');

	/* Если следующего элемента нет */
	if (!$thisWrap.next().length) {

		/* Ограничение количества */
		if (currentCount && currentCount >= maxCount) {
			return;
		}
		/* ===== */

		var randomId = 'id-' + makeRandomId();

		$wrapLayout = $thisWrap
			.clone(true)
			.removeClass(classBlock + '__item-wrap_fill');

		$wrapLayout
			.find('.' + classBlock + '__item')
			.removeClass('file-img_selected file-img_focus')
			.css('background-image', '')
			.end()
			.find('.file-img__input')
			.val('')
			.attr('id', randomId)
			.end()
			.find('.file-img__label')
			.attr('for', randomId);

		$wrapLayout.appendTo($thisBlock);
		return;
	}
	/* ===== */

	/* Если следующий элемент уже видимый */
	if ($thisWrap.next().hasClass(classBlock + '__item-wrap_visible')) {
		return;
	}
	/* ===== */

	$thisWrap
		.next()
		.fadeIn(delay, function() {
			$(this).addClass(classBlock + '__item-wrap_visible');
		});
});
/* ===== */

/* Обработка удаления */
$(document).on('removed.custom.fileimg', '.' + classBlock + '__item', function() {
	var
		$thisItem = $(this),
		$thisBlock = $thisItem.closest('.' + classBlock),
		$thisWrap = $thisItem.closest('.' + classBlock + '__item-wrap'),
		$nextWrap = $thisWrap.next();

	$thisWrap.removeClass(classBlock + '__item-wrap_fill');

	if (!$nextWrap.length) return;

	if (!$nextWrap.hasClass(classBlock + '__item-wrap_fill')) {

		$thisWrap.fadeOut(delay, function() {
			$(this)
				.removeClass(classBlock + '__item-wrap_visible')
				.appendTo($thisBlock);
		});
	} else {

		if ($thisWrap.nextAll().last().hasClass(classBlock + '__item-wrap_fill')) {
			$thisWrap
				.fadeOut(delay, function() {
					$(this)
						.appendTo($thisBlock)
						.fadeIn(0);
				});
		} else {
			$thisWrap.fadeOut(delay, function() {
				$(this)
					.removeClass(classBlock + '__item-wrap_visible')
					.appendTo($thisBlock);
			});
		}
	}
});
/* ===== */