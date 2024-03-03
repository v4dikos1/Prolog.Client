import { createBrowserRouter } from 'react-router-dom'
import { Main } from '../pages/Main'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
	},
	{
		path: '/sign-in',
		element: <h1 className='text-3xl'>Вход</h1>,
	},
])
