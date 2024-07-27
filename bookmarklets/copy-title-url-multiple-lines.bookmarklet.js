// @title Copy Title & URL on Multiple Lines
const getDocShortestUrl = require('./lib/get-doc-shortest-url.js');

(function copyTitleUrlMultipleLines() {
	'use strict'

	const url = getDocShortestUrl(document)
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
