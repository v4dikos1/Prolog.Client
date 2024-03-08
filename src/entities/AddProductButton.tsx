import { Button } from '@/shared/ui/Button'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'

interface Props {
	className?: string
}

export const AddProductButton = ({ className }: Props) => {
	return (
		<Button className={className} category='secondary' Icon={PlusIcon}>
			Добавить товар
		</Button>
	)
}
