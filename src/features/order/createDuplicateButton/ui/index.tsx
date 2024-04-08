import { BorderedButton } from '@/shared/ui/BorderedButton'
import { CopyLeftIcon } from '@/shared/ui/icons/CopyLeftIcon'

interface Props {
	className?: string
	disabled: boolean
}

export const CreateDuplicateButton = ({ className, disabled }: Props) => {
	return (
		<BorderedButton disabled={disabled} className={className} Icon={CopyLeftIcon}>
			Создать дубликат во входящие
		</BorderedButton>
	)
}
