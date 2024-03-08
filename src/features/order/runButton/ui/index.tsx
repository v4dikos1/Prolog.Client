import { Button } from '@/shared/ui/Button'
import { PlayIcon } from '@/shared/ui/icons/PlayIcon'

interface Props {
	className?: string
}

export const OrderRunButton = ({ className }: Props) => {
	return <Button className={className} Icon={PlayIcon} />
}
