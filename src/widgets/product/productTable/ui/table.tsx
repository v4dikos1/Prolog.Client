import { useEffect, useState } from 'react'
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
	const selectAll = () => setSelectedProducts(new Set(products.map((product) => product.ID)))

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
		console.log('Check Product')
		if (selectedProducts.has(ID)) {
			const newSet = new Set(selectedProducts)
			newSet.delete(ID)
			setSelectedProducts(newSet)
		} else {
			const newSet = new Set(selectedProducts).add(ID)
			setSelectedProducts(newSet)
		}
	}

	const productsInView = products.map((product) => ({ ...product, selected: false, count: 0 }))

	return (
		<TableTemplate className={className} maxHeight='360px'>
			<thead>
				<tr>
					<th className='cursor-pointer select-none w-[170px]' onClick={toggleCheckbox}>
						<div className='flex items-center gap-3'>
							<Checkbox checked={checkedAll} changeHandler={toggleCheckbox} />
							Код
						</div>
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
						<td
							className='font-medium'
							onClick={() => {
								checkProduct(product.ID)
							}}>
							<div className='flex gap-3'>
								<Checkbox checked={selectedProducts.has(product.ID)} changeHandler={() => checkProduct(product.ID)} />
								{product.code}
							</div>
						</td>
						<td className='font-medium'>{product.name}</td>
						<td className='text-gray-500'>{product.weight}</td>
						<td className='text-gray-500'>{product.volume}</td>
						<td className='text-gray-500'>{product.price}</td>
						<td className='text-gray-400 underline'>Кол-во</td>
					</tr>
				))}
			</tbody>
		</TableTemplate>
	)
}
