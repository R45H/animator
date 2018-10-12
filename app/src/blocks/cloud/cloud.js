var
	classBlock = 'cloud',
	$blocks = $('.' + classBlock),
	delay = 300;

$blocks.each(function() {
	var
		$block = $(this),
		$tagsWrap = $block.find('.' + classBlock + '__tags'),
		$tags = $block.find('.' + classBlock + '__tag'),
		$input = $block.find('.' + classBlock + '__input'),
		$btn = $block.find('.' + classBlock + '__btn'),
		isFill = false,
		isAlreadyExist = false;

	/* Обработка появления кнопки при вводе в поле ввода */
	$input.on('input', function() {
		var
			$this = $(this),
			val = $this.val();

		$tags.each(function() {
			var tagText = $(this).find('.' + classBlock + '__tag-text').text();

			if (val && val == tagText) {
				isAlreadyExist = true;
				return false;
			} else {
				isAlreadyExist = false;
			}
		});

		if (val) {

			if (isAlreadyExist) {
				isFill = false;
				$btn.animate({
					opacity: 0
				}, delay / 2);
			} else {

				if (isFill) {
					return;
				} else {
					isFill = true;
					$btn
						.css('opacity', 0)
						.removeClass(classBlock + '__btn_hidden')
						.animate({
							opacity: 1
						}, delay / 2);
				}
			}
		} else {

			if (!isFill) {
				return;
			} else {
				isFill = false;
				$btn.animate({
					opacity: 0
				}, delay / 2);
			}
		}
	});
	/* ===== */

	/* Обработка добавления тега */
	$btn.on('click', function() {
		var
			$this = $(this),
			val = $input.val(),
			newTag;

		if (!isFill || isAlreadyExist) return false;

		newTag = '' +
			'<div class="cloud__tag">' +
				'<div class="cloud__tag-text">' + val + '</div>' +
				'<div class="cloud__tag-close">' +
					'<svg class="cloud__tag-close-icon">' +
						'<use xlink:href="img/sprite.svg#svg-plus"></use>' +
					'</svg>' +
				'</div>' +
			'</div>';

		$tagsWrap.append(newTag);
		$tags = $block.find('.' + classBlock + '__tag');

		$tagsWrap.scrollLeft($tagsWrap.offset().left + $tagsWrap.width());

		$input
			.val('')
			.focus();

		$this.addClass(classBlock + '__btn_hidden');
		isFill = false;

		return false;
	});
	/* ===== */

	/* Обработка удаления тега */
	$block.on('click', '.' + classBlock + '__tag-close', function() {
		var
			$this = $(this),
			$thisTag = $this.closest('.' + classBlock + '__tag');

		$thisTag.fadeOut(delay, function() {
			$thisTag.remove();
			$tags = $block.find('.' + classBlock + '__tag');
		});
	});
	/* ===== */

	/* Обработка горячих клавиш */
	$input.on('keypress', function(e) {
		var key = e.keyCode;

		if (key == 13) {
			$btn.trigger('click');
			return false;
		}
	});
	/* ===== */
});