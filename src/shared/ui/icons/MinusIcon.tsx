interface Props {
	className?: string
	pathClassName?: string
}

export const MinusIcon = ({ className, pathClassName }: Props) => {
	return (
		<svg
			className={className}
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				className={pathClassName}
				d='M15 10H10L5 10'
				stroke='#6B7280'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
