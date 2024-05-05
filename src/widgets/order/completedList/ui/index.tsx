import { useSearchParams } from 'react-router-dom'
import { StatusEnum, filterCompletedOrders, useGetCompletedOrdersQuery } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

interface Props {
	className?: string
}

export const OrderCompletedList = ({ className }: Props) => {
	const { data: completedOrders } = useGetCompletedOrdersQuery()

	const [searchParams] = useSearchParams()
	const searchStr = (searchParams.get('q') || '').toLowerCase()

	if (!completedOrders) return null
	const filteredCompletedOrders = filterCompletedOrders(completedOrders, searchStr)

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
