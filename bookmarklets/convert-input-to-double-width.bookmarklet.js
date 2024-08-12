// @title Convert Input to Double Width (Zenkaku)
const getActiveElement = require('./lib/get-active-element.js')
const toDoubleWidth = require('./lib/to-double-width.js');

(function convertInputToDoubleWidth() {
	'use strict'

	const error = msg => {
		console.error(`[${convertInputToDoubleWidth.name}] ${msg}`)
		alert(`${msg}`)
	}

	const main = () => {
		const activeElement = getActiveElement()

		if (!activeElement) {
			error('Please focus on an input field.')
			return
		}

		const { value } = activeElement
		activeElement.value = toDoubleWidth(value)
	}

	main()
}())
