import { WebStorageStateStore } from 'oidc-client-ts'
import type { UserManagerSettings } from 'oidc-client-ts'

export const clientId = import.meta.env.PROD ? 'Prolog.WebClient' : 'Prolog.LocalWebClient'

export const oidcConfig: UserManagerSettings = {
	authority: 'https://identity.krsk-prolog.ru/realms/prolog',
	client_id: clientId,
	redirect_uri: '/',
	scope: 'Prolog.AdminScope',
	userStore: new WebStorageStateStore({ store: window.localStorage }),
}
