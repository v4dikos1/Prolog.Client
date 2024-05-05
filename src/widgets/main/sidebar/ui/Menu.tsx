import cx from 'classnames'
import { useAppSelector } from '@/shared/store'

import { StatusEnum, isIncomingOrderSelected, isActiveOrderSelected, isCompletedOrderSelected } from '@/entities/order'
import {
	IncomingOrdersAndSelectedItem,
	ActiveOrdersAndSelectedItem,
	NotSelectedItem,
	CompletedOrdersAndSelectedItem,
} from './MenuItems'

interface Props {
	className?: string
	activeTab: StatusEnum
}

export const Menu = ({ className, activeTab }: Props) => {
	const incomingSelected = useAppSelector(isIncomingOrderSelected) || false
	const activeSelected = useAppSelector(isActiveOrderSelected) || false
	const completedSelected = useAppSelector(isCompletedOrderSelected) || false

	return (
		<div className={cx(className, 'h-[54px] relative py-2 overflow-y-clip')}>
			<IncomingOrdersAndSelectedItem activeTab={activeTab} selected={incomingSelected} className='w-full absolute' />
			<ActiveOrdersAndSelectedItem activeTab={activeTab} selected={activeSelected} className='w-full absolute' />
			<CompletedOrdersAndSelectedItem activeTab={activeTab} selected={completedSelected} className='w-full absolute' />
			<NotSelectedItem
				className='w-full h-[42px] absolute top-2'
				activeTab={activeTab}
				selected={{ incoming: incomingSelected, active: activeSelected, completed: completedSelected }}
			/>
		</div>
	)
}
