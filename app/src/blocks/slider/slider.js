var
	classBlock = 'slider',
	$blocks = $('.' + classBlock);

$blocks.each(function() {
	var
		$this = $(this),
		$prevArrow = $this.find('.' + classBlock + '__arrow_prev'),
		$nextArrow = $this.find('.' + classBlock + '__arrow_next'),
		$slider = $this.find('.' + classBlock + '__body'),
		sliderRows = +$this.attr('data-rows') || 1,
		sliderCols = +$this.attr('data-cols') || 1,
		sliderSmRows = +$this.attr('data-sm-rows') || sliderRows || 1,
		sliderSmCols = +$this.attr('data-sm-cols') || sliderCols || 1,
		sliderMdRows = +$this.attr('data-md-rows') || sliderSmRows || sliderRows || 1,
		sliderMdCols = +$this.attr('data-md-cols') || sliderSmCols || sliderCols || 1,
		sliderLgRows = +$this.attr('data-lg-rows') || sliderMdRows || sliderRows || 1,
		sliderLgCols = +$this.attr('data-lg-cols') || sliderMdCols || sliderCols || 1,
		sliderXlRows = +$this.attr('data-xl-rows') || sliderLgRows || sliderRows || 1,
		sliderXlCols = +$this.attr('data-xl-cols') || sliderLgCols || sliderCols || 1;

	$slider.slick({
		prevArrow: $prevArrow,
		nextArrow: $nextArrow,
		rows: sliderRows,
		slidesToShow: sliderCols,
		slidesToScroll: sliderCols,
		mobileFirst: true,
		responsive: [
			{
				breakpoint: 575,
				settings: {
					rows: sliderSmRows,
					slidesToShow: sliderSmCols,
					slidesToScroll: sliderSmCols
				}
			},
			{
				breakpoint: 767,
				settings: {
					rows: sliderMdRows,
					slidesToShow: sliderMdCols,
					slidesToScroll: sliderMdCols
				}
			},
			{
				breakpoint: 991,
				settings: {
					rows: sliderLgRows,
					slidesToShow: sliderLgCols,
					slidesToScroll: sliderLgCols
				}
			},
			{
				breakpoint: 1199,
				settings: {
					rows: sliderXlRows,
					slidesToShow: sliderXlCols,
					slidesToScroll: sliderXlCols
				}
			}
		]
	});
});