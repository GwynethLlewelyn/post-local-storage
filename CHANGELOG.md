# Changelog

For a _much_ more detailed version, see the [commit history](https://github.com/GwynethLlewelyn/post-local-storage/commits/master/) on GitHub.

## 1.1.0
- Bug: when user clicks on Preview, local storage gets cleared by mistake. Reported & fixed by @kylesands (see https://www.phpbb.com/customise/db/extension/postlocalstorage/support/topic/246115?p=877342#p877342)
- Added some checks to deal with stale local storage. This is an extreme case when people just happen to completely forget that they still have a message waiting for them for that particular URL. While this is an edge case, it has been pointed out by the validators. Note that old objects (without timestamps) will still be dealt with.

## 1.0.5
- Renamed `custom_functions.js` to `postlocalstorage_functions.js` as per validation suggestion
- Fix bad JSON indentation on `version_check.json` which prevented version checking from working at all

## 1.0.4

- Fix the weirdest bug found on Firefox. Kudos to @gvp9000 for the fix!

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
