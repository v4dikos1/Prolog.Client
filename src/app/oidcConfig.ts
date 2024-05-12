import { WebStorageStateStore } from 'oidc-client-ts'
import type { UserManagerSettings } from 'oidc-client-ts'

console.log(import.meta.env)

export const oidcConfig: UserManagerSettings = {
	authority: 'https://identity.krsk-prolog.ru/realms/prolog',
	client_id: import.meta.env.DEV ? 'Prolog.LocalWebClient' : 'Prolog.WebClient',
	redirect_uri: '/',
	scope: 'Prolog.AdminScope',
	userStore: new WebStorageStateStore({ store: window.localStorage }),
}
