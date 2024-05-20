import { ClientInOrder } from '@/entities/client'
import { StorageInOrder } from '@/entities/storage'
import { OrderCopyIDButton, OrderPickUpAddress, OrderDeliveryAddress } from '@/features/order'
import { Checkbox } from '@/shared/ui/Checkbox'

interface Props {
	selected: boolean
	client: ClientInOrder
	storage: StorageInOrder
	orderID: string
	driver?: {
		name: string
		licensePlate: string
	}
	toggleSelect: () => void
}

export const Header = ({ toggleSelect, selected, client, storage, orderID, driver }: Props) => {
	const [clientLatitude, clientLongitude] = client.coordinates.split(' ').map((value) => Number(value))
	const [storageLatitude, storageLongitude] = storage.coordinates.split(' ').map((value) => Number(value))

	return (
		<header className='pt-4 px-5 pb-3 border-b border-gray-200'>
			<div className='flex justify-between items-start'>
				<div className='flex gap-2 items-start'>
					<Checkbox changeHandler={toggleSelect} className='mt-1' checked={selected} />
					<OrderDeliveryAddress
						className='text-left'
						address={client.address}
						longitude={clientLongitude}
						latitude={clientLatitude}
					/>
				</div>
				<OrderCopyIDButton className='mt-1' ID={orderID} />
			</div>
			<OrderPickUpAddress address={storage.name} longitude={storageLongitude} latitude={storageLatitude} />
			{driver ? (
				<span className='text-xs text-gray-500 mt-1 flex gap-1 items-center'>
					{driver.name}, {driver.licensePlate}
				</span>
			) : null}
		</header>
	)
}
