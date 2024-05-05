import cx from 'classnames'
import { OrderIncomingList, OrderActiveList, OrderCompletedList } from '@/widgets/order'
import { StatusEnum } from '@/entities/order'

interface Props {
	className: string
	activeTab: StatusEnum
}

export const Main = ({ className, activeTab }: Props) => {
	return (
		<main className={className + ' scrollable py-4 px-5 flex flex-col overflow-auto'}>
			<OrderIncomingList
				className={cx('w-full', {
					'animate-fadeIn opacity-0': activeTab === StatusEnum.incoming,
					'animate-fadeOut pointer-events-none hidden': activeTab !== StatusEnum.incoming,
				})}
			/>
			<OrderActiveList
				className={cx('w-full', {
					'animate-fadeIn opacity-0': activeTab === StatusEnum.active,
					'animate-fadeOut pointer-events-none hidden': activeTab !== StatusEnum.active,
				})}
			/>
			<OrderCompletedList
				className={cx('w-full', {
					'animate-fadeIn opacity-0': activeTab === StatusEnum.completed,
					'animate-fadeOut pointer-events-none hidden': activeTab !== StatusEnum.completed,
				})}
			/>
		</main>
	)
}
