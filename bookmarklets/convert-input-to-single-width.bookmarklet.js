// @title Convert Input to Single Width (Hankaku)
const getActiveElement = require('./lib/get-active-element.js')
const toSingleWidth = require('./lib/to-single-width.js');

(function convertInputToSingleWidth() {
	'use strict'

	const error = msg => {
		console.error(`[${convertInputToSingleWidth.name}] ${msg}`)
		alert(`${msg}`)
	}

	const main = () => {
		const activeElement = getActiveElement()

		if (!activeElement) {
			error('Please focus on an input field.')
			return
		}

		const { value } = activeElement
		activeElement.value = toSingleWidth(value)
	}

	main()
}())
