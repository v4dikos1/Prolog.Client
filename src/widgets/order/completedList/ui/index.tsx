import { useGetCompletedOrdersQuery } from '@/app/store'
import { StatusEnum } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

export const OrderCompletedList = () => {
	const { data: completedOrders } = useGetCompletedOrdersQuery()

	if (!completedOrders) return null

	return (
		<ul>
			{completedOrders.items.map((item) => (
				<OrderDateGroup key={item.date + '-' + StatusEnum.completed} status={StatusEnum.completed} groupByDate={item} />
			))}
		</ul>
	)
}
