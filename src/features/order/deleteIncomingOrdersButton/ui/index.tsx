import { useDeleteOrdersMutation, getlIncomingSelectedOrderIDs } from '@/entities/order'
import { useAppSelector } from '@/shared/store'
import { ButtonWithTrashIcon } from '@/shared/ui/ButtonWithTrashIcon'

interface Props {
	disabled: boolean
	className?: string
}

export const DeleteIncomingOrdersButton = ({ disabled, className }: Props) => {
	const [deleteOrders, { isLoading }] = useDeleteOrdersMutation()
	const ids = useAppSelector(getlIncomingSelectedOrderIDs)

	const clickHandler = () => {
		deleteOrders(ids)
	}

	return (
		<ButtonWithTrashIcon isLoading={isLoading} clickHandler={clickHandler} disabled={disabled} className={className} />
	)
}
