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
			<main className='scrollable py-4 px-5 flex flex-col grow overflow-auto relative'>
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
		</div>
	)
}
