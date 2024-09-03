// @title Metadata Viewer
(function metadataViewer() {
	const id = 'metadata-viewer'
	const current = document.getElementById(id)
	const version = '1.0.0'

	if (current) {
		current.remove()
		return
	}

	const isColor = color => /^(#([0-9A-F]{3}){1,2}$|(color|hsla?|rgba?)\()/i.test(color)
	const isImageName = name => /icon|image|logo|thumbnail|avatar|photo|picture|poster|cover|og:image|twitter:image/i.test(name)

	const colorSwatch = color => {
		const span = document.createElement('span')
		span.className = 'color-swatch'
		span.style.setProperty('background-color', color)
		return span
	}

	const createLink = url => {
		const a = document.createElement('a')
		a.setAttribute('href', url)
		a.setAttribute('target', '_blank')
		a.textContent = url
		return a
	}

	const isValidUrl = url => {
		try {
			if (!url.startsWith('http') && !url.startsWith('/')) return false
			const parsed = new URL(url, document.location.href)
			return true
		} catch (e) {
			return false
		}
	}

	const generateInnerHTML = (name, content, tag) => {
		const dd = document.createElement('dd')
		const dt = document.createElement('dt')
		const pre = document.createElement('pre')
		const code = document.createElement('code')

		code.textContent = tag

		dt.textContent = name

		if (!content) {
			dd.innerHTML = '<em>No content</em>'
		} else if (isValidUrl(content)) {
			console.log(name, content)
			dd.appendChild(createLink(content))
		} else {
			dd.textContent = content
		}

		if (isImageName(name)) {
			const img = document.createElement('img')
			img.src = content
			img.alt = 'Image preview'
			dd.appendChild(img)
		} else if (isColor(content)) {
			dd.appendChild(colorSwatch(content))
		}

		pre.appendChild(code)
		dd.appendChild(pre)

		return dt.outerHTML + dd.outerHTML
	}

	const isClickOutOfBounds = (event, rect) => {
		const { clientX, clientY } = event
		const {
			left, right, top, bottom,
		} = rect
		return clientX < left || clientX > right || clientY < top || clientY > bottom
	}

	class MetadataViewer extends HTMLElement {
		connectedCallback() {
			const shadow = this.attachShadow({ mode: 'closed' })

			const dialog = document.createElement('dialog')
			dialog.id = 'metadata-dialog'
			dialog.setAttribute('lang', 'en')

			const h1 = document.createElement('h1')
			h1.textContent = 'Document Metadata'
			dialog.appendChild(h1)

			const form = document.createElement('form')
			form.setAttribute('method', 'dialog')

			const style = document.createElement('style')
			style.textContent = ':host{all:initial}dialog::backdrop{background-color:rgba(0,0,0,.8);}#metadata-dialog{background-color:Canvas;border:0;color:CanvasText;color-scheme:dark light;font-family:ui-system,sans-serif;font-size:16px;height:90%;line-height:1.6;max-width:50em;overflow:auto;padding:1lh;position:relative;width:90%}dl{margin:0;padding:0;}dt{font-weight:bold;margin:0}dd{margin:0 0 1lh 0;padding:0}a{text-decoration:underline}.color-swatch{border:1px solid CanvasText;display:inline-block;height:1em;margin-left:0.5em;vertical-align:text-bottom;width:1em;}img{display:block;margin:0.5em 0;max-width:100%;}#close-button{background:transparent;border:none;color:CanvasText;cursor:pointer;font-size:14px;padding:5px 10px;position:absolute;right:10px;top:10px;text-decoration:underline;}footer{font-size:0.8em;margin-top:2lh}h1{font-size:1em;font-weight:bold;text-transform:uppercase;margin:0 0 1lh 0}pre{font-size:0.8em;font-weight:normal;margin:0;opacity:0.8;line-height:0.8lh;white-space:normal}'

			const closeButton = document.createElement('button')
			closeButton.id = 'close-button'
			closeButton.textContent = 'Close'
			form.appendChild(closeButton)

			const dl = document.createElement('dl')

			dl.innerHTML += generateInnerHTML('title', document.title)

			const metaTags = document.head.querySelectorAll('meta,link[rel="icon"],link[rel="apple-touch-icon"],link[rel="apple-touch-icon-precomposed"],link[rel="mask-icon"],link[rel="shortcut icon"],link[rel="canonical"]')

			metaTags.forEach(tag => {
				const name = tag.getAttribute('name') || tag.getAttribute('property') || tag.getAttribute('itemprop') || tag.getAttribute('http-equiv') || tag.getAttribute('charset') || tag.getAttribute('rel') || tag.tagName.toLowerCase()
				const content = tag.getAttribute('content') || tag.getAttribute('href')
				dl.innerHTML += generateInnerHTML(name, content, tag.outerHTML)
			})

			dialog.appendChild(form)
			form.appendChild(dl)

			form.innerHTML += `<footer><nav><em><a href="https://github.com/remino/userscripts/blob/main/bookmarklets/metadata-viewer.bookmarklet.js" target="_blank">Metadata Viewer</a></em> ${version} by <a href="https://remino.net/" target="_blank">RÉMINO</a></nav></footer>`

			shadow.appendChild(style)
			shadow.appendChild(dialog)

			dialog.showModal()

			dialog.addEventListener('click', event => {
				event.stopPropagation()
				const rect = dialog.getBoundingClientRect()

				if (!isClickOutOfBounds(event, rect)) return

				event.preventDefault()
				dialog.close()
			})

			dialog.addEventListener('close', () => this.remove())
		}
	}

	if (!customElements.get('metadata-viewer')) {
		customElements.define('metadata-viewer', MetadataViewer)
	}

	const viewer = document.createElement('metadata-viewer')
	viewer.id = id

	document.body.appendChild(viewer)
}())
