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

export type IncomingOrdersFromAPI = {
	totalItems: number
	itemsQuantity: number
	itemsOffset: number
	items: {
		orderCount: number
		orderDate: string
		ordersGroupedByDriver: {
			driver: null
			orders: {
				address: string
				amount: number
				clientId: string
				clientName: string
				clientPhone: string
				dateDelivered: null
				datePickedUp: null
				deliveryEndDate: string
				deliveryStartDate: string
				id: number
				pickUpEndDate: string
				pickUpStartDate: string
				price: number
				status: null
				storageId: string
				storageName: string
				visibleId: string
				volume: number
				weight: number
			}[]
		}[]
	}[]
}

export type IncomingOrdersGroupByDate = {
	date: string
	orders: IncomingOrder[]
}

export type IncomingOrders = {
	count: number
	items: IncomingOrdersGroupByDate[]
}

export type Order = IncomingOrder | ActiveOrder | CompletedOrder
