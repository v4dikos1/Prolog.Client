import cx from 'classnames'
import { OrderCard } from '@/widgets/order'
import { OrderType } from '@/entities/order'
import { useSearchParams } from 'react-router-dom'

interface Props {
	className?: string
	orders: OrderType[]
}

export const OrderList = ({ className, orders }: Props) => {
	const [searchParams] = useSearchParams()
	const searchStr = searchParams.get('q')?.toLowerCase() || ''

	const filterOrder = (order: OrderType) => {
		if (searchStr === '') return true

		const includesID = order.visibleID.toLowerCase().includes(searchStr)
		const includesAddress = order.address.toLowerCase().includes(searchStr)
		const includesStorage = order.storage.name.toLowerCase().includes(searchStr)
		const includesClient = order.client.name.toLowerCase().includes(searchStr)

		if (includesID || includesAddress || includesStorage || includesClient) return true

		return false
	}
	const filteredOrders = orders.filter(filterOrder)

	return (
		<ul className={cx(className, 'flex flex-col gap-3')}>
			{filteredOrders.map((order) => (
				<li key={order.ID}>
					<OrderCard order={order} />
				</li>
			))}
		</ul>
	)
}
