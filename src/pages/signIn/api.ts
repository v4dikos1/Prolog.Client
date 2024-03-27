import Keycloak from 'keycloak-js'

export const auth = async () => {
	const keycloak = new Keycloak({
		url: 'https://identity.krsk-prolog.ru/',
		clientId: 'Prolog.LocalWebClient',
		realm: 'prolog',
	})

	try {
		const authenticated = await keycloak.init({
			scope: 'Prolog.AdminScope',
			onLoad: 'login-required',
			redirectUri: '/',
		})
		console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`)
		console.log(keycloak.token)
	} catch (error) {
		console.error('Failed to initialize adapter:', error)
	}
}
