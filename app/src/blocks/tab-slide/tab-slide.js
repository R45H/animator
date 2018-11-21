var
	classBlock = 'tab-slide',
	$blocks = $('.' + classBlock),
	delay = 300;

$blocks.each(function() {
	var
		$block = $(this),
		$targets = $block.find('.' + classBlock + '__item'),
		$links = $block.find('.' + classBlock + '__link'),
		$modal = $block.closest('.modal');

	$links.each(function() {
		var
			$link = $(this),
			link = $link.attr('data-tab-slide-link');

		$link.on('click', function(e) {
			var
				$target = $targets.filter('[data-tab-slide-target="' + link + '"]'),
				$restTarget = $targets.filter(':not(.' + classBlock + '__item_hidden)');

			e.preventDefault();

			$target.slideDown(delay, function() {
				$(this)
					.removeClass(classBlock + '__item_hidden')
					.css('display', '');
			});

			$restTarget.slideUp(delay, function() {
				$(this)
					.addClass(classBlock + '__item_hidden')
					.css('display', '');
			});
		});
	});

	if ($modal.length) {

		$modal.on('hidden.custom.modal', function() {
			$targets
				.css('display', '')
				.addClass(classBlock + '__item_hidden')
				.first()
				.removeClass(classBlock + '__item_hidden');
		});
	}
});