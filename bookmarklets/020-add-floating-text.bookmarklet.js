/* eslint-disable no-param-reassign */
// @title Add Floating Text
// Based on:
// https://jsfiddle.net/remarkablemark/93gfvjmw/
(function addFloatingText() {
	'use strict'

	let css
	const doc = window.document
	const el = doc.createElement('div')
	const styleId = 'floating_text_style'
	let style = doc.querySelector(`#${styleId}`)

	if (!style) {
		css = `
			.floating-text {'
				align-items:flex-start;
				background:rgba(0,0,0,0.8);
				border:0;
				box-sizing:border-box;
				color:#fff;
				cursor:move;
				display:flex;
				font-family:sans-serif;
				font-size:14px;
				font-weight:400;
				justify-content:space-around;
				left:0;
				line-height:1.6;
				margin:0;
				max-width:40em;
				min-width:10em;
				outline:0;
				overflow:scroll;
				padding:0.5em 1em;
				resize:horizontal;
				position:absolute;
				text-align:center;
				top:0;
				z-index:1000
			}
		`

		style = doc.createElement('style')

		style.id = styleId
		style.innerHTML = css
		doc.head.appendChild(style)
	}

	el.classList.add('floating-text')
	el.setAttribute('contenteditable', true)
	el.style.cssText = css

	el.innerHTML = 'New text'

	doc.body.appendChild(el)

	/**
	 * Makes an element draggable.
	 *
	 * @param {HTMLElement} element - The element.
	 */
	const draggable = element => {
		let isMouseDown = false

		// initial mouse X and Y for `mousedown`
		let mouseX
		let mouseY

		// element X and Y before and after move
		let elementX = 0
		let elementY = 0

		/**
		 * Listens to `mousedown` event.
		 *
		 * @param {Object} event - The event.
		 */
		const onMouseDown = event => {
			mouseX = event.clientX
			mouseY = event.clientY
			isMouseDown = true
		}

		// mouse button down over the element
		element.addEventListener('mousedown', onMouseDown)

		/**
		 * Listens to `mouseup` event.
		 */
		const onMouseUp = () => {
			if (!isMouseDown) return
			isMouseDown = false
			elementX = parseInt(element.style.left, 10) || 0
			elementY = parseInt(element.style.top, 10) || 0
		}

		// mouse button released
		element.addEventListener('mouseup', onMouseUp)

		/**
		 * Listens to `mousemove` event.
		 *
		 * @param {Object} event - The event.
		 */
		const onMouseMove = event => {
			if (!isMouseDown) return
			const deltaX = event.clientX - mouseX
			const deltaY = event.clientY - mouseY
			element.style.left = `${elementX + deltaX}px`
			element.style.top = `${elementY + deltaY}px`
		}

		// need to attach to the entire document
		// in order to take full width and height
		// this ensures the element keeps up with the mouse
		doc.addEventListener('mousemove', onMouseMove)

		const onResize = () => {
			isMouseDown = false
		}

		doc.addEventListener('onresize', onResize)
	}

	draggable(el)
}())
