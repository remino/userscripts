// ==UserScript==
// @name         Mastodon Big Compose
// @namespace    https://remino.net/
// @version      0.1.0
// @description  Enlarge and centre the compose form on focus on Mastodon.
// @author       Rémino Rem
// @match        https://mastodon.social/deck*
// @match        https://mastodon.social/home*
// @grant        none
// @downloadURL  https://github.com/remino/userscripts/raw/main/userscripts/mastodon-big-compose.user.js
// @inject-into  content
// ==/UserScript==
/* eslint-disable consistent-return,func-names,no-use-before-define,strict */

(function mastodonBigCompose() {
	'use strict'

	const getComposeForm = () => document.querySelector('.compose-form')

	const setStyle = (form, style) => {
		Object.assign(form.style, style)
	}

	const removeStyle = (form, style) => {
		Object.assign(form.style, Object.keys(style).reduce((acc, key) => {
			acc[key] = ''
			return acc
		}, {}))
	}

	const prepareForm = () => {
		const form = getComposeForm()

		if (!form) return

		const isLightMode = document.body.matches('.theme-mastodon-light')

		const style = {
			background: isLightMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)',
			borderRadius: '1rem',
			boxShadow: '0 0 5rem rgba(0,0,0,0.4)',
			left: '50%',
			position: 'fixed',
			top: '50%',
			transform: 'scale(1.5) translate(-50%, -50%)',
			transformOrigin: 'top left',
			zIndex: '1000',
		}

		form.addEventListener('focusin', () => {
			setStyle(form, style)
		})

		form.addEventListener('focusout', () => {
			removeStyle(form, style)
		})

		const textarea = form.querySelector('textarea')

		if (textarea && document.activeElement === textarea) {
			textarea.blur()
		}

		const column = document.body.querySelector('.columns-area__panels__pane--compositional')

		if (column) {
			column.style.zIndex = '1000'
		}
	}

	const onReadyStateChange = () => {
		if (document.readyState !== 'complete') return
		prepareForm()
	}

	const main = () => {
		document.addEventListener('readystatechange', onReadyStateChange)
	}

	main()
}())
