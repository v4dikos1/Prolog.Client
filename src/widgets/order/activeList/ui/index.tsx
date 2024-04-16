import { useSearchParams } from 'react-router-dom'
import { useGetActiveOrdersQuery } from '@/app/store'
import { StatusEnum, filterActiveOrders } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

interface Props {
	className?: string
}

export const OrderActiveList = ({ className }: Props) => {
	const { data: activeOrders } = useGetActiveOrdersQuery()
	const [searchParams] = useSearchParams()
	const searchStr = (searchParams.get('q') || '').toLowerCase()

	if (!activeOrders) return null
	const filteredActiveOrders = filterActiveOrders(activeOrders, searchStr)

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
