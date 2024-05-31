import { ActiveOrders, OrdersNotFound } from '@/entities/order'
import { StatusEnum } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'

interface Props {
	className?: string
	orders?: ActiveOrders
	isACtiveOrdersFetching: boolean
}

export const OrderActiveList = ({ className, orders, isACtiveOrdersFetching }: Props) => {
	if (isACtiveOrdersFetching) return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-700' />
	if (!orders || orders.items.length === 0) return <OrdersNotFound />

	return (
		<ul className={className}>
			{orders.items.map((item) => (
				<li key={item.date + '-' + StatusEnum.active}>
					<OrderDateGroup status={StatusEnum.active} groupByDate={item} />
				</li>
			))}
		</ul>
	)
}
