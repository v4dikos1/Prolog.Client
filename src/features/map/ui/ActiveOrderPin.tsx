import { Pin, Props as PinProps } from '@/entities/map'
import { getTime } from '@/shared/helpers/getTime'

type Props = PinProps & {
	color: string
	number: number
	client: string
	deliveryStart: string
	deliveryEnd: string
}

export const ActiveOrderPin = ({ longitude, latitude, color, number, client, deliveryStart, deliveryEnd }: Props) => {
	return (
		<Pin
			longitude={longitude}
			latitude={latitude}
			color={color}
			children={number}
			hint={
				<>
					<span className='block text-sm font-semibold'>{client}</span>
					<span className='block text-xs text-gray-500'>
						Окно доставки: {getTime(deliveryStart)} – {getTime(deliveryEnd)}
					</span>
				</>
			}
		/>
	)
}
