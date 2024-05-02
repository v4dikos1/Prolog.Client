import { FormEventHandler, useState } from 'react'
import { useAddVehicleMutation } from '@/app/store'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Addition = ({ back }: Props) => {
	const [brand, setBrand] = useState('')
	const [licensePlate, setLicensePlate] = useState('')
	const [volume, setVolume] = useState('')
	const [capacity, setCapacity] = useState('')
	const [fuelConsumption, setFuelConsumption] = useState('')

	const [addVehicle, { isLoading }] = useAddVehicleMutation()
	const [errorVisible, setErrorVisible] = useState(false)

	const handleResponse = (response: Response) => {
		if ('error' in response) {
			setErrorVisible(true)
			return
		}

		back()
	}

	const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
		const volumeNumber = Number(volume)
		const capacityNumber = Number(capacity)
		const fuelConsumptionNumber = Number(fuelConsumption)

		event.preventDefault()
		addVehicle({
			brand,
			licensePlate,
			volume: volumeNumber,
			capacity: capacityNumber,
			fuelConsumption: fuelConsumptionNumber,
		}).then(handleResponse)
	}

	return (
		<form
			className='w-full flex gap-4 flex-col px-8'
			method='POST'
			onSubmit={submitHandler}
			onInput={() => setErrorVisible(false)}>
			{errorVisible && (
				<p className='text-red-500'>
					Ошибка: данные введены неверно <br />
					либо есть проблемы с соединением.
				</p>
			)}
			<div className='flex gap-4'>
				<Input
					className='w-full'
					placeholder='Марка'
					value={brand}
					changeHandler={(event) => setBrand(event.target.value)}
					required={true}
				/>
				<Input
					className='w-full'
					placeholder='Госномер'
					value={licensePlate}
					changeHandler={(event) => setLicensePlate(event.target.value)}
					required={true}
				/>
			</div>
			<div className='flex gap-4'>
				<Input
					className='w-full'
					placeholder='Объём, м3'
					value={volume}
					type='number'
					changeHandler={(event) => setVolume(event.target.value)}
					required={true}
				/>
				<Input
					className='w-full'
					placeholder='Грузоподъёмность, кг'
					value={capacity}
					type='number'
					changeHandler={(event) => setCapacity(event.target.value)}
					required={true}
				/>
				<Input
					className='w-full'
					placeholder='Средний расход на 100 км, л'
					value={fuelConsumption}
					type='number'
					changeHandler={(event) => setFuelConsumption(event.target.value)}
					required={true}
				/>
			</div>
			<div className='self-end flex gap-3'>
				<Button clickHandler={back} category='secondary'>
					Назад
				</Button>
				<Button type='submit' loading={isLoading}>
					Добавить
				</Button>
			</div>
		</form>
	)
}
