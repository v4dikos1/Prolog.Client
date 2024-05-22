// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const changeRouteLayer = (map: mapboxgl.Map, route: any, id: string) => {
	const layer = map.getSource(id)
	if (layer.type === 'geojson') {
		layer.setData({
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'LineString',
				coordinates: route,
			},
		})
	}
}
