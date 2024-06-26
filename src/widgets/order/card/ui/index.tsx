import cx from 'classnames'
import { OrderContent, useToggleOrderMutation, Order, StatusEnum } from '@/entities/order'
import { Header } from './Header'

interface Props {
	className?: string
	order: Order
}

const getOrderContent = (order: Order) => {
	return order.status === 0 ? (
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
}

export const OrderCard = ({ className, order }: Props) => {
	const orderContent = getOrderContent(order)
	const [update] = useToggleOrderMutation()
	const toggleSelect = () => {
		update({ status: order.status, ID: order.ID })
	}

	return (
		<div className={cx(className, 'order-card border border-gray-200 rounded-md')}>
			<Header
				toggleSelect={toggleSelect}
				selected={order.selected}
				client={order.client}
				storage={order.storage}
				orderID={order.visibleID}
				driver={order.status === StatusEnum.completed ? order.driver : undefined}
			/>
			<main className='pt-3 px-5 pb-4'>{orderContent}</main>
		</div>
	)
}
