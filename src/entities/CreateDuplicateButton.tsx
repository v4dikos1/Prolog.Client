import { BorderedButton } from '@/shared/ui/BorderedButton'
import { CopyLeftIcon } from '@/shared/ui/icons/CopyLeftIcon'

interface Props {
	className?: string
}

export const CreateDuplicateButton = ({ className }: Props) => {
	return (
		<BorderedButton className={className} Icon={CopyLeftIcon}>
			Создать дубликат во входящие
		</BorderedButton>
	)
}
