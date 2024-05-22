import { ReactNode } from 'react'
import { Marker, useMap } from 'react-map-gl'
import cx from 'classnames'
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
	const { map } = useMap()

	const clickHandler = () => {
		if (!map) return

		map.flyTo({ center: [longitude, latitude], zoom: 13 })
	}

	return (
		<Marker longitude={longitude} latitude={latitude} onClick={clickHandler}>
			<div className={cx(styles.pin, 'group')}>
				<div style={{ background: color }} className={cx(className, styles.circle)}>
					{children}
				</div>
				{hint && <div className={styles.hint}>{hint}</div>}
			</div>
		</Marker>
	)
}
