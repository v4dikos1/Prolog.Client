import { useGetActiveOrdersQuery } from '@/app/store'
import { StatusEnum } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

export const OrderActiveList = () => {
	const { data: activeOrders } = useGetActiveOrdersQuery()

	if (!activeOrders) return null

	return (
		<ul>
			{activeOrders.items.map((item) => (
				<OrderDateGroup key={item.date + '-' + StatusEnum.active} status={StatusEnum.active} groupByDate={item} />
			))}
		</ul>
	)
}
