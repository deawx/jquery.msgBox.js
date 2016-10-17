(function($) {

var createMessageBox = function(options) {
	var
	$outerWrapper = $('<div class="mb-outerWrapper">'),
	$innerWrapper = $('<div class="mb-innerWrapper">').appendTo($outerWrapper),
	$msgBox = $('<div class="mb">').appendTo($innerWrapper),
	$title = $('<div class="mb-title">').appendTo($msgBox),
	$message = $('<div class="mb-message">').appendTo($msgBox),
	$buttons = $('<div class="mb-buttons">').appendTo($msgBox),
	$button,
	buttonIndex, button;

	$title.text(options.title);
	$message.text(options.message);
	for (buttonIndex in options.buttons) {
		button = options.buttons[buttonIndex];
		$('<div class="mb-button">')
			.text(button.text)
			.on('click', [button.select], function(e) {
				$outerWrapper.fadeOut(200, function() {
					$outerWrapper.remove();
				});
				if (e.data === undefined) {
					return;
				}
				if (typeof e.data[0] === 'function') {
					e.data[0].call(this, e);
				}
			})
			.appendTo($buttons);
		$buttons.append(' ');
	}

	this.append($outerWrapper);

	$outerWrapper.hide().fadeIn(200);
}

$.fn.msgBox = function(options) {

	createMessageBox.call(this, $.extend(true, {
		title: '',
		message: '',
		type: 'info',
		buttons: []
	}, options));

}

}(jQuery))