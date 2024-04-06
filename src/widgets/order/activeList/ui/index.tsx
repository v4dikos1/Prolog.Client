import { useGetActiveOrdersQuery } from '@/app/store'
import { OrderDateGroup } from '../../dateGroup'
import { StatusEnum } from '@/entities/order'

export const OrderActiveList = () => {
	const { data: activeOrders } = useGetActiveOrdersQuery()

	if (!activeOrders) return null

	return (
		<ul>
			{activeOrders.items.map((item) => (
				<OrderDateGroup key={item.date + '-' + StatusEnum} status={StatusEnum.active} groupByDate={item} />
			))}
		</ul>
	)
}
