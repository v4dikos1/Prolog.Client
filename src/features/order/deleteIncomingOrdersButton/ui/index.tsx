import { ButtonWithTrashIcon } from '@/shared/ui/ButtonWithTrashIcon'

interface Props {
	disabled: boolean
	className?: string
}

export const DeleteIncomingOrdersButton = ({ disabled, className }: Props) => {
	return <ButtonWithTrashIcon disabled={disabled} className={className} />
}
