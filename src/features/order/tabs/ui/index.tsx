import cx from 'classnames'
import { StatusEnum } from '@/entities/order'
import { Tab } from '@/shared/ui/Tab'

interface Props {
	className?: string
	incomingCount: number
	activeCount: number
	completedCount: number
	activeTab: StatusEnum
	openIncoming: () => void
	openActive: () => void
	openCompleted: () => void
}

export const OrderTabs = ({
	className,
	incomingCount,
	activeCount,
	completedCount,
	activeTab,
	openIncoming,
	openActive,
	openCompleted,
}: Props) => {
	return (
		<menu className={cx(className, 'flex gap-1 justify-between')}>
			<li>
				<Tab clickHandler={openIncoming} active={activeTab === StatusEnum.incoming}>
					Входящие ({incomingCount})
				</Tab>
			</li>
			<li>
				<Tab clickHandler={openActive} active={activeTab === StatusEnum.active}>
					Активные ({activeCount})
				</Tab>
			</li>
			<li>
				<Tab clickHandler={openCompleted} active={activeTab === StatusEnum.completed}>
					Выполненные ({completedCount})
				</Tab>
			</li>
		</menu>
	)
}
