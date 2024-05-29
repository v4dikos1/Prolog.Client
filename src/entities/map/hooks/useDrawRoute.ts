import { useMap } from 'react-map-gl'
import { Route } from '../types'
import { getRoute } from '../api'
import { addRouteLayerToMap } from '../helpers/addRouteLayerToMap'
import { changeRouteLayer } from '../helpers/changeRouteLayer'

export const useDrawRoute = () => {
	const { map: mapRef } = useMap()
	const map = mapRef ? mapRef.getMap() : null

	async function draw({ ID, from, to, color }: Route) {
		if (!map) return

		const route = await getRoute(from, to)

		if (map.getSource(ID)) {
			changeRouteLayer(map, route, ID)
		} else {
			addRouteLayerToMap(map, route, ID, color)
		}
	}

	function clear(ID: string) {
		if (!map) return

		if (map.getSource(ID)) {
			map.removeLayer(ID)
			map.removeSource(ID)
		}
	}

	return { draw, clear }
}
