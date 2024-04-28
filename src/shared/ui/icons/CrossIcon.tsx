interface Props {
	className?: string
	pathClassName?: string
}

export const CrossIcon = ({ className, pathClassName }: Props) => {
	return (
		<svg
			className={className}
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				className={pathClassName}
				d='M6 18L18 6M6 6L18 18'
				stroke='#6B7280'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
