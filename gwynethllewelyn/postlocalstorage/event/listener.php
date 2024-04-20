<?php
/**
 * Post Local Storage extension for the phpBB3 Forum Software package.
 *
 * @copyright (c) 2024 by Gwyneth Llewelyn. Some rights reserved.
 * @license GNU General Public License, version 2 (GPL-2.0)
 * @since 1.2.0
 */
namespace gwynethllewelyn\postlocalstorage\event;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Event listener for Post Local Storage.
 * @since 1.2.0
 */
class listener implements EventSubscriberInterface
{
	/** @var \phpbb\template\template */
	protected $template;
	/** @var \phpbb\user $user */
	protected $user;
	/** @var \phpbb\request\request */
	protected $request;
	/** @var \phpbb\config\config */
	protected $config;

	/**
	 * Current time.
	 * @var int
	 */
	private $time_now;

	/**
 	* Constructor.
 	*
 	* Essentially just saves the phpBB globals into local, protected variables.
 	*
 	* @param \phpbb\template\template	$template Template object.
 	* @param \phpbb\user                $user     User object.
 	* @param \phpbb\request\request     $request  Request object.
 	* @param \phpbb\config\config       $config   Config object.
 	* @return \aurelienazerty\darkmode\event\listener
 	* @access public
 	* @since 1.2.0
 	*/
	public function __construct(\phpbb\template\template $template, \phpbb\user $user, \phpbb\request\request $request,\phpbb\config\config $config)
	{
		$this->template = $template;
		$this->user     = $user;
		$this->request  = $request;
		$this->config   = $config;
		$this->time_now - time();	// assign current time.
	}


	/**
	 * Assign functions defined in this class to event listeners in the core.
	 *
	 * @return array
	 */
	static public function getSubscribedEvents()
	{
		return [
			'core.modify_submit_post_data' => 'check_expiry_time',
		];
	}

	/**
	 * Check for the expiry time, and export it as a variable we can embed.
	 *
	 * @param \phpbb\event\data $event The event object
	 */
	public function check_expiry_time($event)
	{
		$session_expiry_time = $this->time_now + ((int) $this->config['session_length'] + 60);

		$this->template->assign_vars(array(
			'EXPIRY_TIME' => $session_expiry_time,
		));
	}
}