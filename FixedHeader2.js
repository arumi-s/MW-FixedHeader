( function ( $ ) {
	$.fn.getPos = function () {
		return this.offset().top - $(window).scrollTop();
	};
	
	$( document ).ready( function () {
		var isMobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test( navigator.userAgent );
		var container = $('#ExtFixedHeader').eq(0);
		if ( isMobile == true || container.length == 0 ) return;
		var isHigh = 'onhashchange' in window;
		var contents = $('#mw-content-text').eq(0);
		var lower = true;
		var fade = 20;
		var offset = 20;
		
		if ( container.data('lower') == null ) lower = false;
		console.log(lower);
		if ( container.data('fade') != null ) fade = parseInt( container.data('fade') );
		if ( container.data('offset') != null ) offset = parseInt( container.data('offset') );

		var headerend = $('#ExtFixedHeaderEnd').eq(0);
		if ( !headerend.length ) contents.append( '<span id="ExtFixedHeaderEnd"></span>' );
		else if ( headerend.nextAll('h2'+( lower ? ',h3' : '' )).length ) {
			headerend.remove();
			contents.append( '<span id="ExtFixedHeaderEnd"></span>' );
		}

		/* h2 */
		var current = -1;
		var old = -1;
		var headers = contents.children('h2,#ExtFixedHeaderEnd');
		var total = headers.length-1;
		var isAnchor = false;
		container.append( $("<span></span>") );

		/* h3 */
		if ( lower ){
			var headersl = contents.children('h2,h3,#ExtFixedHeaderEnd');
			container.append( $("<span></span>") );
			var model = true;
			var marginl = 0;
		}

		var jumppos = 0;
		$("a[href^='#']").click( function(){isAnchor = true;} );

		if ( window.location.hash !== '' ){
			isAnchor = true;
		}
		if ( isHigh ){
			window.onhashchange = function () {
				if ( window.location.hash !== '' ){
					isAnchor = true;
					AdjustHeader();
				}
			}
		}
		AdjustHeader();
		$(this).scroll( AdjustHeader );

		function gethead() {return contents.find( "[id='"+window.location.hash.substr(1)+"']" ).eq(0);}

		function AdjustHeader(){
			var clopos = fade;
			if ( current>= 0 && headers.eq(current).getPos()>=0 ){
				do --current;
				while ( current>= 0 && headers.eq(current).getPos()>=0 );
			}

			if ( current<total && ( clopos = headers.eq(current+1).getPos() ) < fade+offset ){
				if ( clopos<=0 ){
					do ++current;
					while ( current<total && ( clopos = headers.eq(current+1).getPos() )<0 );
				}
			}
			
			if ( old != current ){
				old = current;
				if ( current >= 0 && current<total ) container.children().eq(0).replaceWith( headers.eq(current).clone() );
				else container.children().eq(0).replaceWith( $("<span></span>") );
				if ( lower ) marginl = container.children().eq(0).outerHeight();
			}
			container.children().eq(0).css({"opacity":(clopos-offset)/fade});
return;
			/* h3 */
			if ( lower ){
				var cloposl = fade + marginl;
				var fadel = fade + marginl;

				if ( currentl>=0 && getpos(headersl.eq(currentl))>=marginl ){
					do currentl--;
					while ( currentl>=0 && getpos(headersl.eq(currentl))>=marginl );
				}
				if ( currentl<totall && ( cloposl=getpos(headersl.eq(currentl+1)) )<fadel+offset ){
					if ( cloposl<=marginl ){
						do currentl++;
						while ( currentl<totall && ( cloposl=getpos(headersl.eq(currentl+1)) )<=marginl );
					}
				}
				if ( model != ( model = (headersl.eq(currentl).prop("tagName")=='H3')) || oldl != currentl ){
					oldl = currentl;
					if ( currentl>=0 && model ) container.children().eq(1).replaceWith( headersl.eq(currentl).clone() );
					else container.children().eq(1).replaceWith( $("<span></span>") );
				}
				container.children().eq(1).css({"opacity":(cloposl-marginl-offset)/fade});
			}
			if ( isAnchor ){
				var base = gethead();
				var jump = base.parent();
				var jumptag = jump.prop("tagName");
				if ( typeof( jumptag ) == 'undefined' || jumptag.charAt(0) != 'H' ){
					var shf = 0;
					if( jumppos != (jumppos = getpos(base)) && Math.abs(shf = jumppos-container.outerHeight())>1 ){
						window.scrollBy( 0, shf );
						AdjustHeader();
					} else isAnchor = false;
				} else if ( jumptag == 'H2' ){
					isAnchor = false;
				} else {
					var shf = 0;
					if( jumppos != (jumppos = getpos(jump)) && Math.abs(shf = jumppos-(lower && jumptag == 'H3' ? marginl : container.outerHeight()))>1 ){
						window.scrollBy( 0, shf );
						AdjustHeader();
					} else isAnchor = false;
				}
			}
		}

	} );
} ) ( window.jQuery );
