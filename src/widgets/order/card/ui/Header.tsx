import { OrderCopyIDButton, OrderPickUpAddress, OrderDeliveryAddress } from '@/features/order'
import { Checkbox } from '@/shared/ui/Checkbox'

interface Props {
	selected: boolean
	pickUpAddress: string
	deliveryAddress: string
	orderID: string
	driver?: {
		name: string
		licensePlate: string
	}
	toggleSelect: () => void
}

export const Header = ({ toggleSelect, selected, pickUpAddress, deliveryAddress, orderID, driver }: Props) => {
	return (
		<header className='pt-4 px-5 pb-3 border-b border-gray-200'>
			<div className='flex justify-between items-start'>
				<div className='flex gap-2 items-start'>
					<Checkbox changeHandler={toggleSelect} className='mt-1' checked={selected} />
					<OrderDeliveryAddress className='text-left' address={deliveryAddress} />
				</div>
				<OrderCopyIDButton className='mt-1' id={orderID} />
			</div>
			<OrderPickUpAddress address={pickUpAddress} />
			{driver ? (
				<span className='text-xs text-gray-500 mt-1 flex gap-1 items-center'>
					{driver.name}, {driver.licensePlate}
				</span>
			) : null}
		</header>
	)
}
