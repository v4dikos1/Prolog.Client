import { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import { Input, Props as InputProps } from '@/shared/ui/Input'
import { ClockIcon } from '@/shared/ui/icons/ClockIcon'

export const TimeInput = ({ className, changeHandler, placeholder, value }: InputProps) => {
	const placeholderRef = useRef<HTMLSpanElement | null>(null)
	const [paddingLeft, setPaddingLeft] = useState(160)

	useEffect(() => {
		if (placeholderRef.current) {
			const rect = placeholderRef.current.getBoundingClientRect()
			setPaddingLeft(rect.width + 45)
		}
	}, [])

	return (
		<div className={cx(className, 'relative flex items-center')}>
			<Input
				type='time'
				className='w-full'
				style={{ paddingLeft: paddingLeft }}
				placeholder={placeholder}
				value={value}
				changeHandler={changeHandler}
			/>
			<ClockIcon
				className='absolute left-[13px] w-5 h-5 pointer-events-none'
				pathClassName='stroke-gray-400 stroke-2'
			/>
			<span ref={placeholderRef} className='block h-5 absolute left-[41px] text-sm pointer-events-none text-gray-500'>
				{placeholder}:
			</span>
		</div>
	)
}
