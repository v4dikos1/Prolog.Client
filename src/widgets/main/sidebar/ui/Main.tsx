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
				className={
					'w-full ' +
					(activeTab === StatusEnum.incoming
						? 'animate-fadeIn opacity-0'
						: 'animate-fadeOut pointer-events-none hidden ')
				}
			/>
			<OrderActiveList
				className={
					'w-full ' +
					(activeTab === StatusEnum.active
						? 'animate-fadeIn opacity-0 '
						: 'animate-fadeOut pointer-events-none hidden ')
				}
			/>
			<OrderCompletedList
				className={
					'w-full ' +
					(activeTab === StatusEnum.completed
						? 'animate-fadeIn opacity-0'
						: 'animate-fadeOut pointer-events-none hidden ')
				}
			/>
		</main>
	)
}
