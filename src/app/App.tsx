// import { useEffect, useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { Outlet } from 'react-router-dom'

export const App = () => {
	const auth = useAuth()

	switch (auth.activeNavigator) {
		case 'signinSilent':
			return <div>Signing you in...</div>
		case 'signoutRedirect':
			return <div>Signing you out...</div>
	}

	if (auth.error) return
	if (auth.isLoading) return

	if (!auth.isAuthenticated) {
		auth.signinRedirect()
	}

	if (auth.isAuthenticated) {
		window.history.replaceState({}, document.title, window.location.pathname)
		return (
			<>
				<Outlet />
			</>
		)
	}
}
