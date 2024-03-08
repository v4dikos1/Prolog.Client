import cx from 'classnames'

interface Props {
	count: number
	className?: string
	active?: boolean
}

export const Badge = ({ className, active, count }: Props) => {
	return (
		<span
			className={cx(
				className,
				'badge inline-flex justify-center items-center h-5 min-w-6 px-1 rounded-md font-medium  text-white text-xs',
				active ? 'bg-gray-900' : 'bg-gray-500',
			)}>
			{count}
		</span>
	)
}
