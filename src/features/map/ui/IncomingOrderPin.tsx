import { Pin, Props as PinProps } from '@/entities/map'

type Props = PinProps & {
	client: string
	time: string
}

export const IncomingOrderPin = ({ longitude, latitude, client, time }: Props) => {
	return (
		<Pin
			className='group-hover:bg-indigo-600'
			longitude={longitude}
			latitude={latitude}
			hint={
				<>
					<span className='block text-sm font-semibold'>{client}</span>
					<span className='block text-xs text-gray-500'>{time}</span>
				</>
			}
		/>
	)
}
