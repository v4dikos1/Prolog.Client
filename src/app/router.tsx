import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/main'
import { SignInPage } from '@/pages/signIn'
import { App } from '@/app/App'

export const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
			{
				path: '/sign-in',
				element: <SignInPage />,
			},
			{
				path: '/signin',
				element: <SignInPage />,
			},
			{
				path: '/login',
				element: <SignInPage />,
			},
		],
	},
])
