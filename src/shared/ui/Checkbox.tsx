import cx from 'classnames'
import { CheckIcon } from './icons/CheckIcon'
import React from 'react'

interface Props {
	checked?: boolean
	className?: string
	changeHandler?: React.ChangeEventHandler<HTMLInputElement>
}

export const Checkbox = ({ className, checked = false, changeHandler }: Props) => {
	return (
		<label
			className={cx(
				className,
				'checkbox cursor-pointer w-4 h-4 flex justify-center items-center rounded-[4px]',
				checked ? 'bg-indigo-600' : 'bg-white border border-gray-300',
			)}>
			<input onChange={changeHandler} type='checkbox' checked={checked} className='appearance-none' />
			<CheckIcon />
		</label>
	)
}
