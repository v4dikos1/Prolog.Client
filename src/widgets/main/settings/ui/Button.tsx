import { MouseEventHandler } from 'react'
import cx from 'classnames'
import { SettingsIcon } from '@/shared/ui/icons/SettingsIcon'

interface Props {
	className?: string
	clickHandler: MouseEventHandler
}

export const Button = ({ className, clickHandler }: Props) => {
	return (
		<button
			onClick={clickHandler}
			className={cx(
				className,
				'group px-5 py-2 rounded-lg flex items-center gap-3 bg-white shadow-xl',
				'text-xl text-gray-900 uppercase font-semibold',
				'transition-all ',
			)}>
			Prolog
			<SettingsIcon
				className='transition-transform group-hover:scale-110'
				pathClassName='transition-colors stroke-gray-500 group-hover:stroke-indigo-600'
			/>
		</button>
	)
}
