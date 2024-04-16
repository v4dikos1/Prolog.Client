import { ChangeEvent } from 'react'
import { InputWithIcon } from '@/shared/ui/InputWithIcon'
import { SearchIcon } from '@/shared/ui/icons/SearchIcon'
import { useUpdateSearchParams } from '@/shared/hooks/useSearchParams'

interface Props {
	className?: string
	disabled: boolean
}

export const OrderSearchInput = ({ className, disabled }: Props) => {
	const [searchParams, updateParams] = useUpdateSearchParams('q', '')
	const searchString = searchParams.get('q')

	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		updateParams('q', event.target.value)
	}

	return (
		<InputWithIcon
			changeHandler={changeHandler}
			disabled={disabled}
			className={className}
			placeholder='Поиск'
			Icon={SearchIcon}
			value={searchString || ''}
		/>
	)
}
