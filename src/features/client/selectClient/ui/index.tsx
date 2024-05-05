import { ChangeEventHandler } from 'react'
import { useAppSelector } from '@/shared/store'
import { getClientsAsSelectOptions } from '@/entities/client'
import { Select } from '@/shared/ui/Select'
import type { Option } from '@/shared/ui/Select'

interface Props {
	className?: string
	value: string
	changeHandler: ChangeEventHandler<HTMLSelectElement>
}

export const SelectClient = ({ className, value, changeHandler }: Props) => {
	const clientsOptions = useAppSelector(getClientsAsSelectOptions) || []
	const defaultOption: Option = {
		value: '',
		title: 'Клиент',
	}

	return (
		<Select
			className={className}
			value={value}
			changeHandler={changeHandler}
			defaultOption={defaultOption}
			options={clientsOptions}
		/>
	)
}
