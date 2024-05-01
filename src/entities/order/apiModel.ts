import { DriverFromAPI } from '@/entities/driver/'
import { API_Response } from '@/shared/types'

type OrderFromAPI = {
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
		driver: DriverFromAPI
		orders: OrderFromAPI[]
	}[]
}>

export type CompletedOrdersFromAPI = API_Response<{
	orderCount: number
	orderDate: string
	ordersGroupedByDriver: {
		driver: DriverFromAPI
		orders: OrderFromAPI[]
	}[]
}>
