import { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { ClientsModal } from '@/widgets/client'
import { StoragesModal } from '@/widgets/storage'
import { TooltipCorner } from './TooltipCorner'
import { TooltipItem } from './TooltipItem'

interface Props {
	className?: string
	open: boolean
	close: () => void
	id: string
}

export const Tooltip = ({ className, open, id, close }: Props) => {
	const [animationState, setAnimationState] = useState<'before' | 'process' | 'after'>('before')
	const tooltipRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const documentMouseDownHandler: EventListener = (event) => {
			const target = event.target as HTMLElement
			const selector = '*:has(> #' + id + ')'

			if (!target.closest(selector)) {
				close()
			}
		}

		if (open) {
			setAnimationState('process')
			setTimeout(() => {
				setAnimationState('after')
			}, 200)

			document.addEventListener('click', documentMouseDownHandler)
		}
		return () => {
			document.removeEventListener('click', documentMouseDownHandler)
		}
	}, [open, id, close])

	return (
		<div className={className} ref={tooltipRef} id={id}>
			<div
				className={cx('w-[140px] rounded-lg absolute right-0', {
					'invisible': animationState === 'before',
					'animate-tooltip-close': !open,
					'animate-tooltip': open,
				})}>
				<ul className='w-full p-4 rounded-lg flex flex-col text-sm font-bold text-gray-900 bg-white'>
					<TooltipItem additionalEffectOnClick={close} Modal={ClientsModal}>
						Водители
					</TooltipItem>
					<TooltipItem additionalEffectOnClick={close} Modal={ClientsModal}>
						Транспорт
					</TooltipItem>
					<TooltipItem additionalEffectOnClick={close} Modal={ClientsModal}>
						Клиенты
					</TooltipItem>
					<TooltipItem additionalEffectOnClick={close} Modal={ClientsModal}>
						Товары
					</TooltipItem>
					<TooltipItem additionalEffectOnClick={close} Modal={StoragesModal}>
						Склады
					</TooltipItem>
				</ul>
				<TooltipCorner />
			</div>
		</div>
	)
}
