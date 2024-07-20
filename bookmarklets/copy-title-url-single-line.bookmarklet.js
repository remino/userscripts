// @title Copy Title & URL on Single Line
(function copyTitleUrlSingleLine() {
	'use strict'

	const url = document.location.href
	const { title } = document
	const text = `${title} ${url}`

	navigator.clipboard.writeText(text)
		.then(() => {
			alert(`Copied title & URL on single line:\n\n${text}`)
		})
		.catch(err => {
			console.error('Error copying text', err)
		})
}())
