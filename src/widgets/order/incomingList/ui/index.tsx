import { StatusEnum, IncomingOrders, OrdersNotFound } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'

interface Props {
	className?: string
	orders?: IncomingOrders
	isIncomingOrdersFetching: boolean
}

export const OrderIncomingList = ({ className, orders, isIncomingOrdersFetching }: Props) => {
	if (isIncomingOrdersFetching) return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-700' />
	if (!orders || orders.items.length === 0) return <OrdersNotFound />

	return (
		<ul className={className}>
			{orders.items.map((item) => (
				<li key={item.date + '-' + StatusEnum.incoming}>
					<OrderDateGroup status={StatusEnum.incoming} groupByDate={item} />
				</li>
			))}
		</ul>
	)
}
