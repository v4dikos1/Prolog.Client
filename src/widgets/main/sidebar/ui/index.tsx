import { useSearchParams } from 'react-router-dom'
import cx from 'classnames'

import { isOrdersLoading, useAppSelector } from '@/app/store'
import { OrderTabs } from '@/features/order'
import { StatusEnum } from '@/entities/order'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import { Main } from './Main'
import { Menu } from './Menu'

interface Props {
	className?: string
}

export const Sidebar = ({ className }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const tabFromURL = Number(searchParams.get('tab'))

	let activeTab = StatusEnum.incoming

	if (Object.values(StatusEnum).includes(tabFromURL)) {
		activeTab = tabFromURL
	} else {
		setSearchParams({ tab: String(StatusEnum.incoming) })
	}

	const openIncoming = () => setSearchParams({ tab: String(StatusEnum.incoming) })
	const openActive = () => setSearchParams({ tab: String(StatusEnum.active) })
	const openCompleted = () => setSearchParams({ tab: String(StatusEnum.completed) })

	const isLoading = useAppSelector(isOrdersLoading)
	if (isLoading) return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-700' />

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
				<Menu className='mt-3' activeTab={activeTab} />
			</header>
			<Main className='grow relative' activeTab={activeTab} />
		</div>
	)
}
