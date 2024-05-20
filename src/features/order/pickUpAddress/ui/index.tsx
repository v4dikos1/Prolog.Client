import cx from 'classnames'
import { ArrowTopIcon } from '@/shared/ui/icons/ArrowTopIcon'
import styles from './style.module.css'
import { useMap } from 'react-map-gl'

interface Props {
	className?: string
	address: string
	longitude: number
	latitude: number
}

export const OrderPickUpAddress = ({ className, address, longitude, latitude }: Props) => {
	const { map } = useMap()

	const clickHandler = () => {
		if (!map) return

		map.flyTo({
			center: [longitude, latitude],
			zoom: 13,
		})
	}

	return (
		<button onClick={clickHandler} className={cx(className, styles['order-pick-up-address'])}>
			{address}
			<ArrowTopIcon />
		</button>
	)
}
