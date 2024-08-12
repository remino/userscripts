const toDoubleWidth = str => str.split('').map(char => {
	const code = char.charCodeAt(0)
	if (code >= 33 && code <= 126) {
		return String.fromCharCode(code + 0xFEE0)
	}
	return char
}).join('')

module.exports = toDoubleWidth
