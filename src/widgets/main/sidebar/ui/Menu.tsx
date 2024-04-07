import cx from 'classnames'
import { useAppSelector, isIncomingOrderSelected, isActiveOrderSelected, isCompletedOrderSelected } from '@/app/store'
import {
	OrderSearchInput,
	OrderCreateButton,
	OrderRunButton,
	DeleteIncomingOrdersButton,
	ChangeDeliveryDateButton,
} from '@/features/order'
import { StatusEnum } from '@/entities/order'

interface Props {
	className: string
	activeTab: StatusEnum
}

export const Menu = ({ className, activeTab }: Props) => {
	const incomingSelected = useAppSelector(isIncomingOrderSelected)
	const activeSelected = useAppSelector(isActiveOrderSelected)
	const completedSelected = useAppSelector(isCompletedOrderSelected)

	const config = {
		height: 40,
		buttonWidth: 52,
		padding: 8,
	}

	return (
		<div className={cx(className, `h-[${config.height}px]`, 'relative overflow-hidden')}>
			<menu
				className={cx('flex gap-2 w-full h-full absolute transition-all', {
					'opacity-1': activeTab === StatusEnum.incoming && incomingSelected,
					'opacity-0 -translate-y-full':
						(activeTab === StatusEnum.incoming && !incomingSelected) || activeTab !== StatusEnum.incoming,
				})}>
				<DeleteIncomingOrdersButton />
				<ChangeDeliveryDateButton className='w-full' />
			</menu>
			<menu
				className={cx('w-full h-full absolute transition-all', {
					'opacity-0 translate-y-full': activeTab === StatusEnum.incoming && incomingSelected,
					'opacity-1': !incomingSelected,
				})}>
				<li
					className={cx('z-10 absolute transition-all grow', {
						'w-[100%]': activeTab !== StatusEnum.incoming || incomingSelected,
						[`w-[calc(100%_-_${(config.buttonWidth + config.padding) * 2}px)]`]:
							activeTab === StatusEnum.incoming && !incomingSelected,
					})}>
					<OrderSearchInput className='transition-all' />
				</li>
				<li
					className={cx(`right-[${config.buttonWidth + config.padding}px] absolute transition-opacity `, {
						'opacity-0': activeTab !== StatusEnum.incoming && !incomingSelected,
					})}>
					<OrderCreateButton disabled={activeTab !== StatusEnum.incoming} />
				</li>
				<li
					className={cx('right-0 absolute transition-opacity', {
						'opacity-0': activeTab !== StatusEnum.incoming && !incomingSelected,
					})}>
					<OrderRunButton disabled={activeTab !== StatusEnum.incoming} />
				</li>
			</menu>
		</div>
	)
}
