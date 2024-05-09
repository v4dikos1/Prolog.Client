import cx from 'classnames'
import {
	DeleteIncomingOrdersButton,
	DeleteActiveOrdersButton,
	CancelActiveOrdersButton,
	OrderSearchInput,
	OpenOrderCreateModalButton,
	OpenRunPlanningModalButton,
	DeleteCompletedOrdersButton,
	CreateDuplicateButton,
} from '@/features/order'
import { StatusEnum } from '@/entities/order'

interface MenuSelectedItemProps {
	className?: string
	activeTab: StatusEnum
	selected: boolean
}

export const IncomingOrdersAndSelectedItem = ({ className, activeTab, selected }: MenuSelectedItemProps) => {
	const incomingOrdersClosed = activeTab !== StatusEnum.incoming
	return (
		<menu
			className={cx(className, 'flex gap-2 transition-all', {
				'translate-y-[-130%]': incomingOrdersClosed || !selected,
			})}>
			<DeleteIncomingOrdersButton disabled={!selected} className='w-full' />
		</menu>
	)
}

export const ActiveOrdersAndSelectedItem = ({ className, activeTab, selected }: MenuSelectedItemProps) => {
	const activeOrdersClosed = activeTab !== StatusEnum.active
	return (
		<menu
			className={cx(className, 'flex gap-2 transition-all', {
				'translate-y-[-130%]': activeOrdersClosed || !selected,
			})}>
			<DeleteActiveOrdersButton disabled={!selected} />
			<CancelActiveOrdersButton disabled={!selected} className='w-full' />
		</menu>
	)
}

export const CompletedOrdersAndSelectedItem = ({ className, activeTab, selected }: MenuSelectedItemProps) => {
	const completedOrdersClosed = activeTab !== StatusEnum.completed
	return (
		<menu
			className={cx(className, 'flex gap-2 transition-all', {
				'translate-y-[-130%]': completedOrdersClosed || !selected,
			})}>
			<DeleteCompletedOrdersButton disabled={!selected} />
			<CreateDuplicateButton disabled={!selected} className='w-full' />
		</menu>
	)
}

interface MenuNotSelectedItemProps {
	className?: string
	activeTab: StatusEnum
	selected: {
		incoming: boolean
		active: boolean
		completed: boolean
	}
}

export const NotSelectedItem = ({ className, activeTab, selected }: MenuNotSelectedItemProps) => {
	const incomingOpened = activeTab === StatusEnum.incoming
	const openedOrdersIsSelected = Boolean(
		(activeTab === StatusEnum.incoming && selected.incoming) ||
			(activeTab === StatusEnum.active && selected.active) ||
			(activeTab === StatusEnum.completed && selected.completed),
	)

	return (
		<menu
			className={cx(className, 'transition-all', {
				'translate-y-[130%]': openedOrdersIsSelected,
			})}>
			<li
				className={cx('z-10 absolute transition-all grow', {
					'w-full': !incomingOpened || selected.incoming,
					'w-[calc(100%_-_120px)]': incomingOpened && !selected.incoming,
				})}>
				<OrderSearchInput disabled={openedOrdersIsSelected} />
			</li>
			<li
				className={cx('right-[60px] absolute transition-opacity ', {
					'opacity-0': !incomingOpened,
				})}>
				<OpenOrderCreateModalButton disabled={!incomingOpened || openedOrdersIsSelected} />
			</li>
			<li
				className={cx('right-0  absolute transition-opacity', {
					'opacity-0': !incomingOpened,
				})}>
				<OpenRunPlanningModalButton disabled={!incomingOpened || openedOrdersIsSelected} />
			</li>
		</menu>
	)
}
