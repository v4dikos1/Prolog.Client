import { FormEvent, FormEventHandler } from 'react'
import { DatePicker } from '@/shared/ui/Datepicker'
import { TimeInput } from '@/shared/ui/TimeInput'
import { Button } from '@/shared/ui/Button'
import { Form } from '../types'

interface Props {
	next: () => void
	form: Form
	setForm: (form: Form) => void
}

export const StepOne = ({ next, form, setForm }: Props) => {
	const submitHandler: FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const date = form.date
		const isValid = event.currentTarget.checkValidity()
		if (date && isValid) return next()

		const datePicker = event.currentTarget.elements.namedItem('date') as HTMLInputElement
		if (datePicker) datePicker.focus()
	}

	return (
		<>
			<p className='text-sm text-gray-500'>
				Система автоматически включит в маршрутизацию <br /> заявки с выбранной датой доставки
			</p>
			<form method='POST' className='flex flex-col gap-4' onSubmit={submitHandler}>
				<div className='flex gap-4 flex-col md:flex-row'>
					<DatePicker
						placeholder='Дата доставки'
						date={form.date}
						setDate={(value) => setForm({ ...form, date: value })}
						className='w-full'
						id='datePicker-deliveryDate'
						name='date'
					/>
					<TimeInput
						className='w-full'
						placeholder='Время начала'
						value={form.start}
						required
						changeHandler={(event) => setForm({ ...form, start: event.target.value })}
					/>
					<TimeInput
						className='w-full'
						placeholder='Время окончания'
						value={form.end}
						required
						changeHandler={(event) => setForm({ ...form, end: event.target.value })}
					/>
				</div>
				<Button type='submit' className='self-end'>
					Далее
				</Button>
			</form>
		</>
	)
}
