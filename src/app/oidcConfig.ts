import { WebStorageStateStore } from 'oidc-client-ts'

export const oidcConfig = {
	authority: 'https://identity.krsk-prolog.ru/realms/prolog',
	client_id: 'Prolog.LocalWebClient',
	redirect_uri: '/',
	scope: 'Prolog.AdminScope',
	userStore: new WebStorageStateStore({ store: window.localStorage }),
}
