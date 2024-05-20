import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from 'react-oidc-context'
import { Provider as StoreProvider } from 'react-redux'

import { router } from '@/app/router.tsx'
import { oidcConfig } from '@/app/oidcConfig'
import { store } from '@/shared/store'
import './index.css'
import { MapProvider } from 'react-map-gl'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider {...oidcConfig}>
			<StoreProvider store={store}>
				<MapProvider>
					<RouterProvider router={router} />
				</MapProvider>
			</StoreProvider>
		</AuthProvider>
	</React.StrictMode>,
)
