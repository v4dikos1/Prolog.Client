import { MiniCrossIcon } from '@/shared/ui/icons/MiniCrossIcon'
import { CheckIcon } from '@/shared/ui/icons/CheckIcon'
import { Pin, Props as PinProps } from './Pin'

type Props = PinProps & {
	completed: boolean
}

export const CompletedOrderPin = ({ longitude, latitude, completed }: Props) => {
	return (
		<Pin className={completed ? 'bg-green-600' : 'bg-red-600'} longitude={longitude} latitude={latitude}>
			{completed ? <CheckIcon /> : <MiniCrossIcon />}
		</Pin>
	)
}
