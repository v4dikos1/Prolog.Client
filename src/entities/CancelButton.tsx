import { BorderedButton } from '@/shared/ui/BorderedButton'

interface Props {
	className?: string
}

export const CancelButton = ({ className }: Props) => {
	return <BorderedButton className={className}>Отменить</BorderedButton>
}
