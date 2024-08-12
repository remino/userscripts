const toSingleWidth = str => str.split('').map(char => {
	const code = char.charCodeAt(0)
	if (code >= 0xFF01 && code <= 0xFF5E) {
		return String.fromCharCode(code - 0xFEE0)
	}
	return char
}).join('')

module.exports = toSingleWidth
