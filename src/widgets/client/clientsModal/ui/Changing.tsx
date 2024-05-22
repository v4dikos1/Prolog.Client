import { FormEventHandler, useState } from 'react'
import { useAppSelector } from '@/shared/store'
import { getClientByID, useChangeClientMutation, useDeleteClientsMutation } from '@/entities/client'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	ID: string | null
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Changing = ({ ID, back }: Props) => {
	const client = useAppSelector((state) => getClientByID(state, ID))
	const [changeClient, { isLoading: isChanging }] = useChangeClientMutation()
	const [deleteClients, { isLoading: isDeleting }] = useDeleteClientsMutation()

	const [name, setName] = useState(client?.name || '')
	const [phone, setPhone] = useState(client?.phone || '')
	const [errorVisible, setErrorVisible] = useState(false)

	if (ID === null || client === undefined) return

	const handleResponse = (response: Response) => {
		if ('error' in response) {
			setErrorVisible(true)
			return
		}

		back()
	}

	const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		changeClient({ ID, name, phone }).then(handleResponse)
	}

	const deleteHandler = () => {
		deleteClients([ID]).then(handleResponse)
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
			<div className='flex gap-4 flex-col md:flex-row'>
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
