// @title Copy Title & URL on Multiple Lines
(function copyTitleUrlMultipleLines() {
	'use strict'

	const url = document.location.href
	const { title } = document
	const text = `${title}\n${url}`

	navigator.clipboard.writeText(text)
		.then(() => {
			alert(`Copied title & URL on multiple lines:\n\n${text}`)
		})
		.catch(err => {
			console.error('Error copying text', err)
		})
}())
