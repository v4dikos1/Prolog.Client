import { useSearchParams } from 'react-router-dom'
import { CompletedOrders, OrdersNotFound, SearchNotFound, StatusEnum, filterCompletedOrders } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

interface Props {
	className?: string
	orders?: CompletedOrders
}

export const OrderCompletedList = ({ className, orders }: Props) => {
	const [searchParams] = useSearchParams()
	const searchStr = (searchParams.get('q') || '').toLowerCase()

	if (!orders) return <OrdersNotFound />

	const filteredCompletedOrders = filterCompletedOrders(orders, searchStr)

	if (filteredCompletedOrders.items.length === 0) return <SearchNotFound />

	return (
		<ul className={className}>
			{filteredCompletedOrders.items.map((item) => (
				<li key={item.date + '-' + StatusEnum.completed}>
					<OrderDateGroup status={StatusEnum.completed} groupByDate={item} />
				</li>
			))}
		</ul>
	)
}
