interface Props {
	className?: string
	pathClassName?: string
}

export const ArrowBottomIcon = ({ className, pathClassName }: Props) => {
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
				d='M7.5 4.16683L13.3333 10.0002L7.5 15.8335'
				stroke='#6B7280'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
