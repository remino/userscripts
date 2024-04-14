// ==UserScript==
// @name         YouTube: Ad Blocker Blocker
// @name         Copy URL
// @namespace    https://remino.net/
// @version      1.0.0
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

	const callback = mutationsList => {
		mutationsList.forEach(mutation => {
			if (mutation.type === 'childList') {
				mutation.addedNodes.forEach(node => {
					if (node.nodeType === 1 && node.tagName.toLowerCase() === 'ytd-popup-container') {
						node.remove()
					}
				})
			}
		})
	}

	const observer = new MutationObserver(callback)
	observer.observe(targetNode, config)
}())
