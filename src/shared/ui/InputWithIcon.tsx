import cx from 'classnames'
import { Input, Props as InputProps } from '@/shared/ui/Input'

interface Props extends InputProps {
	Icon: React.ElementType
	disabled: boolean
}

export const InputWithIcon = ({ className, disabled, changeHandler, placeholder, value, Icon }: Props) => {
	return (
		<div className={cx(className, 'relative flex items-center')}>
			<Input
				disabled={disabled}
				className='pl-[41px] w-full'
				placeholder={placeholder}
				value={value}
				changeHandler={changeHandler}
			/>
			<Icon className='absolute left-[13px] stroke-gray-500 w-5 h-5' />
		</div>
	)
}
