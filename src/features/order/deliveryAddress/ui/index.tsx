import cx from 'classnames'

interface Props {
	className?: string
	address: string
}

export const OrderDeliveryAddress = ({ className, address }: Props) => {
	return (
		<button
			className={cx(
				className,
				'text-base font-semibold leading-6 text-gray-900 flex gap-2 items-center hover:text-indigo-600',
			)}>
			{address}
		</button>
	)
}
