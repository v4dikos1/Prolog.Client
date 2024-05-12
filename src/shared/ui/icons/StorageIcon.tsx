interface Props {
	className?: string
	pathClassName?: string
}

export const StorageIcon = ({ className, pathClassName }: Props) => {
	return (
		<svg
			className={className}
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_1103_9373)'>
				<path
					className={pathClassName}
					d='M10.0002 2.5L16.6668 6.25V13.75L10.0002 17.5L3.3335 13.75V6.25L10.0002 2.5Z'
					stroke='white'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					className={pathClassName}
					d='M10 10L16.6667 6.25'
					stroke='white'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					className={pathClassName}
					d='M10 10V17.5'
					stroke='white'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					className={pathClassName}
					d='M10.0002 10L3.3335 6.25'
					stroke='white'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_1103_9373'>
					<rect width='20' height='20' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}
