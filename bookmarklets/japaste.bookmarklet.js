// @title Japaste
// Paste Japanese phone numbers and postal codes into multiple input fields.
const getActiveElement = require('./lib/get-active-element.js')
const toSingleWidth = require('./lib/to-single-width.js')
const toDoubleWidth = require('./lib/to-double-width.js');

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

	const isDoubleWidth = char => {
		const code = char.charCodeAt(0)
		return code >= 0xFF01 && code <= 0xFF5E
	}

	const splitJpNumber = number => {
		const digits = toSingleWidth(number.replace(/[^0-9０-９]/g, ''))

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

		if (currentIndex > -1 && currentIndex < inputs.length - 1) {
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

		const firstFieldValue = field.value.trim()

		if (toSingleWidth(firstFieldValue) === parts[0]) {
			if (!isDoubleWidth(firstFieldValue)) {
				parts.forEach((part, i) => {
					parts[i] = toDoubleWidth(part)
				})
			}
		}

		while (field && parts.length && parts[0].length) {
			let nextField
			field.value = parts.shift()
			if (parts.length) nextField = getNextInputField(field)
			if (!nextField) break
			field = nextField
		}

		const { form } = field

		if (!form) return

		const event = new Event('change', { bubbles: true })
		form.dispatchEvent(event)
	}

	paste()
}())
