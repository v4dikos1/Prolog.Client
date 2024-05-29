import { useSearchParams } from 'react-router-dom'
import Mapbox from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { ACCESS_TOKEN } from '@/entities/map'
import { StatusEnum } from '@/entities/order'
import { Pins } from './Pins'
import { translateMapIntoRussian } from '../helpers/translateMapIntoRussian'
import { ActiveRoutes } from './ActiveRoutes'

export const Map = () => {
	const [searchParams] = useSearchParams()
	const activeTab = (Number(searchParams.get('tab')) as StatusEnum) || StatusEnum.incoming

	return (
		<Mapbox
			id='map'
			mapboxAccessToken={ACCESS_TOKEN}
			initialViewState={{
				longitude: 92.87017,
				latitude: 56.009,
				zoom: 11,
			}}
			mapStyle='mapbox://styles/mapbox/streets-v9'
			onLoad={translateMapIntoRussian}>
			<Pins activeTab={activeTab} />
			{activeTab === StatusEnum.active && <ActiveRoutes />}
		</Mapbox>
	)
}
