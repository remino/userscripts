const getActiveElement = (parent = document) => {
	let el = parent.activeElement

	if (el.tagName === 'IFRAME') {
		el = getActiveElement(el.contentDocument)
	}

	return el
}

module.exports = getActiveElement
