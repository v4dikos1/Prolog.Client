import { useGetStoragesQuery } from '@/entities/storage'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import { Button } from '@/shared/ui/Button'
import { Table } from '@/shared/ui/Table'

interface Props {
	openAddition: () => void
	openChanging: (id: string) => void
}

export const Main = ({ openAddition, openChanging }: Props) => {
	const { data: storages, isLoading, isFetching } = useGetStoragesQuery()
	if (isLoading || isFetching) return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-600' />
	if (!storages) return <p className='text-center my-5'>Склады не найдены.</p>

	return (
		<>
			{storages.length > 0 ? (
				<>
					<Table maxHeight='265px'>
						<thead>
							<tr>
								<th className='w-1/2'>Название</th>
								<th className='w-1/2'>Адрес</th>
							</tr>
						</thead>
						<tbody>
							{storages.map((storage) => (
								<tr
									key={storage.ID}
									className='cursor-pointer transition-colors hover:!bg-indigo-50'
									onClick={() => openChanging(storage.ID)}>
									<td className='font-medium'>{storage.name}</td>
									<td className='font-medium'>{storage.address}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Button clickHandler={openAddition} className='mr-8 self-end'>
						Добавить
					</Button>
				</>
			) : (
				<div className='flex flex-col items-center gap-12 mt-8'>
					<h3 className='text-xl font-semibold'>Складов нет.</h3>
					<Button clickHandler={openAddition}>Добавить склад</Button>
				</div>
			)}
		</>
	)
}
