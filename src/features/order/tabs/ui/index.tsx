import cx from 'classnames'
import { Tab as TabType } from '@/shared/types/order'
import { Tab } from '@/shared/ui/Tab'

interface Props {
	className?: string
	incomingCount: number
	activeCount: number
	completedCount: number
	activeTab: TabType
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
				<Tab clickHandler={openIncoming} active={activeTab === 'incoming'}>
					Входящие ({incomingCount})
				</Tab>
			</li>
			<li>
				<Tab clickHandler={openActive} active={activeTab === 'active'}>
					Активные ({activeCount})
				</Tab>
			</li>
			<li>
				<Tab clickHandler={openCompleted} active={activeTab === 'completed'}>
					Выполненные ({completedCount})
				</Tab>
			</li>
		</menu>
	)
}
