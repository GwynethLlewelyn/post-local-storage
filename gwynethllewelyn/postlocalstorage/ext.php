<?php
/**
 * Post Local Storage extension for the phpBB3 Forum Software package.
 *
 * @copyright (c) 2024 by Gwyneth Llewelyn. Some rights reserved.
 * @license GNU General Public License, version 2 (GPL-2.0)
 * @since 1.2.0
 */

namespace gwynethllewelyn\postlocalstorage;

use phpbb\extension\base;

/**
 * Auxiliary class that is supposed to help out with init.
 *
 * @extends base
 * @since 1.2.0
 */
class ext extends base
{


	/**
	 * Check whether or not the extension can be enabled.
	 *
	 * @return bool
	 */
	public function is_enableable()
	{
		// error_log('[phpBB3 postlocalstorage] my is_enableable() was called!');
		return phpbb_version_compare(PHPBB_VERSION, '3.3', '>=');
	}
}