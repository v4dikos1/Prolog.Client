import { useState } from 'react'
import { DatePicker } from '@/shared/ui/Datepicker'
import { TimeInput } from '@/shared/ui/TimeInput'
import { Button } from '@/shared/ui/Button'

interface Props {
	next: () => void
}

export const StepOne = ({ next }: Props) => {
	const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()

	return (
		<>
			<p className='text-sm text-gray-500'>
				Система автоматически включит в маршрутизацию <br /> заявки с выбранной датой доставки
			</p>
			<form method='POST' className='flex gap-4'>
				<DatePicker
					placeholder='Дата доставки'
					date={deliveryDate}
					setDate={setDeliveryDate}
					className='w-full'
					id='datePicker-deliveryDate'
				/>
				<TimeInput className='w-full' placeholder='Время начала' />
				<TimeInput className='w-full' placeholder='Время окончания' />
			</form>
			<Button className='self-end' clickHandler={() => next()}>
				Далее
			</Button>
		</>
	)
}
