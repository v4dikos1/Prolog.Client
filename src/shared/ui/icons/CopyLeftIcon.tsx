interface Props {
	className?: string
}

export const CopyLeftIcon = ({ className }: Props) => {
	return (
		<svg
			className={className}
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M6.66659 13.3335H4.99992C4.07944 13.3335 3.33325 12.5873 3.33325 11.6668V5.00016C3.33325 4.07969 4.07944 3.3335 4.99992 3.3335H11.6666C12.5871 3.3335 13.3333 4.07969 13.3333 5.00016V6.66683M8.33325 16.6668H14.9999C15.9204 16.6668 16.6666 15.9206 16.6666 15.0002V8.3335C16.6666 7.41302 15.9204 6.66683 14.9999 6.66683H8.33325C7.41278 6.66683 6.66659 7.41302 6.66659 8.3335V15.0002C6.66659 15.9206 7.41278 16.6668 8.33325 16.6668Z'
				stroke='#6B7280'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
