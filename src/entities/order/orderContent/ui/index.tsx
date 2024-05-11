import cx from 'classnames'
import { Client } from '@/entities/client'
import { getTime } from '@/shared/helpers/getTime'
import { formatPrice } from '../utils'

type PropsBase = {
	client: Client
	price: number
	cargo: CargoType
	className?: string
}

type IncomingOrderProps = PropsBase & {
	status: 0
	pickUpStart: string
	pickUpEnd: string
	deliveryStart: string
	deliveryEnd: string
}

type ActiveOrderProps = PropsBase & {
	status: 1
	deliveryStart: string
	deliveryEnd: string
}

type CompletedOrderProps = PropsBase & {
	status: 2
	pickedUp: string
	completed: boolean
	end: string
}

type Props = IncomingOrderProps | ActiveOrderProps | CompletedOrderProps

export const OrderContent = (props: Props) => {
	let content = [
		{ title: 'Клиент', value: props.client.name },
		{ title: 'Контактный телефон', value: props.client.phone },
		{ title: 'Стоимость доставки', value: formatPrice(props.price) },
		{
			title: 'Объём, вес, количество',
			value: (
				<>
					{props.cargo.volume} м<sup>3</sup> – {props.cargo.weight} кг – {props.cargo.count}
				</>
			),
		},
	]

	switch (props.status) {
		case 0:
			content = content.concat([
				{
					title: 'Время забора',
					value: `${getTime(props.pickUpStart)} – ${getTime(props.pickUpEnd)}`,
				},
				{
					title: 'Окно доставки',
					value: `${getTime(props.deliveryStart)} – ${getTime(props.deliveryEnd)}`,
				},
			])
			break
		case 1:
			content = content.concat([
				{ title: 'Время забора', value: `—` },
				{
					title: 'Окно доставки',
					value: `${getTime(props.deliveryStart)} – ${getTime(props.deliveryEnd)}`,
				},
			])
			break
		case 2:
			content = content.concat([
				{
					title: 'Время забора',
					value: getTime(props.pickedUp),
				},
				{
					title: 'Статус',
					value: props.completed ? (
						<span className='text-green-600'>Доставлен в {getTime(props.end)}</span>
					) : (
						<span className='text-orange-600'>Отменён в {getTime(props.end)}</span>
					),
				},
			])
			break
	}

	return (
		<table className={cx(props.className, 'text-xs')}>
			<tbody className='w-full'>
				{content.map(({ title, value }) => (
					<tr key={title}>
						<th className='align-text-top text-left font-normal text-gray-500'>{title}</th>
						<td className='pb-2 text-right font-medium text-gray-900'>{value}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
