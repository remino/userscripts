// @title Toggle 100x100 px grid
(function toggle100By100Grid() {
	const doc = window.document
	const id = 'pixel-grid'
	let el = doc.getElementById(id)

	function removeGrid() {
		el.parentNode.removeChild(el)
	}

	if (el) {
		removeGrid()
		return
	}

	const click = e => {
		e.stopPropagation()
		e.preventDefault()
		removeGrid()
	}

	const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAgMAAAANjH3HAAAADFBMVEX///+ZmZlkZGQAAACftpaIAAAAA3RSTlOAoLhw/lgJAAAAPklEQVRIx2P8z4ALHACTAmCSA0wyQiSYcGoZlRmVIVeGRTQUifNnNCWOygyQDOOrA6Nl4qjMaJk4KjMqAwUA1iQJpDACNusAAAAASUVORK5CYII='

	const cssProps = {
		'-webkit-print-color-adjust': 'exact',
		'background-color': 'transparent',
		'background-image': `url(${img})`,
		'background-position': 'top left',
		'background-repeat': 'repeat',
		'background-size': 'auto',
		'image-rendering': 'pixelated',
		'z-index': 1000,
		height: '100vh',
		left: 0,
		position: 'fixed',
		top: 0,
		transform: 'scale(1)',
		width: '100vw',
	}

	const styleVal = Object.keys(cssProps)
		.map(k => `${k}: ${cssProps[k]}`)
		.join('; ')

	el = doc.createElement('div')
	el.id = id
	el.setAttribute('style', styleVal)
	el.addEventListener('click', click)

	doc.body.appendChild(el)
}())
