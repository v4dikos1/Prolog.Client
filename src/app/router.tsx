import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/main'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />,
	},
	{
		path: '/sign-in',
		element: <h1 className='text-3xl'>Вход</h1>,
	},
])
