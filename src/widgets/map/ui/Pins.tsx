import { useSearchParams } from 'react-router-dom'
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
	const [searchParams] = useSearchParams()
	const searchStr = (searchParams.get('q') || '').toLowerCase()

	const storagesFromIncoming = useAppSelector((state) => getAllStoragesFromIncoming(state, searchStr))
	const incomingPins = useAppSelector((state) => getIncomingPins(state, searchStr))

	const storagesFromActive = useAppSelector((state) => getAllStoragesFromActive(state, searchStr))
	const activePins = useAppSelector((state) => getActivePins(state, searchStr))

	const storagesFromCompleted = useAppSelector((state) => getAllStoragesFromCompleted(state, searchStr))
	const completedPins = useAppSelector((state) => getCompletedPins(state, searchStr))

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
