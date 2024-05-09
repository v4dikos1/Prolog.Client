import { FormEventHandler, useState } from 'react'
import { useAddClientMutation } from '@/entities/client'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Addition = ({ back }: Props) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [addClient, { isLoading }] = useAddClientMutation()
	const [errorVisible, setErrorVisible] = useState(false)

	const handleResponse = (response: Response) => {
		if ('error' in response) {
			setErrorVisible(true)
			return
		}

		back()
	}

	const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		addClient({ name, phone }).then(handleResponse)
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
					либо клиент с таким телефоном уже существует.
				</p>
			)}
			<div className='flex gap-4'>
				<Input
					className='w-full'
					placeholder='Название клиента'
					value={name}
					changeHandler={(event) => setName(event.target.value)}
					required={true}
				/>
				<Input
					className='w-full'
					placeholder='Номер телефона'
					value={phone}
					changeHandler={(event) => setPhone(event.target.value)}
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
