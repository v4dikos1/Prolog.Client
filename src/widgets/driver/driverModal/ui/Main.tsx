import { useGetDriversQuery } from '@/entities/driver'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import { Button } from '@/shared/ui/Button'
import { Table } from '@/shared/ui/Table'

interface Props {
	openAddition: () => void
	openChanging: (id: string) => void
}

export const Main = ({ openAddition, openChanging }: Props) => {
	const { data: drivers, isLoading, isFetching } = useGetDriversQuery()
	if (isLoading || isFetching) return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-600' />

	const DriversNotFound = () => (
		<div className='flex flex-col items-center gap-12 mt-8'>
			<h3 className='text-xl font-semibold'>Водителей нет.</h3>
			<Button clickHandler={openAddition}>Добавить водителя</Button>
		</div>
	)

	if (!drivers) return <DriversNotFound />

	return (
		<>
			{drivers.length > 0 ? (
				<>
					<Table maxHeight='320px'>
						<thead>
							<tr>
								<th className='w-1/4 min-w-[200px]'>Имя</th>
								<th className='w-1/4 min-w-[200px]'>Контактный телефон</th>
								<th className='w-1/4 min-w-[300px]'>Телеграм для отправки заявок</th>
								<th className='w-1/4 min-w-[200px]'>Зарплата</th>
							</tr>
						</thead>
						<tbody>
							{drivers.map((driver) => (
								<tr
									key={driver.ID}
									className='cursor-pointer transition-colors hover:!bg-indigo-50'
									onClick={() => openChanging(driver.ID)}>
									<td className='font-medium'>
										{driver.surname} {driver.name} {driver.patronymic}
									</td>
									<td className='font-medium'>{driver.phone}</td>
									<td className='font-medium'>@{driver.telegram}</td>
									<td className='font-medium'>{driver.salary} ₽ / час</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Button clickHandler={openAddition} className='mr-8 self-end'>
						Добавить
					</Button>
				</>
			) : (
				<DriversNotFound />
			)}
		</>
	)
}
