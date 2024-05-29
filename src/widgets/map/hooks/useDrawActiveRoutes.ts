import { useEffect } from 'react'
import { useDrawRoute } from '@/entities/map'
import { useAppSelector } from '@/shared/store'
import { getActiveRoutes } from '@/entities/order'

export const useDrawActiveRoutes = (show: boolean) => {
	const routes = useAppSelector(getActiveRoutes)
	const { draw, clear } = useDrawRoute()
	useEffect(() => {
		routes.forEach((route) => {
			if (show) {
				draw(route)
				return
			}
			clear(route.ID)
		})
	}, [show, clear, draw, routes])
}
