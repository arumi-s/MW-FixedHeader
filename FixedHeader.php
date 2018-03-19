<?php

/**
 * Fixed Header Extension
 * This extension provides the support for fixing the header ( <h2> type, or <h3>
 * type if turned on ) of current section at the top of the window.
 *
 * @version: 1.8.1
 * @author Arumi
 
 */

if ( !defined( 'MEDIAWIKI' ) ) die();

define( 'FXHD_VERSION', '1.8.1' );

$wgExtensionCredits['parserhook'][] = array(
	'path' => __FILE__,
	'name' => 'Fixed Header',
	'version' => FXHD_VERSION,
	'author' => array( 'Arumi' ),
	'url' => 'http://thwiki.cc/%E5%B8%AE%E5%8A%A9:%E5%9B%BA%E5%AE%9A%E6%A0%87%E9%A2%98%E6%89%A9%E5%B1%95',
	'descriptionmsg' => 'fixedheader-desc',
);

$wgHooks['SkinAfterContent'][] = 'ExtFixedHeader::Auto';
$wgHooks['ParserFirstCallInit'][] = 'ExtFixedHeader::Init';
$wgHooks['BeforePageDisplay'][] = 'ExtFixedHeader::LoadScript';

$wgMessagesDirs['FixedHeader'] = __DIR__ . '/i18n';
$wgExtensionMessagesFiles['FixedHeader'] = __DIR__ . '/FixedHeader.magic.php';
$wgAutoloadClasses['ExtFixedHeader'] = __DIR__ . '/FixedHeader_body.php';

require_once( __DIR__ . '/FixedHeader.settings.php' );

if( !is_int( $egFixedHeaderFadeOutDistance = abs( (int)$egFixedHeaderFadeOutDistance ) ) ) $egFixedHeaderFadeOutDistance = 20;
if( !is_int( $egFixedHeaderFadeOutOffset = abs( (int)$egFixedHeaderFadeOutOffset ) ) ) $egFixedHeaderFadeOutOffset = 20;
$wfFixedHeaderWasCalled = false;

$wgResourceModules['ext.FixedHeader'] = array(
	'localBasePath' => __DIR__,
	'remoteExtPath' => 'FixedHeader',
	'scripts' => 'FixedHeader.js',
	'styles' => 'FixedHeader.css',
);