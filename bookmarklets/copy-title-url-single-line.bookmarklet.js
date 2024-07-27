// @title Copy Title & URL on Single Line
const getDocShortestUrl = require('./lib/get-doc-shortest-url.js');

(function copyTitleUrlSingleLine() {
	'use strict'

	const url = getDocShortestUrl(document)
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
