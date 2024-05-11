import { MiniCrossIcon } from '@/shared/ui/icons/MiniCrossIcon'
import { MiniCheckIcon } from '@/shared/ui/icons/MiniCheckIcon'
import { Pin, Props as PinProps } from './Pin'

type Props = PinProps & {
	completed: boolean
}

export const CompletedOrderPin = ({ longitude, latitude, completed }: Props) => {
	return (
		<Pin className={completed ? 'bg-green-600' : 'bg-red-600'} longitude={longitude} latitude={latitude}>
			{completed ? <MiniCheckIcon /> : <MiniCrossIcon />}
		</Pin>
	)
}
