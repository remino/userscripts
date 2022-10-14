// ==UserScript==
// @name         Copy URL
// @namespace    https://remino.net/
// @version      0.1.0
// @description  Display a copyable input field with the page URL and title to copy
// @author       Rémino Rem
// @match        *://*/*
// @grant        none
// @inject-into  content
// ==/UserScript==
/* eslint-disable consistent-return,func-names,no-use-before-define,strict */

(function copyUrl() {
	'use strict'

	const idInput = 'copy_url_input'
	const idStyle = 'copy_url_style'
	const getById = document.getElementById.bind(document)
	const getBySel = document.querySelector.bind(document)
	const getCss = () => getById(idStyle)
	const hasCss = () => !!getCss()
	const isMac = () => window.navigator.platform.indexOf('Mac') === 0

	const addCss = () => {
		if (hasCss()) return

		const style = document.createElement('style')

		style.textContent = `
			#copy_url_input {
				all: unset;
				background: rgba(0, 0, 0, 0.8);
				border: solid 1px #999;
				box-sizing: border-box;
				color: #fff;
				cursor: pointer;
				display: block;
				font: 16px 'Sarasa Mono J', Iosevka, Lato, 'Courier New', Courier, monospace;
				left: 1em;
				max-width: calc(100vw - 50px);
				min-width: 20em;
				padding: 0.25em 0.5em;
				position: fixed;
				top: -100em;
				z-index: 1000;
				white-space: pre-wrap;
			}

			#copy_url_input:focus {
				top: 1em;
			}

			#copy_url_input a {
				color: inherit;
				text-decoration: underline;
			}
		`

		style.setAttribute('id', idStyle)
		document.head.appendChild(style)
	}

	const addInput = () => {
		addCss()
		const input = document.createElement('div')
		input.contentEditable = true
		input.setAttribute('id', idInput)
		input.setAttribute('readonly', true)
		input.setAttribute('tabindex', '0')
		input.setAttribute('type', 'text')
		input.addEventListener('click', inputClick)
		input.addEventListener('focus', inputSelect)
		input.addEventListener('input', inputSelect)
		input.addEventListener('keydown', keyPressInput)
		document.documentElement.appendChild(input)
		setInputLink()
	}

	const disableEvent = e => {
		e.preventDefault()
		e.stopPropagation()
	}

	const escapeBrackets = str => str.replace(/([[\]])/g, '\\$1')

	const inputBlur = () => { getInput().blur() }
	const inputCopy = () => { document.execCommand('copy') }
	const inputFocus = () => { getInput().focus() }

	const inputSelect = () => {
		if (window.netscape) return document.execCommand('selectAll', false, null)
		const input = getInput()
		const range = document.createRange()
		const selection = window.getSelection()
		selection.removeAllRanges()
		range.selectNode(input)
		selection.addRange(range)
	}

	const inputClick = () => {
		inputSelect()
		inputCopy()
		inputBlur()
	}

	const getKeys = e => {
		const mac = isMac()
		const {
			ctrlKey, shiftKey, altKey, metaKey, key,
		} = e

		return {
			key,
			ctrlKey,
			shiftKey,
			altKey: mac ? false : altKey,
			metaKey: mac ? false : metaKey,
			optKey: mac ? altKey : false,
			cmdKey: mac ? metaKey : false,
		}
	}

	const getInput = () => {
		const el = getById(idInput)
		if (el) return el
		addInput()
		return getInput()
	}

	const getShortUrl = () => {
		const el = getBySel('link[rel=shortlink]')
		return el ? el.getAttribute('href') : null
	}

	const getPageTitle = () => document.title

	const getPageUrl = async () => {
		const shortUrl = getShortUrl()
		if (shortUrl) return shortUrl
		return document.location.toString()
	}

	const setFormat = async val => {
		store.format = val
		await formats[val]()
	}

	const setFormatNext = async () => {
		const { format } = store
		const formatNames = Object.keys(formats)
		const index = formatNames.indexOf(format)
		const nextIndex = index >= formatNames.length - 1 ? 0 : index + 1
		setFormat(formatNames[nextIndex])
	}

	const setFormatPrev = async () => {
		const { format } = store
		const formatNames = Object.keys(formats)
		const index = formatNames.indexOf(format)
		const prevIndex = index <= 0 ? formatNames.length - 1 : index - 1
		setFormat(formatNames[prevIndex])
	}

	const setInputValue = val => {
		const input = getInput()
		input.innerHTML = val
		input.setAttribute('cols', val.split('\n').reduce((acc, cur) => Math.max(acc, cur.length), 10))
		input.setAttribute('rows', (val.match('\n') || []).length + 1)
		inputSelect()
	}

	const setInputUrl = async () => {
		setInputValue(await getPageUrl())
	}

	const setInputJira = async () => {
		setInputValue(`[${escapeBrackets(getPageTitle())}|${await getPageUrl()}]`)
	}

	const setInputLink = async () => {
		const container = document.createElement('div')
		const link = document.createElement('a')
		link.setAttribute('href', await getPageUrl())
		link.innerHTML = getPageTitle()
		container.appendChild(link)
		setInputValue(container.innerHTML)
	}

	const setInputMarkdown = async () => {
		setInputValue(`[${escapeBrackets(getPageTitle())}](${await getPageUrl()})`)
	}

	const setInputPlainMultipleLines = async () => {
		setInputValue(`${getPageTitle()}\n${await getPageUrl()}`)
	}

	const setInputPlainSingleLine = async () => {
		setInputValue(`${getPageTitle()} ${await getPageUrl()}`)
	}

	const keyPressInput = async e => {
		const {
			altKey, optKey, shiftKey, ctrlKey, metaKey, cmdKey, key,
		} = getKeys(e)

		disableEvent(e)

		if (
			!optKey && !shiftKey && !metaKey && ctrlKey && (altKey || cmdKey)
			&& key === 'l'
		) inputBlur()

		if (altKey || shiftKey || ctrlKey || metaKey || optKey || cmdKey) return

		switch (key) {
			case '1': case 'k': return setFormat('setInputLink')
			case '2': case 'u': return setFormat('setInputUrl')
			case '3': case 'p': return setFormat('setInputPlainMultipleLines')
			case '4': case 's': return setFormat('setInputPlainSingleLine')
			case '5': case 'm': return setFormat('setInputMarkdown')
			case '6': case 'j': return setFormat('setInputJira')
			case 'ArrowLeft': case 'ArrowUp': return setFormatPrev()
			case 'ArrowRight': case 'ArrowDown': return setFormatNext()
			case 'Enter': inputCopy()
			// eslint-disable-next-line no-fallthrough
			case 'Escape': return inputBlur()
			default: //
		}
	}

	const keyPressBody = e => {
		const { target } = e
		const {
			altKey, optKey, shiftKey, ctrlKey, metaKey, cmdKey, key,
		} = getKeys(e)

		if (
			!['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)
				&& !optKey && !shiftKey && !metaKey && ctrlKey && (altKey || cmdKey)
				&& key === 'l'
		) {
			disableEvent(e)
			inputFocus()
		}
	}

	const main = async () => {
		document.body.addEventListener('keydown', keyPressBody)
	}

	const formats = {
		setInputLink,
		setInputUrl,
		setInputPlainMultipleLines,
		setInputPlainSingleLine,
		setInputMarkdown,
		setInputJira,
	}

	const store = {
		format: Object.keys(formats)[0],
	}

	main().then()
}())
