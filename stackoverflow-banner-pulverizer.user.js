// ==UserScript==
// @name         StackOverflow Cookie Consent Banner Pulverizer
// @namespace    https://remino.net/
// @version      0.2
// @description  Get rid of that pesky annoying cookie consent banner on StackOverflow sites.
// @author       Rémino Rem <https://remino.net/>
// @match        https://*.stackexchange.com/*
// @match        https://askubuntu.com/*
// @match        https://mathoverflow.net/*
// @match        https://blogoverflow.com/*
// @match        https://serverfault.com/*
// @match        https://stackoverflow.com/*
// @match        https://stackexchange.com/*
// @match        https://stackapps.com/*
// @match        https://stackmod.blog/*
// @match        https://stackoverflow.blog/*
// @match        https://stackoverflowbusiness.com/*
// @match        https://stackoverflowsolutions.com/*
// @match        https://superuser.com/*
// @match        https://tex-talk.net/*
// @match        https://thesffblog.com/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	const banner = document.querySelector('.js-consent-banner')

	if (!banner) return

	banner.parentNode.removeChild(banner)
})();
