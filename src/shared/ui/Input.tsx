import cx from 'classnames'
import React from 'react'

export interface Props {
	className?: string
	style?: React.CSSProperties
	placeholder?: string
	value?: string
	changeHandler?: React.ChangeEventHandler<HTMLInputElement>
	blurHandler?: React.FocusEventHandler<HTMLInputElement>
	focusHandler?: React.FocusEventHandler<HTMLInputElement>
	name?: string
	type?: React.HTMLInputTypeAttribute
	autocomplete?: React.HTMLInputAutoCompleteAttribute
	disabled?: boolean
	readonly?: boolean
	id?: string
}

export const Input = ({
	readonly = false,
	style,
	className,
	disabled,
	placeholder,
	value,
	changeHandler,
	focusHandler,
	blurHandler,
	name,
	type = 'text',
	autocomplete,
}: Props) => {
	return (
		<input
			readOnly={readonly}
			placeholder={placeholder}
			onChange={changeHandler}
			onFocus={focusHandler}
			onBlur={blurHandler}
			value={value}
			name={name}
			type={type}
			autoComplete={autocomplete}
			disabled={disabled}
			className={cx(
				className,
				'text-sm rounded-md py-[9px] px-[13px] bg-white border border-gray-300 text-gray-800 focus:border-gray-500 hover:border-gray-500 outline-none placeholder:text-gray-500',
			)}
			style={style}
		/>
	)
}
