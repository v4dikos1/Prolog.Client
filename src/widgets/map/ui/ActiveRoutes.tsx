import { useAppSelector } from '@/shared/store'
import { getActiveRoutes } from '@/entities/order'
import { ActiveRoute } from './ActiveRoute'

export const ActiveRoutes = () => {
	const routes = useAppSelector(getActiveRoutes)

	return routes.map((route) => <ActiveRoute route={route} />)
}
