import { OrderCard } from '@/widgets/order/card'
import { OrderType } from '@/entities/order'
import cx from 'classnames'

interface Props {
	className?: string
	orders: OrderType[]
}

export const OrderList = ({ className, orders }: Props) => {
	return (
		<ul className={cx(className, 'flex flex-col gap-3')}>
			{orders.map((order) => (
				<OrderCard key={order.ID} order={order} />
			))}
		</ul>
	)
}
