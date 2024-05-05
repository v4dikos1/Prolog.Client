import { useSearchParams } from 'react-router-dom'
import { filterIncomingOrders, useGetIncomingOrdersQuery, StatusEnum } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

interface Props {
	className?: string
}

export const OrderIncomingList = ({ className }: Props) => {
	const { data: incomingOrders } = useGetIncomingOrdersQuery()

	const [searchParams] = useSearchParams()
	const searchStr = (searchParams.get('q') || '').toLowerCase()

	if (!incomingOrders) return null
	const filteredIncomingOrders = filterIncomingOrders(incomingOrders, searchStr)

	return (
		<ul className={className}>
			{filteredIncomingOrders.items.map((item) => (
				<li key={item.date + '-' + StatusEnum.incoming}>
					<OrderDateGroup status={StatusEnum.incoming} groupByDate={item} />
				</li>
			))}
		</ul>
	)
}
