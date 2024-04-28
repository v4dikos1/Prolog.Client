import { ImportOrdersButton } from '@/features/order'
import { Button } from '@/shared/ui/Button'
import { InputWithIcon } from '@/shared/ui/InputWithIcon'
import { PlusIcon } from '@/shared/ui/icons/PlusIcon'
import { SearchIcon } from '@/shared/ui/icons/SearchIcon'

interface Props {
	prev: () => void
}

export const StepTwo = ({ prev }: Props) => {
	const tableColumns = [
		'Код',
		'Наименование',
		'Вес, КГ',
		<>
			Объём, м<sup>3</sup>
		</>,
		'Цена, ₽',
		'Количество',
	]
	return (
		<>
			<div className='px-5 flex gap-2'>
				<InputWithIcon className='w-full' placeholder='Поиск' Icon={SearchIcon} />
				<Button className='min-w-fit' category='secondary' Icon={PlusIcon}>
					Добавить товар
				</Button>
			</div>
			<table className='w-full mt-4'>
				<thead className='bg-gray-50 h-12 border-t border-b border-gray-200'>
					<tr className='py-5'>
						{tableColumns.map((column) => (
							<td className='pl-8 uppercase text-xs text-gray-500 font-medium' key={column.toString()}>
								{column}
							</td>
						))}
					</tr>
				</thead>
			</table>
			<div className='flex justify-between px-8 mt-4'>
				<ImportOrdersButton />
				<div className='flex gap-3'>
					<Button category='secondary' clickHandler={() => prev()}>
						Назад
					</Button>
					<Button>Сохранить</Button>
				</div>
			</div>
		</>
	)
}
