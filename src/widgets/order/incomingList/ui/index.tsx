import { useGetIncomingOrdersQuery } from '@/app/store'
import { StatusEnum } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

interface Props {
	className?: string
}

export const OrderIncomingList = ({ className }: Props) => {
	const { data: incomingOrders } = useGetIncomingOrdersQuery()

	if (!incomingOrders) return null

	return (
		<ul className={className}>
			{incomingOrders.items.map((item) => (
				<li key={item.date + '-' + StatusEnum.incoming}>
					<OrderDateGroup status={StatusEnum.incoming} groupByDate={item} />
				</li>
			))}
		</ul>
	)
}
