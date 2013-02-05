(function($, undefined) {

// Is History API reliably supported? (based on Modernizr & PJAX)
if (!(window.history && history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/))) return;

// thx to @ic (http://forum.nette.org/cs/profile.php?id=1985, http://forum.nette.org/cs/4405-flash-zpravicky-bez-fid-v-url#p43713)

$.nette.ext('history', {
	init: function () {
		var url = window.location.toString();
		var pos = url.indexOf('_fid=');
		if (pos !== -1) {
			url = this.removeFid(url, pos);
			setTimeout(function () {
				window.history.replaceState({}, null, url);
			}, this.timeout);
		}
	}
}, {
	timeout: 3000,
	removeFid: function (url, pos) {
		url = url.substr(0, pos) + url.substr(pos + 10);
		if ((url.substr(url.length - 1) === '?') || (url.substr(url.length - 1) === '&')) {
			url = url.substr(0, url.length - 1);
		}
		return url;
	}
});

})(jQuery);
