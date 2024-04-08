import { InputWithIcon } from '@/shared/ui/InputWithIcon'
import { SearchIcon } from '@/shared/ui/icons/SearchIcon'

interface Props {
	className?: string
	disabled: boolean
}

export const OrderSearchInput = ({ className, disabled }: Props) => {
	return <InputWithIcon disabled={disabled} className={className} placeholder='Поиск' Icon={SearchIcon} />
}
