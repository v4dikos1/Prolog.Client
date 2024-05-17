import { useSearchParams } from 'react-router-dom'
import { filterIncomingOrders, StatusEnum, IncomingOrders, OrdersNotFound, SearchNotFound } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'

interface Props {
	className?: string
	orders?: IncomingOrders
	isIncomingOrdersFetching: boolean
}

export const OrderIncomingList = ({ className, orders, isIncomingOrdersFetching }: Props) => {
	const [searchParams] = useSearchParams()
	const searchStr = (searchParams.get('q') || '').toLowerCase()

	if (!orders || orders.items.length === 0) return <OrdersNotFound />

	const filteredIncomingOrders = filterIncomingOrders(orders, searchStr)

	if (filteredIncomingOrders.items.length === 0) return <SearchNotFound />

	if (isIncomingOrdersFetching) return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-700' />

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
