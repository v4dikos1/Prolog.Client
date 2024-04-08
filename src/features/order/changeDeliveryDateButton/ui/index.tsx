import { BorderedButton } from '@/shared/ui/BorderedButton'
import { ClockIcon } from '@/shared/ui/icons/ClockIcon'

interface Props {
	className?: string
	disabled: boolean
}

export const ChangeDeliveryDateButton = ({ className, disabled }: Props) => {
	return (
		<BorderedButton disabled={disabled} className={className} Icon={ClockIcon}>
			Изменить дату доставки
		</BorderedButton>
	)
}
