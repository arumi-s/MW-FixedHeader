/* Fixed Header code starts here*/

(function ($) {
	var isMobile = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
	var wrapper = $("#ExtFixedHeader:first");
	var container = $('<div id="ExtFixedHeaderCont"></div>');
	wrapper.append(container);
	if (isMobile == null && container.length) {
		var isHigh = "onhashchange" in window;
		var contents = $("#mw-content-text:first");
		if (contents.find(".mw-parser-output:first").length > 0) {
			contents = contents.find(".mw-parser-output:first");
		}
		if (contents.length === 0) return;
		var lower = true;
		var fade = 20;
		var offset = 20;
		var baseColour = "white";
		var baseNode = contents;
		try {
			while (baseNode && baseNode.css && (baseNode.css("background-color") == "rgba(0, 0, 0, 0)" || baseNode.css("background-color") == "transparent")) {
				baseNode = baseNode.parent();
			}
		} catch (e) {}
		if (baseNode.css) baseColour = baseNode.css("background-color");

		contents.prepend(wrapper);
		if (typeof wrapper.attr("data-lower") == "undefined") lower = false;
		if (typeof wrapper.attr("data-fade") != "undefined") fade = parseInt(wrapper.attr("data-fade"));
		if (typeof wrapper.attr("data-offset") != "undefined") offset = parseInt(wrapper.attr("data-offset"));

		var headerend = $("#ExtFixedHeaderEnd:first");
		if (!headerend.length) contents.append($("<span></span>").attr("id", "ExtFixedHeaderEnd"));
		else if (headerend.nextAll("h2" + (lower ? ",h3" : "")).length) {
			headerend.remove();
			contents.append($("<span></span>").attr("id", "ExtFixedHeaderEnd"));
		}

		/* h2 */
		var current = -1;
		var old = -1;
		var headers = contents.children("h2,#ExtFixedHeaderEnd");
		var total = headers.length - 1;
		container.append($("<span></span>"));

		/* h3 */
		if (lower) {
			lower = true;
			var currentl = -1;
			var oldl = -1;
			var headersl = contents.children("h2,h3,#ExtFixedHeaderEnd");
			var totall = headersl.length - 1;
			container.append($("<span></span>"));
			var model = true;
			var marginl = 0;
		}

		var oldHash = window.location.hash;
		$("a[href~='#']").click(function () {
			var hash = "#" + this.href.split("#")[1];
			if (!isHigh || oldHash == hash) AdjustHeader();
			oldHash = hash;
		});
		if (isHigh) {
			$(window).on("hashchange", function () {
				oldHash = window.location.hash;
				if (window.location.hash !== "") AdjustHeader();
			});
		}
		if (window.location.hash !== "") AdjustHeader();
		else AdjustHeader(1);
		$(this).scroll(AdjustHeader);
	}

	function getpos(element) {
		return element.offset().top - $(window).scrollTop();
	}

	function gethead() {
		return contents.find("[id='" + window.location.hash.substr(1) + "']:first");
	}

	function AdjustHeader(e) {
		/* h2 */
		var clopos = fade,
			opacity;
		if (current >= 0 && getpos(headers.eq(current)) >= 0) {
			do current--;
			while (current >= 0 && getpos(headers.eq(current)) >= 0);
		}

		if (current < total && (clopos = getpos(headers.eq(current + 1))) < fade + offset) {
			if (clopos <= 0) {
				do current++;
				while (current < total && (clopos = getpos(headers.eq(current + 1))) < 0);
			}
		}

		if (old != current) {
			old = current;
			if (current >= 0 && current < total) container.children().eq(0).replaceWith(headers.eq(current).clone());
			else container.children().eq(0).replaceWith($("<span></span>"));
			if (lower) marginl = container.children().eq(0).outerHeight();
			container.children().css("background-color", baseColour);
		}
		opacity = (clopos - offset) / fade;
		container
			.children()
			.eq(0)
			.css({ opacity: opacity, display: opacity > 0 ? "" : "none" });

		/* h3 */
		if (lower) {
			var cloposl = fade + marginl;
			var fadel = fade + marginl;

			if (currentl >= 0 && getpos(headersl.eq(currentl)) >= marginl) {
				do currentl--;
				while (currentl >= 0 && getpos(headersl.eq(currentl)) >= marginl);
			}
			if (currentl < totall && (cloposl = getpos(headersl.eq(currentl + 1))) < fadel + offset) {
				if (cloposl <= marginl) {
					do currentl++;
					while (currentl < totall && (cloposl = getpos(headersl.eq(currentl + 1))) <= marginl);
				}
			}
			if (model != (model = headersl.eq(currentl).prop("tagName") == "H3") || oldl != currentl) {
				oldl = currentl;
				if (currentl >= 0 && model) container.children().eq(1).replaceWith(headersl.eq(currentl).clone());
				else container.children().eq(1).replaceWith($("<span></span>"));
				container.children().css("background-color", baseColour);
			}
			opacity = (cloposl - marginl - offset) / fade;
			container
				.children()
				.eq(1)
				.css({ opacity: opacity, display: opacity > 0 ? "" : "none" });
		}
		if (e == null) {
			var base = gethead();
			var jump = base.parent();
			var jumptag = jump.prop("tagName");
			var shf = 0;
			if (typeof jumptag == "undefined" || jumptag.charAt(0) != "H") {
				if ((shf = container.outerHeight()) > 1) window.scrollBy(0, -shf);
			} else if (jumptag != "H2" && (shf = lower && jumptag == "H3" ? marginl : container.outerHeight()) > 1) window.scrollBy(0, -shf);
		}
		container.css("top", -getpos(contents));
	}
})(window.jQuery);
