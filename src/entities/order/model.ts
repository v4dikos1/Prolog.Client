import { DriverInOrder } from '@/entities/driver'
import { ClientInOrder } from '@/entities/client'
import { StorageInOrder } from '@/entities/storage'
import { Route } from './apiModel'

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
	storage: StorageInOrder
	client: ClientInOrder
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
	driver: DriverInOrder
	orders: ActiveOrder[]
	routes: Route[]
}

export type ActiveOrdersGroupByDate = {
	date: string
	orders: ActiveOrdersGroupByDriver[]
}

export type ActiveOrders = {
	count: number
	items: ActiveOrdersGroupByDate[]
}
