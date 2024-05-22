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

	const StoragesNotFound = () => (
		<div className='flex flex-col items-center gap-12 mt-8'>
			<h3 className='text-xl font-semibold'>Складов нет.</h3>
			<Button clickHandler={openAddition}>Добавить склад</Button>
		</div>
	)

	if (!storages) return <StoragesNotFound />

	return (
		<>
			{storages.length > 0 ? (
				<>
					<Table maxHeight='320px'>
						<thead>
							<tr>
								<th className='w-1/2 min-w-[400px]'>Название</th>
								<th className='w-1/2 min-w-[500px]'>Адрес</th>
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
				<StoragesNotFound />
			)}
		</>
	)
}
