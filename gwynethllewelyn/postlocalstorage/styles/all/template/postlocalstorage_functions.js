// Copyright (C) 2023,2024 Gwyneth Llewelyn
//
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; version 2.
//
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

(function(message, doc) {
	// If there is no localStorage support, give up
	if (!message.localStorage) return;
	// phpBB3 uses a textarea with id and name 'message'
	var textarea = doc.querySelector("textarea#message");
	// no point in being around if this is nil; also: avoids crashing below (gwyneth 20220303)
	if (!textarea) return;
	// The key for the key/value pair in localStorage is the current URL.
	var key = message.location.href;
	// Firefox seems to have an odd bug which affects clicking backspace in quick succession.
	// Kudos to @gvp9000 and for the fix below. (gwyneth 20240414)
	// @see https://www.phpbb.com/customise/db/extension/postlocalstorage/support/topic/246616?p=877324#p877324
	var count_hash_num = key.split("#").length - 1;
	for (let i = 0; i < count_hash_num - 1; i++) {
		key = key.substring(0, key.lastIndexOf('#'));
	}
	var item = null;
	var item = null;
	// Use the 'pagehide' event in modern browsers or 'beforeunload' in older browsers.
	var unloadEvent;
	if ("onpagehide" in message) {
		unloadEvent = "pagehide";
	} else {
		unloadEvent = "beforeunload";
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
			item = JSON.stringify({ content: textarea.value });
			message.localStorage.setItem(key, item);
		} else {
			message.localStorage.removeItem(key);
		}
		// This event listener is no longer needed now so remove it.
		message.removeEventListener(unloadEvent, updateStorage);
	}
	// When the user presses a key just *once* inside the textarea, run the storage function when the page is unloaded.
	textarea.addEventListener(
		"keyup",
		function() {
			message.addEventListener(unloadEvent, updateStorage);
			message.setInterval(updateStorage, 10000);
		}, { once: true }
	);
	// When the form is submitted, delete the localStorage key/value pair.
	textarea.form.addEventListener("submit", function() {
		message.localStorage.removeItem(key);
		message.removeEventListener(unloadEvent, updateStorage);
	});
})(this, this.document);