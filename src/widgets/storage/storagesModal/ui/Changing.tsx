import { FormEventHandler, useState } from 'react'
import { useAppSelector } from '@/shared/store'
import { AddressInput } from '@/features/address'
import { getStorageByID, useChangeStorageMutation, useDeleteStoragesMutation } from '@/entities/storage'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	ID: string | null
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Changing = ({ ID, back }: Props) => {
	const client = useAppSelector((state) => getStorageByID(state, ID))
	const [changeStorage, { isLoading: isChanging }] = useChangeStorageMutation()
	const [deleteStorages, { isLoading: isDeleting }] = useDeleteStoragesMutation()

	const [name, setName] = useState(client?.name || '')
	const [address, setAddress] = useState(client?.address || '')
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
		changeStorage({ ID, name, address }).then(handleResponse)
	}

	const deleteHandler = () => {
		deleteStorages([ID]).then(handleResponse)
	}

	return (
		<form
			className='w-full flex gap-4 flex-col px-8'
			method='POST'
			onSubmit={submitHandler}
			onInput={() => setErrorVisible(false)}>
			{errorVisible && <p className='text-red-500'>Ошибка: попробуйте заново</p>}
			<div className='flex gap-4 flex-col md:flex-row'>
				<Input
					className='w-full'
					placeholder='Название склада'
					value={name}
					changeHandler={(event) => setName(event.target.value)}
					required={true}
				/>
				<AddressInput placeholder='Адрес' value={address} setValue={setAddress} />
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
