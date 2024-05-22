import { FormEventHandler, useState } from 'react'
import { useAppSelector } from '@/shared/store'
import { getProductByID, useChangeProductMutation, useDeleteProductsMutation } from '@/entities/product'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface Props {
	ID: string | null
	back: () => void
}

type Response = { data: void } | { error: unknown }

export const Changing = ({ ID, back }: Props) => {
	const product = useAppSelector((state) => getProductByID(state, ID))
	const [changeProduct, { isLoading: isChanging }] = useChangeProductMutation()
	const [deleteProducts, { isLoading: isDeleting }] = useDeleteProductsMutation()

	const [code, setCode] = useState(String(product?.code) || '')
	const [name, setName] = useState(String(product?.name) || '')
	const [weight, setWeight] = useState(String(product?.weight) || '')
	const [volume, setVolume] = useState(String(product?.volume) || '')
	const [price, setPrice] = useState(String(product?.price) || '')
	const [errorVisible, setErrorVisible] = useState(false)

	if (ID === null || product === undefined) return

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
		changeProduct({ ID, code, name, weight: weightNumber, volume: volumeNumber, price: priceNubmer }).then(
			handleResponse,
		)
	}

	const deleteHandler = () => {
		deleteProducts([ID]).then(handleResponse)
	}

	return (
		<form
			className='w-full flex gap-4 flex-col px-8 overflow-hidden'
			method='POST'
			onSubmit={submitHandler}
			onInput={() => setErrorVisible(false)}>
			{errorVisible && <p className='text-red-500'>Ошибка: попробуйте заново</p>}
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
