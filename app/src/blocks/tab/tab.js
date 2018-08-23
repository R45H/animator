var
	classBlock = 'tab',
	classLink = classBlock + '__link',
	classLinkActive = classLink + '_active',
	classTarget = classBlock + '__target',
	classTargetActive = classTarget + '_active',
	$blocks = $('.' + classBlock),
	delay = 1000;

$blocks.each(function() {
	var
		$block = $(this),
		$links = $block.find('.' + classLink),
		$targets = $block.find('.' + classTarget),
		isChanging = false;

	$links.each(function() {
		var
			$link = $(this),
			link = $link.attr('data-tab-link'),
			$target = $targets.filter('[data-tab-target="' + link + '"]');

		$link.on('click', function(e) {
			e.preventDefault();

			if ($link.hasClass(classLinkActive)) return;

			if (isChanging) {
				return;
			} else {
				isChanging = true;
			}

			$links
				.filter('.' + classLinkActive)
				.removeClass(classLinkActive);

			$link.addClass(classLinkActive);

			$targets
				.filter('.' + classTargetActive)
				.fadeOut(delay / 2, function() {
					$(this)
						.removeClass(classTargetActive)
						.css('display', '');

					$target
						.fadeIn(delay / 2, function() {
							$(this)
								.addClass(classTargetActive)
								.css('display', '');

							isChanging = false;
						});
				});
		});
	});
});