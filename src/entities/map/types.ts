export type Coordinates = {
	longitude: number
	latitude: number
}

export type Route = {
	ID: string
	from: Coordinates
	to: Coordinates
	color: string
}

type OrderPin = {
	orderID: number
	coordinates: Coordinates
	clientName: string
}

export type IncomingOrderPin = OrderPin & {
	deliveryStart: string
	deliveryEnd: string
}

export type ActiveOrderPin = OrderPin & {
	color: string
	index: number
	deliveryStart: string
	deliveryEnd: string
}

export type CompletedOrderPin = OrderPin & {
	completed: boolean
	endTime: string
}

export type StoragePin = {
	storageID: string
	coordinates: Coordinates
	storageName: string
}
