var classBlock = 'file-img';

/* Обработка добавления картинки */
$(document).on('change', '.' + classBlock + '__input', function() {
	var
		$thisInput = $(this),
		$thisBlock = $thisInput.closest('.' + classBlock),
		inputFiles = this.files; // Картинки

	if (!(inputFiles && inputFiles.length)) return;

	var
		reader = new FileReader(), // Объект для чтения прикреплённой картинки
		file = inputFiles[0]; // Картинка

	reader.onload = function(e) {
		$thisBlock
			.addClass(classBlock + '_selected')
			.css('background-image', 'url(' + e.target.result + ')')
			.trigger('added.custom.fileimg');
	};

	reader.readAsDataURL(file);
});
/* ===== */

/* Обработка удаления картинки */
$(document).on('click', '.' + classBlock + '__reset', function(e) {
	var
		$thisReset = $(this),
		$thisBlock = $thisReset.closest('.' + classBlock),
		$thisInput = $thisBlock.find('.' + classBlock + '__input');

	e.preventDefault();

	$thisInput.val('');

	$thisBlock
		.removeClass(classBlock + '_selected')
		.css('background-image', '')
		.trigger('removed.custom.fileimg');
});
/* ===== */

/* Обработка фокуса на Firefox */
$(document).on('focus', '.' + classBlock + '__input', function() {
	$(this)
		.closest('.' + classBlock)
		.addClass(classBlock + '_focus');
});

$(document).on('blur', '.' + classBlock + '__input', function() {
	$(this)
		.closest('.' + classBlock)
		.removeClass(classBlock + '_focus');
});
/* ===== */