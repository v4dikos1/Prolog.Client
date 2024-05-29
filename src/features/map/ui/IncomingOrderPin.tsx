import { IncomingOrderPin as IncomingOrderPinProps, Pin } from '@/entities/map'
import { getTime } from '@/shared/helpers/getTime'

export const IncomingOrderPin = ({ clientName, coordinates, deliveryStart, deliveryEnd }: IncomingOrderPinProps) => {
	return (
		<Pin
			className='group-hover:bg-indigo-600'
			longitude={coordinates.longitude}
			latitude={coordinates.latitude}
			hint={
				<>
					<span className='block text-sm font-semibold'>{clientName}</span>
					<span className='block text-xs text-gray-500'>
						{getTime(deliveryStart)} - {getTime(deliveryEnd)}
					</span>
				</>
			}
		/>
	)
}
