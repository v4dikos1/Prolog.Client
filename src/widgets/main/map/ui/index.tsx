// import ReactMapboxGl from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import cx from 'classnames'

interface Props {
	className?: string
}

export const Map = ({ className }: Props) => {
	// const MapBox = ReactMapboxGl({ minZoom: 1 })

	return (
		<section id='map' className={cx(className, 'h-full')}>
			{/* <MapBox style='mapbox://styles/mapbox/streets-v8' /> */}
		</section>
	)
}
