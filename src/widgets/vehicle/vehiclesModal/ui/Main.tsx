import { useGetVehiclesQuery } from '@/app/store'
import { SpinnerIcon } from '@/shared/ui/icons/SpinnerIcon'
import { Button } from '@/shared/ui/Button'
import { Table } from '@/shared/ui/Table'

interface Props {
	openAddition: () => void
	openChanging: (id: string) => void
}

export const Main = ({ openAddition, openChanging }: Props) => {
	const { data: vehicles, isLoading, isFetching } = useGetVehiclesQuery()
	if (isLoading || isFetching) return <SpinnerIcon className='mt-10 mx-auto' pathClassName='fill-indigo-600' />
	if (!vehicles) return <p className='text-center my-5'>Транспортные средства не найдены.</p>

	return (
		<>
			{vehicles.length > 0 ? (
				<>
					<Table maxHeight='265px'>
						<thead>
							<tr>
								<th className='w-[30%]'>Марка</th>
								<th className='w-[15%]'>Госномер</th>
								<th className='w-[15%]'>
									Объём, м<sup>3</sup>
								</th>
								<th className='w-[20%] px-8'>Грузоподъёмность, кг</th>
								<th className='w-[20%] px-8'>Средний расход, 100 км</th>
							</tr>
						</thead>
						<tbody>
							{vehicles.map((vehicle) => (
								<tr
									key={vehicle.ID}
									className='cursor-pointer transition-colors hover:!bg-indigo-50'
									onClick={() => openChanging(vehicle.ID)}>
									<td className='font-medium'>{vehicle.brand}</td>
									<td className='font-medium'>{vehicle.licensePlate}</td>
									<td className='font-medium'>{vehicle.volume}</td>
									<td className='font-medium'>{vehicle.capacity}</td>
									<td className='font-medium'>{vehicle.fuelConsumption}</td>
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
					<h3 className='text-xl font-semibold'>Транспортных средств нет.</h3>
					<Button clickHandler={openAddition}>Добавить ТС</Button>
				</div>
			)}
		</>
	)
}
