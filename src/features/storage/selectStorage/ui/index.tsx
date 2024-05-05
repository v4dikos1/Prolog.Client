import { ChangeEventHandler } from 'react'
import { useAppSelector } from '@/shared/store'
import { getStoragesAsSelectOptions } from '@/entities/storage'
import { Select } from '@/shared/ui/Select'
import type { Option } from '@/shared/ui/Select'

interface Props {
	className?: string
	value: string
	changeHandler: ChangeEventHandler<HTMLSelectElement>
}

export const SelectStorage = ({ className, value, changeHandler }: Props) => {
	const storageOptions = useAppSelector(getStoragesAsSelectOptions) || []
	const defaultOption: Option = {
		value: '',
		title: 'Склад',
	}

	return (
		<Select
			className={className}
			value={value}
			changeHandler={changeHandler}
			defaultOption={defaultOption}
			options={storageOptions}
		/>
	)
}
