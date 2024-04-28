import { useState } from 'react'
import { ImportOrdersButton } from '@/features/order'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { DatePicker } from '@/shared/ui/Datepicker'
import { TimeInput } from '@/shared/ui/TimeInput'
import { Select } from '@/shared/ui/Select'

interface Props {
	next: () => void
}

const storageValues = [
	{ title: 'Склад', value: '' },
	{ title: 'Октябрьский 2', value: '3' },
]

const clientValues = [
	{ title: 'Клиент', value: '' },
	{ title: 'Аллея 1', value: '1' },
	{ title: 'Аллея 2', value: '2' },
]

export const StepOne = ({ next }: Props) => {
	const [deliveryTime, setDeliveryTime] = useState('')
	const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()
	const [storage, setStorage] = useState(storageValues[0].value)
	const [client, setClient] = useState(clientValues[0].value)

	return (
		<>
			<form method='POST' className='px-8 flex flex-col gap-4'>
				<div className='flex gap-4'>
					<Select
						value={storage}
						changeHandler={(event) => setStorage(event.target.value)}
						className='w-full'
						defaultOption={storageValues[0]}
						options={storageValues.slice(1)}
					/>

					<Input className='w-full' placeholder='Адрес доставки' />
				</div>
				<div className='flex gap-4'>
					<DatePicker
						placeholder='Дата доставки'
						date={deliveryDate}
						setDate={setDeliveryDate}
						className='w-full'
						id='datePicker-deliveryDate'
					/>
					<TimeInput
						className='w-full'
						placeholder='Время забора'
						value={deliveryTime}
						changeHandler={(event) => setDeliveryTime(event.target.value)}
					/>
					<TimeInput className='w-full' placeholder='Время доставки' />
				</div>
				<div className='flex gap-4'>
					<Select
						value={client}
						changeHandler={(event) => setClient(event.target.value)}
						className='w-full'
						defaultOption={clientValues[0]}
						options={clientValues.slice(1)}
					/>
					<Input className='w-full' type='number' placeholder='Стоимость доставки, ₽' />
				</div>
			</form>
			<div className='flex justify-between mt-4 px-8'>
				<ImportOrdersButton />
				<Button clickHandler={() => next()}>Далее</Button>
			</div>
		</>
	)
}
