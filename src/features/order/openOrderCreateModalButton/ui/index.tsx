import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CreateOrderModal } from '@/widgets/order'
import { BorderedButton } from '@/shared/ui/BorderedButton'
import { ThinPlusIcon } from '@/shared/ui/icons/ThinPlusIcon'

interface Props {
	className?: string
	disabled?: boolean
}

export const OpenOrderCreateModalButton = ({ className, disabled }: Props) => {
	const [opened, setOpened] = useState(false)
	const open = () => setOpened(true)
	const close = () => setOpened(false)

	return (
		<>
			<BorderedButton clickHandler={open} disabled={disabled} className={className} Icon={ThinPlusIcon} />
			{createPortal(<CreateOrderModal opened={opened} close={close} />, document.body)}
		</>
	)
}
