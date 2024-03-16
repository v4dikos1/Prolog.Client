import cx from 'classnames'

export interface Props {
	className?: string
	placeholder?: string
	value?: string
	changeHandler?: React.ChangeEventHandler<HTMLInputElement>
	name?: string
	type?: React.HTMLInputTypeAttribute
	autocomplete?: React.HTMLInputAutoCompleteAttribute
}

export const Input = ({ className, placeholder, value, changeHandler, name, type = 'text', autocomplete }: Props) => {
	return (
		<input
			placeholder={placeholder}
			onChange={changeHandler}
			value={value}
			name={name}
			type={type}
			autoComplete={autocomplete}
			className={cx(
				className,
				'input text-sm rounded-md py-[9px] px-[13px] bg-white border border-gray-300 text-gray-800 focus:border-gray-500 hover:border-gray-500 outline-none placeholder:text-gray-500',
			)}
		/>
	)
}
