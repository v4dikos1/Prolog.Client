interface Props {
	className?: string
}

export const ClockIcon = ({ className }: Props) => {
	return (
		<svg
			className={className}
			width='21'
			height='20'
			viewBox='0 0 21 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M10.5 6.66667V10L13 12.5M18 10C18 14.1421 14.6421 17.5 10.5 17.5C6.35786 17.5 3 14.1421 3 10C3 5.85786 6.35786 2.5 10.5 2.5C14.6421 2.5 18 5.85786 18 10Z'
				stroke='#4B5563'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
