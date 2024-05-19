import { useDeleteOrdersMutation, getlCompletedSelectedOrderIDs } from '@/entities/order'
import { useAppSelector } from '@/shared/store'
import { ButtonWithTrashIcon } from '@/shared/ui/ButtonWithTrashIcon'

interface Props {
	disabled: boolean
	className?: string
}

export const DeleteCompletedOrdersButton = ({ disabled, className }: Props) => {
	const [deleteOrders, { isLoading }] = useDeleteOrdersMutation()
	const ids = useAppSelector(getlCompletedSelectedOrderIDs)

	const clickHandler = () => {
		deleteOrders(ids)
	}

	return (
		<ButtonWithTrashIcon isLoading={isLoading} clickHandler={clickHandler} disabled={disabled} className={className} />
	)
}
