import { FormEventHandler, useState } from 'react'
import { useAppSelector } from '@/shared/store'
import { getDriverByID, useChangeDriverMutation, useDeleteDriversMutation } from '@/entities/driver'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	ID: string | null
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Changing = ({ ID, back }: Props) => {
	const driver = useAppSelector((state) => getDriverByID(state, ID))
	const [changeDriver, { isLoading: isChanging }] = useChangeDriverMutation()
	const [deleteDrivers, { isLoading: isDeleting }] = useDeleteDriversMutation()

	const defaultFullName = driver ? `${driver.surname} ${driver.name} ${driver.patronymic}` : ''
	const [fullName, setFullName] = useState(defaultFullName)
	const [phone, setPhone] = useState(driver?.phone || '')
	const [salary, setSalary] = useState(String(driver?.salary) || '')
	const [errorVisible, setErrorVisible] = useState(false)

	if (ID === null || driver === undefined) return

	const handleResponse = (response: Response) => {
		if ('error' in response) {
			setErrorVisible(true)
			return
		}

		back()
	}

	const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
		const [surname, name, patronymic] = fullName.split(' ')
		const salaryNumber = Number(salary)

		event.preventDefault()
		changeDriver({ ID, name, surname, patronymic, salary: salaryNumber, phone, telegram: 'drivers_prolog' }).then(
			handleResponse,
		)
	}

	const deleteHandler = () => {
		deleteDrivers([ID]).then(handleResponse)
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
					placeholder='ФИО Водителя'
					value={fullName}
					changeHandler={(event) => setFullName(event.target.value)}
					required={true}
				/>
				<Input
					className='w-full'
					placeholder='Контактный телефон'
					value={phone}
					changeHandler={(event) => setPhone(event.target.value)}
					required={true}
				/>
				<Input
					className='w-full'
					placeholder='Ставка в час'
					type='number'
					value={salary}
					changeHandler={(event) => setSalary(event.target.value)}
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
