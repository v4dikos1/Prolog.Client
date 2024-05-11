import { Pin, Props as PinProps } from './Pin'

type Props = PinProps & {
	color: string
	number: number
}

export const ActiveOrderPin = ({ longitude, latitude, color, number }: Props) => {
	return (
		<Pin longitude={longitude} latitude={latitude} color={color}>
			{number}
		</Pin>
	)
}
