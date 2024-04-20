# Changelog

For a _much_ more detailed version of this changelog, see the [commit history](https://github.com/GwynethLlewelyn/post-local-storage/commits/master/) on GitHub.

## 1.2.0

-   @kylesands correctly pointed out that the code introduced in 1.1.0 doesn't work properly: when clicking `Submit` without having a valid session, all local storage will be deleted as well (because `Submit` has that side-effect). So we need to address this case *before* clicking submit, and this can only be accomplished by hooking up to the correct event and properly exporting the session expiry date, because phpBB forcefully hides the session cookie from the JavaScript sandbox.
-    Not "very simple" extension any more. Just "simple".
-    Minor bug fixes (kudos again to @gvp9000).

## 1.1.1

-   Bug: when the session times out, but the user is not aware of it, clicking on `Submit` will first remove the data from local storage, and _then_ proceed to the usual phpBB3 page which will say that the user is not logged in, etc. At this stage, it's too late to recover anything from the storage, it has been wiped out! Thanks to @kylesands for reporting the bug.

## 1.1.0

-   Bug: when user clicks on Preview, local storage gets cleared by mistake. Reported & fixed by @kylesands (see https://www.phpbb.com/customise/db/extension/postlocalstorage/support/topic/246115?p=877342#p877342)
-   Added some checks to deal with stale local storage. This is an extreme case when people just happen to completely forget that they still have a message waiting for them for that particular URL. While this is an edge case, it has been pointed out by the validators. Note that old objects (without timestamps) will still be dealt with.
-   Save subject field as well as the textarea content (as suggested by @TrekRed).
-   Fixed DOM transversal in order to catch text written on a Quick Reply as well (it uses a different class).
-   Added a _very simple_ test suite (not on the plugin, just on the GitHub package) with a mock phpBB3 HTML/CSS layout, just to test the actual functionality of the local storage facility. Just point a browser to the local file `./tests/test.html` and open the Development Tools on your browser. Debug messages are also sent to the console, if you enable it to see them (regular messages are very sparsely used, while debug messages are chatty).
-   Refactored the code to use the 'new' operators `?.` and `??`, making the overall code much easier to follow & understand (and possibly more bug-proof as well).
-   Attempted to add JSDoc documentation on the JavaScript code (still a WIP).

## 1.0.5

-   Renamed `custom_functions.js` to `postlocalstorage_functions.js` as per validation suggestion
-   Fix bad JSON indentation on `version_check.json` which prevented version checking from working at all

## 1.0.4

-   Fix the weirdest bug found on Firefox. Kudos to @gvp9000 for the fix!

## 1.0.3

-   Add functioning version check
-   Move graphics files (for logo, etc.) to `/graphics` (de-clutter root)
-   Moved style/template changes to `all` since they are not specific to prosilver (merely JS injection)
-   Add this file :-)

## 1.0.2

-   Semi-broken transitional package; versioning was inconsistent

## 1.0.1

-   First version released to the public

## 1.0.0

-   Internal test code, never released (no tag on GitHub)!

[commit history]: https://github.com/GwynethLlewelyn/post-local-storage/commits/master
