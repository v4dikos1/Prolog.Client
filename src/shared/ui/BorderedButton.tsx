import cx from 'classnames'
import React from 'react'

interface Props {
	className?: string
	children?: React.ReactNode
	Icon?: React.ElementType
}

export const BorderedButton = ({ children, className, Icon }: Props) => {
	return (
		<button
			className={cx(
				className,
				'flex justify-center items-center gap-2 py-[9px] px-[15px]',
				'rounded-md border border-gray-300',
				'text-sm font-semibold text-gray-600',
				'hover:bg-gray-100',
			)}>
			{Icon && <Icon className='w-5 h-5 stroke-gray-600' />}
			{children}
		</button>
	)
}
