import mapboxgl from 'mapbox-gl'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addRouteLayerToMap = (map: mapboxgl.Map, route: any, id: string, color: string) => {
	map.addLayer({
		id: id,
		type: 'line',
		source: {
			type: 'geojson',
			data: {
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: route,
				},
			},
		},
		layout: {
			'line-join': 'round',
			'line-cap': 'round',
		},
		paint: {
			'line-color': color,
			'line-width': 5,
			'line-opacity': 0.75,
		},
	})
}
