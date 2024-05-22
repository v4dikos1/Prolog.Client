import { useEffect } from 'react'
import { useDrawRoute } from '@/entities/map'
import { useAppSelector } from '@/shared/store'
import { getActiveRoutes } from '@/entities/order'

export const useDrawActiveRoutes = (show: boolean) => {
	const routes = useAppSelector(getActiveRoutes)
	const { draw, clear } = useDrawRoute()

	useEffect(() => {
		routes.forEach((routeGroup) => {
			for (let i = 0; i < routeGroup.length - 1; i++) {
				const first = routeGroup[i]
				const second = routeGroup[i + 1]
				console.log(`From [${first.longitude}, ${first.latitude}] To [${second.longitude}, ${second.latitude}]`)
				const id = first.id + '_' + second.id + '_' + first.index
				if (show) {
					draw({
						start: [Number(first.longitude), Number(first.latitude)],
						end: [Number(second.longitude), Number(second.latitude)],
						id,
						color: first.color,
					})
					return
				}

				clear(id)
			}
		})
	}, [show, clear, draw, routes])
}
