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
			) : products && products.length > 0 ? (
				<Table products={products} />
			) : (
				<p className='text-center my-5'>Продукты не найдены.</p>
			)}
		</div>
	)
}
