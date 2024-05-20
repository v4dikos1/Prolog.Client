import cx from 'classnames'
import { useMap } from 'react-map-gl'

interface Props {
	className?: string
	address: string
	latitude: number
	longitude: number
}

export const OrderDeliveryAddress = ({ className, address, latitude, longitude }: Props) => {
	const { map } = useMap()

	const clickHandler = () => {
		if (!map) return

		map.flyTo({
			center: [longitude, latitude],
			zoom: 13,
		})
	}

	return (
		<button
			onClick={clickHandler}
			className={cx(
				className,
				'text-base font-semibold leading-6 text-gray-900 flex gap-2 items-center hover:text-indigo-600',
			)}>
			{address}
		</button>
	)
}
