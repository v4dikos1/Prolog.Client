import { BorderedButton } from '@/shared/ui/BorderedButton'
import { TrashIcon } from '@/shared/ui/icons/TrashIcon'

interface Props {
	disabled: boolean
}

export const ButtonWithTrashIcon = ({ disabled }: Props) => {
	return (
		<BorderedButton disabled={disabled} className='p-[9px]'>
			<TrashIcon pathClassName='!stroke-red-600' />
		</BorderedButton>
	)
}
