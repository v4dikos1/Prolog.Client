import cx from 'classnames'
import { OrderIncomingList, OrderActiveList, OrderCompletedList } from '@/widgets/order'
import { ActiveOrders, CompletedOrders, IncomingOrders, StatusEnum } from '@/entities/order'

interface Props {
	className: string
	activeTab: StatusEnum
	incomingOrders?: IncomingOrders
	activeOrders?: ActiveOrders
	completedOrders?: CompletedOrders
	isIncomingOrdersFetching: boolean
}

export const Main = ({
	className,
	activeTab,
	incomingOrders,
	activeOrders,
	completedOrders,
	isIncomingOrdersFetching,
}: Props) => {
	return (
		<main className={className + ' scrollable py-4 pl-5 pr-1 flex flex-col overflow-auto'}>
			<div
				className={cx('w-full', {
					'animate-fadeIn opacity-0': activeTab === StatusEnum.incoming,
					'animate-fadeOut pointer-events-none hidden': activeTab !== StatusEnum.incoming,
				})}>
				<OrderIncomingList isIncomingOrdersFetching={isIncomingOrdersFetching} orders={incomingOrders} />
			</div>
			<div
				className={cx('w-full', {
					'animate-fadeIn opacity-0': activeTab === StatusEnum.active,
					'animate-fadeOut pointer-events-none hidden': activeTab !== StatusEnum.active,
				})}>
				<OrderActiveList orders={activeOrders} />
			</div>
			<div
				className={cx('w-full', {
					'animate-fadeIn opacity-0': activeTab === StatusEnum.completed,
					'animate-fadeOut pointer-events-none hidden': activeTab !== StatusEnum.completed,
				})}>
				<OrderCompletedList orders={completedOrders} />
			</div>
		</main>
	)
}
