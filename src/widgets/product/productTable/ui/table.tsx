import { useState } from 'react'
import { Product } from '@/entities/product'
import { Table as TableTemplate } from '@/shared/ui/Table'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Counter } from '@/shared/ui/Counter'
import { deleteAllNonNumberCharacters } from '@/shared/helpers/deleteAllNonNumberCharacters'

interface Props {
	className?: string
	products: Product[]
	selectedProducts: Map<string, number>
	setSelectedProducts: (arg: Map<string, number>) => void
}

export const Table = ({ className, products, selectedProducts, setSelectedProducts }: Props) => {
	const [checkedAll, setCheckedAll] = useState(false)

	const clearSelectedProducts = () => setSelectedProducts(new Map())
	const selectAll = () => {
		const newMap = new Map()
		products.forEach((product) => {
			newMap.set(product.ID, selectedProducts.get(product.ID) || 1)
		})
		setSelectedProducts(newMap)
	}

	const toggleAllProduct = () => {
		if (checkedAll) {
			clearSelectedProducts()
			setCheckedAll(false)
		} else {
			selectAll()
			setCheckedAll(true)
		}
	}

	const toggleProduct = (ID: string) => {
		if (selectedProducts.has(ID)) {
			const newMap = new Map(selectedProducts)
			newMap.delete(ID)
			setSelectedProducts(newMap)
			setCheckedAll(false)
		} else {
			const newMap = new Map(selectedProducts)
			newMap.set(ID, 1)
			setSelectedProducts(newMap)
		}
	}

	const updateProductCount = (ID: string, value: string) => {
		const newMap = new Map(selectedProducts)

		let formattedValue = value.trim()

		if (formattedValue.length > 3) {
			formattedValue = formattedValue.slice(formattedValue.length - 3)
		}

		formattedValue = deleteAllNonNumberCharacters(formattedValue)

		if (formattedValue === '0' || formattedValue === '') {
			newMap.delete(ID)
			setCheckedAll(false)
		} else {
			newMap.set(ID, Number(formattedValue))
		}

		setSelectedProducts(newMap)
	}

	return (
		<TableTemplate className={className}>
			<thead>
				<tr>
					<th className='cursor-pointer select-none w-[170px] !pl-0'>
						<Checkbox className='h-full pl-8' checked={checkedAll} changeHandler={toggleAllProduct}>
							Код
						</Checkbox>
					</th>
					<th className='w-[390px]'>Наименование</th>
					<th>Вес, КГ</th>
					<th>
						Объём, м<sup>3</sup>
					</th>
					<th className='w-[140px]'>Цена, ₽</th>
					<th className='w-[160px]'>Количество</th>
				</tr>
			</thead>
			<tbody>
				{products.map((product) => (
					<tr key={product.ID}>
						<td className='font-medium !pl-0'>
							<Checkbox
								className='pl-8 h-full'
								changeHandler={() => {
									toggleProduct(product.ID)
								}}
								checked={selectedProducts.has(product.ID)}>
								{product.code}
							</Checkbox>
						</td>
						<td className='font-medium'>{product.name}</td>
						<td className='text-gray-500'>{product.weight}</td>
						<td className='text-gray-500'>{product.volume}</td>
						<td className='text-gray-500'>{product.price}</td>
						<td className='py-0'>
							<Counter
								setValue={(newValue) => {
									updateProductCount(product.ID, newValue)
								}}
								value={String(selectedProducts.get(product.ID) || 0)}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</TableTemplate>
	)
}
