// @title View Flash with Ruffle
(function viewFlashWithRuffle() {
	'use strict'

	window.RufflePlayer = window.RufflePlayer || {}
	window.RufflePlayer.config = { splashScreen: false }
	const s = document.createElement('script')
	s.src = 'https://unpkg.com/@ruffle-rs/ruffle'
	document.body.appendChild(s)
}())
