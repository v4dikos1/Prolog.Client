import Mapbox from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import cx from 'classnames'
import { ActiveOrderPin, IncomingOrderPin, StoragePin, CompletedOrderPin } from '@/entities/map'
import { useAppSelector } from '@/shared/store'
import {
	getAllStoragesFromIncoming,
	getIncomingPins,
	getAllStoragesFromActive,
	getActivePins,
	getAllStoragesFromCompleted,
	getCompletedPins,
	StatusEnum,
} from '@/entities/order'
import { useSearchParams } from 'react-router-dom'

interface Props {
	className?: string
}

const ACCESS_TOKEN = 'pk.eyJ1IjoibWlraGFpbG92ZHNnbiIsImEiOiJjbHJzb3NjYWcwN2kyMmpwYnd2ZmlmdTFoIn0.TUJWQ1Pfqyf3CprhnmMRBw'

export const Map = ({ className }: Props) => {
	const [searchParams] = useSearchParams()
	const activeTab = (Number(searchParams.get('tab')) as StatusEnum) || StatusEnum.incoming

	const storagesFromIncoming = useAppSelector(getAllStoragesFromIncoming)
	const incomingPins = useAppSelector(getIncomingPins)

	const storagesFromActive = useAppSelector(getAllStoragesFromActive)
	const activePins = useAppSelector(getActivePins)

	const storagesFromCompleted = useAppSelector(getAllStoragesFromCompleted)
	const completedPins = useAppSelector(getCompletedPins)

	return (
		<section id='map' className={cx(className, 'h-full')}>
			<Mapbox
				mapboxAccessToken={ACCESS_TOKEN}
				initialViewState={{
					longitude: 92.87017,
					latitude: 56.009,
					zoom: 11,
				}}
				mapStyle='mapbox://styles/mapbox/streets-v9'>
				{/* <ActiveOrderPin color='rgb(37, 99, 235)' number={2} latitude={56.014} longitude={92.86017} />
				<ActiveOrderPin color='rgb(37, 99, 235)' number={1} latitude={56.017} longitude={92.85117} />
				<ActiveOrderPin color='rgb(217, 119, 6)' number={1} latitude={56.02} longitude={92.87117} />
				<ActiveOrderPin color='rgb(217, 119, 6)' number={2} latitude={56.032} longitude={92.89217} />
				<CompletedOrderPin completed={false} latitude={56.012} longitude={92.90217} />
				<CompletedOrderPin completed={true} latitude={56.001} longitude={92.86217} /> */}
				{activeTab === StatusEnum.incoming && (
					<>
						{storagesFromIncoming.map((storage) => (
							<StoragePin key={storage.ID} latitude={storage.latitude} longitude={storage.longitude} />
						))}
						{incomingPins.map((order) => (
							<IncomingOrderPin key={order.ID} latitude={order.latitude} longitude={order.longitude} />
						))}
					</>
				)}

				{activeTab === StatusEnum.active && (
					<>
						{storagesFromActive.map((storage) => (
							<StoragePin key={storage.ID} latitude={storage.latitude} longitude={storage.longitude} />
						))}
						{activePins.map((order) => (
							<ActiveOrderPin
								number={order.ID}
								color={order.color}
								key={order.ID}
								latitude={order.latitude}
								longitude={order.longitude}
							/>
						))}
					</>
				)}
				{activeTab === StatusEnum.completed && (
					<>
						{storagesFromCompleted.map((storage) => (
							<StoragePin key={storage.ID} latitude={storage.latitude} longitude={storage.longitude} />
						))}
						{completedPins.map((order) => (
							<CompletedOrderPin
								key={order.ID}
								latitude={order.latitude}
								longitude={order.longitude}
								completed={order.completed}
							/>
						))}
					</>
				)}
			</Mapbox>
		</section>
	)
}
