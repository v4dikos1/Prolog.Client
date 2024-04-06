import { useGetIncomingOrdersQuery } from '@/app/store'
import { StatusEnum } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

export const OrderIncomingList = () => {
	const { data: incomingOrders } = useGetIncomingOrdersQuery()

	if (!incomingOrders) return null

	return (
		<ul>
			{incomingOrders.items.map((item) => (
				<OrderDateGroup key={item.date + '-' + StatusEnum} status={StatusEnum.incoming} groupByDate={item} />
			))}
		</ul>
	)
}
