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
		$targets = $block.find('.' + classTarget);

	$links.each(function() {
		var
			$link = $(this),
			link = $link.attr('data-tab-link'),
			$target = $targets.filter('[data-tab-target="' + link + '"]');

		$link.on('click', function(e) {
			e.preventDefault();

			if ($link.hasClass(classLinkActive)) return;

			$links
				.filter('.' + classLinkActive)
				.removeClass(classLinkActive);

			$link.addClass(classLinkActive);

			$targets
				.filter('.' + classTargetActive)
				.removeClass(classTargetActive);

			$target.addClass(classTargetActive);
		});
	});
});