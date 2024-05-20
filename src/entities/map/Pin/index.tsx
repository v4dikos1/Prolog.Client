import cx from 'classnames'
import { ReactNode } from 'react'
import { Marker } from 'react-map-gl'
import styles from './style.module.css'

export interface Props {
	latitude: number
	longitude: number
	children?: React.ReactNode
	className?: string
	color?: string
	hint?: ReactNode
}

export const Pin = ({ latitude, longitude, children, className, color, hint }: Props) => {
	return (
		<Marker longitude={longitude} latitude={latitude}>
			<div className={cx(styles.pin, 'group')}>
				<div style={{ background: color }} className={cx(className, styles.circle)}>
					{children}
				</div>
				{hint && <div className={styles.hint}>{hint}</div>}
			</div>
		</Marker>
	)
}
