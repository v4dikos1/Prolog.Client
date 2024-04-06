import { useGetIncomingOrdersQuery } from '@/app/store'
import { OrderDateGroup } from '../../dateGroup'
import { StatusEnum } from '@/entities/order'

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
