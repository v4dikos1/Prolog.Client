import { OrderCard } from '@/widgets/order/card'
import cx from 'classnames'
import { Order } from '@/entities/order/model'

interface Props {
	className?: string
	orders: Order[]
}

export const OrderList = ({ className, orders }: Props) => {
	if (!orders) return
	console.log(orders)

	return (
		<ul className={cx(className, 'flex flex-col gap-3')}>
			{orders.map((order) => (
				<OrderCard key={order.ID} order={order} />
			))}
		</ul>
	)
}
