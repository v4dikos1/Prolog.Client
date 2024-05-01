import React, { useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
	children: React.ReactNode
	Modal: React.ElementType
	additionalEffectOnClick?: () => void
}

export const TooltipItem = ({ children, Modal, additionalEffectOnClick }: Props) => {
	const [opened, setOpened] = useState(false)
	const open = () => setOpened(true)
	const close = () => setOpened(false)

	const clickHandler = () => {
		if (additionalEffectOnClick) {
			additionalEffectOnClick()
		}
		open()
	}

	return (
		<li>
			<button
				onClick={clickHandler}
				className='w-full pl-4 py-3 text-left hover:text-indigo-600 outline-none focus-visible:shadow-[0_0_0_1px_rgb(0,0,0)]'>
				{children}
			</button>
			{createPortal(<Modal opened={opened} close={close} />, document.body)}
		</li>
	)
}
