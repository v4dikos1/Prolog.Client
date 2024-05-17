import { MouseEventHandler } from 'react'
import cx from 'classnames'
import styles from './style.module.css'
import { SpinnerIcon } from '../icons/SpinnerIcon'

interface Props {
	className?: string
	children?: React.ReactNode
	Icon?: React.ElementType
	disabled?: boolean
	clickHandler?: MouseEventHandler
	isLoading?: boolean
}

export const BorderedButton = ({ children, disabled, className, Icon, clickHandler, isLoading }: Props) => {
	return (
		<button
			disabled={disabled || isLoading}
			onClick={clickHandler}
			className={cx(
				className,
				styles.borderedButton,
				'group borderedButton flex justify-center items-center gap-2',
				'rounded-md border border-gray-300 bg-white',
				'text-sm font-semibold text-gray-600',
			)}>
			{isLoading ? (
				<SpinnerIcon pathClassName='fill-indigo-700' />
			) : (
				<>
					{Icon && <Icon className='w-5 h-5' pathClassName='stroke-gray-600 group-hover:stroke-gray-700' />}
					{children}
				</>
			)}
		</button>
	)
}
