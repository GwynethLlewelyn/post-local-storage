/**
 * postlocalstorage_functions.js
 * Handles the content storage of a post/reply/direct message inside localStorage.
 *
 * @author Gwyneth Llewelyn
 * @copyright © 2023,2024 by Gwyneth Llewelyn. Some rights reserved.
 * @license GPL-2.0-only
 */

/**
 * @function anonymous
 *
 * @param {Window} message - This object, which corresponds to the message being posted (will be set to `this`).
 * @param {Document} document - This object's DOM (will be set to `this.document`).
 */
(function(message, document) {
	/**
	 * Freshness interval in milliseconds.
	 * One year = 31536000000 milliseconds.
	 * @const {number}
	 */
	const FRESHNESS_INTERVAL = 365 * 24 * 60 * 60 * 1000;

	// If there is no localStorage support, give up
	if (!message.localStorage) {
		console.debug("no local storage support");
		return;
	}
	/**
	 * phpBB3 uses a textarea with name 'message', both for Quick Replies _and_ normal replies
	 * @type {Element?}
	 */
	const textarea = document.querySelector('textarea[name="message"]');
	// no point in being around if this is nil; also: avoids crashing below (gwyneth 20220303)
	if (!textarea) {
		console.debug("no phpBB3 content body textarea found, skipping");
		return;
	}
	/**
	 * phpBB3 usually gives the subject/topic the name 'subject' — same for QR and normal replies.
	 * @type {Element?}
	 */
	const subject = document.querySelector('input[name="subject"]');
	if (!subject) {
		console.debug("no phpBB3 subject line found");
		// I have not decided what to do in this case! Possibly just:
		// subject = "(no subject)";
	}
	/**
	 * The key for the key/value pair in localStorage is the current URL.
	 * @type {string}
	 */
	var key = message.location.href;
	// Firefox seems to have an odd bug which affects clicking backspace in quick succession.
	// Kudos to @gvp9000 and for the fix below. (gwyneth 20240414)
	// @see https://www.phpbb.com/customise/db/extension/postlocalstorage/support/topic/246616?p=877489#p877489
	// @kylesands has suggested a diferent method, one that deals better with other situations, e.g. when the
	// `sid` is passed via URL, which happens every once in a while: (gwyneth 20240421)
	if (key.includes("/posting.php")) { // Posting
		if (key.endsWith("#preview")) {
			key = key.slice(0, -8); // It keeps the key the same when previewing or not to help with recovery
		}
		if (key.includes("&sid=")) {
			key = key.split("&sid=")[0];
		}
	} else if (key.includes("/ucp.php")) { // PM'ing
		key = key.split("?")[0]; // It keeps the key the same when previewing or not to help with recovery
	}

	/**
	 * Event name to be used for saving content on demand, when user switches pages.
	 *
	 * Note: both the 'pagehide' or 'beforeunload' events are deprecated and should not be used here.
	 * @const {string}
	 */
	const unloadEvent = "visibilitychange";

	/**
	 * JSON object describing what we store on the localStorage for each article/message.
	 * @typedef StoredContent
	 * @type {object}
	 * @property {string} subject   - Content of the "subject" input box (also known as "title").
	 * @property {string} content   - The actual content of the textarea box (the article/message itself).
	 * @property {number} timestamp - Time in milliseconds since the Unix epoch, to deal with stale content.
	 */

	/**
	 * JSON object to be saved with the textarea content + subject content + timestamp.
	 * @type {JSON?}
	 */
	var item = message.localStorage.getItem(key);
	// If there's a `localStorage` entry for the current URL, update the textarea with the saved value.
	if (item) {
		/**
		 * JSON representation of one object in the localStorage.
		 * @type {StoredContent?}
		 */
		var data = JSON.parse(item);
		/** @since 1.1.0 */
		// Before 1.1.0, 'our' objects did not carry timestamps, so we need to check for them: (gwyneth 20240415)
		if (data?.timestamp) {
			// check if data is stale.
			if (Date.now() - data.timestamp > FRESHNESS_INTERVAL) {
				// Remove stale data. A new item will be added as soon as the user clicks a key.
				message.localStorage.removeItem(key);
				console.debug("stale data found; removing from localStorage");
				return;
			}
			// Data is still considered "fresh" enough, so we replace the value of the textarea with
			// what we have on the localStorage.
			textarea.value = data?.content ?? "";
			// same checking for subject.
			subject.value = data?.subject ?? "";
			console.debug("textarea content successfully restored");
		} else {
			// We don't know if the existing data is stale or not, since it comes from pre-1.1.0 times.
			// So, upgrade object to the new format, i.e. add a timestamp to existing content.
			/** @type {string} */
			let tempContent = data?.content ?? "";
			/** @type {string} */
			let tempSubject = data?.subject ?? "";
			message.localStorage.removeItem(key);
			item = JSON.stringify({ "content": tempContent, "subject": tempSubject, "timestamp": Date.now() });
			message.localStorage.setItem(key, item);
		}
	}

	/**
	 * This function will store the current value of the textarea in localStorage (or delete it if the textarea is blank) with a timestamp.
	 *
	 * It gets triggered by the "type" events on the input and textarea elements,
	 * @function updateStorage
	 * @type {EventListener}
	 */
	function updateStorage() {
		// Note: if the visibilitychange event is being used, one should check to see if the visibilityState
		// is 'hidden' or 'visible'; but we're going to save to storage in both cases.
		if (message.visibilityState === "hidden") {
			console.debug("Saving existing text before moving tab to background");
		}
		if (textarea.value) {
			item = JSON.stringify({ "content": textarea.value, "subject": (subject?.value ?? ""), "timestamp": Date.now() });
			message.localStorage.setItem(key, item);
			console.debug("Existing subject & content saved to localStorage");
		} else {
			message.localStorage.removeItem(key);
			console.debug("Empty textarea -- remove existing content & subject in localStorage");
		}
	}
	// When the user presses a key just *once* inside the textarea, run the storage function when the page is unloaded.
	// Note that because this happens just once, the listener is removed afterwards and we don't need to track it.
	textarea.addEventListener(
		"keyup",
		/**
		 * @listens keyup
		 * @type {EventListener}
		 */
		function() {
			message.addEventListener(unloadEvent, updateStorage);
			message.setInterval(updateStorage, 10000);
		}, { once: true }
	);
	// Same for the subject, I think:
	subject.addEventListener(
		"keyup",
		/**
		 * @listens keyup
		 * @type {EventListener}
		 */
		function() {
			message.addEventListener(unloadEvent, updateStorage);
			message.setInterval(updateStorage, 10000);
		}, { once: true }
	);

	// When the form is submitted, delete the localStorage key/value pair.
	textarea.form.addEventListener(
		"submit",
		/**
		 * @listens submit
		 * @type {EventListener}
		 */
		function() {
			/**
			 * Retrieve the session expiry time that was stamped on the post submit page.
			 * Force it to a number!
			 *
			 * @type {number}
			 */
			const expiry_time = parseInt(document.getElementById('expiry-time').innerText.trim(), 10);
			const dateNow = Math.floor(Date.now() / 1000);	// we get milliseconds, so we need to convert to seconds.
			console.debug("Date.now() in seconds is " + dateNow + " and expiry_time is " + expiry_time);
			if (dateNow > expiry_time) {
				// We won't clear anything if the session already expired, so return.
				return;
			}

			// Now remove the local storage on `Submit` — it'll get saved to the database as a post/PM,
			// so we don't need it around any longer.
			// ... except on Preview. We still want to keep the storage around during preview!
			// Kudos to @kylesands for this (gwyneth 20240416)
			if (document.activeElement.tagName.toLowerCase() == "input" && document.activeElement.value.toLowerCase() == 'submit') { // Added to only clear on Input button with Submit value
				message.localStorage.removeItem(key);
				message.removeEventListener(unloadEvent, updateStorage);
				console.debug("Text submitted (not in preview!); removed from localStorage");
			}
		}
	);
})(this, this.document);