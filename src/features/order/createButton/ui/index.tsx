import { BorderedButton } from '@/shared/ui/BorderedButton'
import { ThinPlusIcon } from '@/shared/ui/icons/ThinPlusIcon'

interface Props {
	className?: string
}

export const OrderCreateButton = ({ className }: Props) => {
	return <BorderedButton className={className} Icon={ThinPlusIcon} />
}
