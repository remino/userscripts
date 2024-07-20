// @title Toggle CSS Grid
(function toggleCssGrid() {
	const doc = window.document
	const id = 'css_grid'
	const styleId = `${id}_style`
	const existingStyle = doc.getElementById(styleId)
	const existingGrid = doc.getElementById(id)

	if (existingStyle || existingGrid) {
		Array.from([existingStyle, existingGrid])
			.filter(el => el)
			.forEach(el => el.remove())

		return
	}

	const styleEl = doc.createElement('style')
	const gridEl = doc.createElement('div')

	const css = /* css */`
		:root {
			--grid-color-bg: rgba(255,255,255,0.2);
			--grid-color-major: rgba(0,0,0,0.6);
			--grid-color-minor: rgba(0,0,0,0.2);
			--grid-div: 4;
			--grid-opacity: 0.8;
			--grid-size: 100px;
			--grid-sub: calc(var(--grid-size) / var(--grid-div));
		}
		@media (prefers-color-scheme: dark) {
			:root {
				--grid-color-bg: rgba(0,0,0,0.2);
				--grid-color-major: rgba(255,255,255,0.6);
				--grid-color-minor: rgba(255,255,255,0.2);
			}
		}
		
		.grid {
			background-color: var(--grid-color-bg);
			background-image: linear-gradient(to bottom, var(--grid-color-major) 1px, transparent 1px), linear-gradient(to right, var(--grid-color-major) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color-minor) 1px, transparent 1px), linear-gradient(to right, var(--grid-color-minor) 1px, transparent 1px);
			background-repeat: repeat;
			background-size: 100% var(--grid-size), var(--grid-size) 100%, 100% var(--grid-sub), var(--grid-sub) 100%;
			height: 100%;
			left: 0;
			opacity: var(--grid-opacity);
			pointer-events: none;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: 9300;
		}
	`

	styleEl.setAttribute('id', styleId)
	styleEl.textContent = css

	gridEl.setAttribute('id', id)
	gridEl.classList.add('grid')

	doc.head.appendChild(styleEl)
	doc.body.appendChild(gridEl)
}())
