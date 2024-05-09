import { useState } from 'react'
import { Product } from '@/entities/product'
import { Table as TableTemplate } from '@/shared/ui/Table'
import { Checkbox } from '@/shared/ui/Checkbox'

interface Props {
	className?: string
	products: Product[]
	selectedProducts: Set<string>
	setSelectedProducts: (arg: Set<string>) => void
}

export const Table = ({ className, products, selectedProducts, setSelectedProducts }: Props) => {
	const [checkedAll, setCheckedAll] = useState(false)

	const clearSelectedProducts = () => setSelectedProducts(new Set())
	const selectAll = () => {
		const newSet = new Set(products.map((product) => product.ID))
		setSelectedProducts(newSet)
	}

	const toggleCheckbox = () => {
		if (checkedAll) {
			clearSelectedProducts()
			setCheckedAll(false)
		} else {
			selectAll()
			setCheckedAll(true)
		}
	}

	const checkProduct = (ID: string) => {
		if (selectedProducts.has(ID)) {
			const newSet = new Set(selectedProducts)
			newSet.delete(ID)
			setSelectedProducts(newSet)
		} else {
			const newSet = new Set(selectedProducts)
			newSet.add(ID)
			setSelectedProducts(newSet)
		}
	}

	const productsInView = products.map((product) => ({ ...product, selected: false, count: 0 }))

	return (
		<TableTemplate className={className}>
			<thead>
				<tr>
					<th className='cursor-pointer select-none w-[170px] !pl-0'>
						<Checkbox className='h-full pl-8' checked={checkedAll} changeHandler={toggleCheckbox}>
							Код
						</Checkbox>
					</th>
					<th className='w-[410px]'>Наименование</th>
					<th>Вес, КГ</th>
					<th>
						Объём, м<sup>3</sup>
					</th>
					<th className='w-[140px]'>Цена, ₽</th>
					<th className='w-[140px]'>Количество</th>
				</tr>
			</thead>
			<tbody>
				{productsInView.map((product) => (
					<tr key={product.ID}>
						<td className='font-medium !pl-0'>
							<Checkbox
								className='pl-8 h-full'
								changeHandler={() => {
									checkProduct(product.ID)
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
							<input
								min={1}
								placeholder='Кол-во'
								className='h-full outline-none placeholder:text-gray-400 placeholder:underline'
								type='number'
							/>
						</td>
					</tr>
				))}
			</tbody>
		</TableTemplate>
	)
}
