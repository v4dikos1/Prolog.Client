import { ChangeEventHandler } from 'react'
import { useAppSelector } from '@/shared/store'
import { getDriversAsSelectOptions } from '@/entities/driver'
import { Select } from '@/shared/ui/Select'
import type { Option } from '@/shared/ui/Select'

interface Props {
	className?: string
	value: string
	changeHandler: ChangeEventHandler<HTMLSelectElement>
	excludedValues?: string[]
}

export const SelectDriver = ({ className, value, changeHandler, excludedValues = [] }: Props) => {
	const driversOptions = useAppSelector(getDriversAsSelectOptions) || []
	const defaultOption: Option = {
		value: '',
		title: 'Выберите водителя',
	}

	const filteredDriverOptions = driversOptions.filter(
		(optionGroup) => optionGroup.value === value || !excludedValues.includes(optionGroup.value),
	)

	return (
		<Select
			className={className}
			value={value}
			changeHandler={changeHandler}
			defaultOption={defaultOption}
			options={filteredDriverOptions}
			required
		/>
	)
}
