// Copyright (C) 2023,2024 Gwyneth Llewelyn
//
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; version 2.
//
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

(function(message, doc) {
	var nIntervId; //

	// One year = 31536000000 milliseconds.
	const FRESHNESS_INTERVAL = 365 * 24 * 60 * 60 * 1000;

	// If there is no localStorage support, give up
	if (!message.localStorage) {
		console.debug("no local storage support");
		return;
	}
	// phpBB3 uses a textarea with name 'message', both for Quick Replies _and_ normal replies
	var textarea = doc.querySelector('textarea[name="message"]');
	// no point in being around if this is nil; also: avoids crashing below (gwyneth 20220303)
	if (!textarea) {
		console.warn("no phpBB3 content body textarea found");
		return;
	}
	// phpBB3 usually gives the subject/topic the name 'subject' — same for QR and normal replies.
	var subject = doc.querySelector('input[name="subject"]');
	if (!subject) {
		console.debug("no phpBB3 subject line found");
		// I have not decided what to do in this case! Possibly just:
		// subject = "(no subject)";
	}
	// The key for the key/value pair in localStorage is the current URL.
	var key = message.location.href;
	// Firefox seems to have an odd bug which affects clicking backspace in quick succession.
	// Kudos to @gvp9000 and for the fix below. (gwyneth 20240414)
	// @see https://www.phpbb.com/customise/db/extension/postlocalstorage/support/topic/246616?p=877324#p877324
	var count_hash_num = key.split("#").length - 1;
	for (let i = 0; i < count_hash_num - 1; i++) {
		key = key.substring(0, key.lastIndexOf('#'));
	}
	// JSON object to be saved with the textarea content + subject content + timestamp.
	var item = null;
	// Event to be used for saving content on demand, when user switches pages.
	// Note: both the 'pagehide' or 'beforeunload' are deprecated and should not be used.
	const unloadEvent = "visibilitychange";

	// If there's a localStorage entry for the current URL, update the textarea with the saved value.
	item = message.localStorage.getItem(key);
	if (item) {
		var data = JSON.parse(item);
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
			let tempContent = data?.content ?? "";
			let tempSubject = data?.subject ?? "";
			message.localStorage.removeItem(key);
			item = JSON.stringify({ "content": tempContent, "subject": tempSubject, "timestamp": Date.now() });
			message.localStorage.setItem(key, item);
		}
	}
//
// 	// Workaround for non-existing Object.hasOwn()
// 	function isIn(field, obj) {
// 		if ("hasOwn" in Object) {
// 			return Object.hasOwn(field, obj);
// 		}
// 		return (field in obj);
// 	}

	// This function will store the current value of the textarea in localStorage (or delete it if the textarea is blank) with a timestamp.
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
		// This event listener is no longer needed now so remove it.
		// Once the user presses another key, it will be added again!
		message.removeEventListener(unloadEvent, updateStorage);
	}
	// When the user presses a key just *once* inside the textarea, run the storage function when the page is unloaded.
	textarea.addEventListener(
		"keyup",
		function() {
			message.addEventListener(unloadEvent, updateStorage);
			nIntervId = message.setInterval(updateStorage, 10000);
		}, { once: true }
	);
	// Same for the subject, I think:
	subject.addEventListener(
		"keyup",
		function() {
			message.addEventListener(unloadEvent, updateStorage);
			nIntervId = message.setInterval(updateStorage, 10000);
		}, { once: true }
	);

	// When the form is submitted, delete the localStorage key/value pair.
	textarea.form.addEventListener("submit", function() {
		// ... except on Preview. We still want to keep the storage around during preview!
		// Kudos to
		if (document.activeElement.value != 'Preview') {
			message.localStorage.removeItem(key);
			message.removeEventListener(unloadEvent, updateStorage);
			message.clearInterval(nIntervId);
			console.debug("Text submitted (not in preview!); removed from localStorage");
		}
	});
})(this, this.document);