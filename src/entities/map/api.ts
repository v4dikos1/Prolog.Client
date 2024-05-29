import { ACCESS_TOKEN } from './token'
import { Coordinates } from './types'

export const getRoute = async (start: Coordinates, end: Coordinates) => {
	const query = await fetch(
		`https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?steps=true&geometries=geojson&access_token=${ACCESS_TOKEN}`,
		{ method: 'GET' },
	)

	const json = await query.json()
	const data = json.routes[0]
	return data.geometry.coordinates
}
