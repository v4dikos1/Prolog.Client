import { BorderedButton } from '@/shared/ui/BorderedButton'

interface Props {
	className?: string
	disabled?: boolean
}

export const CancelActiveOrdersButton = ({ className, disabled }: Props) => {
	return (
		<BorderedButton disabled={disabled} className={className}>
			Отменить
		</BorderedButton>
	)
}
