(function (message, doc) {
	// Cut the mustard.
	if (!message.localStorage) return;
	// You should probably use a more specific selector than this.
	var textarea = doc.querySelector('textarea');
	// The key for the key/value pair in localStorage is the current URL.
	var key = message.location.href;
	var item = null;
	// Use the 'pagehide' event in modern browsers or 'beforeunload' in older browsers.
	var unloadEvent;
	if ('onpagehide' in message) {
		unloadEvent = 'pagehide';
	} else {
		unloadEvent = 'beforeunload';
	}
	// If there's a localStorage entry for the current URL, update the textarea with the saved value.
	item = message.localStorage.getItem(key);
	if (item) {
		var data = JSON.parse(item);
		textarea.value = data.content;
	}
	// This function will store the current value of the textarea in localStorage (or delete it if the textarea is blank).
	function updateStorage() {
		if (textarea.value) {
			item = JSON.stringify({'content': textarea.value});
			message.localStorage.setItem(key, item);
		} else {
			message.localStorage.removeItem(key);
		}
		// This event listener is no longer needed now so remove it.
		message.removeEventListener(unloadEvent, updateStorage);
	}
	// When the user presses a key just *once* inside the textarea, run the storage function when the page is unloaded.
	textarea.addEventListener('keyup', function() {
		message.addEventListener(unloadEvent, updateStorage);
		message.setInterval(updateStorage, 10000);
	}, {'once': true});
	// When the form is submitted, delete the localStorage key/value pair.
	textarea.form.addEventListener('submit', function() {
		message.localStorage.removeItem(key);
		message.removeEventListener(unloadEvent, updateStorage);
	});
}(this, this.document));