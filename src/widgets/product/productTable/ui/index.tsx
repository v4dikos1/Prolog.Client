import cx from 'classnames'

import { useGetProductsQuery } from '@/app/store'
import { InputWithIcon } from '@/shared/ui/InputWithIcon'
import { Button } from '@/shared/ui/Button'
import { SearchIcon } from '@/shared/ui/icons/SearchIcon'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import { Table } from './table'

interface Props {
	className?: string
}

const defaultProducts = [
	{
		id: '3f2h-23gs',
		code: '4001 5379',
		name: 'Смартфон Xiaomi Redmi 12 4/128GB Sky Blue',
		weight: 0.189,
		volume: 0.0534,
		price: 13999,
		selected: false,
		count: 0,
	},
	{
		id: '3a01-f1fe',
		code: '2008 5365',
		name: 'Сплит-система Rapid RAM-07HJ/N1_23Y',
		weight: 1.2,
		volume: 2.324,
		price: 12100,
		selected: true,
		count: 2,
	},
]

export const ProductTable = ({ className }: Props) => {
	const { data: products, isLoading } = useGetProductsQuery()
	return (
		<div className={cx(className, 'w-full flex flex-col gap-4')}>
			<div className='px-5 flex gap-2'>
				<InputWithIcon className='w-full' placeholder='Поиск' Icon={SearchIcon} />
				<Button className='min-w-fit' category='secondary' Icon={PlusIcon}>
					Добавить товар
				</Button>
			</div>
			{isLoading ? (
				<SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-600' />
			) : products ? (
				<Table products={products.length > 0 ? products : defaultProducts} />
			) : (
				<p className='text-center my-5'>Продукты не найдены.</p>
			)}
		</div>
	)
}
