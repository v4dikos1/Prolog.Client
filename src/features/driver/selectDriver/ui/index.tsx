import { ChangeEventHandler } from 'react'
import { useAppSelector } from '@/shared/store'
import { getDriversAsSelectOptions } from '@/entities/driver'
import { Select } from '@/shared/ui/Select'
import type { Option } from '@/shared/ui/Select'

interface Props {
	className?: string
	value: string
	changeHandler: ChangeEventHandler<HTMLSelectElement>
}

export const SelectDriver = ({ className, value, changeHandler }: Props) => {
	const driversOptions = useAppSelector(getDriversAsSelectOptions) || []
	const defaultOption: Option = {
		value: '',
		title: 'Выберите водителя',
	}

	return (
		<Select
			className={className}
			value={value}
			changeHandler={changeHandler}
			defaultOption={defaultOption}
			options={driversOptions}
			required
		/>
	)
}
