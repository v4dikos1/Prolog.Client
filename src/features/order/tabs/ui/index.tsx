import cx from 'classnames'
import { StatusEnum } from '@/entities/order'
import { Tab } from '@/shared/ui/Tab'
import { useAppSelector, getIncomingOrdersCount, getActiveOrdersCount, getCompletedOrdersCount } from '@/app/store'

interface Props {
	className?: string
	activeTab: StatusEnum
	openIncoming: () => void
	openActive: () => void
	openCompleted: () => void
}

export const OrderTabs = ({ className, activeTab, openIncoming, openActive, openCompleted }: Props) => {
	const incomingCount = useAppSelector(getIncomingOrdersCount)
	const activeCount = useAppSelector(getActiveOrdersCount)
	const completedCount = useAppSelector(getCompletedOrdersCount)

	return (
		<menu className={cx(className, 'flex gap-1 justify-between')}>
			{incomingCount && incomingCount > 0 && (
				<li className='animate-fadeIn'>
					<Tab clickHandler={openIncoming} active={activeTab === StatusEnum.incoming}>
						Входящие ({incomingCount})
					</Tab>
				</li>
			)}
			{activeCount && activeCount > 0 && (
				<li className='animate-fadeIn'>
					<Tab clickHandler={openActive} active={activeTab === StatusEnum.active}>
						Активные ({activeCount})
					</Tab>
				</li>
			)}
			{completedCount && completedCount > 0 && (
				<li className='animate-fadeIn'>
					<Tab clickHandler={openCompleted} active={activeTab === StatusEnum.completed}>
						Выполненные ({completedCount})
					</Tab>
				</li>
			)}
		</menu>
	)
}
