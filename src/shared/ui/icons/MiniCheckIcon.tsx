interface Props {
	className?: string
	pathClassName?: string
}

export const MiniCheckIcon = ({ className, pathClassName }: Props) => {
	return (
		<svg
			className={className}
			width='16'
			height='11'
			viewBox='0 0 16 11'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path className={pathClassName} d='M1 6.4L5 10L15 1' stroke='#F9FAFB' strokeWidth='1.5' />
		</svg>
	)
}
