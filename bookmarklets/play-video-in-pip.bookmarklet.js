// @title Play Video in PIP
(function playVideoInPip() {
	const video = document.querySelector('video')

	if (video) {
		video.webkitSetPresentationMode('picture-in-picture')
	} else {
		alert('No video element found on this page.')
	}
}())
