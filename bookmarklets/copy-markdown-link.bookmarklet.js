// @title Copy Markdown Link
(function copyMarkdownLink() {
	'use strict'

	const url = document.location.href.replace(/([\\)])/g, '\\$1')
	const title = document.title.replace(/([\\\]*_`])/g, '\\$1')
	const markdown = `[${title}](${url})`

	navigator.clipboard.writeText(markdown)
		.then(() => {
			alert(`Copied Markdown link:\n\n${markdown}`)
		})
		.catch(err => {
			console.error('Error copying text', err)
		})
}())
