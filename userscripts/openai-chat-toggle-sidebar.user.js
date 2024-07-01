// ==UserScript==
// @name         chat.openai.com: Toggle Sidebar
// @namespace    https://remino.net/
// @version      1.0.1
// @description  Hide sidebar on page load, add a button to toggle it, also assign '[' as keyboard shortcut.
// @author       Rémino Rem
// @inject-into  content
// @grant        none
// @match        https://chat.openai.com/chat
// @match        https://chat.openai.com/chat/*
// ==/UserScript==

(function openaiChatToggleSidebar() {
	const getMain = () => document.querySelector('#__next > div > div:nth-child(1)')
	const getSidebar = () => document.querySelector('#__next > div > div:nth-child(2)')

	const addStyle = () => {
		const style = document.createElement('style')
		style.setAttribute('id', 'openai-chat-toggle-sidebar-style')

		style.textContent = /* css */`
			@media (min-width: 768px) {
				body > #__next[id] > div > div:nth-child(1) {
					transition: padding-left 0.2s ease-in-out;
				}

				body > #__next[id] > div > div:nth-child(2) {
					transition: margin-left 0.2s ease-in-out;
				}

				body.sidebar-hidden {
					--sidebar-width: 20px;
				}

				body.sidebar-hidden > #__next[id] > div > div:nth-child(1) {
					padding-left: var(--sidebar-width) !important;
				}

				body.sidebar-hidden > #__next[id] > div > div:nth-child(2) {
					margin-left: calc(var(--sidebar-width) - 260px) !important;
				}
			}

			#openai-chat-toggle-sidebar-toggle {
				appearance: none;
				background: silver;
				border: none;
				border-radius: 8px;
				cursor: pointer;
				height: 40px;
				top: 50%;
				margin-top: -20px;
				position: absolute;
				right: -5px;
				width: 10px;
				z-index: 100;
			}
		`

		document.head.appendChild(style)
	}

	const toggleSidebar = () => {
		document.body.classList.toggle('sidebar-hidden')
	}

	const isInputField = el => ['SELECT', 'TEXTAREA'].includes(el.tagName)
		|| (el.tagName === 'INPUT' && !['button', 'checkbox', 'radio', 'reset', 'submit'].includes(el.type))

	const keyPressInput = event => {
		const {
			ctrlKey, shiftKey, altKey, metaKey, key, target,
		} = event

		if (
			isInputField(target) || ctrlKey || shiftKey || altKey || metaKey || key !== '['
		) return

		event.preventDefault()
		event.stopPropagation()

		toggleSidebar()
	}

	const addButton = () => {
		const main = getMain()
		const sidebar = getSidebar()

		console.log(main, sidebar)

		if (!main || !sidebar) return

		const button = document.createElement('button')

		button.setAttribute('id', 'openai-chat-toggle-sidebar-toggle')
		button.addEventListener('click', toggleSidebar)
		document.body.addEventListener('keydown', keyPressInput)

		addStyle()
		toggleSidebar()

		sidebar.appendChild(button)
	}

	const main = () => {
		setTimeout(addButton, 100)
	}

	if (document.readyState === 'complete') {
		main()
	} else {
		window.addEventListener('load', main)
	}
}())
