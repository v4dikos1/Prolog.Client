import { BorderedButton } from '@/shared/ui/BorderedButton'
import { ClockIcon } from '@/shared/ui/icons/ClockIcon'

interface Props {
	className?: string
}

export const ChangeDeliveryDateButton = ({ className }: Props) => {
	return (
		<BorderedButton className={className} Icon={ClockIcon}>
			Изменить дату доставки
		</BorderedButton>
	)
}
