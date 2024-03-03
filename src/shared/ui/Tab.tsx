import cx from 'classnames'

interface Props {
	className?: string
	children: React.ReactNode
	active?: boolean
}

export const Tab = ({ className, children, active = false }: Props) => {
	return (
		<button
			className={cx(
				className,
				'tab text-sm font-medium py-1 px-2 rounded-md hover:text-gray-900',
				active ? 'text-gray-900 bg-gray-200' : 'text-gray-500',
			)}>
			{children}
		</button>
	)
}
