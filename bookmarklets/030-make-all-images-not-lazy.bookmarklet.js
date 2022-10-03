/* eslint-disable no-console */
// @title Make All Images Not Lazy
(function makeAllImagesNotLazy() {
	'use strict'

	const images = Array.from(document.querySelectorAll('img[loading=lazy]'))

	images.forEach(img => { img.removeAttribute('loading') })

	console.log(`Made ${images.length} images not lazy.`)
}())
