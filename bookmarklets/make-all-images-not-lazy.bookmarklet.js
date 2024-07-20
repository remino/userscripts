/* eslint-disable no-console */
// @title Make All Images Not Lazy
(function makeAllImagesNotLazy() {
	'use strict'

	const images = Array.from(document.querySelectorAll('img[decoding], img[loading]'))

	images.forEach(img => ['decoding', 'loading'].forEach(attr => img.removeAttribute(attr)))

	console.log(`Made ${images.length} images not lazy.`)
}())
