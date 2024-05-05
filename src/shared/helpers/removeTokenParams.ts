export const removeTokenParams = () => {
	const url = new URL(window.location.href)
	url.searchParams.delete('state')
	url.searchParams.delete('session_state')
	url.searchParams.delete('iss')
	url.searchParams.delete('code')
	window.history.replaceState(null, '', url)
}
