import { ChangeEventHandler } from 'react'
import { useAppSelector } from '@/shared/store'
import { getVehiclesAsSelectOptions } from '@/entities/vehicle'
import { Select } from '@/shared/ui/Select'
import type { Option } from '@/shared/ui/Select'

interface Props {
	className?: string
	value: string
	changeHandler: ChangeEventHandler<HTMLSelectElement>
	excludedValues: string[]
}

export const SelectVehicle = ({ className, value, changeHandler, excludedValues }: Props) => {
	const vehicleOptions = useAppSelector(getVehiclesAsSelectOptions) || []
	const defaultOption: Option = {
		value: '',
		title: 'Выберите машину',
	}

	const filteredVehiclerOptions = vehicleOptions.filter(
		(optionGroup) => optionGroup.value === value || !excludedValues.includes(optionGroup.value),
	)

	return (
		<Select
			className={className}
			value={value}
			changeHandler={changeHandler}
			defaultOption={defaultOption}
			options={filteredVehiclerOptions}
			required
		/>
	)
}
