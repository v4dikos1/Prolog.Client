import { useSearchParams } from 'react-router-dom'
import { ActiveOrders, OrdersNotFound, SearchNotFound } from '@/entities/order'
import { StatusEnum, filterActiveOrders } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

interface Props {
	className?: string
	orders?: ActiveOrders
}

export const OrderActiveList = ({ className, orders }: Props) => {
	const [searchParams] = useSearchParams()
	const searchStr = (searchParams.get('q') || '').toLowerCase()

	if (!orders) return <OrdersNotFound />
	const filteredActiveOrders = filterActiveOrders(orders, searchStr)

	if (filteredActiveOrders.items.length === 0) return <SearchNotFound />

	return (
		<ul className={className}>
			{filteredActiveOrders.items.map((item) => (
				<li key={item.date + '-' + StatusEnum.active}>
					<OrderDateGroup status={StatusEnum.active} groupByDate={item} />
				</li>
			))}
		</ul>
	)
}
