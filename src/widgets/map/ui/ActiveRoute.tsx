import { getRoute } from '@/entities/map'
import { Route } from '@/entities/map'
import { useEffect, useState } from 'react'
import { Layer, Source } from 'react-map-gl'

interface Props {
	route: Route
}

export const ActiveRoute = ({ route }: Props) => {
	const [coordinates, setCoordinates] = useState(null)

	useEffect(() => {
		async function fetchCoordinates() {
			const response = await getRoute(route.from, route.to)
			setCoordinates(response)
		}

		fetchCoordinates()
	}, [route])

	if (!coordinates) return null

	return (
		<Source
			key={route.ID}
			type='geojson'
			data={{
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: coordinates,
				},
			}}>
			<Layer
				key={route.ID}
				type='line'
				id={route.ID}
				layout={{ 'line-join': 'round', 'line-cap': 'round' }}
				paint={{ 'line-color': route.color, 'line-width': 10, 'line-opacity': 0.6 }}
			/>
		</Source>
	)
}
