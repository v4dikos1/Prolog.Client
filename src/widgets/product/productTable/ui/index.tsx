import { useState } from 'react'

import { filterProduct, useGetProductsQuery } from '@/entities/product'
import { InputWithIcon } from '@/shared/ui/InputWithIcon'
import { Button } from '@/shared/ui/Button'
import { SearchIcon } from '@/shared/ui/icons/SearchIcon'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import { Table } from './table'

interface Props {
	openAddition: () => void
	selectedProducts: Map<string, number>
	setSelectedProducts: (arg: Map<string, number>) => void
}

export const ProductTable = ({ openAddition, selectedProducts, setSelectedProducts }: Props) => {
	const { data: products, isLoading } = useGetProductsQuery()
	const [search, setSearch] = useState('')

	const productsExist = products && products.length > 0
	const filteredProducts = productsExist ? products.filter((product) => filterProduct(search, product)) : []
	const error = !isLoading && filteredProducts.length === 0

	return (
		<>
			<div className='px-5 flex gap-2'>
				<InputWithIcon
					className='w-full'
					placeholder='Поиск'
					Icon={SearchIcon}
					value={search}
					changeHandler={(event) => setSearch(event.target.value)}
				/>
				<Button clickHandler={openAddition} className='min-w-fit' category='secondary' Icon={PlusIcon}>
					Добавить товар
				</Button>
			</div>
			{isLoading && <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-600' />}
			{error && <p className='text-center my-5'>Продукты не найдены.</p>}
			{filteredProducts && filteredProducts.length > 0 && (
				<Table
					selectedProducts={selectedProducts}
					setSelectedProducts={setSelectedProducts}
					products={filteredProducts}
					className='grow h-full'
				/>
			)}
		</>
	)
}
