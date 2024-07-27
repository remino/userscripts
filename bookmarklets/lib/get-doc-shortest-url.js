const getDocShortestUrl = doc => {
	const shortlink = doc.querySelector('link[rel="shortlink"]')
	if (shortlink) return shortlink.getAttribute('href')

	const canonical = doc.querySelector('link[rel="canonical"]')
	if (canonical) return canonical.getAttribute('href')

	return doc.location.href
}

module.exports = getDocShortestUrl
