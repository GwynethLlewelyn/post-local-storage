![Logo](graphics/post-local-storage-logo-smaller.png)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# post-local-storage

## Locally store the content of a post in the phpBB forum software

A simple [phpBB3](https://www.phpbb.com/) extension to use the browser's local storage for preventing the content of a post to be lost after a crash or session expiration.

## Reasoning

You know how it is. You've taken four hours to write your latest masterpiece to show off to the world on a phpBB forum. You press <kbd>Submit</kbd> and... well, your session had expired, so _everything is lost_. Irretrievably so. Pressing 'back' on the browser will not help. What to do?... well, nothing, really.

You're used to WYSIWYG editors, where such things _never_ happen in the 2020s, so naturally enough you didn't save a copy _before_ you posted the article. But, alas, there is no official WYSIWYG editor in phpBB, for various reasons.

Why, oh why, didn't phpBB save your data?

Well, there is the 'Draft' facility, but that doesn't work as well as it should. Unless you have an extension for that, by default, forum users have to _manually_ press <kbd>Save Draft</kbd> — and it will mean that some things (such as attachments) will be lost anyway. Drafts are also stored on the phpBB database, on the backend, so if something goes wrong with your connection and/or the database connection... you'll lose your draft as well.

This extension tries to replicate the most basic solution to the above issues. It uses your browser's local storage facility, which can be accessed using JavaScript. Although details differ between browsers, in general, each will persist the data across crashes. It should also be able to deal with most issues of lost typed content on posts (including on Quick Reply) as well as on Private Messages (PMs), as well as eliminating stale content taking up wasted space on the browser's local storage facility (at least, up to a point). Of course, all of this is only possible for _one_ browser on _one_ computer (as opposed to "Save Draft", which should work across browsers/computers/physical locations).

## Installation

If you're reading this on GitHub, then all you need is to either download the last package (on the left) and unzip it to the `ext` directory under the root of your phpBB3 installation.

Alternatively, you can always grab the latest version with `git clone https://github.com/GwynethLlewelyn/post-local-storage`. The plugin itself is inside `gwynethllewelyn/postlocalstorage`. These are the files to upload to your phpBB installation (you'll probably need to create all directories first, e.g. under `ext`, create `gwynethllewelyn/postlocalstorage`).

Then go to the **ACP** > **Extensions**, on the sidebar: **Extension Management** | **Manage extensions** and activate **Post Local Storage**.

There is no further configuration required.

## Upgrading

There was a bug on the versions prior to 1.0.5 (bad JSON indentation on `composer.json`) which effectively prevented the automatic version-checking mechanism to work as it should. As a consequence, automatic upgrades are only triggered for versions 1.0.6 and up. This mostly means that anyone running a version before 1.0.5 will never get a notification to upgrade. Sorry!

The format of the object saved to the local storage has changed _twice_ — first to add a timestamp (to allow some automatic cleanup of stale data on storage), and second, for saving the contents of the subject line as well, not only the content in the textarea (main body of the article post). The current version of the plugin should be able to retrieve objects from the browser's local storage using the old format and save them using the new one, without loss of data.

While doing these changes, I noticed that the HTML attributes for a Quick Reply changed subtly from those used on a regular reply. This meant slightly tweaking the DOM-transversing functionality so that this plugin works with both. Hopefuly there are no further exceptions, but, if you encounter them, feel free to report those cases as well!

## Current testing

Since I have just a limited access to a testing environment, it's worth pointing out that, currenty, my own testing just includes browsers on macOS Big Sur, namely, Brave (Chromium-based), Safari, Firefox, and Microsoft Edge (also Chromium-based). Others, such as Opera, or any mobile/TV-based browser were _not_ tested. phpBB3 is running as a native PHP-based application under nginx + php 8.2/8.3 on a Ubuntu Linux 22.0.4 LTS bare metal server hosted in Germany.

Additionally, there are "mock" pages (coming with the GitHub package, but _not_ with the phpBB3 plugin itself) that allow me to do some testing under different circumstances (I found some weird bugs that way!), beyond those that are handled by the automated CI tools that I'm currently using.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://gwynethllewelyn.net/"><img src="https://avatars.githubusercontent.com/u/304404?v=4?s=100" width="100px;" alt="Gwyneth Llewelyn"/><br /><sub><b>Gwyneth Llewelyn</b></sub></a><br /><a href="https://github.com/GwynethLlewelyn/post-local-storage/commits?author=GwynethLlewelyn" title="Code">💻</a> <a href="https://github.com/GwynethLlewelyn/post-local-storage/commits?author=GwynethLlewelyn" title="Documentation">📖</a> <a href="#design-GwynethLlewelyn" title="Design">🎨</a> <a href="#fundingFinding-GwynethLlewelyn" title="Funding Finding">🔍</a> <a href="#ideas-GwynethLlewelyn" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-GwynethLlewelyn" title="Maintenance">🚧</a> <a href="#projectManagement-GwynethLlewelyn" title="Project Management">📆</a> <a href="#question-GwynethLlewelyn" title="Answering Questions">💬</a> <a href="#research-GwynethLlewelyn" title="Research">🔬</a> <a href="https://github.com/GwynethLlewelyn/post-local-storage/pulls?q=is%3Apr+reviewed-by%3AGwynethLlewelyn" title="Reviewed Pull Requests">👀</a> <a href="#content-GwynethLlewelyn" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tread"><img src="https://avatars.githubusercontent.com/u/146954?v=4?s=100" width="100px;" alt="Tim Read"/><br /><sub><b>Tim Read</b></sub></a><br /><a href="#ideas-tread" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## More acknowledgements

Many thanks to
[@Tread](https://www.phpbb.com/community/memberlist.php?mode=viewprofile&u=1973496) and [@cabot](https://www.phpbb.com/community/memberlist.php?mode=viewprofile&u=1337922) for gently 'persuading' me to publish this code as a phpBB3.3 extension, by pointing me to all the appropriate bits and pieces of code to be 'assembled' into an extension. Yay!

Kudos to [@gvp9000](https://www.phpbb.com/community/memberlist.php?mode=viewprofile&u=2227069) for finding & fixing an obscure bug that affects Firefox and submitting lots of code to fix this.

Kudos to [@kylesands](https://www.phpbb.com/community/memberlist.php?mode=viewprofile&u=2218926) for pointing out and providing a fix for [incorrect local storage deletion during Preview](https://www.phpbb.com/customise/db/extension/postlocalstorage/support/topic/246115?p=877342#p877342) as well as for continuing overall support.

Thanks to [@TrekRed](https://www.phpbb.com/community/memberlist.php?mode=viewprofile&u=19327714) for suggesting that the subject field gets saved as well.

Logo designed by [DALL·E 2](https://openai.com/product/dall-e-2).

![phpBB3 Logo](https://img.shields.io/badge/phpBB-3.3-blue) [![CodeQL](https://github.com/GwynethLlewelyn/post-local-storage/actions/workflows/codeql.yml/badge.svg)](https://github.com/GwynethLlewelyn/post-local-storage/actions/workflows/codeql.yml) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/83a20d04433341baa65c78d29fc3410a)](https://www.codacy.com/gh/GwynethLlewelyn/post-local-storage/dashboard?utm_source=github.com&utm_medium=referral&utm_content=GwynethLlewelyn/post-local-storage&utm_campaign=Badge_Grade) [![Codacy Security Scan](https://github.com/GwynethLlewelyn/post-local-storage/actions/workflows/codacy.yml/badge.svg)](https://github.com/GwynethLlewelyn/post-local-storage/actions/workflows/codacy.yml) [![Liberapay](https://img.shields.io/liberapay/receives/GwynethLlewelyn.svg?logo=liberapay")](https://liberapay.com/GwynethLlewelyn/donate) [![All Contributors](https://img.shields.io/github/all-contributors/GwynethLlewelyn/post-local-storage?color=ee8449&style=flat-square)](#contributors)

