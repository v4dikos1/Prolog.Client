import { useState } from 'react'
import { useAuth } from 'react-oidc-context'
import cx from 'classnames'

import { useGetIncomingOrdersQuery } from '@/app/store'
import { OrderDateGroup } from '@/widgets/order'
import { OrderCreateButton, OrderSearchInput, OrderTabs, OrderRunButton } from '@/features/order'
import { StatusEnum } from '@/entities/order'

interface Props {
	className?: string
}

export const Sidebar = ({ className }: Props) => {
	const auth = useAuth()
	const { data } = useGetIncomingOrdersQuery(auth.user?.access_token || '')
	const [activeTab, setActiveTab] = useState<StatusEnum>(StatusEnum.incoming)

	return (
		<section id='sidebar' className={cx(className, 'h-screen overflow-hidden flex flex-col')}>
			<header className='py-4 px-5 bg-gray-100 w-full border-b border-gray-300'>
				<nav>
					<OrderTabs
						className='w-full'
						activeTab={activeTab}
						incomingCount={data?.count || 0}
						activeCount={78}
						completedCount={240}
						openIncoming={() => setActiveTab(StatusEnum.incoming)}
						openActive={() => setActiveTab(StatusEnum.active)}
						openCompleted={() => setActiveTab(StatusEnum.completed)}
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
			<main className='scrollable py-4 px-5 flex flex-col grow overflow-auto'>
				{data?.items.map((item) => (
					<OrderDateGroup key={item.date} count={item.orders.length} date={item.date} orders={item.orders} />
				))}
			</main>
		</section>
	)
}
