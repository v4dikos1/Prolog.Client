import { User } from 'oidc-client-ts'
import { clientId } from '@/app/oidcConfig'

export function getUser() {
	const oidcStorage = localStorage.getItem(`oidc.user:https://identity.krsk-prolog.ru/realms/prolog:${clientId}`)

	if (!oidcStorage) {
		return null
	}

	return User.fromStorageString(oidcStorage)
}
