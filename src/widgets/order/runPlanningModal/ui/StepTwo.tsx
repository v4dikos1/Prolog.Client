import { Button } from '@/shared/ui/Button'
import { Select } from '@/shared/ui/Select'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { useState } from 'react'

interface Props {
	prev: () => void
}

const driverValues = [
	{ title: 'Выберите водителя', value: '' },
	{ title: 'sergey29', value: '1' },
	{ title: 'dobrynich_vadislav', value: '2' },
]

const transportValues = [
	{ title: 'Выберите водителя', value: '' },
	{ title: 'Kia RIO', value: '1' },
	{ title: 'Fiat Doblo', value: '2' },
	{ title: 'Hyindai Solaris', value: '3' },
	{ title: 'Ford Focus', value: '4' },
	{ title: 'Lada Vesta', value: '5' },
	{ title: 'Mersedes-Benz C-Class', value: '6' },
]

const storageValues = [
	{ title: 'Выберите склад', value: '' },
	{ title: 'Октябрьский 2', value: '3' },
]

export const StepTwo = ({ prev }: Props) => {
	const [driver, setDriver] = useState(driverValues[0].value)
	const [transport, setTransport] = useState(transportValues[0].value)
	const [storage, setStorage] = useState(storageValues[0].value)

	return (
		<>
			<form className='flex gap-3' method='POST'>
				<Select
					value={driver}
					changeHandler={(event) => setDriver(event.target.value)}
					className='w-full'
					defaultOption={driverValues[0]}
					options={driverValues.slice(1)}
				/>
				<Select
					value={transport}
					changeHandler={(event) => setTransport(event.target.value)}
					className='w-full'
					defaultOption={transportValues[0]}
					options={transportValues.slice(1)}
				/>
				<Select
					value={storage}
					changeHandler={(event) => setStorage(event.target.value)}
					className='w-full'
					defaultOption={storageValues[0]}
					options={storageValues.slice(1)}
				/>
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
