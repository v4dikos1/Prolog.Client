import { useState } from 'react'
import { OrderTabs } from '@/features/order/tabs'
import { Tab as TabType } from '@/shared/types/order'

interface Props {
	className?: string
}

export const Sidebar = ({ className }: Props) => {
	const [activeTab, setActiveTab] = useState<TabType>('incoming')
	return (
		<section id='sidebar' className={className}>
			<header className='py-4 px-5 bg-gray-100 w-full'>
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
			</header>
			<main></main>
		</section>
	)
}
