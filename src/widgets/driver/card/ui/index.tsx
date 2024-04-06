import { Driver } from '@/entities/driver'
import { ArrowRightIcon } from '@/shared/ui/icons/ArrowRightIcon'
import { getTime } from '@/shared/utils/getTime'

interface Props {
	className?: string
	driver: Driver
}

export const DriverCard = ({ className, driver }: Props) => {
	const content = [
		{
			title: 'Время начала',
			value: getTime(driver.start),
		},
		{
			title: 'Время завершения',
			value: getTime(driver.end),
		},
		{
			title: 'Осталось заказов',
			value: `${driver.ordersCount - driver.completedOrdersCount} из ${driver.ordersCount}`,
		},
		{
			title: 'Расстояние маршрута',
			value: driver.distance + ' км',
		},
	]

	return (
		<div className={className + ' rounded-md bg-gray-100 pt-3 pb-1 px-5 flex flex-col gap-3'}>
			<header className='flex justify-between'>
				<h3 className='text-sm font-medium leading-5 text-gray-900 flex items-center gap-2'>
					{driver.name}
					<span style={{ backgroundColor: driver.color }} className={'block w-2 h-2 rounded'}></span>
				</h3>
				<button className='group text-sm font-medium text-indigo-700 uppercase flex items-center gap-1 hover:text-indigo-500'>
					{driver.licensePlate}
					<ArrowRightIcon className='group-hover:animate-arrow' pathClassName='group-hover:fill-indigo-500' />
				</button>
			</header>
			<table>
				<tbody>
					{content.map((item) => (
						<tr className='text-xs pb-2' key={item.title}>
							<th className='text-left pb-2 text-gray-500 font-normal'>{item.title}</th>
							<td className='text-right pb-2 text-gray-900 font-medium'>{item.value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
