// @title Toggle CSS Grid
(function toggleCssGrid() {
	const doc = window.document
	const id = 'css_grid'
	const existing = doc.getElementById(id)

	if (existing) {
		existing.remove()
		return
	}

	const el = doc.createElement('style')

	const css = /* css */`
		:root {
			--grid-size: 100px;
			--grid-size-div: 4;
			--grid-size-sub: calc(var(--grid-size) / var(--grid-size-div));
			--grid-size-color-major: rgba(0,0,0,0.6);
			--grid-size-color-minor: rgba(0,0,0,0.2);
		}
		
		body {
			background-color: rgba(255, 255, 255, 0.8);
			background-repeat: repeat;
			background-image: linear-gradient(to bottom, var(--grid-size-color-major) 1px, transparent 1px), linear-gradient(to right, var(--grid-size-color-major) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-size-color-minor) 1px, transparent 1px), linear-gradient(to right, var(--grid-size-color-minor) 1px, transparent 1px);
			background-size: 100% var(--grid-size), var(--grid-size) 100%, 100% var(--grid-size-sub), var(--grid-size-sub) 100%;
		}
	`

	el.setAttribute('id', id)
	el.textContent = css

	doc.head.appendChild(el)
}())
