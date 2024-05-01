import React, { useCallback, useEffect, useRef } from 'react'
import cx from 'classnames'
import { Backdrop } from './Backdrop'
import { CloseModalButton } from '../../CloseModalButton'

interface Props {
	titleContent: React.ReactNode
	headerContent?: React.ReactNode
	content: React.ReactNode
	className?: string
	opened: boolean
	close: () => void
}

export const MODAL_CLOSING_TIME = 500
const FOCUSALBE_SELECTOR = `a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])`
const ESCAPE = 'Escape'
const TAB = 'Tab'

const onTab = (e: KeyboardEvent, modal: HTMLDivElement | null, focusables: NodeListOf<HTMLElement> | null) => {
	if (modal && focusables && !modal.contains(document.activeElement)) {
		focusables[0].focus()
		e.preventDefault()
		return
	}

	if (focusables) {
		const first = focusables[0]
		const last = focusables[focusables.length - 1]

		if (e.shiftKey) {
			if (document.activeElement === first) {
				last.focus()
				e.preventDefault()
			}
		} else if (document.activeElement === last) {
			first.focus()
			e.preventDefault()
		}
	}
}

export const ModalTemplate = ({ titleContent, headerContent, content, className, opened, close }: Props) => {
	const modal = useRef<HTMLDivElement | null>(null)
	const focusables = useRef<null | NodeListOf<HTMLElement>>(null)

	const onKeyboard = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === ESCAPE) close()
			else if (e.key === TAB) onTab(e, modal.current, focusables.current)
		},
		[close],
	)

	useEffect(() => {
		if (modal.current !== null) focusables.current = modal.current.querySelectorAll(FOCUSALBE_SELECTOR)
	}, [])

	useEffect(() => {
		if (opened) {
			window.addEventListener('keydown', onKeyboard)
		}
		return () => {
			window.removeEventListener('keydown', onKeyboard)
		}
	}, [opened, onKeyboard])

	return (
		<Backdrop opened={opened} close={close}>
			<div
				role='dialog'
				ref={modal}
				onClick={(e) => e.stopPropagation()}
				className={cx('w-[1116px] bg-white rounded-lg shadow', className, {
					'visible': opened,
					'invisible delay-300': !opened,
				})}>
				<header className='pt-6 pb-4 px-8 bg-gray-100 rounded-t-lg relative'>
					<h3 className='text-xl text-gray-900 font-semibold'>{titleContent}</h3>
					<CloseModalButton className='absolute top-6 right-8' clickHandler={close} />
					{headerContent}
				</header>
				<main className='pt-4 pb-8 flex flex-col gap-4'>{content}</main>
			</div>
		</Backdrop>
	)
}
