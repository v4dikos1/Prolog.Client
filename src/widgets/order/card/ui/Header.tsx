import { OrderCopyIDButton, OrderPickUpAddress } from '@/features/order'
import { OrderDeliveryAddress } from '@/features/order/deliveryAddress'
import { Checkbox } from '@/shared/ui/Checkbox'

interface Props {
	selected: boolean
	pickUpAddress: string
	deliveryAddress: string
	orderID: string
}

export const Header = ({ selected, pickUpAddress, deliveryAddress, orderID }: Props) => {
	return (
		<header className='pt-4 px-5 pb-3 border-b border-gray-200'>
			<div className='flex justify-between'>
				<div className='flex gap-2'>
					<Checkbox checked={selected} />
					<OrderDeliveryAddress address={deliveryAddress} />
				</div>
				<OrderCopyIDButton id={orderID} />
			</div>
			<OrderPickUpAddress address={pickUpAddress} />
		</header>
	)
}
