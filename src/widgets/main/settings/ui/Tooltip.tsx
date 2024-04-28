import { useEffect, useRef, useState } from 'react'
import cx from 'classnames'

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
					<Item>Водители</Item>
					<Item>Транспорт</Item>
					<Item>Клиенты</Item>
					<Item>Товары</Item>
					<Item>Склады</Item>
				</ul>
				<TooltipCorner />
			</div>
		</div>
	)
}

const Item = ({ children }: { children: React.ReactNode }) => {
	return (
		<li>
			<button className='w-full pl-4 py-3 text-left hover:text-indigo-600 outline-none focus-visible:shadow-[0_0_0_1px_rgb(0,0,0)]'>
				{children}
			</button>
		</li>
	)
}

const TooltipCorner = () => {
	return (
		<svg
			className='absolute top-[1px] right-3 -translate-y-full'
			width='22'
			height='11'
			viewBox='0 0 22 11'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M9.55472 1.01098C10.3423 0.187573 11.6577 0.187572 12.4453 1.01098L22 11H0L9.55472 1.01098Z'
				fill='white'
			/>
		</svg>
	)
}
