import { useState } from 'react'
import { DateHeader } from '@/features/main'
import {
	IncomingOrdersGroupByDate,
	ActiveOrdersGroupByDate,
	CompletedOrdersGroupByDate,
	ActiveOrdersGroupByDriver,
	StatusEnum,
	activeOrdersGroupByDateIsEmpty,
	OrdersNotFound,
} from '@/entities/order/'
import { OrderDriverGroup } from '../../driverGroup'
import { OrderList } from '../../list'

type PropsBase = {
	className?: string
}

type IncomingProps = PropsBase & {
	status: StatusEnum.incoming
	groupByDate: IncomingOrdersGroupByDate
}

type ActiveProps = PropsBase & {
	status: StatusEnum.active
	groupByDate: ActiveOrdersGroupByDate
}

type CompletedProps = PropsBase & {
	status: StatusEnum.completed
	groupByDate: CompletedOrdersGroupByDate
}

type Props = IncomingProps | ActiveProps | CompletedProps

export const OrderDateGroup = ({ className, status, groupByDate }: Props) => {
	const [opened, setOpened] = useState(false)
	const open = () => setOpened(true)
	const close = () => setOpened(false)

	const emptyOrders = groupByDate.orders.length === 0
	const activeOrdersIsEmpty = status === StatusEnum.active && activeOrdersGroupByDateIsEmpty(groupByDate)

	if (emptyOrders || activeOrdersIsEmpty) return <OrdersNotFound />

	const sumLengths = (prev: number, cur: ActiveOrdersGroupByDriver) => prev + cur.orders.length
	const count = status === StatusEnum.active ? groupByDate.orders.reduce(sumLengths, 0) : groupByDate.orders.length

	return (
		<div className={className}>
			<DateHeader opened={opened} open={open} close={close} count={count} date={groupByDate.date} />
			<div className={'mt-[6px] pb-3 ' + (opened ? 'flex' : 'hidden')}>
				{status === StatusEnum.incoming || status === StatusEnum.completed ? (
					<OrderList className='w-full' orders={groupByDate.orders} />
				) : (
					groupByDate.orders.map((activeOrdersGroupByDriver) => (
						<OrderDriverGroup
							className='w-full'
							key={activeOrdersGroupByDriver.driver.ID}
							activeOrdersGroupByDriver={activeOrdersGroupByDriver}
						/>
					))
				)}
			</div>
		</div>
	)
}
