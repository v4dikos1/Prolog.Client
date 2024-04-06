import { Driver } from '@/entities/driver'

export enum StatusEnum {
	'incoming',
	'active',
	'completed',
}

export type Storage = {
	ID: string
	name: string
}

export type Client = {
	ID: string
	name: string
	phone: string
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
	storage: Storage
	client: Client
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
