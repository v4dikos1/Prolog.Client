import { OrderList } from '@/widgets/order'
import { ActiveOrdersGroupByDriver } from '@/entities/order/model'
import { DriverCard } from '@/widgets/driver'

interface Props {
	className?: string
	activeOrdersGroupByDriver: ActiveOrdersGroupByDriver
}

export const OrderDriverGroup = ({ className, activeOrdersGroupByDriver }: Props) => {
	return (
		<div className={className + ' flex flex-col gap-3'}>
			<DriverCard driver={activeOrdersGroupByDriver.driver} />
			<OrderList className='w-full' orders={activeOrdersGroupByDriver.orders} />
		</div>
	)
}
