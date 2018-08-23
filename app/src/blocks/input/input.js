/* Маска ввода */
$('.input_tel').mask('+7 (999) 999-99-99');
/* ===== */

/* Ввод только цифр */
$('.input_number').on('input', function() {
	var $this = $(this);

	$this.val(
		parseInt($this.val()) || ''
	);
});
/* ===== */
