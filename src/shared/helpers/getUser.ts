import { User } from 'oidc-client-ts'

export function getUser() {
	const oidcStorage = localStorage.getItem(
		`oidc.user:https://identity.krsk-prolog.ru/realms/prolog:Prolog.LocalWebClient`,
	)

	if (!oidcStorage) {
		return null
	}

	return User.fromStorageString(oidcStorage)
}
