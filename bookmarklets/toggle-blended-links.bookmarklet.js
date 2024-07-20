// @title Toggle Blended Links
(function toggleBlendedLinks() {
	'use strict'

	const ID = 'blended_links'

	const existing = document.getElementById(ID)

	if (existing) {
		document.head.removeChild(existing)
		return
	}

	const style = document.createElement('style')
	style.id = ID
	style.textContent = /* css */'a { color: inherit !important; text-decoration: none !important; }'

	document.head.appendChild(style)
}())
