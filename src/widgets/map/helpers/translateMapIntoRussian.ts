import { labels } from '@/entities/map'
import mapboxgl from 'mapbox-gl'

export function translateMapIntoRussian(event: mapboxgl.MapboxEvent) {
	labels.forEach((label) => {
		event.target.setLayoutProperty(label, 'text-field', ['get', 'name_ru'])
	})
	event.target.getStyle().layers.forEach((layer) => {
		if (layer.id.includes('label')) event.target.setLayoutProperty(layer.id, 'text-field', ['get', 'name_ru'])
	})
}
