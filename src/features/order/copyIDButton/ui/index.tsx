import { useState } from 'react'
import cx from 'classnames'
import { CopyRightIcon } from '@/shared/ui/icons/CopyRightIcon'
import { MiniCheckIcon } from '@/shared/ui/icons/MiniCheckIcon'
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
					'animate-hint-hide': hintHidden === 'beforeAnimation',
					'animate-hint': hintHidden === 'proccess',
				})}>
				<MiniCheckIcon className='w-3 h-3' pathClassName='fill-indigo-600' />
			</span>
			<button onClick={clickHandler} className={cx(className, styles['order-copy-id-button'])}>
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
