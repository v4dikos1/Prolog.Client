import { ButtonWithTrashIcon } from '@/shared/ui/ButtonWithTrashIcon'

interface Props {
	disabled: boolean
}

export const DeleteIncomingOrdersButton = ({ disabled }: Props) => {
	return <ButtonWithTrashIcon disabled={disabled} />
}
