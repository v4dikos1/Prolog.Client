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
					{storagesFromIncoming.map((pin) => (
						<StoragePin key={pin.storageID} {...pin} />
					))}
					{incomingPins.map((pin) => (
						<IncomingOrderPin key={pin.orderID} {...pin} />
					))}
				</>
			)}
			{activeTab === StatusEnum.active && (
				<>
					{storagesFromActive.map((pin) => (
						<StoragePin key={pin.storageID} {...pin} />
					))}
					{activePins.map((pin) => (
						<ActiveOrderPin {...pin} key={pin.orderID} />
					))}
				</>
			)}
			{activeTab === StatusEnum.completed && (
				<>
					{storagesFromCompleted.map((pin) => (
						<StoragePin key={pin.storageID} {...pin} />
					))}
					{completedPins.map((pin) => (
						<CompletedOrderPin key={pin.orderID} {...pin} />
					))}
				</>
			)}
		</>
	)
}
