// @title Toggle All Stylesheets
(function toggleAllStylesheets() {
	'use strict'

	const sheets = Array.from(document.styleSheets)
	const { disabled } = sheets[0]

	sheets.forEach(sheet => {
		sheet.disabled = !disabled
	})
}())
