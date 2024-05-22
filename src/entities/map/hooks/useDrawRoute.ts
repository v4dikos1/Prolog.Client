import { useMap } from 'react-map-gl'
import { Coordinates } from '../types'
import { getRoute } from '../api'
import { addRouteLayerToMap } from '../helpers/addRouteLayerToMap'
import { changeRouteLayer } from '../helpers/changeRouteLayer'

interface DrawProps {
	start: Coordinates
	end: Coordinates
	id: string
	color: string
}

export const useDrawRoute = () => {
	const { map: mapRef } = useMap()
	const map = mapRef ? mapRef.getMap() : null

	async function draw({ start, end, id, color }: DrawProps) {
		if (!map) return

		const route = await getRoute(start, end)

		if (map.getSource(id)) {
			changeRouteLayer(map, route, id)
		} else {
			addRouteLayerToMap(map, route, id, color)
		}
	}

	function clear(id: string) {
		if (!map) return

		if (map.getSource(id)) {
			map.removeLayer(id)
			map.removeSource(id)
		}
	}

	return { draw, clear }
}
