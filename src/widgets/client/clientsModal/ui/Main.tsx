import { useGetClientsQuery } from '@/entities/client'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import { Button } from '@/shared/ui/Button'
import { Table } from '@/shared/ui/Table'

interface Props {
	openAddition: () => void
	openChanging: (id: string) => void
}

export const Main = ({ openAddition, openChanging }: Props) => {
	const { data: clients, isLoading, isFetching } = useGetClientsQuery()

	if (isLoading || isFetching) return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-600' />

	const ClientsNotFound = () => (
		<div className='flex flex-col items-center gap-12 mt-8'>
			<h3 className='text-xl font-semibold'>Клиентов нет.</h3>
			<Button clickHandler={openAddition}>Добавить клиента</Button>
		</div>
	)

	if (!clients) return <ClientsNotFound />

	return (
		<>
			{clients.length > 0 ? (
				<>
					<Table className='h-[265px]'>
						<thead>
							<tr>
								<th className='w-1/2 min-w-[300px]'>Название</th>
								<th className='w-1/2 min-w-[200px]'>Номер телефона</th>
							</tr>
						</thead>
						<tbody>
							{clients.map((client) => (
								<tr
									key={client.ID}
									className='cursor-pointer transition-colors hover:!bg-indigo-50'
									onClick={() => openChanging(client.ID)}>
									<td className='font-medium'>{client.name}</td>
									<td className='font-medium'>{client.phone}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Button clickHandler={openAddition} className='mr-8 self-end'>
						Добавить
					</Button>
				</>
			) : (
				<ClientsNotFound />
			)}
		</>
	)
}
