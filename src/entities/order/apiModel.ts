import { DriverInOrderFromAPI } from '@/entities/driver'
import { API_Response } from '@/shared/types'

export type Route = {
	id: string
	index: number
	latitude: string
	longitude: string
	stopType: number
}

type OrderFromAPI = {
	id: number
	visibleId: string
	client: {
		clientId: string
		clientName: string
		clientPhone: string
		address: string
		coordinates: string
	}
	storage: {
		storageId: string
		storageName: string
		storageCoordinates: string
	}
	price: number
	volume: number
	weight: number
	amount: number
	pickUpStartDate: string
	pickUpEndDate: string
	datePickedUp: null
	deliveryStartDate: string
	deliveryEndDate: string
	dateDelivered: null
	status: null
}

export type IncomingOrdersFromAPI = API_Response<{
	orderCount: number
	orderDate: string
	ordersGroupedByDriver: {
		driver: null
		orders: OrderFromAPI[]
	}[]
}>

export type ActiveOrdersFromAPI = API_Response<{
	orderCount: number
	orderDate: string
	ordersGroupedByDriver: {
		driver: DriverInOrderFromAPI
		orders: OrderFromAPI[]
		routes: Route[]
	}[]
}>

export type CompletedOrdersFromAPI = API_Response<{
	orderCount: number
	orderDate: string
	ordersGroupedByDriver: {
		driver: DriverInOrderFromAPI
		orders: OrderFromAPI[]
	}[]
}>
