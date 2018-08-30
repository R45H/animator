var
	classBlock = 'file-img',
	$blocks = $('.' + classBlock);

$blocks.each(function() {
	var
		$block = $(this),
		$input = $block.find('.' + classBlock + '__input'), // Инпут
		$reset = $block.find('.' + classBlock + '__reset'); // Кнопка сброса

	/* Обработка добавления картинки */
	$input.on('change', function() {
		var inputFiles = this.files; // Картинки

		if (!(inputFiles && inputFiles.length)) return;

		var
			reader = new FileReader(), // Объект для чтения прикреплённой картинки
			file = inputFiles[0]; // Картинка

		reader.onload = function(e) {
			$block
				.addClass(classBlock + '_selected')
				.css('background-image', 'url(' + e.target.result + ')');
		};

		reader.readAsDataURL(file);
	});
	/* ===== */

	/* Обработка удаления картинки */
	$reset.on('click', function() {

		$block
			.removeClass(classBlock + '_selected')
			.css('background-image', '');

		$input.val('');
	});
	/* ===== */

	/* Обработка фокуса на Firefox */
	$input.on('focus', function() {
		$block.addClass(classBlock + '_focus');
	});

	$input.on('blur', function() {
		$block.removeClass(classBlock + '_focus');
	});
	/*  */
});