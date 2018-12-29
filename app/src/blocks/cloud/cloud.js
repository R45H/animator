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
		$data = $block.find('.' + classBlock + '__data'),
		data,
		isFill = false,
		isAlreadyExist = false;

	try {
		data = JSON.parse($data.val());
	} catch(e) {
		data = [];
	}

	/* Начальное заполнение тегами */
	$.each(data, function(index, value) {
		appendTag($tagsWrap, value);
	});
	/* ===== */

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
				}, delay / 2, function() {
					$(this).css('pointer-events', 'none')
				});
			} else {

				if (isFill) {
					return;
				} else {
					isFill = true;
					$btn
						.css({
							'opacity': 0,
							'pointer-events': ''
						})
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
				}, delay / 2, function() {
					$(this).css('pointer-events', 'none')
				});
			}
		}
	});
	/* ===== */

	/* Обработка добавления тега */
	$btn.on('click', function() {
		var
			$this = $(this),
			val = $input.val();

		if (!isFill || isAlreadyExist) return false;

		appendTag($tagsWrap, val);

		data.push(val);
		$data.val(JSON.stringify(data));

		$tags = $block.find('.' + classBlock + '__tag');

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
			$thisTag = $this.closest('.' + classBlock + '__tag'),
			curDataIndex = data.indexOf($thisTag.text());

		$thisTag.fadeOut(delay, function() {
			$thisTag.remove();

			if (~curDataIndex) {
				data.splice(curDataIndex, 1);
				$data.val(JSON.stringify(data));
			}

			$tags = $block.find('.' + classBlock + '__tag');
		});

		return false;
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

function appendTag($wrap, text) {
	var
		newTag = '' +
			'<div class="cloud-item cloud__tag">' +
				'<div class="cloud-item__text-wrap">' +
					'<div class="cloud-item__text cloud__tag-text">' + text + '</div>' +
				'</div>' +
				'<a href="#" class="cloud-item__close cloud__tag-close">' +
					'<svg class="cloud-item__close-icon">' +
						'<use xlink:href="img/sprite.svg#svg-plus"></use>' +
					'</svg>' +
				'</a>' +
			'</div>';

	$wrap
		.append(newTag)
		.scrollLeft($wrap[0].scrollWidth - $wrap.width());
}