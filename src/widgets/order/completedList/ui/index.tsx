import { CompletedOrders, OrdersNotFound, StatusEnum } from '@/entities/order'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import { OrderDateGroup } from '../../dateGroup'

interface Props {
	className?: string
	orders?: CompletedOrders
	isCompletedOrdersFetching: boolean
}

export const OrderCompletedList = ({ className, orders, isCompletedOrdersFetching }: Props) => {
	if (isCompletedOrdersFetching) return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-700' />
	if (!orders || orders.items.length === 0) return <OrdersNotFound />

	return (
		<ul className={className}>
			{orders.items.map((item) => (
				<li key={item.date + '-' + StatusEnum.completed}>
					<OrderDateGroup status={StatusEnum.completed} groupByDate={item} />
				</li>
			))}
		</ul>
	)
}
