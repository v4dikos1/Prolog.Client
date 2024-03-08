import cx from 'classnames'
import styles from './style.module.css'

interface Props {
	className?: string
	children?: React.ReactNode
	Icon?: React.ElementType
}

export const BorderedButton = ({ children, className, Icon }: Props) => {
	return (
		<button
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
