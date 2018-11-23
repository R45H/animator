var
	classBlock = 'file-avatar',
	classBlockSelected = classBlock + '_selected',
	$blocks = $('.' + classBlock);

$blocks.each(function() {
	var
		$block = $(this),
		$input = $block.find('.' + classBlock + '__input'),
		$reset = $block.find('.' + classBlock + '__reset'),
		$link = $block.find('.' + classBlock + '__link'),
		$img = $block.find('.' + classBlock + '__img');

	/* Обработка добавления картинки */
	$input.on('change', function() {
		var inputFiles = this.files;

		if (!(inputFiles && inputFiles.length)) return;

		var
			reader = new FileReader(), // Объект для чтения прикреплённой картинки
			file = inputFiles[0]; // Картинка

		reader.onload = function(e) {
			$block.addClass(classBlock + '_selected');
			$link.attr('href', e.target.result);
			$img
				.css('background-image', 'url(' + e.target.result + ')')
				.trigger('added.custom.fileavatar');
		};

		reader.readAsDataURL(file);
	});
	/* ===== */

	/* Обработка удаления картинки */
	$reset.on('click', function(e) {
		e.preventDefault();

		$input.val('');

		$link.attr('href', '#');
		$img.css('background-image', '');
		$block
			.removeClass(classBlock + '_selected')
			.css('background-image', '')
			.trigger('removed.custom.fileavatar');
	});
	/* ===== */
});