import { OrderList } from '@/widgets/order'
import { DriverCard } from '@/widgets/driver'
import { ActiveOrdersGroupByDriver } from '@/entities/order'

interface Props {
	className?: string
	activeOrdersGroupByDriver: ActiveOrdersGroupByDriver
}

export const OrderDriverGroup = ({ className, activeOrdersGroupByDriver }: Props) => {
	if (activeOrdersGroupByDriver.orders.length === 0) return null

	return (
		<div className={className + ' flex flex-col gap-3'}>
			<DriverCard driver={activeOrdersGroupByDriver.driver} />
			<OrderList className='w-full' orders={activeOrdersGroupByDriver.orders} />
		</div>
	)
}
