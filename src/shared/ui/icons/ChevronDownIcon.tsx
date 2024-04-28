interface Props {
	className?: string
	pathClassName?: string
}

export const ChevronDownIcon = ({ className, pathClassName }: Props) => {
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
				d='M15.8332 7.5L9.99983 13.3333L4.1665 7.5'
				stroke='#9CA3AF'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
