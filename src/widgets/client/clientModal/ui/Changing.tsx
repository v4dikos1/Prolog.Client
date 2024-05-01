import { FormEventHandler, useState } from 'react'
import { getClientByID, useChangeClientMutation, useDeleteClientMutation, useAppSelector } from '@/app/store'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	id: string | null
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Changing = ({ id, back }: Props) => {
	const client = useAppSelector((state) => getClientByID(state, id))
	const [changeClient, { isLoading: isChanging }] = useChangeClientMutation()
	const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation()

	const [name, setName] = useState(client?.name || '')
	const [phone, setPhone] = useState(client?.phone || '')
	const [errorVisible, setErrorVisible] = useState(false)

	if (id === null || client === undefined) return

	const handleResponse = (response: Response) => {
		console.log('handleResponse:', response)
		if ('error' in response) {
			setErrorVisible(true)
			return
		}

		back()
	}

	const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		changeClient({ id, name, phone }).then(handleResponse)
	}

	const deleteHandler = () => {
		deleteClient([id]).then(handleResponse)
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
