import { MouseEventHandler } from 'react'
import cx from 'classnames'
import styles from './style.module.css'

interface Props {
	className?: string
	children?: React.ReactNode
	Icon?: React.ElementType
	disabled?: boolean
	clickHandler?: MouseEventHandler
}

export const BorderedButton = ({ children, disabled, className, Icon, clickHandler }: Props) => {
	return (
		<button
			disabled={disabled}
			onClick={clickHandler}
			className={cx(
				className,
				styles.borderedButton,
				'borderedButton flex justify-center items-center gap-2',
				'rounded-md border border-gray-300 bg-white',
				'text-sm font-semibold text-gray-600',
			)}>
			{Icon && <Icon className='w-5 h-5' />}
			{children}
		</button>
	)
}
