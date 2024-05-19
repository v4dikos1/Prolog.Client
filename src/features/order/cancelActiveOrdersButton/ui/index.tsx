import { getlActiveSelectedOrderIDs, useCancelActiveOrdersMutation } from '@/entities/order'
import { useAppSelector } from '@/shared/store'
import { BorderedButton } from '@/shared/ui/BorderedButton'

interface Props {
	className?: string
	disabled?: boolean
}

export const CancelActiveOrdersButton = ({ className, disabled }: Props) => {
	const [cancelActiveOrders, { isLoading }] = useCancelActiveOrdersMutation()
	const ids = useAppSelector(getlActiveSelectedOrderIDs)

	const clickHandler = () => {
		cancelActiveOrders(ids)
	}

	return (
		<BorderedButton isLoading={isLoading} clickHandler={clickHandler} disabled={disabled} className={className}>
			Отменить
		</BorderedButton>
	)
}
