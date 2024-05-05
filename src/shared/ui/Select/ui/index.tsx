import { ChangeEventHandler } from 'react'
import cx from 'classnames'
import { ChevronDownIcon } from '@/shared/ui/icons/ChevronDownIcon'
import styles from './style.module.css'

export interface Option {
	value: string
	title: string
}

interface Props {
	className?: string
	changeHandler: ChangeEventHandler<HTMLSelectElement>
	value?: string
	options: Option[]
	defaultOption: Option
}

export const Select = ({ className, changeHandler, options, defaultOption, value }: Props) => {
	const empty = value === ''
	return (
		<div className={cx(className, 'relative')}>
			<select
				onChange={(event) => {
					changeHandler(event)
				}}
				value={value}
				className={cx(
					styles['select'],
					'group w-full input text-sm rounded-md py-[9px] px-[13px] bg-white border border-gray-300  outline-none appearance-none hover:border-gray-500 focus:text-gray-800 focus:border-gray-500',
					{
						'text-gray-500': empty,
						'text-gray-800': !empty,
					},
				)}>
				<option disabled value={defaultOption.value}>
					{defaultOption.title}
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.title}
					</option>
				))}
			</select>
			<ChevronDownIcon
				className='absolute top-[11px] right-[9px] pointer-events-none transition'
				pathClassName={empty ? 'stroke-gray-400' : 'stroke-gray-600'}
			/>
		</div>
	)
}
