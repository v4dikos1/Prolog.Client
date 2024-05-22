import { ActiveOrderPin, IncomingOrderPin, StoragePin, CompletedOrderPin } from '@/features/map'
import {
	getAllStoragesFromIncoming,
	getIncomingPins,
	getAllStoragesFromActive,
	getActivePins,
	getAllStoragesFromCompleted,
	getCompletedPins,
	StatusEnum,
} from '@/entities/order'
import { useAppSelector } from '@/shared/store'

interface Props {
	activeTab: StatusEnum
}

export const Pins = ({ activeTab }: Props) => {
	const storagesFromIncoming = useAppSelector(getAllStoragesFromIncoming)
	const incomingPins = useAppSelector(getIncomingPins)

	const storagesFromActive = useAppSelector(getAllStoragesFromActive)
	const activePins = useAppSelector(getActivePins)

	const storagesFromCompleted = useAppSelector(getAllStoragesFromCompleted)
	const completedPins = useAppSelector(getCompletedPins)

	return (
		<>
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
							client={order.client}
							deliveryStart={order.deliveryStart}
							deliveryEnd={order.deliveryEnd}
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
							client={order.client}
							end={order.end}
						/>
					))}
				</>
			)}
		</>
	)
}
