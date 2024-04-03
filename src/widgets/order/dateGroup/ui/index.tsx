import { useState } from 'react'
import { OrderList } from '@/widgets/order'
import { OrderType } from '@/entities/order'
import { DateHeader } from '@/features/main'

interface Props {
	className?: string
	count: number
	date: string
	orders: OrderType[]
}

export const OrderDateGroup = ({ className, count, date, orders }: Props) => {
	const [opened, setOpened] = useState(false)
	const open = () => setOpened(true)
	const close = () => setOpened(false)

	return (
		<div className={className}>
			<DateHeader opened={opened} open={open} close={close} count={count} date={date} />
			<div className={'mt-[6px] pb-3 ' + (opened ? 'flex' : 'hidden')}>
				<OrderList className='w-full' orders={orders} />
			</div>
		</div>
	)
}
