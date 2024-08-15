// @title Toggle rem.css Stylesheet
(function toggleRemcssStylesheet() {
	'use strict'

	const id = 'remcss-stylesheet'

	const existing = document.getElementById(id)
	if (existing) {
		existing.remove()
		return
	}

	const link = document.createElement('link')
	link.id = id
	link.rel = 'stylesheet'
	link.href = 'https://remino.net/remcss/rem.css'
	document.head.appendChild(link)
}())
