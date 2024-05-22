import cx from 'classnames'
import { MouseEventHandler, useRef } from 'react'

interface IProps {
	close: () => void
	children: React.ReactNode
	opened: boolean
}

export const Backdrop = ({ children, opened, close }: IProps) => {
	const backdropRef = useRef(null)
	const clickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
		if (event.target === backdropRef.current) {
			close()
		}
	}

	return (
		<div
			ref={backdropRef}
			onClick={clickHandler}
			className={cx(
				'w-full h-full overscroll-contain overflow-y-auto py-8 scrollable',
				'flex justify-center items-start md:items-center',
				'fixed top-0 left-0 z-20',
				'bg-[#2f2f36] bg-opacity-75 transition-opacity',
				{
					['opacity-0 pointer-events-none']: !opened,
					['opacity-1 pointer-events-auto']: opened,
				},
			)}>
			{children}
		</div>
	)
}
