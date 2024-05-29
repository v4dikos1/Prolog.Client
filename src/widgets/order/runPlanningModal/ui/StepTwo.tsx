import { FormEvent, useState } from 'react'
import cx from 'classnames'
import { SelectStorage } from '@/features/storage'
import { SelectVehicle } from '@/features/vehicle'
import { SelectDriver } from '@/features/driver'
import { getDriversCount } from '@/entities/driver'
import { getVehiclesCount } from '@/entities/vehicle'
import { useAppSelector } from '@/shared/store'
import { Button } from '@/shared/ui/Button'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { Form } from '../types'
import { useSave } from '../useSave'

interface Props {
	prev: () => void
	form: Form
	setForm: (form: Form) => void
	onSuccess: () => void
}

export const StepTwo = ({ prev, form, setForm, onSuccess }: Props) => {
	const { save, isLoading } = useSave()
	const [error, setError] = useState(false)
	const driversCount = useAppSelector(getDriversCount)
	const vehiclesCount = useAppSelector(getVehiclesCount)
	const disabled = form.binds.length >= driversCount || form.binds.length >= vehiclesCount

	const handleResponse = (response: unknown) => {
		if (response && typeof response === 'object' && 'error' in response) {
			setError(true)
			return
		}

		onSuccess()
	}

	const saveHandler = (event: FormEvent) => {
		event.preventDefault()
		save(form).then(handleResponse)
	}

	const addBind = () => {
		setForm({ ...form, binds: [...form.binds, { storageID: '', driverID: '', vehicleID: '' }] })
	}

	const setDriver = (index: number, driverID: string) => {
		const newBinds = [...form.binds]
		newBinds[index] = { ...newBinds[index], driverID }
		setForm({ ...form, binds: newBinds })
	}

	const setVehicle = (index: number, vehicleID: string) => {
		const newBinds = [...form.binds]
		newBinds[index] = { ...newBinds[index], vehicleID }
		setForm({ ...form, binds: newBinds })
	}

	const setStorage = (index: number, storageID: string) => {
		const newBinds = [...form.binds]
		newBinds[index] = { ...newBinds[index], storageID }
		setForm({ ...form, binds: newBinds })
	}

	return (
		<>
			<form className='flex flex-col gap-4' method='POST' onSubmit={saveHandler} onChange={() => setError(false)}>
				{error && <p className='text-red-600'>Произошла ошибка. Попробуйте заново.</p>}
				{form.binds.map((bind, index) => (
					<div className='flex gap-4 flex-col md:flex-row' key={index}>
						<SelectDriver
							value={bind.driverID}
							changeHandler={(event) => setDriver(index, event.target.value)}
							className='w-full'
							excludedValues={form.binds.map((bind) => bind.driverID)}
						/>
						<SelectVehicle
							value={bind.vehicleID}
							changeHandler={(event) => setVehicle(index, event.target.value)}
							className='w-full'
							excludedValues={form.binds.map((bind) => bind.vehicleID)}
						/>
						<SelectStorage
							value={bind.storageID}
							changeHandler={(event) => setStorage(index, event.target.value)}
							className='w-full'
						/>
					</div>
				))}
				<Button
					disabled={disabled}
					className={cx('self-stretch md:self-start', { '!bg-gray-100 opacity-70': disabled })}
					category='secondary'
					Icon={PlusIcon}
					clickHandler={addBind}>
					Добавить водителя и ТС
				</Button>
				<div className='flex gap-3 self-end'>
					<Button category='secondary' clickHandler={prev}>
						Назад
					</Button>
					<Button type='submit' loading={isLoading}>
						Запустить планирование
					</Button>
				</div>
			</form>
		</>
	)
}
