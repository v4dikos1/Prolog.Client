import React from 'react'
import cx from 'classnames'
import { CheckIcon } from '@/shared/ui/icons/CheckIcon'
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
				<CheckIcon pathClassName={styles['checkbox-icon']} />
			</div>
			{children && <span className='ml-3'>{children}</span>}
		</label>
	)
}
