// @title Toggle Cursor Position
(function toggleCursorPosition() {
	'use strict'

	const ID = 'cursor_position'

	const existing = document.getElementById(ID)

	if (existing) {
		document.removeEventListener('mousemove', existing.toggleCursorPositionBookmarkletData.onMouseMove)
		document.body.removeChild(existing)
		return
	}

	const div = document.createElement('div')

	div.setAttribute('id', ID)
	div.style.cssText = /* css */'position:fixed;background:rgba(0,0,0,0.7);color:#fff;font-family:sans-serif;font-size:16px;bottom:10px;right:10px;padding: 4px 8px;border: 1px solid black;z-index:99'
	div.textContent = '?,?'

	document.body.appendChild(div)

	const onMouseMove = ({ clientX, clientY }) => {
		div.textContent = `${clientX},${clientY}`
	}

	div.toggleCursorPositionBookmarkletData = { onMouseMove }

	document.addEventListener('mousemove', onMouseMove)
}())
