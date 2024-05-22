import { FormEvent, FormEventHandler } from 'react'
import { AddressInput } from '@/features/address'
import { SelectStorage } from '@/features/storage'
import { SelectClient } from '@/features/client'
import { ImportOrdersButton } from '@/features/order'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { DatePicker } from '@/shared/ui/Datepicker'
import { TimeInput } from '@/shared/ui/TimeInput'
import { Form } from '../types'

interface Props {
	next: () => void
	form: Form
	setForm: (form: Form) => void
	setDatepickerOpened: (value: boolean) => void
}

export const StepOne = ({ next, form, setForm, setDatepickerOpened }: Props) => {
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
			<form method='POST' className='px-8 flex flex-col gap-4' onSubmit={submitHandler}>
				<div className='flex gap-4 flex-col md:flex-row'>
					<SelectStorage
						className='w-full'
						changeHandler={(event) => setForm({ ...form, storageID: event.target.value })}
						value={form.storageID}
					/>
					<AddressInput
						placeholder='Адрес доставки'
						value={form.address}
						setValue={(address) => setForm({ ...form, address })}
					/>
				</div>
				<div className='flex gap-4 flex-col lg:flex-row'>
					<DatePicker
						placeholder='Дата доставки'
						date={form.date}
						setDate={(value) => setForm({ ...form, date: value })}
						className='w-full'
						id='datePicker-deliveryDate'
						name='date'
						setDatepickerOpened={setDatepickerOpened}
					/>
					<TimeInput
						className='w-full'
						placeholder='Забрать с'
						value={form.pickUpStart}
						changeHandler={(event) => setForm({ ...form, pickUpStart: event.target.value })}
						required
					/>
					<TimeInput
						className='w-full'
						placeholder='Забрать до'
						value={form.pickUpEnd}
						changeHandler={(event) => setForm({ ...form, pickUpEnd: event.target.value })}
						required
					/>
					<TimeInput
						className='w-full'
						placeholder='Доставить с'
						value={form.deliveryStart}
						changeHandler={(event) => setForm({ ...form, deliveryStart: event.target.value })}
						required
					/>
					<TimeInput
						className='w-full'
						placeholder='Доставить до'
						value={form.deliveryEnd}
						changeHandler={(event) => setForm({ ...form, deliveryEnd: event.target.value })}
						required
					/>
				</div>
				<div className='flex gap-4 flex-col md:flex-row'>
					<SelectClient
						className='w-full'
						changeHandler={(event) => setForm({ ...form, clientID: event.target.value })}
						value={form.clientID}
					/>
					<Input
						className='w-full'
						type='number'
						placeholder='Стоимость доставки, ₽'
						changeHandler={(event) => setForm({ ...form, price: event.target.value })}
						value={form.price}
						required
					/>
				</div>
				<div className='flex justify-between'>
					<ImportOrdersButton />
					<Button type='submit'>Далее</Button>
				</div>
			</form>
		</>
	)
}
