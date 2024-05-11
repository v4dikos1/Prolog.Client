import cx from 'classnames'
import { Badge } from '@/shared/ui/Badge'
import { formatDate } from '../helpers'
import { ArrowBottomIcon } from '@/shared/ui/icons/ArrowBottomIcon'

interface Props {
	className?: string
	date: string
	opened: boolean
	count: number
	open: () => void
	close: () => void
}

export const DateHeader = ({ className, date, open, close, count, opened }: Props) => {
	const clickHandler = () => {
		if (opened) close()
		else open()
	}

	return (
		<button
			className={cx(
				className,
				'group flex gap-1 text-sm font-medium hover:text-gray-900 py-[6px]',
				opened ? 'text-gray-900' : 'text-gray-500',
			)}
			onClick={clickHandler}>
			<ArrowBottomIcon
				className={cx('transition-transform w-5 h-5 group-hover:stroke-gray-900', opened ? 'rotate-90' : '')}
				pathClassName={cx('group-hover:stroke-gray-900', opened ? 'stroke-gray-900' : 'stroke-gray-500')}
			/>
			{formatDate(date)}
			<Badge className='group-hover:bg-gray-900' count={count} active={opened} />
		</button>
	)
}
