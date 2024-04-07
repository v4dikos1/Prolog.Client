import { StatusEnum } from '@/entities/order'
import { useEffect, useState } from 'react'
import { useAuth, hasAuthParams } from 'react-oidc-context'
import { Outlet } from 'react-router-dom'

export const App = () => {
	const auth = useAuth()
	const [hasTriedSignin, setHasTriedSignin] = useState(false)

	useEffect(() => {
		if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
			auth.signinRedirect()
			setHasTriedSignin(true)
		}
	}, [auth, hasTriedSignin])

	if (auth.isLoading) {
		return <div>Signing you in/out...</div>
	}

	if (!auth.isAuthenticated) {
		return <div>Unable to log in</div>
	}

	const urlSearchParams = new URLSearchParams(window.location.search)
	const tab = urlSearchParams.get('tab') || String(StatusEnum.incoming)

	window.history.replaceState({}, document.title, window.location.pathname + '?tab=' + tab)
	return (
		<>
			<Outlet />
		</>
	)
}
