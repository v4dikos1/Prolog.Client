import Mapbox from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import cx from 'classnames'
import { ActiveOrderPin, IncomingOrderPin, StoragePin, CompletedOrderPin } from '@/entities/map'

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
				<IncomingOrderPin latitude={56.009} longitude={92.87017} />
				<IncomingOrderPin latitude={56.019} longitude={92.86017} />
				<IncomingOrderPin latitude={56.014} longitude={92.86017} />
				<StoragePin latitude={56.014} longitude={92.87017} />
				<ActiveOrderPin color='rgb(37, 99, 235)' number={2} latitude={56.014} longitude={92.86017} />
				<ActiveOrderPin color='rgb(37, 99, 235)' number={1} latitude={56.017} longitude={92.85117} />
				<ActiveOrderPin color='rgb(217, 119, 6)' number={1} latitude={56.02} longitude={92.87117} />
				<ActiveOrderPin color='rgb(217, 119, 6)' number={2} latitude={56.032} longitude={92.89217} />
				<CompletedOrderPin completed={false} latitude={56.012} longitude={92.90217} />
				<CompletedOrderPin completed={true} latitude={56.001} longitude={92.86217} />
			</Mapbox>
		</section>
	)
}
