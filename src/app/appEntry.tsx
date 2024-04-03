import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from 'react-oidc-context'
import { Provider as StoreProvider } from 'react-redux'

import { router } from '@/app/router.tsx'
import { oidcConfig } from '@/app/oidcConfig'
import { store } from '@/app/store'
import '@/app/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider {...oidcConfig}>
			<StoreProvider store={store}>
				<RouterProvider router={router} />
			</StoreProvider>
		</AuthProvider>
	</React.StrictMode>,
)
