import { useState } from 'react'
import { Product } from '@/entities/product'
import { Table as TableTemplate } from '@/shared/ui/Table'
import { Checkbox } from '@/shared/ui/Checkbox'

interface Props {
	className?: string
	products: Product[]
}

export const Table = ({ className, products }: Props) => {
	const [checkedAll, setCheckedAll] = useState(false)
	const toggleCheckbox = () => setCheckedAll((checkedAll) => !checkedAll)

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
				{products.map((product) => (
					<tr key={product.id}>
						<td className='font-medium' onClick={() => {}}>
							<div className='flex gap-3'>
								<Checkbox checked={product.selected} changeHandler={() => {}} />
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
