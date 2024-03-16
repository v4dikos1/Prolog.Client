interface Props {
	className?: string
}

export const CopyRightIcon = ({ className }: Props) => {
	return (
		<svg
			className={className}
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#copyrighticonclip)'>
				<path
					d='M6.6665 6.6665V4.99984C6.6665 3.15889 8.15889 1.6665 9.99984 1.6665L14.9998 1.6665C16.8408 1.6665 18.3332 3.15889 18.3332 4.99984V9.99984C18.3332 11.8408 16.8408 13.3332 14.9998 13.3332H13.3332M6.6665 6.6665H4.99984C3.15889 6.6665 1.6665 8.15889 1.6665 9.99984V14.9998C1.6665 16.8408 3.15889 18.3332 4.99984 18.3332H9.99984C11.8408 18.3332 13.3332 16.8408 13.3332 14.9998V13.3332M6.6665 6.6665H9.99984C11.8408 6.6665 13.3332 8.15889 13.3332 9.99984V13.3332'
					stroke='#4338CA'
					strokeWidth='1.5'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='copyrighticonclip'>
					<rect width='20' height='20' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}
