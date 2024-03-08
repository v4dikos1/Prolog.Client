import cx from 'classnames'
import React from 'react'

interface Props {
	clickHandler: React.MouseEventHandler
	children: React.ReactNode
	className?: string
	active?: boolean
}

export const Tab = ({ className, children, active = false, clickHandler }: Props) => {
	return (
		<button
			onClick={clickHandler}
			className={cx(
				className,
				'tab text-sm font-medium py-1 px-2 rounded-md hover:text-gray-900',
				active ? 'text-gray-900 bg-gray-200' : 'text-gray-500',
			)}>
			{children}
		</button>
	)
}
