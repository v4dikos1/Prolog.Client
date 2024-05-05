import { useEffect, useState } from 'react'
import { useAuth, hasAuthParams } from 'react-oidc-context'
import { Outlet } from 'react-router-dom'
import { NotAuthorized } from '@/shared/ui/NotAuthorized'
import { Authorization } from '@/shared/ui/Authorizing'
import { getUser } from '@/shared/helpers/getUser'

export const App = () => {
	const auth = useAuth()
	const [hasTriedSignin, setHasTriedSignin] = useState(false)
	const user = getUser()

	useEffect(() => {
		if (auth.isLoading || auth.activeNavigator || auth.isAuthenticated || hasTriedSignin) {
			return
		}

		if (user || hasAuthParams()) {
			auth.signinSilent()
			setHasTriedSignin(true)
			return
		}

		auth.signinRedirect()
		setHasTriedSignin(true)
	}, [auth, hasTriedSignin, user])

	if (auth.isLoading) return <Authorization />
	if (!auth.isAuthenticated) return <NotAuthorized />

	return (
		<>
			<Outlet />
		</>
	)
}
