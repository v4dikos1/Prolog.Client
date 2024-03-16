import cx from 'classnames'
import { ArrowTopIcon } from '@/shared/ui/icons/ArrowTopIcon'
import styles from './style.module.css'

interface Props {
	className?: string
	address: string
}

export const OrderPickUpAddress = ({ className, address }: Props) => {
	return (
		<button className={cx(className, styles['order-pick-up-address'])}>
			{address}
			<ArrowTopIcon />
		</button>
	)
}
