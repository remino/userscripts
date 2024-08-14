// @title Contrast Checker
(function contrastChecker() {
	'use strict'

	const remove = () => {
		window.contrastChecker.remove()
		window.contrastChecker = null
	}

	if (window.contrastChecker) {
		remove()
		return
	}

	const host = document.createElement('div')
	window.contrastChecker = host

	const shadowRoot = host.attachShadow({ mode: 'closed' })
	const container = document.createElement('form')

	const style = document.createElement('style')
	style.textContent = /* css */ ':host{all:initial;--bg-rgb:255 255 255;--fg-rgb:0 0 0;--font-size:16px}[disabled]{opacity:.6}[name=copy]{box-sizing:border-box;flex:1 0 8em;width:100%}[type=submit]{font-weight:700}.aa,.aaa,.fail{color:#fff}.aa,.aaa{color:green}.aa:after,.aaa:after{content:"✅";margin-inline-start:.25em}.fail{color:#c00}.fail:after{content:"❌";margin-inline-start:.25em}.result output{box-sizing:border-box;font-weight:700;text-align:right;width:6em}.vert{align-items:stretch;flex-flow:column nowrap}button,input{font-size:1em}fieldset,form,header,label,menu,nav{align-items:center;display:flex;flex-flow:row wrap;gap:.4em;justify-content:space-between}form{align-items:stretch;-webkit-backdrop-filter:blur(1em);backdrop-filter:blur(1em);background:rgb(var(--bg-rgb)/80%);bottom:1em;box-shadow:0 0 1em rgba(var(--fg-rgb)/40%);color:rgb(var(--fg-rgb));display:flex;flex-flow:column nowrap;font-family:system-ui,sans-serif;font-size:var(--font-size);inline-size:16em;justify-content:center;left:1em;margin:0;min-block-size:10em;padding:1em;position:fixed;z-index:2147483647}header{cursor:move;user-select:none}h1{font-size:1em}h1,menu{margin:0}menu{flex:1 0;justify-content:center;list-style:none;padding:0}'

	class ColorPickerElement extends HTMLElement {
		get alphaEnabled() {
			return this.hasAttribute('alpha')
		}

		get label() {
			return this.getAttribute('label') || 'Colour'
		}

		get colorAttr() {
			return this.getAttribute('color') || '#000000'
		}

		get alpha() {
			return this.alphaEnabled
				? this.querySelector('input[name="alpha"]').value
				: 1
		}

		get color() {
			return this.querySelector('input[name="color"]').value
		}

		set color(value) {
			this.querySelector('input[name="color"]').value = value
		}

		connectedCallback() {
			this.innerHTML = /* html */ `<fieldset><legend>${this.label}</legend><input name=color type=color value=#000000><label><span>Alpha</span><input name=alpha type=number min=0 max=1 step=0.01 value=1></label><button name=copy>Copy</button></fieldset>`

			this.color = this.colorAttr

			const copyBtn = this.querySelector('[name="copy"]')

			copyBtn.textContent = this.color

			copyBtn.addEventListener('click', async event => {
				event.preventDefault()
				event.stopPropagation()
				await navigator.clipboard.writeText(this.color)
			})

			if (!this.alphaEnabled) {
				this.querySelector('[name="alpha"]').disabled = true
			}

			this.querySelector('[name="alpha"]').addEventListener(
				'input',
				() => {
					this.dispatchEvent(
						new CustomEvent('input', {
							detail: {
								alpha: this.alpha,
								color: this.color,
							},
						}),
					)
				},
			)

			this.querySelector('[name="color"]').addEventListener(
				'input',
				event => {
					copyBtn.textContent = event.currentTarget.value

					this.dispatchEvent(
						new CustomEvent('input', {
							detail: {
								alpha: this.alpha,
								color: this.color,
							},
						}),
					)
				},
			)
		}
	}

	if (!customElements.get('color-picker')) {
		customElements.define('color-picker', ColorPickerElement)
	}

	container.innerHTML = /* html */ '<header><h1>Contrast Checker</h1><button aria-label=Close type=submit>&times;</button></header><color-picker name=fg label=Foreground color=#000000 alpha></color-picker><color-picker name=bg label=Background color=#ffffff></color-picker><fieldset class="result vert"><legend>WCAG</legend><label><span>Contrast Ratio</span> <output name=contrast readonly></label> <label><span>Normal Text</span> <output name=wcagnt readonly></label> <label><span>Large Text</span> <output name=wcaglt readonly></label> <label><span>UI Objects</span> <output name=wcagui readonly></label></fieldset><nav><menu><li><a href=https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG target=_blank>Details about WCAG on MDN</a></li><li>By <a href=https://remino.net target=_blank>RÉMINO</a></menu></nav>'

	container.addEventListener('submit', event => {
		event.preventDefault()
		event.stopPropagation()
		remove()
	})

	const hexToRgb = hex => {
		const r = parseInt(hex.slice(1, 3), 16)
		const g = parseInt(hex.slice(3, 5), 16)
		const b = parseInt(hex.slice(5, 7), 16)
		return { r, g, b }
	}

	const blendColors = (fgColorHex, bgColorHex, fgAlpha = 1) => {
		const fgColor = hexToRgb(fgColorHex)
		const bgColor = hexToRgb(bgColorHex)

		const blendedRed = fgColor.r * fgAlpha + bgColor.r * (1 - fgAlpha)
		const blendedGreen = fgColor.g * fgAlpha + bgColor.g * (1 - fgAlpha)
		const blendedBlue = fgColor.b * fgAlpha + bgColor.b * (1 - fgAlpha)

		return { r: blendedRed, g: blendedGreen, b: blendedBlue }
	}

	const getLuminance = color => {
		const rgb = [color.r, color.g, color.b].map(c => {
			c /= 255
			return c <= 0.03928
				? c / 12.92
				: ((c + 0.055) / 1.055) ** 2.4
		})
		return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
	}

	const getContrastRatio = (fgColorHex, bgColorHex, fgAlpha = 1) => {
		const blendedColor = blendColors(fgColorHex, bgColorHex, fgAlpha)
		const lum1 = getLuminance(blendedColor) + 0.05
		const lum2 = getLuminance(hexToRgb(bgColorHex)) + 0.05

		return lum1 > lum2 ? lum1 / lum2 : lum2 / lum1
	}

	const getWcagLevelForNormalText = contrastRatio => {
		if (contrastRatio >= 7) {
			return 'AAA'
		} if (contrastRatio >= 4.5) {
			return 'AA'
		}
		return 'Fail'
	}

	const getWcagLevelForLargeText = contrastRatio => {
		if (contrastRatio >= 4.5) {
			return 'AAA'
		} if (contrastRatio >= 3) {
			return 'AA'
		}
		return 'Fail'
	}

	const getWcagLevelForUiComponents = contrastRatio => (contrastRatio >= 3 ? 'AA' : 'Fail')

	const updateInputClassByValue = (...inputs) => {
		inputs.forEach(input => {
			const { value } = input
			input.classList.remove('fail', 'aa', 'aaa')
			input.classList.add(value.toLowerCase())
		})
	}

	const updateForm = () => {
		const fg = container.querySelector('color-picker[name="fg"]')
		const bg = container.querySelector('color-picker[name="bg"]')
		const contrast = container.querySelector('output[name="contrast"]')
		const wcagnt = container.querySelector('output[name="wcagnt"]')
		const wcaglt = container.querySelector('output[name="wcaglt"]')
		const wcagui = container.querySelector('output[name="wcagui"]')

		const fgColor = fg.color
		const fgAlpha = fg.alpha
		const bgColor = bg.color

		const contrastRatio = getContrastRatio(fgColor, bgColor, fgAlpha)
		contrast.value = `${parseFloat(contrastRatio.toFixed(2))}:1`

		wcagnt.value = getWcagLevelForNormalText(contrastRatio)
		wcaglt.value = getWcagLevelForLargeText(contrastRatio)
		wcagui.value = getWcagLevelForUiComponents(contrastRatio)

		updateInputClassByValue(wcagnt, wcaglt, wcagui)
	}

	const setupDragging = parent => {
		let offsetX
		let offsetY = 0
		let isDragging = false

		parent
			.querySelector('header')
			.addEventListener('pointerdown', event => {
				offsetX = event.clientX - parent.offsetLeft
				offsetY = event.clientY - parent.offsetTop
				isDragging = true
			})

		document.addEventListener('pointermove', event => {
			if (!isDragging) return
			event.preventDefault()
			event.stopPropagation()
			const x = event.clientX - offsetX
			const y = event.clientY - offsetY
			parent.style.setProperty('left', `${x}px`)
			parent.style.setProperty('top', `${y}px`)
			parent.style.setProperty('bottom', 'auto')
		})

		document.addEventListener('pointerup', () => {
			isDragging = false
		})
	}

	container.addEventListener('input', updateForm)
	setupDragging(container)

	shadowRoot.appendChild(style)
	shadowRoot.appendChild(container)

	document.body.appendChild(host)

	updateForm()
}())
