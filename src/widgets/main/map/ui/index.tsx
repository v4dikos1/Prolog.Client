import Mapbox from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import cx from 'classnames'
import { ActiveOrderPin, IncomingOrderPin, StoragePin, CompletedOrderPin, labels } from '@/entities/map'
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
		<section className={cx(className, 'h-full')}>
			<Mapbox
				id='map'
				mapboxAccessToken={ACCESS_TOKEN}
				initialViewState={{
					longitude: 92.87017,
					latitude: 56.009,
					zoom: 11,
				}}
				mapStyle='mapbox://styles/mapbox/streets-v9'
				onLoad={(event) => {
					labels.forEach((label) => {
						event.target.setLayoutProperty(label, 'text-field', ['get', 'name_ru'])
					})
					event.target.getStyle().layers.forEach((layer) => {
						if (layer.id.includes('label')) event.target.setLayoutProperty(layer.id, 'text-field', ['get', 'name_ru'])
					})
				}}>
				{activeTab === StatusEnum.incoming && (
					<>
						{storagesFromIncoming.map((storage) => (
							<StoragePin
								key={storage.ID}
								latitude={storage.latitude}
								longitude={storage.longitude}
								address={storage.name}
							/>
						))}
						{incomingPins.map((order) => (
							<IncomingOrderPin
								key={order.ID}
								latitude={order.latitude}
								longitude={order.longitude}
								client={order.client}
								time={order.time}
							/>
						))}
					</>
				)}

				{activeTab === StatusEnum.active && (
					<>
						{storagesFromActive.map((storage) => (
							<StoragePin
								key={storage.ID}
								latitude={storage.latitude}
								longitude={storage.longitude}
								address={storage.name}
							/>
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
							<StoragePin
								key={storage.ID}
								latitude={storage.latitude}
								longitude={storage.longitude}
								address={storage.name}
							/>
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
