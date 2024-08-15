// @title Toggle sem.css Stylesheet
(function toggleSemcssStylesheet() {
	'use strict'

	const id = 'semcss-stylesheet'

	const existing = document.getElementById(id)
	if (existing) {
		existing.remove()
		return
	}

	const link = document.createElement('link')
	link.id = id
	link.rel = 'stylesheet'
	link.href = 'https://unpkg.com/semcss/dist/sem.css'
	document.head.appendChild(link)
}())
