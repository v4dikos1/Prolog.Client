import { BorderedButton } from '@/shared/ui/BorderedButton'
import { TrashIcon } from '@/shared/ui/icons/TrashIcon'

export const DeleteIncomingOrdersButton = () => {
	return (
		<BorderedButton className='group p-[9px]'>
			<TrashIcon pathClassName='!stroke-red-600 stroke-red-600' />
		</BorderedButton>
	)
}
