import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/main'
import { SignInPage } from '@/pages/signIn'

export const router = createBrowserRouter([
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
])
