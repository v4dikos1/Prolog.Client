import { Pin, Props } from './Pin'

export const IncomingOrderPin = ({ longitude, latitude }: Props) => {
	return <Pin longitude={longitude} latitude={latitude} />
}
