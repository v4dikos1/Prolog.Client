interface Props {
	className?: string
	pathClassName?: string
}

export const SettingsIcon = ({ className, pathClassName }: Props) => {
	return (
		<svg
			className={className}
			width='18'
			height='18'
			viewBox='0 0 18 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				className={pathClassName}
				d='M2.25 5.25H4.5M4.5 5.25C4.5 6.49264 5.50736 7.5 6.75 7.5C7.99264 7.5 9 6.49264 9 5.25C9 4.00736 7.99264 3 6.75 3C5.50736 3 4.5 4.00736 4.5 5.25ZM2.25 12.75H6.75M13.5 12.75H15.75M13.5 12.75C13.5 13.9926 12.4926 15 11.25 15C10.0074 15 9 13.9926 9 12.75C9 11.5074 10.0074 10.5 11.25 10.5C12.4926 10.5 13.5 11.5074 13.5 12.75ZM11.25 5.25H15.75'
				stroke='#6B7280'
				strokeWidth='2'
				strokeLinecap='round'
			/>
		</svg>
	)
}
