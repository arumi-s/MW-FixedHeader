
var code = document.getElementById("NeedCode");
var codeh3="";
var codefade="";

function turnh3(btn) {
    lower = !lower;
	btn.innerHTML=(lower?"关闭":"开启");
	AdjustHeader();
	if( container.childNodes[1]!=null ){
	    container.replaceChild( document.createElement("span"), container.childNodes[1]);
	}
	codeh3=(lower?" h3":" h3=\"off\"");
	code.innerHTML="&lt;fixed"+codeh3+codefade+" /&gt;";
}

function inputfade(input) {
    grad = Number(input.value);
	AdjustHeader();
	codefade=(grad==30?"":" fade=\""+grad+"\"");
	code.innerHTML="&lt;fixed"+codeh3+codefade+" /&gt;";
}

var isMobile = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
var container = document.getElementById("ExtFixedHeader");

if ( isMobile == null && container != null && typeof(container) != 'undefined' ){
    var grad = 30;
    if ( container.hasAttribute("title") ){
        grad = Number(container.getAttribute("title"));
    }

    /* h2 */
    var current = -1;
    var old = -1;
    var contents = document.getElementById("mw-content-text");
    var rawheaders = contents.getElementsByTagName("h2");
	var total = rawheaders.length;
	var ieg = 0;
	var headers = new Array();
    for ( var i = 0; i < total; i++ ){
		if ( ( curh = rawheaders[i] ).parentNode.id != 'toctitle' ){
            headers.push( curh );
		}
    }
    total = i;
    container.appendChild( document.createElement("span") );

    /* h3 */
    var lower = false;
    if ( container.hasAttribute("class") ){
        lower = true;
        var currentl = -1;
        var oldl = -1;
        var headersl = contents.getElementsByTagName("h3");
        var totall = headersl.length-1;
        container.appendChild( document.createElement("span") );
        var model = true;
        var headerendl = headers[0];
        var marginl = 0;
    }
    var headerend = document.getElementById("ExtFixedHeaderEnd");
    if ( headerend == null || typeof(headerend) == 'undefined' ){
        headerend = contents.appendChild( document.createElement("span") );
	}
	headers.push( headerend );
    AdjustHeader();
	document.onscroll = AdjustHeader;
}

function getpos( element ) {
    var pos = 0;

    while( element ) {
        pos += ( element.offsetTop - ( (element instanceof HTMLBodyElement) ? (document.documentElement.scrollTop || document.body.scrollTop) : element.scrollTop ) + element.clientTop );
        element = element.offsetParent;
    }
    return pos;
}

function AdjustHeader(){

    /* h2 */
    var clopos = grad;
    if ( current>= 0 && getpos(headers[current])>=0 ){
        do{
            current--;
        }
        while ( current>= 0 && getpos(headers[current])>=0 );
    }
    if ( current<=total && (clopos=getpos(headers[current+1]))<grad ){
        if ( clopos<=0 ){
            do{
                current++;
            }
            while ( current<=total && (clopos=getpos(headers[current+1]))<0 );
        }
    }
    if ( old != current ){
        old = current;
        if ( current >= 0 && current<total ){
            container.replaceChild( headers[current].cloneNode(true), container.childNodes[0]);
        } else {
            container.replaceChild( document.createElement("span"), container.childNodes[0]);
        }
        if ( lower ){
			marginl = container.childNodes[0].clientHeight;
            if ( (current+1)<total ){
                headerendl = headers[current+1];
            } else {
                headerendl = headerend;
            }
        }
    }
    container.childNodes[0].style.opacity=clopos/grad;

    /* h3 */
    if ( lower ){
    var cloposl = grad + marginl;
    var gradl = grad + marginl;
    var cloteml = 0;

    if ( currentl>=0 && ( ( currentl>totall && getpos(headerendl)>marginl ) || getpos(headersl[currentl])>=marginl ) ){
        do{
            currentl--;

        }
        while ( currentl>=0 && getpos(headersl[currentl])>marginl );
    }
    if ( currentl<totall && (cloposl=Math.min( (cloteml=getpos(headersl[currentl+1])),getpos(headerendl) ))<gradl ){
        if ( cloteml<=marginl ){
            do{
                currentl++;
            }
            while ( currentl<totall && (cloposl=getpos(headersl[currentl+1]))<marginl );
        }
    }
    if ( currentl==totall && (cloposl=getpos(headerendl))<gradl ){
        if ( cloposl<=marginl ){
            currentl++;
        }
    }
	
    if ( model != ( model=(getpos(headersl[currentl])>getpos(headers[current])) ) || oldl != currentl ){
		oldl = currentl;
        if ( currentl>=0 && currentl<=totall && model ){
            container.replaceChild( headersl[currentl].cloneNode(true), container.childNodes[1]);
        } else {
            container.replaceChild( document.createElement("span"), container.childNodes[1]);
        }
    }
    container.childNodes[1].style.opacity=(cloposl-marginl)/grad;
}
}