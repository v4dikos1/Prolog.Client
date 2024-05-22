import { FormEventHandler, useState } from 'react'
import { AddressInput } from '@/features/address'
import { useAddStorageMutation } from '@/entities/storage'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Addition = ({ back }: Props) => {
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [addStorage, { isLoading }] = useAddStorageMutation()
	const [errorVisible, setErrorVisible] = useState(false)

	const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		addStorage({ name, address }).then((response: Response) => {
			if (!('error' in response)) {
				back()
			} else {
				setErrorVisible(true)
			}
		})
	}

	return (
		<form
			className='w-full flex gap-4 flex-col px-8'
			method='POST'
			onSubmit={submitHandler}
			onInput={() => setErrorVisible(false)}>
			{errorVisible && <p className='text-red-500'>Ошибка: данные введены неверно</p>}
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
