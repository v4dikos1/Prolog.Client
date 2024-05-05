import { SelectStorage } from '@/features/storage'
import { SelectClient } from '@/features/client'
import { ImportOrdersButton } from '@/features/order'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { DatePicker } from '@/shared/ui/Datepicker'
import { TimeInput } from '@/shared/ui/TimeInput'
import { Form } from './'

interface Props {
	next: () => void
	form: Form
	setForm: (form: Form) => void
}

export const StepOne = ({ next, form, setForm }: Props) => {
	const setStorageID = (storageID: string) => setForm({ ...form, storageID })
	const setAddress = (address: string) => setForm({ ...form, address })
	const setDate = (date: Date) => setForm({ ...form, date })
	const setPickUpStart = (pickUpStart: string) => setForm({ ...form, pickUpStart })
	const setPickUpEnd = (pickUpEnd: string) => setForm({ ...form, pickUpEnd })
	const setDeliveryStart = (deliveryStart: string) => setForm({ ...form, deliveryStart })
	const setDeliveryEnd = (deliveryEnd: string) => setForm({ ...form, deliveryEnd })
	const setClientID = (clientID: string) => setForm({ ...form, clientID })
	const setPrice = (price: string) => setForm({ ...form, price })

	return (
		<>
			<form method='POST' className='px-8 flex flex-col gap-4'>
				<div className='flex gap-4'>
					<SelectStorage
						className='w-full'
						changeHandler={(event) => setStorageID(event.target.value)}
						value={form.storageID}
					/>
					<Input
						changeHandler={(event) => setAddress(event.target.value)}
						value={form.address}
						className='w-full'
						placeholder='Адрес доставки'
					/>
				</div>
				<div className='flex gap-4'>
					<DatePicker
						placeholder='Дата доставки'
						date={form.date}
						setDate={setDate}
						className='w-full'
						id='datePicker-deliveryDate'
					/>
					<TimeInput
						className='w-full'
						placeholder='Забрать с'
						value={form.pickUpStart}
						changeHandler={(event) => setPickUpStart(event.target.value)}
					/>
					<TimeInput
						className='w-full'
						placeholder='Забрать до'
						value={form.pickUpEnd}
						changeHandler={(event) => setPickUpEnd(event.target.value)}
					/>
					<TimeInput
						className='w-full'
						placeholder='Доставить с'
						value={form.deliveryStart}
						changeHandler={(event) => setDeliveryStart(event.target.value)}
					/>
					<TimeInput
						className='w-full'
						placeholder='Доставить до'
						value={form.deliveryEnd}
						changeHandler={(event) => setDeliveryEnd(event.target.value)}
					/>
				</div>
				<div className='flex gap-4'>
					<SelectClient
						className='w-full'
						changeHandler={(event) => setClientID(event.target.value)}
						value={form.clientID}
					/>
					<Input
						className='w-full'
						type='number'
						placeholder='Стоимость доставки, ₽'
						changeHandler={(event) => setPrice(event.target.value)}
						value={form.price}
					/>
				</div>
			</form>
			<div className='flex justify-between mt-4 px-8'>
				<ImportOrdersButton />
				<Button clickHandler={() => next()}>Далее</Button>
			</div>
		</>
	)
}
