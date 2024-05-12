import React from 'react'
import cx from 'classnames'
import { MiniCheckIcon } from '@/shared/ui/icons/MiniCheckIcon'
import styles from './style.module.css'

interface Props {
	className?: string
	checked?: boolean
	changeHandler?: React.ChangeEventHandler<HTMLInputElement>
	children?: React.ReactNode
}

export const Checkbox: React.FC<Props> = ({ children, className, checked = false, changeHandler }: Props) => {
	return (
		<label className={cx(className, styles.checkbox, { [styles['checkbox-checked']]: checked })}>
			<input onChange={changeHandler} type='checkbox' checked={checked} />
			<div>
				<MiniCheckIcon pathClassName={styles['checkbox-icon']} />
			</div>
			{children && <span className='ml-3'>{children}</span>}
		</label>
	)
}
