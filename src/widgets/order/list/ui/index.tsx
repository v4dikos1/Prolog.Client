import cx from 'classnames'
import { OrderCard } from '@/widgets/order'
import { Order } from '@/entities/order'

interface Props {
	className?: string
	orders: Order[]
}

export const OrderList = ({ className, orders }: Props) => {
	return (
		<ul className={cx(className, 'flex flex-col gap-3')}>
			{orders.map((order) => (
				<li key={order.ID}>
					<OrderCard order={order} />
				</li>
			))}
		</ul>
	)
}
