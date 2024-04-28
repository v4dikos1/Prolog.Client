import cx from 'classnames'

interface IProps {
	close: () => void
	children: React.ReactNode
	opened: boolean
}

export const Backdrop = ({ children, opened, close }: IProps) => {
	return (
		<div
			onClick={() => close()}
			className={cx(
				'w-full h-full overscroll-contain overflow-y-auto flex justify-center items-center fixed top-0 left-0 z-10 bg-[#2f2f36] bg-opacity-75 transition-opacity',
				{
					['opacity-0 pointer-events-none']: !opened,
					['opacity-1 pointer-events-auto']: opened,
				},
			)}>
			{children}
		</div>
	)
}
