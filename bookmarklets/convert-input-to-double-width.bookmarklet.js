// @title Convert Input to Double Width (Zenkaku)
const getActiveElement = require('./lib/get-active-element.js');

(function convertInputToDoubleWidth() {
	'use strict'

	const error = msg => {
		console.error(`[${convertInputToDoubleWidth.name}] ${msg}`)
		alert(`${msg}`)
	}

	const toDoubleWidth = str => str.split('').map(char => {
		const code = char.charCodeAt(0)
		if (code >= 33 && code <= 126) {
			return String.fromCharCode(code + 0xFEE0)
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
		activeElement.value = toDoubleWidth(value)
	}

	main()
}())
