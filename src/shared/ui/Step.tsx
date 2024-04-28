import cx from 'classnames'

interface Props {
	className?: string
	active: boolean
	stepNumber: number
	stepName: string
}

export const Step = ({ stepNumber, stepName, className, active }: Props) => {
	return (
		<div className={cx(className, 'flex flex-col items-start')}>
			<span
				className={cx('block h-1 w-full transition-colors', {
					'bg-indigo-600': active,
					'bg-gray-200': !active,
				})}></span>
			<span
				className={cx('block mt-4 text-xs font-semibold', {
					'text-indigo-600': active,
					'text-gray-600': !active,
				})}>
				ШАГ {stepNumber}
			</span>
			<span className='text-sm font-medium text-gray-900'>{stepName}</span>
		</div>
	)
}
