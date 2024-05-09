import cx from 'classnames'
import { Input, Props as InputProps } from '@/shared/ui/Input'

interface Props extends InputProps {
	pathClassName?: string
	focusHandler?: () => void
	Icon: React.ElementType
	disabled?: boolean
	readonly?: boolean
}

export const InputWithIcon = ({
	id,
	readonly = false,
	className,
	focusHandler,
	pathClassName,
	disabled = false,
	changeHandler,
	placeholder,
	type,
	value,
	required,
	Icon,
	name,
}: Props) => {
	return (
		<div className={cx(className, 'relative flex items-center')}>
			<Input
				id={id}
				readonly={readonly}
				disabled={disabled}
				type={type}
				className='pl-[41px] w-full'
				placeholder={placeholder}
				value={value}
				changeHandler={changeHandler}
				focusHandler={focusHandler}
				required={required}
				name={name}
			/>
			<Icon className={cx('absolute left-[13px] w-5 h-5 pointer-events-none')} pathClassName={pathClassName} />
		</div>
	)
}
