import { useGetVehiclesQuery } from '@/entities/vehicle'
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

	const VehiclesNotFound = () => (
		<div className='flex flex-col items-center gap-12 mt-8'>
			<h3 className='text-xl font-semibold'>Транспортных средств нет.</h3>
			<Button clickHandler={openAddition}>Добавить ТС</Button>
		</div>
	)

	if (!vehicles) return <VehiclesNotFound />

	return (
		<>
			{vehicles.length > 0 ? (
				<>
					<Table maxHeight='320px'>
						<thead>
							<tr>
								<th className='w-[30%] min-w-[200px]'>Марка</th>
								<th className='w-[15%] min-w-[100px]'>Госномер</th>
								<th className='w-[15%] min-w-[150px]'>
									Объём, м<sup>3</sup>
								</th>
								<th className='w-[20%] min-w-[250px] px-8'>Грузоподъёмность, кг</th>
								<th className='w-[20%] min-w-[250px] px-8'>Средний расход, 100 км</th>
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
				<VehiclesNotFound />
			)}
		</>
	)
}
