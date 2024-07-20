// @title Copy Rich Link
(function copyRichLink() {
	'use strict'

	const url = document.location.href
	const { title } = document

	const markdown = `[${title.replace(/([\\\]*_`])/g, '\\$1')}](${url.replace(/([\\)])/g, '\\$1')})`
	const text = `${title} ${url}`
	const jira = `[${title.replace(/([\\|\]])/g, '\\$1')}|${url.replace(/([\\|\]])/g, '\\$1')}]`

	const anchor = document.createElement('a')
	anchor.href = url
	anchor.textContent = title

	const html = anchor.outerHTML

	navigator.clipboard.write([
		new ClipboardItem({
			'text/html': new Blob([html], { type: 'text/html' }),
			'text/jira': new Blob([jira], { type: 'text/jira' }),
			'text/markdown': new Blob([markdown], { type: 'text/markdown' }),
			'text/plain': new Blob([text], { type: 'text/plain' }),
			'text/uri-list': new Blob([url], { type: 'text/uri-list' }),
		}),
	])
		.then(() => {
			alert(`Copied rich link:\n\n${title}\n${url}`)
		})
		.catch(err => {
			console.error('Error copying text', err)
		})
}())
