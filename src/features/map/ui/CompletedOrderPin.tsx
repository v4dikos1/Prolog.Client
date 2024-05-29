import { CompletedOrderPin as CompletedOrderPinProps, Pin } from '@/entities/map'
import { MiniCrossIcon } from '@/shared/ui/icons/MiniCrossIcon'
import { CheckIcon } from '@/shared/ui/icons/CheckIcon'
import { getTime } from '@/shared/helpers/getTime'

export const CompletedOrderPin = ({ completed, coordinates, clientName, endTime }: CompletedOrderPinProps) => {
	return (
		<Pin
			className={completed ? 'bg-green-600' : 'bg-red-600'}
			longitude={coordinates.longitude}
			latitude={coordinates.latitude}
			hint={
				<>
					<span className='block text-sm font-semibold'>{clientName}</span>
					{completed ? (
						<span className='text-green-600'>Доставлен в {getTime(endTime)}</span>
					) : (
						<span className='text-orange-600'>Отменён в {getTime(endTime)}</span>
					)}
				</>
			}
			children={completed ? <CheckIcon /> : <MiniCrossIcon />}
		/>
	)
}
