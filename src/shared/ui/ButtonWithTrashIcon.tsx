import cx from 'classnames'
import { BorderedButton } from '@/shared/ui/BorderedButton'
import { TrashIcon } from '@/shared/ui/icons/TrashIcon'

interface Props {
	disabled: boolean
	className?: string
}

export const ButtonWithTrashIcon = ({ disabled, className }: Props) => {
	return (
		<BorderedButton disabled={disabled} className={cx('p-[9px]', className)}>
			<TrashIcon pathClassName='!stroke-red-600' />
		</BorderedButton>
	)
}
