interface Props {
	className?: string
	pathClassName?: string
}

export const ArrowLeftIcon = ({ className, pathClassName }: Props) => {
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
				d='M7 16L3 12M3 12L7 8M3 12L21 12'
				stroke='#9CA3AF'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
