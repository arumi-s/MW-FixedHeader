<?php

class ExtFixedHeader {

	public static function Init( Parser &$parser ) {
		$parser->setHook( 'fixed', 'ExtFixedHeader::Render' );
		return true;
	}

	public static function LoadScript( $out, &$sk ) {
		$out->addModules( 'ext.FixedHeader' );
		return true;
	}

	public static function Auto( &$data, $skin = null ) {
		global $wgFixedHeaderAutoEnable, $wfFixedHeaderWasCalled, $egFixedHeaderEnableH3Headers, $egFixedHeaderFadeOutDistance, $egFixedHeaderFadeOutOffset, $wfFixedHeaderRestrictNS, $wgTitle, $wgRequest, $wgOut;

		if( !$wgFixedHeaderAutoEnable || $wfFixedHeaderWasCalled || $wgTitle->isSpecialPage() || $wgTitle->getArticleID() == 0 ||
			in_array( $wgTitle->getNamespace(), $wfFixedHeaderRestrictNS ) ||
		    ( method_exists( $wgTitle, 'isMainPage' ) && $wgTitle->isMainPage() ) ||
		    $wgOut->isPrintable() || $wgRequest->getVal('action', 'view') != "view") return true;

		$wfFixedHeaderWasCalled = true;
		
		$data = '<div id="ExtFixedHeader"' .
			' data-fade="' . $egFixedHeaderFadeOutDistance . '" data-offset="' . $egFixedHeaderFadeOutOffset . '"' .
			( $egFixedHeaderEnableH3Headers ? ' data-lower"' : '' ) . '>' . '</div>';
		return true;
	}

	public static function Render( $input, array $args, Parser $parser, PPFrame $frame ) {
		global $wfFixedHeaderWasCalled, $egFixedHeaderEnableH3Headers, $egFixedHeaderFadeOutDistance, $egFixedHeaderFadeOutOffset;

		if ( $wfFixedHeaderWasCalled ) return '';
		$wfFixedHeaderWasCalled = true;

		if ( array_key_exists( 'off', $args ) ) return '';

		$move = false;
		$h3 = $egFixedHeaderEnableH3Headers;
		$fade = $egFixedHeaderFadeOutDistance;
		$offset = $egFixedHeaderFadeOutOffset;

		if ( isset( $args['move'] ) ) $move = true;
		if ( isset( $args['h3'] ) ) $h3 = ( $args['h3'] == "off" ? false : true );
		if ( isset( $args['fade'] ) ){
			$fade = abs( (int)$args['fade'] );
			if( !is_int( $fade ) ) $fade = $egFixedHeaderFadeOutDistance;
		}
		if ( isset( $args['offset'] ) ){
			$offset = abs( (int)$args['offset'] );
			if( !is_int( $offset ) ) $offset = $egFixedHeaderFadeOutOffset;
		}

		return ( $move ? '<span id="ExtFixedHeaderEnd"></span>' : '' ) .
			'<div id="ExtFixedHeader"' . ' data-fade="' . $fade . '" data-offset="' . $offset . '"' .
			( $h3 ? ' data-lower' : '' ) . '>' . '</div>';
	}

}
