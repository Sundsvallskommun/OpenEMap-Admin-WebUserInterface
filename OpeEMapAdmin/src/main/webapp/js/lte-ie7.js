/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'riges-icons\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-arrow' : '&#x5e;',
			'icon-arrow-2' : '&#x3c;',
			'icon-arrow-3' : '&#x5f;',
			'icon-close' : '&#x78;',
			'icon-arrow-4' : '&#x3e;',
			'icon-star' : '&#x2a;',
			'icon-error' : '&#x21;',
			'icon-checkmark' : '&#x63;',
			'icon-user' : '&#x75;',
			'icon-external-link' : '&#x65;',
			'icon-lock-2' : '&#x6c;',
			'icon-unread-message' : '&#x4d;',
			'icon-message' : '&#x6d;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};