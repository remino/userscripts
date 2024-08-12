// @title Convert Input to Single Width (Hankaku)
const getActiveElement = require('./lib/get-active-element.js');

(function convertInputToSingleWidth() {
	'use strict'

	const error = msg => {
		console.error(`[${convertInputToSingleWidth.name}] ${msg}`)
		alert(`${msg}`)
	}

	const toSingleWidth = str => str.split('').map(char => {
		const code = char.charCodeAt(0)
		if (code >= 0xFF01 && code <= 0xFF5E) {
			return String.fromCharCode(code - 0xFEE0)
		}
		return char
	}).join('')

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
