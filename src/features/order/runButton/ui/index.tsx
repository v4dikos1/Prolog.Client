import { Button } from '@/shared/ui/Button'
import { PlayIcon } from '@/shared/ui/icons/PlayIcon'

interface Props {
	className?: string
	disabled?: boolean
}

export const OrderRunButton = ({ className, disabled }: Props) => {
	return <Button disabled={disabled} className={className} Icon={PlayIcon} />
}
