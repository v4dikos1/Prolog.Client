import { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import { Input, Props as InputProps } from '@/shared/ui/Input'
import { ClockIcon } from '@/shared/ui/icons/ClockIcon'

export const TimeInput = ({ required, className, changeHandler, placeholder, value, name }: InputProps) => {
	const MAX_PADDING_LEFT = 160
	const ICON_WIDTH_AND_GAP = 45

	const placeholderRef = useRef<HTMLSpanElement | null>(null)
	const [paddingLeft, setPaddingLeft] = useState(MAX_PADDING_LEFT)

	useEffect(() => {
		if (placeholderRef.current) {
			const rect = placeholderRef.current.getBoundingClientRect()
			setPaddingLeft(rect.width + ICON_WIDTH_AND_GAP)
		}
	}, [])

	return (
		<div className={cx(className, 'relative flex items-center')}>
			<Input
				type='time'
				className='w-full'
				style={{ paddingLeft: paddingLeft }}
				changeHandler={changeHandler}
				value={value}
				placeholder={placeholder}
				required={required}
				name={name}
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
