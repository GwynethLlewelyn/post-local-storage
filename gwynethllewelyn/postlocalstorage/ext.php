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
	 * Class constructor, just to let us know that we reached this point.
	 *
	 * @param ContainerInterface $container Container object
	 * @param \phpbb\finder $extension_finder
	 * @param \phpbb\db\migrator $migrator
	 * @param string $extension_name Name of this extension (from ext.manager)
	 * @param string $extension_path Relative path to this extension
	 */
	public function __construct(ContainerInterface $container, \phpbb\finder $extension_finder, \phpbb\db\migrator $migrator, $extension_name, $extension_path)
	{
		$this->container = $container;
		$this->extension_finder = $extension_finder;
		$this->migrator = $migrator;

		$this->extension_name = $extension_name;
		$this->extension_path = $extension_path;
		error_log('[phpBB3 postlocalstorage] my base constructor was called!');
	}

	/**
	 * Check whether or not the extension can be enabled.
	 *
	 * @return bool
	 */
	public function is_enableable()
	{
			return phpbb_version_compare(PHPBB_VERSION, '3.3', '>=');
	}
}