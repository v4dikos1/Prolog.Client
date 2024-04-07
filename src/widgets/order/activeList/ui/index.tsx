import { useGetActiveOrdersQuery } from '@/app/store'
import { StatusEnum } from '@/entities/order'
import { OrderDateGroup } from '../../dateGroup'

interface Props {
	className?: string
}

export const OrderActiveList = ({ className }: Props) => {
	const { data: activeOrders } = useGetActiveOrdersQuery()

	if (!activeOrders) return null

	return (
		<ul className={className}>
			{activeOrders.items.map((item) => (
				<li key={item.date + '-' + StatusEnum.active}>
					<OrderDateGroup status={StatusEnum.active} groupByDate={item} />
				</li>
			))}
		</ul>
	)
}
