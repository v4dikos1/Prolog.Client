import Mapbox, { Marker } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import cx from 'classnames'

interface Props {
	className?: string
}

const ACCESS_TOKEN = 'pk.eyJ1IjoibWlraGFpbG92ZHNnbiIsImEiOiJjbHJzb3NjYWcwN2kyMmpwYnd2ZmlmdTFoIn0.TUJWQ1Pfqyf3CprhnmMRBw'

export const Map = ({ className }: Props) => {
	return (
		<section id='map' className={cx(className, 'h-full')}>
			<Mapbox
				mapboxAccessToken={ACCESS_TOKEN}
				initialViewState={{
					longitude: 92.87017,
					latitude: 56.009,
					zoom: 13,
				}}
				mapStyle='mapbox://styles/mapbox/streets-v9'>
				<Marker longitude={92.87017} latitude={56.009}>
					<div className='shadow-lg w-9 h-9 rounded-full border-2 border-white bg-gray-500'></div>
				</Marker>
			</Mapbox>
		</section>
	)
}
