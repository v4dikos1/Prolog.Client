import { Product } from '@/entities/product'
import { Checkbox } from '@/shared/ui/Checkbox'
import cx from 'classnames'
import { useState } from 'react'

interface Props {
	className?: string
	products: Product[]
}

export const Table = ({ className, products }: Props) => {
	const [checkedAll, setCheckedAll] = useState(false)
	const toggleCheckbox = () => setCheckedAll((checkedAll) => !checkedAll)

	return (
		<div className={cx(className, 'w-full max-h-[360px] scrollable overflow-auto')}>
			<table className='w-full'>
				<thead className='bg-gray-50 h-12 border-t border-b border-gray-200'>
					<tr className='py-5 uppercase text-xs text-gray-500'>
						<th className='pl-8 font-medium cursor-pointer select-none w-[170px]' onClick={toggleCheckbox}>
							<div className='flex items-center gap-3'>
								<Checkbox checked={checkedAll} changeHandler={toggleCheckbox} />
								Код
							</div>
						</th>
						<th className='pl-8 font-medium w-[410px] text-left'>Наименование</th>
						<th className='px-8 font-medium text-left'>Вес, КГ</th>
						<th className='px-8 font-medium text-left'>
							Объём, м<sup>3</sup>
						</th>
						<th className='pl-8 font-medium text-left w-[140px]'>Цена, ₽</th>
						<th className='pl-8 font-medium text-left w-[140px]'>Количество</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id} className='h-12 text-sm text-gray-900 even:bg-gray-50'>
							<td className='pl-8 font-medium' onClick={() => {}}>
								<div className='flex gap-3'>
									<Checkbox checked={product.selected} changeHandler={() => {}} />
									{product.code}
								</div>
							</td>
							<td className='pl-8 font-medium'>{product.name}</td>
							<td className='pl-8 text-gray-500'>{product.weight}</td>
							<td className='pl-8 text-gray-500'>{product.volume}</td>
							<td className='pl-8 text-gray-500'>{product.price}</td>
							<td className='pl-8 text-gray-400 underline'>Кол-во</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
