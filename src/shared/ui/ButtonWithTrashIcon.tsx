import cx from 'classnames'
import { BorderedButton } from '@/shared/ui/BorderedButton'
import { TrashIcon } from '@/shared/ui/icons/TrashIcon'
import { MouseEventHandler } from 'react'

interface Props {
	disabled: boolean
	className?: string
	clickHandler: MouseEventHandler<HTMLButtonElement>
	isLoading?: boolean
}

export const ButtonWithTrashIcon = ({ disabled, className, clickHandler, isLoading }: Props) => {
	return (
		<BorderedButton
			isLoading={isLoading}
			clickHandler={clickHandler}
			disabled={disabled}
			className={cx('p-[9px]', className)}>
			<TrashIcon pathClassName='!stroke-red-600' />
		</BorderedButton>
	)
}
