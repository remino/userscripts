// ==UserScript==
// @name         YouTube: Ad Blocker Blocker
// @name         Copy URL
// @namespace    https://remino.net/
// @version      1.1.0
// @description  Remove the anti ad-blocker blocker pop-up.
// @author       Rémino Rem
// @match        https://www.youtube.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/remino/userscripts/main/userscripts/youtube-ad-blocker-blocker.user.js
// @inject-into  content
// ==/UserScript==
/* eslint-disable consistent-return,func-names,no-use-before-define,strict */

(function youtubeAdBlockerBlocker() {
	const targetNode = document.body
	const config = { attributes: true, childList: true, subtree: true }

	const preventVideoPause = () => {
		const video = document.querySelector('video')

		if (!video) return

		if (video.paused) {
			video.play()
			return
		}

		video.addEventListener('pause', () => {
			video.play()
		}, { once: true })
	}

	const callback = mutationsList => {
		mutationsList.forEach(mutation => {
			if (mutation.type === 'childList') {
				mutation.addedNodes.forEach(node => {
					if (node.nodeType === 1 && node.tagName === 'YTD-POPUP-CONTAINER') {
						node.remove()
						preventVideoPause()
					}
				})
			}
		})
	}

	const els = document.querySelectorAll('ytd-popup-container')
	if (els.length) {
		els.forEach(el => el.remove())
		preventVideoPause()
	}

	const observer = new MutationObserver(callback)
	observer.observe(targetNode, config)
}())
