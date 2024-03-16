import { useState } from 'react'
import cx from 'classnames'
import { OrderList } from '@/widgets/order'
import { OrderCreateButton, OrderSearchInput, OrderTabs, OrderRunButton } from '@/features/order'
import { Tab as TabType } from '@/shared/types/order'
import { fakeOrders } from '@/entities/order'

interface Props {
	className?: string
}

export const Sidebar = ({ className }: Props) => {
	const [activeTab, setActiveTab] = useState<TabType>('incoming')
	return (
		<section id='sidebar' className={cx(className, 'h-screen overflow-hidden flex flex-col')}>
			<header className='py-4 px-5 bg-gray-100 w-full border-b border-gray-300'>
				<nav>
					<OrderTabs
						className='w-full'
						activeTab={activeTab}
						incomingCount={89}
						activeCount={78}
						completedCount={240}
						openIncoming={() => setActiveTab('incoming')}
						openActive={() => setActiveTab('active')}
						openCompleted={() => setActiveTab('completed')}
					/>
				</nav>
				<menu className='mt-3 flex gap-2'>
					<li className='grow'>
						<OrderSearchInput className='w-full' />
					</li>
					<li>
						<OrderCreateButton />
					</li>
					<li>
						<OrderRunButton />
					</li>
				</menu>
			</header>
			<main className='scrollable py-4 px-5 flex flex-col gap-3 grow overflow-auto'>
				<OrderList orders={fakeOrders} />
			</main>
		</section>
	)
}
