// @title Get Canvas Image
(function getCanvasImage() {
	'use strict'

	const canvas = document.querySelector('canvas')

	if (!canvas) {
		alert('There is no canvas on this page.')
		return
	}

	const link = document.createElement('a')
	link.style.setProperty('display', 'none')
	link.setAttribute('target', '_blank')
	link.setAttribute('href', canvas.toDataURL('image/png'))

	document.body.appendChild(link)

	console.log(canvas, link)

	link.click()
}())
