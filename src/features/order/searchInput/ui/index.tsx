import { InputWithIcon } from '@/shared/ui/InputWithIcon'
import { SearchIcon } from '@/shared/ui/icons/SearchIcon'

interface Props {
	className?: string
}

export const OrderSearchInput = ({ className }: Props) => {
	return <InputWithIcon className={className} placeholder='Поиск' Icon={SearchIcon} />
}
