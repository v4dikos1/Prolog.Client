import { FormEventHandler, useState } from 'react'
import { getVehicleByID, useChangeVehicleMutation, useDeleteVehiclesMutation, useAppSelector } from '@/app/store'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	ID: string | null
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Changing = ({ ID, back }: Props) => {
	const vehicle = useAppSelector((state) => getVehicleByID(state, ID))
	const [changeVehicle, { isLoading: isChanging }] = useChangeVehicleMutation()
	const [deleteVehicles, { isLoading: isDeleting }] = useDeleteVehiclesMutation()

	const [brand, setBrand] = useState(String(vehicle?.brand) || '')
	const [licensePlate, setLicensePlate] = useState(String(vehicle?.licensePlate) || '')
	const [volume, setVolume] = useState(String(vehicle?.volume) || '')
	const [capacity, setCapacity] = useState(String(vehicle?.capacity) || '')
	const [fuelConsumption, setFuelConsumption] = useState(String(vehicle?.fuelConsumption) || '')
	const [errorVisible, setErrorVisible] = useState(false)

	if (ID === null || vehicle === undefined) return

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
		changeVehicle({
			ID,
			brand,
			licensePlate,
			volume: volumeNumber,
			capacity: capacityNumber,
			fuelConsumption: fuelConsumptionNumber,
		}).then(handleResponse)
	}

	const deleteHandler = () => {
		deleteVehicles([ID]).then(handleResponse)
	}

	return (
		<form
			className='w-full flex gap-4 flex-col px-8'
			method='POST'
			onSubmit={submitHandler}
			onInput={() => setErrorVisible(false)}>
			{errorVisible && <p className='text-red-500'>Ошибка: попробуйте заново</p>}
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
			<div className='flex justify-between'>
				<Button clickHandler={deleteHandler} category='secondary' loading={isDeleting}>
					Удалить
				</Button>
				<div className='self-end flex gap-3'>
					<Button clickHandler={back} category='secondary'>
						Назад
					</Button>
					<Button type='submit' loading={isChanging}>
						Сохранить
					</Button>
				</div>
			</div>
		</form>
	)
}
