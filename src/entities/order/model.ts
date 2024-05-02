import { Driver } from '@/entities/driver'
import { Client } from '@/entities/client'
import { Storage } from '@/entities/storage'

export enum StatusEnum {
	'incoming',
	'active',
	'completed',
}

export type Cargo = {
	volume: number
	weight: number
	count: number
}

export type OrderBase = {
	ID: number
	visibleID: string
	price: number
	address: string
	storage: Pick<Storage, 'ID' | 'name'>
	client: Pick<Client, 'ID' | 'name'>
	cargo: Cargo
	selected: boolean
}

export type IncomingOrder = OrderBase & {
	status: StatusEnum.incoming
	pickUpStart: string
	pickUpEnd: string
	deliveryStart: string
	deliveryEnd: string
}

export type ActiveOrder = OrderBase & {
	status: StatusEnum.active
	deliveryStart: string
	deliveryEnd: string
}

export type CompletedOrder = OrderBase & {
	status: StatusEnum.completed
	driver: {
		name: string
		licensePlate: string
	}
	pickedUp: string
	completed: boolean
	end: string
}

export type Order = IncomingOrder | ActiveOrder | CompletedOrder

export type IncomingOrdersGroupByDate = {
	date: string
	orders: IncomingOrder[]
}

export type IncomingOrders = {
	count: number
	items: IncomingOrdersGroupByDate[]
}

export type CompletedOrdersGroupByDate = {
	date: string
	orders: CompletedOrder[]
}

export type CompletedOrders = {
	count: number
	items: CompletedOrdersGroupByDate[]
}

export type ActiveOrdersGroupByDriver = {
	driver: Driver
	orders: ActiveOrder[]
}

export type ActiveOrdersGroupByDate = {
	date: string
	orders: ActiveOrdersGroupByDriver[]
}

export type ActiveOrders = {
	count: number
	items: ActiveOrdersGroupByDate[]
}
