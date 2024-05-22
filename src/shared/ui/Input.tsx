import cx from 'classnames'
import React from 'react'

export interface Props {
	className?: string
	id?: string
	style?: React.CSSProperties
	value?: string
	placeholder?: string
	changeHandler?: React.ChangeEventHandler<HTMLInputElement>
	clickHandler?: React.MouseEventHandler<HTMLInputElement>
	blurHandler?: React.FocusEventHandler<HTMLInputElement>
	focusHandler?: React.FocusEventHandler<HTMLInputElement>
	name?: string
	type?: React.HTMLInputTypeAttribute
	disabled?: boolean
	readonly?: boolean
	required?: boolean
	autocomplete?: React.HTMLInputAutoCompleteAttribute
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
	clickHandler,
	name,
	type = 'text',
	autocomplete,
	required = false,
}: Props) => {
	return (
		<input
			readOnly={readonly}
			placeholder={placeholder}
			onClick={clickHandler}
			onChange={changeHandler}
			onFocus={focusHandler}
			onBlur={blurHandler}
			value={value}
			name={name}
			type={type}
			autoComplete={autocomplete}
			disabled={disabled}
			required={required}
			className={cx(
				className,
				'text-sm rounded-md py-[9px] px-[13px] bg-white border border-gray-300 text-gray-800 focus:border-gray-500 hover:border-gray-500 outline-none placeholder:text-gray-500',
			)}
			style={style}
		/>
	)
}
