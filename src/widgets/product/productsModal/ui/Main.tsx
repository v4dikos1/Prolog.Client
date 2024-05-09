import { useState } from 'react'
import { ImportProductsButton } from '@/features/product'
import { useGetProductsQuery, filterProduct } from '@/entities/product'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import { Button } from '@/shared/ui/Button'
import { Table } from '@/shared/ui/Table'
import { InputWithIcon } from '@/shared/ui/InputWithIcon'
import { SearchIcon } from '@/shared/ui/icons/SearchIcon'

interface Props {
	openAddition: () => void
	openChanging: (id: string) => void
}

export const Main = ({ openAddition, openChanging }: Props) => {
	const [search, setSearch] = useState('')
	const { data: products, isLoading, isFetching } = useGetProductsQuery()
	if (isLoading || isFetching) return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-600' />
	if (!products) return <p className='text-center my-5'>Клиенты не найдены.</p>

	const filteredProducts = products.filter((product) => filterProduct(search, product))

	return (
		<>
			<InputWithIcon
				className='mx-5'
				value={search}
				changeHandler={(event) => setSearch(event.target.value)}
				placeholder='Поиск'
				Icon={SearchIcon}
			/>
			{filteredProducts.length > 0 ? (
				<>
					<Table>
						<thead>
							<tr>
								<th className='w-[140px]'>Код</th>
								<th className='w-1/2'>Наименование</th>
								<th className='px-8'>Вес, кг</th>
								<th className='px-8'>
									Объем, м<sup>3</sup>
								</th>
								<th className='w-[140px]'>Цена, ₽</th>
							</tr>
						</thead>
						<tbody>
							{filteredProducts.map((product) => (
								<tr
									key={product.ID}
									className='cursor-pointer transition-colors hover:!bg-indigo-50'
									onClick={() => openChanging(product.ID)}>
									<td className='font-medium'>{product.code}</td>
									<td className='font-medium'>{product.name}</td>
									<td className='text-gray-500'>{product.weight}</td>
									<td className='text-gray-500'>{product.volume}</td>
									<td className='text-gray-500'>{product.price}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<div className='flex justify-between px-8 mt-auto'>
						<ImportProductsButton />
						<Button clickHandler={openAddition}>Добавить</Button>
					</div>
				</>
			) : (
				<div className='flex flex-col items-center gap-12 mt-8'>
					<h3 className='text-xl font-semibold'>Товаров нет.</h3>
					<Button clickHandler={openAddition}>Добавить товар</Button>
				</div>
			)}
		</>
	)
}
