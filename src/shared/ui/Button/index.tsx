import cx from 'classnames'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import styles from './style.module.css'

interface Props {
	loading?: boolean
	category?: 'primary' | 'secondary'
	type?: 'button' | 'submit'
	children?: React.ReactNode
	Icon?: React.ElementType | null
	className?: string
	disabled?: boolean
}

export const Button = ({
	loading = false,
	category = 'primary',
	type = 'button',
	children = null,
	Icon = null,
	className,
	disabled,
}: Props) => {
	return (
		<button
			type={type}
			disabled={loading || disabled}
			className={cx(className, styles.button, {
				[styles['button-iconed']]: Icon !== null,
				[styles['button-primary']]: category === 'primary',
				[styles['button-secondary']]: category === 'secondary',
				[styles['button-disabled']]: loading,
			})}>
			{Icon && <Icon className='w-5 h-5' />}
			{loading ? <SpinnerIcon /> : children}
		</button>
	)
}
