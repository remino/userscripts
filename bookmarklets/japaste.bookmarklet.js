// @title Japaste
// Paste Japanese phone numbers and postal codes into multiple input fields.
const getActiveElement = require('./lib/get-active-element.js');

(function japaste() {
	'use strict'

	const error = msg => {
		console.error(`[${japaste.name}] ${msg}`)
		alert(`${msg}`)
	}

	const splitAt = (str, ...indices) => indices.reduce((acc, idx) => {
		acc[1].push(str.slice(acc[0], idx))
		acc[0] = idx
		return acc
	}, [0, []])[1]

	const splitJpNumber = number => {
		const digits = number.replace(/\D/g, '')

		if (digits.length === 7) {
			return splitAt(digits, 3, 7)
		}

		if (digits.startsWith('03') || digits.startsWith('06')) {
			return splitAt(digits, 2, 6, 10)
		}

		return splitAt(digits, 3, 7, 11)
	}

	const readClipboard = async () => {
		try {
			return navigator.clipboard.readText()
		} catch (err) {
			console.error(err)
			return ''
		}
	}

	const getNextInputField = currentInput => {
		const { form } = currentInput
		const inputs = Array.from(form.elements)
		const currentIndex = inputs.indexOf(currentInput)

		if (currentIndex > -1 && currentIndex < inputs.length - 2) {
			const nextInput = inputs[currentIndex + 1]
			if (nextInput.tagName === 'INPUT') return nextInput
		}

		return null
	}

	const paste = async () => {
		const num = await readClipboard()

		if (!num) {
			error('Failed to read clipboard.')
			return
		}

		const parts = splitJpNumber(num)

		let field = getActiveElement()

		if (!field) {
			error('Cannot get active element.')
			return
		}

		if (field.tagName !== 'INPUT') {
			error('Please click on an input field before running this bookmarklet.')
			return
		}

		while (field && parts.length && parts[0].length) {
			field.value = parts.shift()
			if (parts.length) field = getNextInputField(field)
			if (!field) break
		}

		field.focus()
	}

	paste()
}())
