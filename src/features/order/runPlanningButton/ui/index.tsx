import { useState } from 'react'
import { createPortal } from 'react-dom'
import { RunPlanningModal } from '@/widgets/order'
import { Button } from '@/shared/ui/Button'
import { PlayIcon } from '@/shared/ui/icons/PlayIcon'

interface Props {
	className?: string
	disabled?: boolean
}

export const OpenRunPlanningModalButton = ({ className, disabled }: Props) => {
	const [opened, setOpened] = useState(false)
	const open = () => setOpened(true)
	const close = () => setOpened(false)

	return (
		<>
			<Button clickHandler={open} disabled={disabled} className={className} Icon={PlayIcon} />
			{createPortal(<RunPlanningModal opened={opened} close={close} />, document.body)}
		</>
	)
}
