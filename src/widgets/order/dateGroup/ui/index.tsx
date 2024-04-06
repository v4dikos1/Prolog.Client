import { useState } from 'react'
import { DateHeader } from '@/features/main'
import { IncomingOrdersGroupByDate, ActiveOrdersGroupByDate, StatusEnum } from '@/entities/order/'
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

type Props = IncomingProps | ActiveProps

export const OrderDateGroup = ({ className, status, groupByDate }: Props) => {
	const [opened, setOpened] = useState(false)
	const open = () => setOpened(true)
	const close = () => setOpened(false)

	return (
		<div className={className}>
			<DateHeader opened={opened} open={open} close={close} count={groupByDate.orders.length} date={groupByDate.date} />
			<div className={'mt-[6px] pb-3 ' + (opened ? 'flex' : 'hidden')}>
				{status === StatusEnum.incoming ? (
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
