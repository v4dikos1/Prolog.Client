import { useAppSelector } from '@/shared/store'
import { getActiveRoutes } from '@/entities/order'
import { ActiveRoute } from './ActiveRoute'
import { useSearchParams } from 'react-router-dom'

export const ActiveRoutes = () => {
	const [searchParams] = useSearchParams()
	const searchStr = (searchParams.get('q') || '').toLowerCase()
	const routes = useAppSelector((state) => getActiveRoutes(state, searchStr))

	return routes.map((route) => <ActiveRoute route={route} />)
}
