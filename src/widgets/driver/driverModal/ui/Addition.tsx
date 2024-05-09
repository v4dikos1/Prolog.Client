import { FormEventHandler, useState } from 'react'
import { useAddDriverMutation } from '@/entities/driver'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Addition = ({ back }: Props) => {
	const [fullName, setFullName] = useState('')
	const [phone, setPhone] = useState('')
	const [salary, setSalary] = useState('')

	const [addDriver, { isLoading }] = useAddDriverMutation()
	const [errorVisible, setErrorVisible] = useState(false)

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
		addDriver({ name, surname, patronymic, phone, telegram: 'drivers_prolog', salary: salaryNumber }).then(
			handleResponse,
		)
	}

	return (
		<form
			className='w-full flex gap-4 flex-col px-8'
			method='POST'
			onSubmit={submitHandler}
			onInput={() => setErrorVisible(false)}>
			{errorVisible && (
				<p className='text-red-500'>
					Ошибка: отсутствует подключение к интернету <br />
					либо водитель с таким телефоном уже существует.
				</p>
			)}
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
