import { useGetCompletedOrdersQuery } from '@/app/store'
import { StatusEnum } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

interface Props {
	className?: string
}

export const OrderCompletedList = ({ className }: Props) => {
	const { data: completedOrders } = useGetCompletedOrdersQuery()

	if (!completedOrders) return null

	return (
		<ul className={className}>
			{completedOrders.items.map((item) => (
				<li key={item.date + '-' + StatusEnum.completed}>
					<OrderDateGroup status={StatusEnum.completed} groupByDate={item} />
				</li>
			))}
		</ul>
	)
}
