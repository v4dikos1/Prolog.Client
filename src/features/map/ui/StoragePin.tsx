import { StoragePin as StoragePinProps } from '@/entities/map'
import { Pin } from '@/entities/map/ui/Pin'
import { StorageIcon } from '@/shared/ui/icons/StorageIcon'

export const StoragePin = ({ coordinates, storageName }: StoragePinProps) => {
	return (
		<Pin
			className='bg-gray-900'
			longitude={coordinates.longitude}
			latitude={coordinates.latitude}
			hint={<span className='text-sm font-semibold'>{storageName}</span>}
			children={<StorageIcon />}
		/>
	)
}
