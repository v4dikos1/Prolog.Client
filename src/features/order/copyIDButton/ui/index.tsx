import { useState } from 'react'
import cx from 'classnames'
import { CopyRightIcon } from '@/shared/ui/icons/CopyRightIcon'
import { CheckIcon } from '@/shared/ui/icons/CheckIcon'
import { copyIDtoClipboard } from '../utils'
import styles from './style.module.css'

interface Props {
	ID: string
	className?: string
}

export const OrderCopyIDButton = ({ className, ID }: Props) => {
	const [hintHidden, setHintHidden] = useState(0)

	const clickHandler = () => {
		copyIDtoClipboard(ID)
		setHintHidden(2)

		setTimeout(() => {
			setHintHidden(1)
		}, 1500)

		setTimeout(() => {
			setHintHidden(0)
		}, 2000)
	}

	return (
		<div className='flex items-center relative'>
			<span
				className={cx('absolute top-1 h-5 w-5 flex justify-center items-center right-[2px] bg-white scale-0', {
					'animate-hint-hide': hintHidden === 1,
					'animate-hint': hintHidden === 2,
				})}>
				<CheckIcon className='w-3 h-3' pathClassName='fill-indigo-600' />
			</span>
			<button onClick={clickHandler} className={cx(className, styles['order-copy-id-button'])}>
				{ID}
				<CopyRightIcon
					className={cx({
						'animate-hint-hide': hintHidden === 2,
						'animate-hint': hintHidden === 1,
					})}
				/>
			</button>
		</div>
	)
}
