import { FormEventHandler, useState } from 'react'
import { useAddProductMutation } from '@/entities/product'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Addition = ({ back }: Props) => {
	const [code, setCode] = useState('')
	const [name, setName] = useState('')
	const [weight, setWeight] = useState('')
	const [volume, setVolume] = useState('')
	const [price, setPrice] = useState('')
	const [addProduct, { isLoading }] = useAddProductMutation()
	const [errorVisible, setErrorVisible] = useState(false)

	const handleResponse = (response: Response) => {
		if ('error' in response) {
			setErrorVisible(true)
			return
		}

		back()
	}

	const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
		const weightNumber = Number(weight)
		const volumeNumber = Number(volume)
		const priceNubmer = Number(price)

		event.preventDefault()
		addProduct({ code, name, weight: weightNumber, volume: volumeNumber, price: priceNubmer }).then(handleResponse)
	}

	return (
		<form
			className='w-full flex gap-4 flex-col px-8 overflow-hidden'
			method='POST'
			onSubmit={submitHandler}
			onInput={() => setErrorVisible(false)}>
			{errorVisible && (
				<p className='text-red-500'>
					Ошибка: данные введены неверно <br />
					либо есть проблемы с соединением.
					<br />
				</p>
			)}
			<div className='flex gap-4 flex-col overflow-auto scrollable'>
				<div className='flex gap-4 flex-col md:flex-row'>
					<Input
						className='w-full'
						placeholder='Код товара'
						value={code}
						changeHandler={(event) => setCode(event.target.value)}
						required={true}
					/>
					<Input
						className='w-full'
						placeholder='Название'
						value={name}
						changeHandler={(event) => setName(event.target.value)}
						required={true}
					/>
				</div>
				<div className='flex gap-4 flex-col md:flex-row'>
					<Input
						className='w-full'
						placeholder='Вес, кг'
						type='number'
						value={weight}
						changeHandler={(event) => setWeight(event.target.value)}
						required={true}
					/>
					<Input
						className='w-full'
						placeholder='Объем, м³'
						type='number'
						value={volume}
						changeHandler={(event) => setVolume(event.target.value)}
						required={true}
					/>
					<Input
						className='w-full'
						placeholder='Цена, ₽'
						type='number'
						value={price}
						changeHandler={(event) => setPrice(event.target.value)}
						required={true}
					/>
				</div>
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
