import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from 'react-oidc-context'

import { router } from '@/app/router.tsx'
import { oidcConfig } from '@/app/oidcConfig'
import '@/app/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider {...oidcConfig}>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>,
)
