import { BorderedButton } from '@/shared/ui/BorderedButton'
import { ThinPlusIcon } from '@/shared/ui/icons/ThinPlusIcon'

interface Props {
	className?: string
	disabled?: boolean
}

export const OrderCreateButton = ({ className, disabled }: Props) => {
	return <BorderedButton disabled={disabled} className={className} Icon={ThinPlusIcon} />
}
