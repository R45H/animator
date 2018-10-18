var
	classBlock = 'tab',
	classLink = classBlock + '__link',
	classLinkActive = classLink + '_active',
	classTarget = classBlock + '__target',
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
			link = $link.attr('data-tab-link');

		if ($link.hasClass(classLinkActive)) {

			$targets.each(function() {
				setTarget(link, $(this));
			});
		}

		$link.on('click', function(e) {
			e.preventDefault();

			if ($link.hasClass(classLinkActive)) return;

			/* Переключение кнопок табов */
			$links
				.filter('.' + classLinkActive)
				.removeClass(classLinkActive);

			$link.addClass(classLinkActive);
			/* ===== */

			/* Переключение целей */
			$targets.each(function() {
				setTarget(link, $(this));
			});
			/* ===== */
		});
	});
});

function setTarget(link, $target) {
	var
		data = JSON.parse($target.attr('data-tab-target')),
		currentData;

	$.each(data, function(index, value) {

		if (link == value.target) {
			currentData = value;
			return false;
		}
	});

	if (!currentData) return;

	if (currentData.text) {
		$target.text(currentData.text);
	}

	if (currentData.attrs) {

		$.each(currentData.attrs, function(key, value) {
			$target.attr(key, value);
		});
	}
}