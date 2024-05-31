import { useState, useEffect } from 'react'
import cx from 'classnames'

import { OrderTabs } from '@/features/order'
import {
	StatusEnum,
	useGetActiveOrdersQuery,
	useGetCompletedOrdersQuery,
	useGetIncomingOrdersQuery,
	getFilteredIncomingOrders,
	getFilteredActiveOrders,
	getFilteredCompletedOrders,
} from '@/entities/order'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import { useAppSelector } from '@/shared/store'
import { useUpdateSearchParams } from '@/shared/hooks/useSearchParams'
import { Main } from './Main'
import { Menu } from './Menu'

interface Props {
	className?: string
}

export const Sidebar = ({ className }: Props) => {
	const [searchParams, updateParams] = useUpdateSearchParams('tab', String(StatusEnum.incoming))
	const [activeTab, setActiveTab] = useState(StatusEnum.incoming)
	const searchStr = (searchParams.get('q') || '').toLowerCase()

	useEffect(() => {
		const tabFromURL = Number(searchParams.get('tab'))
		if (Object.values(StatusEnum).includes(tabFromURL)) {
			setActiveTab(tabFromURL)
		} else {
			updateParams('tab', String(StatusEnum.incoming))
		}
	}, [searchParams, updateParams])

	const openIncoming = () => updateParams('tab', String(StatusEnum.incoming))
	const openActive = () => updateParams('tab', String(StatusEnum.active))
	const openCompleted = () => updateParams('tab', String(StatusEnum.completed))

	const { isLoading: isIncomingOrdersLoading, isFetching: isIncomingOrdersFetching } = useGetIncomingOrdersQuery()
	const { isLoading: isActiveOrdersLoading, isFetching: isActiveOrdersFetching } = useGetActiveOrdersQuery()
	const { isLoading: isCompletedOrdersLoading, isFetching: isCompletedOrdersFetching } = useGetCompletedOrdersQuery()

	const incomingOrders = useAppSelector((state) => getFilteredIncomingOrders(state, searchStr))
	const activeOrders = useAppSelector((state) => getFilteredActiveOrders(state, searchStr))
	const completedOrders = useAppSelector((state) => getFilteredCompletedOrders(state, searchStr))

	if (isIncomingOrdersLoading || isActiveOrdersLoading || isCompletedOrdersLoading) {
		return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-700' />
	}

	return (
		<div id='sidebar' className={cx(className, 'overflow-hidden flex flex-col')}>
			<header className='pt-4 pb-2 px-5 bg-gray-100 w-full border-b border-gray-300'>
				<nav>
					<OrderTabs
						className='w-full'
						activeTab={activeTab}
						openIncoming={openIncoming}
						openActive={openActive}
						openCompleted={openCompleted}
					/>
				</nav>
				<Menu className='mt-1' activeTab={activeTab} />
			</header>
			<Main
				className='grow relative'
				activeTab={activeTab}
				incomingOrders={incomingOrders}
				activeOrders={activeOrders}
				completedOrders={completedOrders}
				isIncomingOrdersFetching={isIncomingOrdersFetching}
				isActiveOrdersFetching={isActiveOrdersFetching}
				isCompletedOrdersFetching={isCompletedOrdersFetching}
			/>
		</div>
	)
}
