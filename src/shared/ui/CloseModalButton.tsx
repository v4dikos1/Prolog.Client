import { MouseEventHandler } from 'react'
import cx from 'classnames'
import { CrossIcon } from './icons/CrossIcon'

interface Props {
	className?: string
	clickHandler: MouseEventHandler
}

export const CloseModalButton = ({ className, clickHandler }: Props) => {
	return (
		<button
			onClick={clickHandler}
			className={cx(
				className,
				'group flex justify-center items-center border border-white bg-white rounded-md transition-colors hover:border-gray-900 outline-none focus-visible:border-gray-900',
			)}>
			<CrossIcon pathClassName='stroke-gray-500 transition-colors group-hover:stroke-gray-900' />
		</button>
	)
}
