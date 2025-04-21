// @title Toggle dress.css Stylesheet
(function toggleDresscssStylesheet() {
	'use strict'

	const id = 'dresscss-stylesheet'

	const existing = document.getElementById(id)
	if (existing) {
		existing.remove()
		return
	}

	const link = document.createElement('link')
	link.id = id
	link.rel = 'stylesheet'
	link.href = 'https://unpkg.com/@remino/dress.css/dist/dress.css'
	document.head.appendChild(link)
}())
