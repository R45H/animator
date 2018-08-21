var classBlock = 'modal';

/* Клик по кнопке, открывающей модалку */
$(document).on('click', '[data-modal]', function() {
	var
		$this = $(this),
		id = addIdHash($this.attr('data-modal'));

	if (!$(id).length) return;

	toggleModal('open', id);
	return false;
});
/* ===== */

/* Клик по серому фону */
$(document).on('click', '.' + classBlock, function(event) {
	if (!$(event.target).hasClass(classBlock)) return;
	toggleModal('close', $(this).attr('id'));
});
/* ===== */

/* Клик по кнопке "закрыть" */
$(document).on('click', '[data-modal-close]', function(e) {
	e.preventDefault();
	toggleModal('close', $(this).closest('.' + classBlock).attr('id'));
});
/* ===== */