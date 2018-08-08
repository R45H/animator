var
	classBlock = 'slider',
	$blocks = $('.' + classBlock);

$blocks.each(function() {
	var
		$this = $(this),
		$prevArrow = $this.find('.' + classBlock + '__arrow_prev'),
		$nextArrow = $this.find('.' + classBlock + '__arrow_next'),
		$slider = $this.find('.' + classBlock + '__body');

	$slider.slick({
		prevArrow: $prevArrow,
		nextArrow: $nextArrow
	});
});