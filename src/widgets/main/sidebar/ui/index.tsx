import { useState } from 'react'
import { OrderCreateButton, OrderSearchInput, OrderTabs } from '@/features/order'
import { Tab as TabType } from '@/shared/types/order'
import { OrderRunButton } from '@/features/order/runButton'

interface Props {
	className?: string
}

export const Sidebar = ({ className }: Props) => {
	const [activeTab, setActiveTab] = useState<TabType>('incoming')
	return (
		<section id='sidebar' className={className}>
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
			<main></main>
		</section>
	)
}
