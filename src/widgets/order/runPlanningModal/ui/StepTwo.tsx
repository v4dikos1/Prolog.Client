import { useState } from 'react'
import { SelectDriver } from '@/features/driver'
import { SelectStorage } from '@/features/storage'
import { SelectVehicle } from '@/features/vehicle'
import { Button } from '@/shared/ui/Button'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'

interface Props {
	prev: () => void
}

export const StepTwo = ({ prev }: Props) => {
	const [driver, setDriver] = useState('')
	const [vehicle, setVehicle] = useState('')
	const [storage, setStorage] = useState('')

	return (
		<>
			<form className='flex gap-3' method='POST'>
				<SelectDriver value={driver} changeHandler={(event) => setDriver(event.target.value)} className='w-full' />
				<SelectVehicle value={vehicle} changeHandler={(event) => setVehicle(event.target.value)} className='w-full' />
				<SelectStorage value={storage} changeHandler={(event) => setStorage(event.target.value)} className='w-full' />
			</form>
			<Button className='self-start' category='secondary' Icon={PlusIcon}>
				Добавить водителя и ТС
			</Button>
			<div className='flex gap-3 self-end'>
				<Button category='secondary' clickHandler={() => prev()}>
					Назад
				</Button>
				<Button>Запустить планирование</Button>
			</div>
		</>
	)
}
