import cx from 'classnames'
import { Marker } from 'react-map-gl'

export interface Props {
	latitude: number
	longitude: number
	children?: React.ReactNode
	className?: string
	color?: string
}

export const Pin = ({ latitude, longitude, children, className, color }: Props) => {
	return (
		<Marker longitude={longitude} latitude={latitude}>
			<div
				style={{ background: color }}
				className={cx(
					className,
					'w-9 h-9 rounded-full border-2 shadow-lg border-white bg-gray-500 text-sm font-semibold text-white flex justify-center items-center',
				)}>
				{children}
			</div>
		</Marker>
	)
}
