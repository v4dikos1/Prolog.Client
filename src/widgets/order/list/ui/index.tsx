import cx from 'classnames'
import { OrderCard } from '@/widgets/order'
import { OrderType } from '@/entities/order/'

interface Props {
	className?: string
	orders: OrderType[]
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
