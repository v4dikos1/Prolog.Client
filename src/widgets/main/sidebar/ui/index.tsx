import React, { useState } from 'react'
import cx from 'classnames'

import { OrderActiveList, OrderIncomingList, OrderCompletedList } from '@/widgets/order'
import { OrderCreateButton, OrderSearchInput, OrderTabs, OrderRunButton } from '@/features/order'
import { StatusEnum } from '@/entities/order'

interface Props {
	className?: string
}

export const Sidebar = ({ className }: Props) => {
	const [activeTab, setActiveTab] = useState<StatusEnum>(StatusEnum.incoming)

	const openIncoming = () => setActiveTab(StatusEnum.incoming)
	const openActive = () => setActiveTab(StatusEnum.active)
	const openCompleted = () => setActiveTab(StatusEnum.completed)

	const orders: Record<StatusEnum, React.ReactNode> = {
		[StatusEnum.incoming]: <OrderIncomingList />,
		[StatusEnum.active]: <OrderActiveList />,
		[StatusEnum.completed]: <OrderCompletedList />,
	}

	return (
		<div id='sidebar' className={cx(className, 'h-screen overflow-hidden flex flex-col')}>
			<header className='py-4 px-5 bg-gray-100 w-full border-b border-gray-300'>
				<nav>
					<OrderTabs
						className='w-full'
						activeTab={activeTab}
						openIncoming={openIncoming}
						openActive={openActive}
						openCompleted={openCompleted}
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
			<main className='scrollable py-4 px-5 flex flex-col grow overflow-auto'>{orders[activeTab]}</main>
		</div>
	)
}
