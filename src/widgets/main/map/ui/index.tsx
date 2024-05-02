import ReactMapboxGl from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import cx from 'classnames'

interface Props {
	className?: string
}

const ACCESS_TOKEN = 'pk.eyJ1IjoibWlraGFpbG92ZHNnbiIsImEiOiJjbHJzb3NjYWcwN2kyMmpwYnd2ZmlmdTFoIn0.TUJWQ1Pfqyf3CprhnmMRBw'

export const Map = ({ className }: Props) => {
	const MapBox = ReactMapboxGl({ accessToken: ACCESS_TOKEN, minZoom: 1 })

	return (
		<section id='map' className={cx(className, 'h-full')}>
			<MapBox style='mapbox://styles/mapbox/streets-v8' />
		</section>
	)
}
