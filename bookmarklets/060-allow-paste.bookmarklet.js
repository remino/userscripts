// @title Allow Paste
// a.k.a Don't F**k With Paste

(function allowPaste() {
	'use strict'

	const forceBrowserDefault = e => {
		e.stopImmediatePropagation()
		return true
	}

	Array.from(['copy', 'cut', 'paste']).forEach(event => {
		document.addEventListener(event, forceBrowserDefault, true)
	})
}())
