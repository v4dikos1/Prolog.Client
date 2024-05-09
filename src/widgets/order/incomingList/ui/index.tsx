import { useSearchParams } from 'react-router-dom'
import { filterIncomingOrders, StatusEnum, IncomingOrders, OrdersNotFound, SearchNotFound } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

interface Props {
	className?: string
	orders?: IncomingOrders
}

export const OrderIncomingList = ({ className, orders }: Props) => {
	const [searchParams] = useSearchParams()
	const searchStr = (searchParams.get('q') || '').toLowerCase()

	if (!orders) return <OrdersNotFound />

	const filteredIncomingOrders = filterIncomingOrders(orders, searchStr)

	if (filteredIncomingOrders.items.length === 0) return <SearchNotFound />

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
