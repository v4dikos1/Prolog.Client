import { ButtonWithTrashIcon } from '@/shared/ui/ButtonWithTrashIcon'

interface Props {
	disabled: boolean
}

export const DeleteCompletedOrdersButton = ({ disabled }: Props) => {
	return <ButtonWithTrashIcon disabled={disabled} />
}
