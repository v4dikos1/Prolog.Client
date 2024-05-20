import { Pin, Props as PinProps } from './Pin'
import { StorageIcon } from '@/shared/ui/icons/StorageIcon'

type Props = PinProps & {
	address: string
}

export const StoragePin = ({ longitude, latitude, address }: Props) => {
	return (
		<Pin
			className='bg-gray-900'
			longitude={longitude}
			latitude={latitude}
			hint={<span className='text-sm font-semibold'>{address}</span>}>
			<StorageIcon />
		</Pin>
	)
}
