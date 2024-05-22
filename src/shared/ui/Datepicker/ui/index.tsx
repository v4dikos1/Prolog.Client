import { useEffect, useState } from 'react'
import Datepicker from 'tailwind-datepicker-react'

import { CalendarIcon } from '@/shared/ui/icons/CalendarIcon'
import { InputWithIcon } from '@/shared/ui/InputWithIcon'

import { options } from '../options'
import { clickOutside, formatDate, todayBtnClick } from '../helpers'

interface Props {
	date?: Date
	setDate: (date: Date) => void
	className?: string
	id: string
	placeholder: string
	name?: string
	setDatepickerOpened?: (value: boolean) => void
}

export const DatePicker = ({ date, setDate, className, id, placeholder, name, setDatepickerOpened }: Props) => {
	const [show, setShow] = useState<boolean>(false)

	const handleChange = (newDate: Date) => setDate(newDate)
	const handleClose = (state: boolean) => setShow(state)

	useEffect(() => {
		const handleMouseDown = (event: MouseEvent) => {
			if (clickOutside(event, id)) {
				setShow(false)
			}
		}

		const handleMouseUp = (event: MouseEvent) => {
			if (todayBtnClick(event, id)) {
				setDate(new Date())
				setShow(false)
			}
		}

		if (show) {
			window.addEventListener('click', handleMouseDown)
			document.addEventListener('mouseup', handleMouseUp)
		}

		return () => {
			window.removeEventListener('click', handleMouseDown)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [show, id, setDate])

	useEffect(() => {
		if (show) {
			setDatepickerOpened?.(true)
		} else {
			setDatepickerOpened?.(false)
		}
	}, [show, setDatepickerOpened])

	return (
		<div id={id} className={className}>
			<Datepicker
				classNames='relative'
				options={options}
				selectedDateState={[date || new Date(), setDate]}
				onChange={handleChange}
				show={show}
				setShow={handleClose}>
				<InputWithIcon
					Icon={CalendarIcon}
					value={formatDate(date)}
					placeholder={placeholder}
					focusHandler={() => setShow(true)}
					clickHandler={() => setShow(true)}
					// blurHandler={() => setShow(false)}
					name={name}
					readonly
				/>
			</Datepicker>
		</div>
	)
}
