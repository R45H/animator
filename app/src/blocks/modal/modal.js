var
	$links = $('[data-modal]'),
	classBlock = 'modal',
	$blocks = $('.' + classBlock);

/* Обработка ссылок */
$links.each(function() {
	var
		$this = $(this),
		id = addIdHash($this.attr('data-modal'));

	if (!$(id).length) return;

	// Клик по кнопке, открывающей модалку
	$this.on('click', function() {
		toggleModal('open', id);
		return false;
	});
	// =====
});
/* ===== */

/* Клик по серому фону */
$blocks.on('click', function(event) {
	if (!$(event.target).hasClass(classBlock)) return;
	toggleModal('close', $(this).attr('id'));
});
/* ===== */

/* Клик по кнопке "закрыть" */
$blocks.find('[data-modal-close]').on('click', function(e) {
	e.preventDefault();
	toggleModal('close', $(this).closest('.' + classBlock).attr('id'));
});
/* ===== */