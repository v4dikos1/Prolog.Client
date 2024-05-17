import { ReactNode } from 'react'
import cx from 'classnames'
import styles from './style.module.css'

interface Props {
	children: ReactNode
	className?: string
	maxHeight?: string
}

export const Table = ({ children, className, maxHeight }: Props) => {
	return (
		<div className={cx(className, 'w-full scrollable overflow-auto')} style={{ maxHeight }}>
			<table className={cx(styles.table, 'h-[1px]')}>{children}</table>
		</div>
	)
}
