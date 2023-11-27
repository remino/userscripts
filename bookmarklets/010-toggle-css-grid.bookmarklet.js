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
			--grid-div: 4;
			--grid-sub: calc(var(--grid-size) / var(--grid-div));
			--grid-color-major: rgba(0,0,0,0.6);
			--grid-color-minor: rgba(0,0,0,0.2);
			--grid-color-bg: rgba(255,255,255,0.8);
		}
		@media (prefers-color-scheme: dark) {
			:root {
				--grid-color-bg: rgba(0,0,0,0.9);
				--grid-color-major: rgba(255,255,255,0.4);
				--grid-color-minor: rgba(255,255,255,0.1);
			}
		}
		
		body::before {
			display: block;
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			z-index: -10;
			background-color: var(--grid-color-bg);
			background-repeat: repeat;
			background-image: linear-gradient(to bottom, var(--grid-color-major) 1px, transparent 1px), linear-gradient(to right, var(--grid-color-major) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color-minor) 1px, transparent 1px), linear-gradient(to right, var(--grid-color-minor) 1px, transparent 1px);
			background-size: 100% var(--grid-size), var(--grid-size) 100%, 100% var(--grid-sub), var(--grid-sub) 100%;
		}
	`

	el.setAttribute('id', id)
	el.textContent = css

	doc.head.appendChild(el)
}())
