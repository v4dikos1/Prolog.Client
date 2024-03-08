interface Props {
	className?: string
}

export const PlusIcon = ({ className }: Props) => {
	return (
		<svg
			className={className}
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M10 5V10M10 10V15M10 10H15M10 10L5 10'
				stroke='#6B7280'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
