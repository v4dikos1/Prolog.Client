import { useState } from 'react'
import cx from 'classnames'
import { BorderedCheckIcon } from '@/shared/ui/icons/BorderedCheckIcon'
import { CopyRightIcon } from '@/shared/ui/icons/CopyRightIcon'
import { copyIDtoClipboard } from '../utils'
import styles from './style.module.css'

interface Props {
	ID: string
	className?: string
}

export const OrderCopyIDButton = ({ className, ID }: Props) => {
	const [hintHidden, setHintHidden] = useState<'beforeAnimation' | 'proccess' | 'afterAnimation'>('beforeAnimation')

	const clickHandler = () => {
		copyIDtoClipboard(ID)
		setHintHidden('proccess')

		setTimeout(() => {
			setHintHidden('afterAnimation')
		}, 1500)

		setTimeout(() => {
			setHintHidden('beforeAnimation')
		}, 2000)
	}

	return (
		<div className='flex items-center relative'>
			<span
				className={cx('absolute top-1 h-5 w-5 flex justify-center items-center right-[2px] bg-white scale-0', {
					'animate-hint-hide': hintHidden === 'afterAnimation',
					'animate-hint': hintHidden === 'proccess',
				})}>
				<BorderedCheckIcon pathClassName='stroke-green-600' />
			</span>
			<span
				className={cx(
					'absolute -bottom-9 -right-2 py-1 px-2 bg-white rounded-lg shadow-[0_13px_42px_0_rgba(0,0,0,0.12)] text-xs font-medium text-green-600 opacity-0 pointer-events-none select-none',
					{ 'animate-tooltip-close': hintHidden === 'afterAnimation', 'animate-tooltip': hintHidden === 'proccess' },
				)}>
				<Corner />
				Скопировано
			</span>
			<button
				onClick={clickHandler}
				className={cx(className, styles['order-copy-id-button'], {
					'text-indigo-600': hintHidden === 'afterAnimation',
					'!text-green-600': hintHidden === 'proccess',
				})}>
				{ID}
				<CopyRightIcon
					className={cx({
						'animate-hint-hide': hintHidden === 'proccess',
						'animate-hint': hintHidden === 'afterAnimation',
					})}
				/>
			</button>
		</div>
	)
}

export const Corner = () => {
	return (
		<svg
			className='absolute top-[1px] right-[11px] -translate-y-full'
			width='18'
			height='10'
			viewBox='0 0 18 10'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M7.45209 0.891895C8.25229 -0.0861376 9.74771 -0.0861371 10.5479 0.891896L18 10H0L7.45209 0.891895Z'
				fill='white'
			/>
		</svg>
	)
}
