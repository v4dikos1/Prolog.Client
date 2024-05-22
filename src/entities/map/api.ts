import { ACCESS_TOKEN } from './token'
import { Coordinates } from './types'

export const getRoute = async (start: Coordinates, end: Coordinates) => {
	const query = await fetch(
		`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${ACCESS_TOKEN}`,
		{ method: 'GET' },
	)

	const json = await query.json()
	const data = json.routes[0]
	return data.geometry.coordinates
}
