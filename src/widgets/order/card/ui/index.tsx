import cx from 'classnames'
import { OrderContent, OrderType } from '@/entities/order'
import { Header } from './Header'

interface Props {
	className?: string
	order: OrderType
}

export const OrderCard = ({ className, order }: Props) => {
	const orderContent =
		order.status === 0 ? (
			<OrderContent
				className='w-full'
				client={order.client}
				price={order.price}
				cargo={order.cargo}
				status={order.status}
				pickUpStart={order.pickUpStart}
				pickUpEnd={order.pickUpEnd}
				deliveryStart={order.deliveryStart}
				deliveryEnd={order.deliveryEnd}
			/>
		) : order.status === 1 ? (
			<OrderContent
				className='w-full'
				client={order.client}
				price={order.price}
				cargo={order.cargo}
				status={order.status}
				deliveryStart={order.deliveryStart}
				deliveryEnd={order.deliveryEnd}
			/>
		) : (
			<OrderContent
				className='w-full'
				client={order.client}
				price={order.price}
				cargo={order.cargo}
				status={order.status}
				pickedUp={order.pickedUp}
				completed={order.completed}
				end={order.end}
			/>
		)

	return (
		<div className={cx(className, 'order-card border border-gray-200 rounded-md')}>
			<Header
				selected={order.selected}
				deliveryAddress={order.address}
				pickUpAddress={order.storage.name}
				orderID={order.visibleID}
			/>
			<main className='pt-3 px-5 pb-4'>{orderContent}</main>
		</div>
	)
}
