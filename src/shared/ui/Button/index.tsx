import cx from 'classnames'
import styles from './style.module.css'

interface Props {
	children?: React.ReactNode
	className?: string
	category?: 'primary' | 'secondary'
	Icon?: React.ElementType | null
	type?: 'button' | 'submit'
}

export const Button = ({ className, category = 'primary', children = null, Icon = null, type = 'button' }: Props) => {
	return (
		<button
			type={type}
			className={cx(className, styles.button, {
				[styles['button-iconed']]: Icon !== null,
				[styles['button-primary']]: category === 'primary',
				[styles['button-secondary']]: category === 'secondary',
			})}>
			{Icon && <Icon className='w-5 h-5' />}
			{children}
		</button>
	)
}
