import { Pin, Props } from './Pin'
import { StorageIcon } from '@/shared/ui/icons/StorageIcon'

export const StoragePin = ({ longitude, latitude }: Props) => {
	return (
		<Pin className='bg-gray-900' longitude={longitude} latitude={latitude}>
			<StorageIcon />
		</Pin>
	)
}
