<?php

/**
 * File defining the settings for the 'Fixed Header' extension.
 * More info can be found at http://thwiki.cc/%E5%B8%AE%E5%8A%A9:%E5%9B%BA%E5%AE%9A%E6%A0%87%E9%A2%98%E6%89%A9%E5%B1%95
 *
 * NOTICE:
 * =======
 * Changing one of these settings can be done by copying and placing
 * it in LocalSettings.php, AFTER the inclusion of 'FixedHeader'.
 *
 * @since 1.0.0
 *
 * @author Arumi
 */

/**
 * Set to false by default since version 1.0.0.
 *
 * Enables this will enable Fixed Header in all pages except:
 * Main page, Special pages and pages inside namespaces defined by
 * $wfFixedHeaderRestrictNS. Note that this may cause strange layout
 * on some pages which have special or complicated design.
 * Still, this can be truned off by simply adding <fixed off /> at
 * those pages.
 *
 * @since 1.0.0
 *
 * @var boolean
 */
$wgFixedHeaderAutoEnable = false;

/**
 * Set to true by default since version 1.1.0.
 *
 * Enables this will let current h3 haeder can also be fixed on the
 * top of the window, and will stay below where current h2 header is.
 * Note that this may reduce the size of reading zone.
 *
 * @since 1.0.0
 *
 * @var boolean
 */
$egFixedHeaderEnableH3Headers = true;

/**
 * Set to 20 by default since version 1.6.0.
 *
 * When the current fixed header meets a new header, it will gently
 * fade out and finally get replaced by the new one. This variable
 * defines how far it will start to fade, in pixels.
 *
 * @since 1.0.0
 *
 * @var integer
 */
$egFixedHeaderFadeOutDistance = 20;

/**
 * Set to 20 by default since version 1.6.0.
 *
 * When the current fixed header meets a new header, it will gently
 * fade out and finally get replaced by the new one. This variable
 * defines how far it will de complety out before meeting the next
 * header, in pixels.
 *
 * @since 1.6.0
 *
 * @var integer
 */
$egFixedHeaderFadeOutOffset = 20;

/**
 * Set to array( NS_MEDIAWIKI, NS_TEMPLATE, NS_CATEGORY ) by default since version 1.7.0.
 *
 * Prevent pages inside those namespaces to be affected by $wgFixedHeaderAutoEnable.
 *
 * @since 1.7.0
 *
 * @var array
 */
$wfFixedHeaderRestrictNS = array( NS_MEDIAWIKI, NS_TEMPLATE, NS_CATEGORY );
