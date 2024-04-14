![Logo](graphics/post-local-storage-logo-smaller.png)
# post-local-storage
## Locally store the content of a post in the phpBB forum software 

A very simple [phpBB3](https://www.phpbb.com/) extension to use the browser's local storage for preventing the content of a post to be lost after a crash or session expiration.

## Reasoning

You know how it is. You've taken four hours to write your latest masterpiece to show off to the world on a phpBB forum. You press <kbd>Submit</kbd> and... well, your session had expired, so _everything is lost_. Irretrievably so. Pressing 'back' on the browser will not help. What to do?... well, nothing, really.

You're used to WYSIWYG editors, where such things _never_ happen in the 2020s, so naturally enough you didn't save a copy _before_ you posted the article. But, alas, there is no official WYSIWYG editor in phpBB, for various reasons.

Why, oh why, didn't phpBB save your data?

Well, there is the 'Draft' facility, but that doesn't work as well as it should. Unless you have an extension for that, by default, forum users have to _manually_ press <kbd>Save Draft</kbd> — and it will mean that some things (such as attachments) will be lost anyway. Drafts are also stored on the phpBB database, on the backend, so if something goes wrong with your connection and/or the database connection... you'll lose your draft as well.

This extension tries to replicate the most basic solution to the above issues. It uses your browser's local storage facility, which can be accessed using JavaScript. Although details differ between browsers, in general, each will persist the data across crashes. It should also be able to deal with most issues of lost typed content on posts as well as on Private Messages (PMs). However, the current version will not be able to 

## Installation

If you're reading this on GitHub, then all you need is to either download the last package (on the left) and unzip it to the `ext` directory under the root of your phpBB3 installation.

Alternatively, you can always grab the latest version with `git clone https://github.com/GwynethLlewelyn/post-local-storage`. The plugin itself is inside `gwynethllewelyn/postlocalstorage`. These are the files to upload to your phpBB installation (you'll probably need to create all directories first, e.g. under `ext`, create `gwynethllewelyn/postlocalstorage`).

Then go to the **ACP** > **Extensions**, on the sidebar: **Extension Management** | **Manage extensions** and activate **Post Local Storage**.

There is no further configuration required.

## Acknowledgements

Many thanks to
[@Tread](https://www.phpbb.com/community/memberlist.php?mode=viewprofile&u=1973496) and [@cabot](https://www.phpbb.com/community/memberlist.php?mode=viewprofile&u=1337922) for gently 'persuading' me to publish this code as a phpBB3.3 extension, by pointing me to all the appropriate bits and pieces of code to be 'assembled' into an extension. Yay!

Kudos to [@gvp9000](https://www.phpbb.com/community/memberlist.php?mode=viewprofile&u=2227069) for finding & fixing an obscure bug that affects Firefox.

Logo designed by [DALL·E 2](https://openai.com/product/dall-e-2).

![phpBB3 Logo](https://img.shields.io/badge/phpBB-3.3-blue) [![CodeQL](https://github.com/GwynethLlewelyn/post-local-storage/actions/workflows/codeql.yml/badge.svg)](https://github.com/GwynethLlewelyn/post-local-storage/actions/workflows/codeql.yml) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/83a20d04433341baa65c78d29fc3410a)](https://www.codacy.com/gh/GwynethLlewelyn/post-local-storage/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=GwynethLlewelyn/post-local-storage&amp;utm_campaign=Badge_Grade) [![Codacy Security Scan](https://github.com/GwynethLlewelyn/post-local-storage/actions/workflows/codacy.yml/badge.svg)](https://github.com/GwynethLlewelyn/post-local-storage/actions/workflows/codacy.yml) [![Liberapay](https://img.shields.io/liberapay/receives/GwynethLlewelyn.svg?logo=liberapay")](https://liberapay.com/GwynethLlewelyn/donate)

