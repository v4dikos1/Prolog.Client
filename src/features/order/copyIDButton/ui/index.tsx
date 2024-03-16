import cx from 'classnames'
import { CopyRightIcon } from '@/shared/ui/icons/CopyRightIcon'
import { copyIDtoClipboard } from '../utils'
import styles from './style.module.css'

interface Props {
	id: string
	className?: string
}

export const OrderCopyIDButton = ({ className, id }: Props) => {
	const clickHandler = () => {
		copyIDtoClipboard(id)
	}

	return (
		<button onClick={clickHandler} className={cx(className, styles['order-copy-id-button'])}>
			{id}
			<CopyRightIcon />
		</button>
	)
}
