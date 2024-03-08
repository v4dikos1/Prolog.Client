import cx from 'classnames'

interface Props {
	children: React.ReactNode
	className?: string
	category?: 'primary' | 'secondary'
	Icon?: React.ElementType
}

export const Button = ({ className, children, category = 'primary', Icon }: Props) => {
	return (
		<button
			className={cx(
				className,
				'flex justify-center items-center gap-2 py-[9px] pr-[17px] text-sm font-semibold rounded-md',
				Icon ? 'pl-[15px]' : 'pl-[17px]',
				category === 'primary'
					? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-600 '
					: 'text-gray-700 bg-gray-100  hover:bg-gray-200 focus:bg-gray-100',
			)}>
			{Icon && <Icon className='w-5 h-5' />}
			{children}
		</button>
	)
}
