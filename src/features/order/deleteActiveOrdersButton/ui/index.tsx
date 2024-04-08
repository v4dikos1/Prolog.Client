import { ButtonWithTrashIcon } from '@/shared/ui/ButtonWithTrashIcon'

interface Props {
	disabled: boolean
}

export const DeleteActiveOrdersButton = ({ disabled }: Props) => {
	return <ButtonWithTrashIcon disabled={disabled} />
}
