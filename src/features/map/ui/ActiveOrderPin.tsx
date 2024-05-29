import { Pin, ActiveOrderPin as ActiveOrderPinProps } from '@/entities/map'
import { getTime } from '@/shared/helpers/getTime'

export const ActiveOrderPin = ({
	coordinates,
	clientName,
	color,
	index,
	deliveryStart,
	deliveryEnd,
}: ActiveOrderPinProps) => {
	return (
		<Pin
			longitude={coordinates.longitude}
			latitude={coordinates.latitude}
			color={color}
			children={index}
			hint={
				<>
					<span className='block text-sm font-semibold'>{clientName}</span>
					<span className='block text-xs text-gray-500'>
						Окно доставки: {getTime(deliveryStart)} – {getTime(deliveryEnd)}
					</span>
				</>
			}
		/>
	)
}
