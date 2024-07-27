// @title Copy Jira Link
const getDocShortestUrl = require('./lib/get-doc-shortest-url.js');

(function copyJiraLink() {
	'use strict'

	const escape = str => str.replace(/([\\|\]])/g, '\\$1')

	const url = escape(getDocShortestUrl(document))
	const title = escape(document.title)
	const jira = `[${title}|${url}]`

	navigator.clipboard.writeText(jira)
		.then(() => {
			alert(`Copied Jira link:\n\n${jira}`)
		})
		.catch(err => {
			console.error('Error copying text', err)
		})
}())
