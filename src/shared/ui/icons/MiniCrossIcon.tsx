interface Props {
	className?: string
	pathClassName?: string
}

export const MiniCrossIcon = ({ className, pathClassName }: Props) => {
	return (
		<svg
			className={className}
			width='12'
			height='12'
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path className={pathClassName} d='M1 1L6 6M11 11L6 6M6 6L11 1L1 11' stroke='white' strokeWidth='1.5' />
		</svg>
	)
}
