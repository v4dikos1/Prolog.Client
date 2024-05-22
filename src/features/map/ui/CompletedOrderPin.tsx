import { Pin, Props as PinProps } from '@/entities/map'
import { MiniCrossIcon } from '@/shared/ui/icons/MiniCrossIcon'
import { CheckIcon } from '@/shared/ui/icons/CheckIcon'
import { getTime } from '@/shared/helpers/getTime'

type Props = PinProps & {
	completed: boolean
	client: string
	end: string
}

export const CompletedOrderPin = ({ longitude, latitude, completed, client, end }: Props) => {
	return (
		<Pin
			className={completed ? 'bg-green-600' : 'bg-red-600'}
			longitude={longitude}
			latitude={latitude}
			hint={
				<>
					<span className='block text-sm font-semibold'>{client}</span>
					{completed ? (
						<span className='text-green-600'>Доставлен в {getTime(end)}</span>
					) : (
						<span className='text-orange-600'>Отменён в {getTime(end)}</span>
					)}
				</>
			}
			children={completed ? <CheckIcon /> : <MiniCrossIcon />}
		/>
	)
}
